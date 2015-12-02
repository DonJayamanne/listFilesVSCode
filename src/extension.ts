// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {window, Uri, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {
    function getFileName(file: string): string {
        var forwardSlash = file.lastIndexOf("/");
        var backSlash = file.lastIndexOf("\\");
        if (forwardSlash === -1 && backSlash === -1) {
            return file;
        }

        return file.substring((forwardSlash > backSlash) ? forwardSlash + 1 : backSlash + 1);
    }

    var disposable = commands.registerCommand('extension.listFilesToOpen', () => {
        var config = workspace.getConfiguration("findFiles");
        var lengthToStripOff = workspace.rootPath.length + 1;
        
        workspace.findFiles(<string>config.get("fileIncludeGlob"), <string>config.get("fileExcludeGlob"), <number>config.get("maxResults")).then(files=> {
            var displayFiles = files.map(file=> {
                return { description: file.fsPath.substring(lengthToStripOff), label: getFileName(file.fsPath), filePath:file.fsPath };
            });
            window.showQuickPick(displayFiles).then(val=> {
                workspace.openTextDocument(val.filePath).then(d=> {
                    window.showTextDocument(d);
                });
            });
        });
    });
}
