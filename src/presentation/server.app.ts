import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";



interface runOptions {
    base: number;
    limit: number;
    fileName: string;
    showTable: boolean;
    fileDestination: string;
}

export class ServerApp {


    static run({base, limit, showTable, fileName,fileDestination}:runOptions) {
        console.log("Server runnig...");

        const table = new CreateTable().execute({base, limit})
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileDestination: fileDestination,
            fileName: fileName
        })


        if(showTable) console.log(table);
        (wasCreated) 
            ? console.log("File Created!")
            : console.log("File not Created!")
    }


}