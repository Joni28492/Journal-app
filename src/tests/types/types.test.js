import { types } from "../../types/types"

describe('Pruebas con nuestros tipos', () => {



    test('debe de tener estos types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError:'[UI] set error',
            uiRemoveError:'[UI] remove error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New note',
            noteActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Update note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        })
    })
    
    
})
