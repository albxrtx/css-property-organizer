import postcss from "postcss";
import cssPropertyGroups from "./data/cssPropertyGroups.json";

/*
    Function that process the CSS File
*/

export function parseCss(css: string) {
  return postcss.parse(css);
}

/*
    Function that process an Selector
*/

export function organizeCss(node: postcss.Container) {
  node.each((nodeChild) => {
    /*
        Check if the node is a CSS rule/ Selector
        If not, process recursively if its is an at-rule
    */
    if (nodeChild.type === "rule") {
      /*
            Initialize an empty object to store properties by group 
      */
      const propertiesByGroup: Record<string, postcss.Declaration[]> = {};

      /*
            Classify each property in the selector
      */
      nodeChild.walkDecls((decl) => {
        classifyProperty(decl, propertiesByGroup);
      });

      /*
            Create new selector with the grouped properties
      */
      const newSelector = createNewSelector(nodeChild, propertiesByGroup);

      /*
            Replace the original selector with the selector created before
      */
      nodeChild.replaceWith(newSelector);
    } else if (nodeChild.type === "atrule") {
      organizeCss(nodeChild);
    }
  });
  return node;
}

/* 
    Function that classifies properties
*/
export function classifyProperty(
  decl: postcss.Declaration,
  propertiesByGroup: Record<string, postcss.Declaration[]>,
) {
  /* 
        Check for custom properties like: 
        --primary-color: #6366f1;
    */
  if (decl.prop.startsWith("--")) {
    /* 
        Initialize the custom properties group if it does not exist
    */
    if (!propertiesByGroup.customProperties) {
      propertiesByGroup.customProperties = [];
    }

    propertiesByGroup.customProperties.push(decl);
    return;
  }

  /* 
        Iterate through the configured CSS property groups to find a match
  */
  for (const [groupName, groupProperties] of Object.entries(
    cssPropertyGroups,
  )) {
    /* 
            Check wether the property belong to his group
        */
    if (groupProperties.includes(decl.prop)) {
      /* 
            Initilize the group if it does not exist yet
        */
      if (!propertiesByGroup[groupName]) {
        propertiesByGroup[groupName] = [];
      }

      propertiesByGroup[groupName].push(decl);
      return;
    }
  }

  /* 
        If the property does not belong to any group
        create an "other" group where it can be stored
  */
  if (!propertiesByGroup.other) {
    propertiesByGroup.other = [];
  }

  propertiesByGroup.other.push(decl);
}

/* 
    Function to create new selector
*/
export function createNewSelector(
  originalRule: postcss.Rule,
  propertiesByGroup: Record<string, postcss.Declaration[]>,
) {
  /* 
        Initialize a new rule 
    */
  const rule = postcss.rule({ selector: originalRule.selector });

  rule.raws.semicolon = originalRule.raws.semicolon;
  /* 
        Iterate through propertiesByGroup
  */
  for (const [declGroupName, decls] of Object.entries(propertiesByGroup)) {
    /* 
        Add a comment with the name of the group the properties belong
    */
    rule.append({
      type: "comment",
      text: declGroupName,
    });

    /* 
        Add all properties of the group to the rule
    */
    for (const decl of decls) {
      const clonedDecl = decl.clone();
      clonedDecl.raws.before = "\n  ";
      rule.append(clonedDecl);
    }
  }
  return rule;
}
