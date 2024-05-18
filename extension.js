// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode")

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "class-converter" is now active!')
	let disposable = commands.registerCommand("extension.convertClass", () => {
		const editor = window.activeTextEditor
		if (!editor) {
			return
		}

		const document = editor.document
		const text = document.getText()
		const regex = /className="([^"]+)"/g
		const replacedText = text.replace(regex, (match, className) => {
			return `className={styles.${className}}`
		})

		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, replacedText)
		})
	})

	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
