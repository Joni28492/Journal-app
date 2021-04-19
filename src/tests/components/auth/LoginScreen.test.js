import '@testing-library/jest-dom';
import { LoginScreen } from "../../../components/auth/LoginScreen";
import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//problema de compatibilidad con enzyme, usar siguiente comando
//npm install --save-dev @wojtekmaj/enzyme-adapter-react-17
//y modificar el setupTest
//import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
jest.mock('../../../actions/auth', ()=>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState= {
    auth: {},
    ui: {
        loading: false,
        msgError: null   
    }
};
let store = mockStore(initState);
store.dispatch=jest.fn();
const wrapper = mount(
    <Provider store={store}>{/*Provider para el acceso al store  */}
       <MemoryRouter>
            <LoginScreen />
       </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(()=>{ 
        store = mockStore(initState);
        jest.clearAllMocks();
    } );

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot(); 
    });

    test('debe de disparar la accion startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe de disparar el startLoginEmailPassword con los respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect(startLoginEmailPassword).toHaveBeenCalledWith('', '');
    })
    
    
    
});
