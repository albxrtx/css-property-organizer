import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "extension.organize-by-groups",
    async () => {
      vscode.window.showInformationMessage("Css Propery Organizer is running");
    },
  );
  context.subscriptions.push(command);
}
