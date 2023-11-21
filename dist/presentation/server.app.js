"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const create_table_use_case_1 = require("../domain/use-cases/create-table.use-case");
const save_file_use_case_1 = require("../domain/use-cases/save-file.use-case");
class ServerApp {
    static run({ base, limit, showTable, fileName, fileDestination }) {
        console.log("Server runnig..");
        const table = new create_table_use_case_1.CreateTable().execute({ base, limit });
        const wasCreated = new save_file_use_case_1.SaveFile().execute({
            fileContent: table,
            fileDestination: `${fileDestination}/${fileName}`
        });
        if (showTable)
            console.log(table);
        (wasCreated)
            ? console.log("File Created!!")
            : console.log("File not Created!!");
    }
}
exports.ServerApp = ServerApp;
