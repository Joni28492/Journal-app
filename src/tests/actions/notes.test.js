import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from "../../actions/notes"
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from "../../types/types";
import { db } from "../../firebase/firebase-config";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import { fileUpload } from "../../helpers/fileUpload";
// jest.mock('../../helpers/fileUpload', ()=>( {
//     fileUpload: jest.fn(()=>{
//         return 'https://hola-mundo.com/cosa.jpg'
//         // return Promise.resolve('https://hola-mundo.com/cosa.jpg')
//     })
// }) )

jest.mock("../../helpers/fileUpload", () => {
    return {
      fileUpload: () => {
        return Promise.resolve(
          'https://hola-mundo.com/cosa.jpg'
        );
      },
    };
});



const initState= { 
    auth: {uid: 'TESTING--fdñlgkdlfkg'},
    notes: {
        active:{//el id lo cogemos de firebase
            id: 'A1eJtH6rG5D16Byai6ev',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}
let store = mockStore(initState)


describe('Pruebas con las acciones de notes', () => {

    beforeEach( ()=>{ store = mockStore(initState) });

    test('debe de crear una nueva nota startNewNote', async() => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({
            type: types.noteActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });



        //docId ....action .... payload....id
        //await .....db......doc(`url del doc`).....delete
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING--fdñlgkdlfkg/journal/notes/${docId}`).delete();

    });

    // test('stratLoadingNotes debe cargar las notas', async() => {
    //     //esta prueba es con npm run test-env
    //     await store.dispatch( startLoadingNotes('TESTING--fdñlgkdlfkg') );
    //     const actions = store.getActions();
    //     expect(actions[0]).toEqual({
    //         type:types.notesLoad,
    //         payload: expect.any(Array)
    //     });

    //     const expected = {
    //         id:expect.any(String),
    //         title:expect.any(String),
    //         body:expect.any(String),
    //         date:expect.any(Number),
    //     }

    //     expect(actions[0].payload[0]).toMatchObject(expected);

    // });
    
    // test-env
    // test('startSaveNote debe de actualizar la nota', async() => {
    //     //usamos un id de los creados en firebase
    //     const note = {
    //         id: 'A1eJtH6rG5D16Byai6ev',
    //         title: 'titulo',
    //         body: 'body'
    //     }

    //     await store.dispatch( startSaveNote(note) );
    //     const actions = store.getActions();
    //     // console.log(actions);//vemos que lo actualiza en firebase
    //     expect(actions[0].type).toBe(types.notesUpdated);
    //     //comprobamos que se cambio a lo que queremos
    //     const docRef = await db.doc(`/TESTING--fdñlgkdlfkg/journal/notes/${note.id}`).get();
    //     expect(docRef.data().title).toBe(note.title);
    // });

    //esta falla por temas del setTimeOut de jest
    // test('startUploading debe de actualizar el url del entry', async() => {
    //     // jest.setTimeout(20000)
    //     const file = new File([],'foto.jpg');
    //     await store.dispatch( startUploading(file));//aqui daria error

    //     const docRef = await db.doc(`/TESTING--fdñlgkdlfkg/journal/notes/A1eJtH6rG5D16Byai6ev`).get();
    //     expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')
    // });
    
    

    
})
