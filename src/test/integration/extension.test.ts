import * as assert from "node:assert/strict";
import * as vscode from "vscode";
import * as fs from "node:fs";
import * as path from "node:path";

suite("CSS Property Organizer integration", () => {
  test("should organize CSS using the extension command", async () => {
    const filePath = path.resolve(
      __dirname,
      "../../../src/test/integration/test.css",
    );

    const content = fs.readFileSync(filePath, "utf8");

    const document = await vscode.workspace.openTextDocument({
      language: "css",
      content,
    });

    const editor = await vscode.window.showTextDocument(document);

    await vscode.commands.executeCommand("extension.organize-by-groups");

    const result = editor.document.getText().replace(/\r\n/g, "\n");

    const expected = `:root {
  /* customProperties */
  --primary-color: #6366f1;
  --background-color: #f1f5f9;
  --text-color: #1e293b;
  --radius: 16px;
}

* {
  /* other */
  box-sizing: border-box;
}

.container {
  /* box */
  width: 100%;
  max-width: 500px;
  padding: 1rem;
}

.card {
  /* border */
  border: 1px solid #ddd;
  border-radius: var(--radius);
  /* background */
  background: white;
  /* effects */
  box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
  /* animation */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

@media (max-width: 600px) {
  .container {
    /* box */
    padding: 0.5rem;
  }

  .card {
    /* box */
    padding: 1.5rem;
  }

  h1 {
    /* typography */
    font-size: 1.5rem;
  }
}
`;

    assert.equal(result, expected);
  });
});
