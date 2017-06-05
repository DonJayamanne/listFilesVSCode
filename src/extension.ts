'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const path = require('path');

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('extension.listFilesToOpen', () => {
        if (vscode.workspace.rootPath === null){
            return;
        }
        const config = vscode.workspace.getConfiguration("findFiles"),
            lengthToStripOff = vscode.workspace.rootPath.length + 1,
            activeEditor = vscode.window.activeTextEditor,
            activeColumn = (activeEditor) ? activeEditor.viewColumn : 1;

        vscode.workspace.findFiles(<string>config.get("fileIncludeGlob"), <string>config.get("fileExcludeGlob"), <number>config.get("maxResults")).then(files => {
            const displayFiles = files
                .map(file => {
                    const filePath = file.fsPath,
                        label = path.basename(filePath);
                    return { 
                        label: label, 
                        description: filePath.slice(lengthToStripOff, -label.length), 
                        filePath: filePath
                    };
                });
            vscode. window.showQuickPick(displayFiles).then(val=> {
                if (!val) return;
                vscode.workspace.openTextDocument(val.filePath).then(d=> {
                    vscode.window.showTextDocument(d, activeColumn);
                });
            });
        });
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() {
}