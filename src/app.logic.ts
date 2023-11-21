import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

const {b:base, l:limit, s:showTable} = yarg;
const headerMessage = `
==============================
        Tabla del ${base}
==============================\n
`
let outputMessage = ''




for (let i = 0; i <= limit; i++) {
    outputMessage +=  `${base} x ${i} = ${base*i}\n` 
}


outputMessage = headerMessage + outputMessage
if(showTable) console.log(outputMessage);

// const outputPath = `outputs/folder1/folder2/folder3`
const outputPath = `outputs`

fs.mkdirSync(outputPath, {recursive: true})

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`,outputMessage)
console.log("File Created");





