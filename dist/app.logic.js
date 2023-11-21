"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yarns_plugin_1 = require("./config/plugins/yarns.plugin");
const { b: base, l: limit, s: showTable } = yarns_plugin_1.yarg;
const headerMessage = `
==============================
        Tabla del ${base}
==============================\n
`;
let outputMessage = '';
for (let i = 0; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;
}
outputMessage = headerMessage + outputMessage;
if (showTable)
    console.log(outputMessage);
// const outputPath = `outputs/folder1/folder2/folder3`
const outputPath = `outputs`;
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log("File Created");
