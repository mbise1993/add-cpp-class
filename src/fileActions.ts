import * as fs from 'fs';
import * as path from 'path';

export interface IFileInfo {
	folder: string;
	fileName: string;
	namespace: string | null;
	className: string;
}

export function createHeaderFile(fileInfo: IFileInfo): string {
	const fileText = fileInfo.namespace === null
		? performReplacements(HEADER_TEMPLATE_NO_NAMESPACE, fileInfo)
		: performReplacements(HEADER_TEMPLATE_NAMESPACE, fileInfo);

	return createFile(fileText, "h", fileInfo);
}

export function createSourceFile(fileInfo: IFileInfo): string {
	const fileText = fileInfo.namespace === null
		? performReplacements(SOURCE_TEMPLATE_NO_NAMESPACE, fileInfo)
		: performReplacements(SOURCE_TEMPLATE_NAMESPACE, fileInfo);

	return createFile(fileText, "cpp", fileInfo);
}

function performReplacements(text: string, fileInfo: IFileInfo): string {
	return text
		.replace(new RegExp("{{namespace}}", "g"), fileInfo.namespace as string)
		.replace(new RegExp("{{className}}", "g"), fileInfo.className);
}

function createFile(text: string, ext: string, fileInfo: IFileInfo): string {
	const filePath = path.join(fileInfo.folder, `${fileInfo.fileName}.${ext}`);
	fs.writeFileSync(filePath, text);
	return filePath;
}

const HEADER_TEMPLATE_NO_NAMESPACE = `#pragma once

class {{className}}
{
public:
	{{className}}();
};
`;

const HEADER_TEMPLATE_NAMESPACE = `#pragma once

namespace {{namespace}}
{
	class {{className}}
	{
	public:
		{{className}}();
	};
}
`;

const SOURCE_TEMPLATE_NAMESPACE = `#include "{{className}}.h"

namespace {{namespace}}
{
	{{className}}::{{className}}() = default;
}
`;

const SOURCE_TEMPLATE_NO_NAMESPACE = `#include "{{className}}.h"

{{className}}::{{className}}() = default;
`;
