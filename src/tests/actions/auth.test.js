import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore } from "redux";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState= {};
let store = mockStore(initState)

describe('Pruebas con las acciones de auth', () => {
    
    beforeEach(()=>{ store = mockStore(initState);} );

    test('login y logout deben crear la accion respectiva', () => {
  
        const uid = 'ABC123';
        const displayName='Joni';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();
        expect(logoutAction).toEqual({type: types.logout});
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
        

    });



    test('debe de realizar el startLogout', async() => {
       
        await store.dispatch(startLogout());
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({type:types.logout});
        expect(actions[1]).toEqual({type:types.notesLogoutCleaning});
    });


    test('debe de iniciar el startLoginEmailPassword', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[1]).toEqual({
            type:types.login,
            payload: {
                uid: 'Flbb9UgrJueab55RUh3x47Vc1Ds1',
                 displayName: null
            }
        });

    });
    
    
})
