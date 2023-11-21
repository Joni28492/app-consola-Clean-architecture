"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
class CreateTable {
    constructor(
    /**
     * DI - Dependcy Injection
     */
    ) { }
    execute({ base, limit = 10 }) {
        let outputMessage = '';
        for (let i = 0; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}\n`;
        }
        return outputMessage;
    }
}
exports.CreateTable = CreateTable;
