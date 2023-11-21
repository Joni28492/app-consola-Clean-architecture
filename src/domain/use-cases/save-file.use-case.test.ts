import {SaveFile} from './save-file.use-case';
import fs from 'fs'

describe('SaveFileUseCase', () => { 


    const customOptions = {
        fileContent: 'custom content',
        fileDestination:'custom-outputs',
        fileName:'custom-table-name',

    }

    const customFilePath = customOptions.fileDestination+'/'+customOptions.fileName+'.txt'

    afterEach(()=>{
        const outputFolderExists = fs.existsSync('outputs') 
        if(outputFolderExists) fs.rmSync('outputs', {recursive:true})//rmdir da warning
        //ojo con los permisos de las carpetas
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination) 
        if(customOutputFolderExists) fs.rmSync(customOptions.fileDestination, {recursive:true})//rmdir da warning


    })


    // beforeEach(()=>{
    //     jest.clearAllMocks(); //esto no funcionara para los spy, solo jest.fn()
    // })
    
    test('should save file with default values', () => { 

        const saveFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }
        
        const result = saveFile.execute(options)
        
        expect(result).toBeTruthy()
        const fileExists = fs.existsSync(filePath) //ojo si ya existe
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
        
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(options.fileContent)
    })
    
    
    test('should save file with custom values', () => { 
        
        
        const saveFile = new SaveFile()
       

        const result = saveFile.execute(customOptions)
        expect(result).toBeTruthy()

        const fileExists = fs.existsSync(customFilePath) //ojo si ya existe
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'})

        expect(fileExists).toBe(true)
        expect(fileContent).toBe(customOptions.fileContent)

    })



    test('should retrun false if directory could not be saved', () => { 

        const saveFile = new SaveFile()
        //si no le ponemos el .mockImplementation solo sirve para saber
        //si fue llamado o con que argumentos, aqui la sustituimos
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            ()=>{ throw new Error('this is a custom error message from testing') }
        );

        const result = saveFile.execute(customOptions)
        expect(result).toBe(false)

        //al pasar al siguiente test el mock se mantiene, hay que restaurarlo al original
        mkdirSpy.mockRestore(); 
    })
    
    test('should retrun false if file could not be created', () => { 

        const saveFile = new SaveFile()
        
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            ()=>{ throw new Error('this is a custom writing message from testing') }
        );

        const result = saveFile.execute({fileContent: 'Hola'})
        expect(result).toBe(false)

        writeFileSpy.mockRestore()
    })
})