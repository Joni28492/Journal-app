import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('Pruebas en authReducer', () => {

    test('debe realizar el login', () => {
        const initState={};
        const action ={
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Joni'
            }
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({
            uid: 'abc',
            name: 'Joni'///cuidado no displayName
        })
    });
    

    test('debe realizar el logout ', () => {
        const initState = {
            uid: 'sfjalksdjf0324908',
            name: 'Joni'
        }
        
        const action ={ type: types.logout };
        const state = authReducer(initState, action);
        expect(state).toEqual({});
    });

    test('no debe  de hacer cambios ', () => {
        const initState = {
            uid: 'sfjalksdjf0324908',
            name: 'Joni'
        }
        //accion que no existe 
        const action ={ type: 'kjfdghkfdgh' };
        const state = authReducer(initState, action);
        expect(state).toEqual(initState);
    });


})
