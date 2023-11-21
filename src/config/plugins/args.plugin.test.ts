// import {yarg} from './args.plugin';

const runCommand = async(args: string[]) => {
    process.argv = [...process.argv, ...args]

    //importacion dinamica
    const {yarg} = await import('./args.plugin')
    return yarg;
}


describe('args.plugin.ts', () => { 


    const originalArgv = process.argv;

    beforeEach(() => {
        //limpiamos el process.argv
        process.argv = originalArgv;
        jest.resetModules()   
    })


    test('should retrun return default values', async() => { 
        const argv =  await runCommand(['-b', '5'])
        
        // console.log(argv);
        // console.log(process.argv);
        // console.log(yarg);// al importarlo se ejcuta directamente y da error
        
        expect(argv).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'multiplication-table',
                d: './outputs',
            })
        );

    })

    test('should return configuration with custom values', async() => { 


        const customName = 'custom-name'
        const customFolder = 'custom-folder'
        const argv =  await runCommand([
            '-b', '8',
            '-l','20',
            '-s',
            '-n', customName,
            '-d', customFolder,
        ])

        expect(argv).toEqual(
            expect.objectContaining({
                b: 8,
                l: 20,
                s: true,
                n: customName,
                d: customFolder,
            })
        );


    })

})