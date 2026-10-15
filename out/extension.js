"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = require("vscode");
function activate(context) {
    const command = vscode.commands.registerCommand("extension.organize-by-groups", async () => {
        vscode.window.showInformationMessage("Css Propery Organizer is running");
    });
    context.subscriptions.push(command);
}
//# sourceMappingURL=extension.js.map