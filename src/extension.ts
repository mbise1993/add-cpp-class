import * as vscode from 'vscode';
import * as fileActions from './fileActions';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('addCppClass.addClass', executeAddCppClass);
    context.subscriptions.push(disposable);
}

export function deactivate() {
}


async function executeAddCppClass(folderUri: vscode.Uri) {
    let fileName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "File name",
        prompt: "Enter file name for header and source files"
    });

    if (!fileName) {
        return;
    }

    let qualifiedClassName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "Class name",
        prompt: "Enter class name (can be qualified with namespace)"
    });

    if (!qualifiedClassName) {
        return;
    }

    let fileInfo = createFileInfo(folderUri.fsPath, fileName, qualifiedClassName);

    let headerPath = fileActions.createHeaderFile(fileInfo);
    let sourcePath = fileActions.createSourceFile(fileInfo);

    await vscode.window.showTextDocument(vscode.Uri.file(sourcePath));
    await vscode.window.showTextDocument(vscode.Uri.file(headerPath));
}

function createFileInfo(folder: string, fileName: string, qualifiedClassName: string): fileActions.IFileInfo {
    let namespaceEndIndex = qualifiedClassName.lastIndexOf("::");
    let namespace = namespaceEndIndex > -1
        ? qualifiedClassName.substr(0, namespaceEndIndex)
        : null;

    let classStartIndex = namespaceEndIndex > -1
        ? namespaceEndIndex + 2
        : 0;
    let className = qualifiedClassName.substr(classStartIndex);

    return {
        folder: folder,
        fileName: fileName,
        namespace: namespace,
        className: className
    };
}
