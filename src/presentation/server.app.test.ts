import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import {ServerApp} from './server.app';

describe('Server App ', () => { 

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileName: 'test-file-name',
        fileDestination: 'test-destination',
    }

    beforeEach( () => {
        jest.clearAllMocks()
    } )


    test('should create server app instance ',() => { 

        const serverApp = new ServerApp()
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run ).toBe('function')

    })


    test('should run server app with options', () => { 


        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

     

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('Server runnig...')
        expect(logSpy).toHaveBeenLastCalledWith('File Created!')

        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit 
        });
        
        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })


    })


    test('should run with custom values mocked', () => { 

        //un mock que no es directo a la implementacion
        const logMock =  jest.fn()
        const logErrorMock =  jest.fn()
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveFileMock = jest.fn().mockReturnValue(true)

        //console es global
        console.log = logMock
        console.error = logErrorMock
        //estos no son globales
        CreateTable.prototype.execute = createMock
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith("Server runnig...")
        expect(createMock).toHaveBeenCalledWith({base:options.base, limit: options.limit})
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            fileName: options.fileName
        }) 

        expect(logMock).toHaveBeenCalledWith('File Created!')
        expect(logErrorMock).not.toHaveBeenCalledWith()
    })


})