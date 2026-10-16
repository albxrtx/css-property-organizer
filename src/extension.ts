import * as vscode from "vscode";
import { parseCss, organizeCss } from "./postcss";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "extension.organize-by-groups",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showWarningMessage(
          "Open a CSS file to use this extension.",
        );
        return;
      }

      const document = editor.document;

      if (document.languageId !== "css") {
        vscode.window.showWarningMessage(
          "This extension only works with CSS files.",
        );
      }

      const rawCss = document.getText();

      if (rawCss.length === 0) {
        vscode.window.showWarningMessage(
          "The file is empty or no valid selectors were found",
        );
      }

      const css = parseCss(rawCss);

      const newCss = organizeCss(css);

      const fullDocumentRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(rawCss.length),
      );

      await editor.edit((editBuilder) => {
        editBuilder.replace(fullDocumentRange, newCss.toString());
      });

      vscode.window.showInformationMessage(
        "The CSS file was organized correctly",
      );
    },
  );
  context.subscriptions.push(command);
}
