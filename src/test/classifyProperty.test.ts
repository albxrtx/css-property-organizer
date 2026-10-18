import * as assert from "node:assert/strict";
import * as postcss from "postcss";
import { classifyProperty } from "../postcss";
import test, { suite } from "node:test";

suite("classifyProperty", () => {
  /* 
        Test 1
  */

  test("should classify width into box", () => {
    const declaration = postcss.decl({
      prop: "width",
      value: "100%",
    });

    const propertiesByGroup: Record<string, postcss.Declaration[]> = {};

    classifyProperty(declaration, propertiesByGroup);

    assert.deepStrictEqual(propertiesByGroup, {
      box: [declaration],
    });
  });

  /* 
        Test 2
  */

  test("should classify unknown properties into other", () => {
    const declaration = postcss.decl({
      prop: "unknown-css-property",
      value: "value",
    });

    const propertiesByGroup: Record<string, postcss.Declaration[]> = {};

    classifyProperty(declaration, propertiesByGroup);

    assert.deepStrictEqual(propertiesByGroup, {
      other: [declaration],
    });
  });

  /* 
        Test 3
  */

  test("should classify custom properties into customProperties", () => {
    const declaration = postcss.decl({
      prop: "--primary-color",
      value: "red",
    });

    const propertiesByGroup: Record<string, postcss.Declaration[]> = {};

    classifyProperty(declaration, propertiesByGroup);

    assert.deepStrictEqual(propertiesByGroup, {
      customProperties: [declaration],
    });
  });

  /* 
        Test 4
  */

  test("should classify multiple properties of the same group", () => {
    const declarations: postcss.Declaration[] = [];
    const declaration1 = postcss.decl({
      prop: "width",
      value: "100%",
    });

    const declaration2 = postcss.decl({
      prop: "height",
      value: "100px",
    });

    const declaration3 = postcss.decl({
      prop: "padding",
      value: "100px",
    });

    declarations.push(declaration1, declaration2, declaration3);

    const propertiesByGroup: Record<string, postcss.Declaration[]> = {};

    declarations.forEach((decl) => {
      classifyProperty(decl, propertiesByGroup);
    });

    assert.deepStrictEqual(propertiesByGroup, {
      box: declarations,
    });
  });
});
