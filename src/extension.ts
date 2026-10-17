import * as vscode from "vscode";
import { parseCss, organizeCss } from "./postcss";
import notification from "./data/notification.json";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "extension.organize-by-groups",
    async () => {
      /* 
          Get the user language
      */
      const language = vscode.env.language.startsWith("es") ? "es" : "en";

      const editor = vscode.window.activeTextEditor;

      /* 
          Check if is some file open
      */
      if (!editor) {
        vscode.window.showWarningMessage(
          notification.invalidFileType[language],
        );
        return;
      }

      const document = editor.document;

      /* 
          Check if the active file is a CSS file
      */
      if (document.languageId !== "css") {
        vscode.window.showWarningMessage(
          notification.invalidFileType[language],
        );
        return;
      }

      const rawCss = document.getText();

      /* 
          Check if the file is empty
      */
      if (rawCss.length === 0) {
        vscode.window.showWarningMessage(notification.emptyFile[language]);
        return;
      }
      /* 
          Parse the CSS into PostCSS
      */
      const cssRoot = parseCss(rawCss);

      /* 
          Organize the CSS properties into groups
      */
      const organizedCss = organizeCss(cssRoot);

      const fullDocumentRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(rawCss.length),
      );

      /* 
          Replace the original CSS with the organized CSS
      */
      await editor.edit((editBuilder) => {
        editBuilder.replace(fullDocumentRange, organizedCss.toString());
      });

      /* 
          Show success message to the user
      */
      vscode.window.showInformationMessage(
        notification.organizationSuccess[language],
      );
    },
  );
  context.subscriptions.push(command);
}
