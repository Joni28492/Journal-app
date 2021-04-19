import '@testing-library/jest-dom';
import { RegisterScreen } from "../../../components/auth/LoginScreen";
import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../../types/types';


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

const wrapper = mount(
    <Provider store={store}>
       <MemoryRouter>
            <RegisterScreen />
       </MemoryRouter>
    </Provider>
);



describe('pruebas en <RegisterScreen />', () => {
    
    test('debemostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })//existe error pero no es por esta prueba es por lo de fuera

    test('debe de hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {//vaciamos el campo email
                value: '',
                name :'email'
            }
        });
        //buscamos el msg de error
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions =store.getActions();//no hay ninguna accion []
        //comentamos el store.dispatch()
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    });


    test('debe de mostrar la caja de alerta con el error', () => {
        const initState= {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'   
            }
        };
        const store = mockStore(initState);
        const wrapper = mount(<Provider store={store}>
                                <MemoryRouter>
                                     <RegisterScreen />
                                </MemoryRouter>
                              </Provider>);
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
    })
    
    
    
})
