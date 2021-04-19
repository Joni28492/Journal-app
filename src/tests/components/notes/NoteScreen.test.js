
import '@testing-library/jest-dom';
import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes',()=> ({
    activeNote:jest.fn(),
}))




const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState= {
    auth: {
        uid: '1',//Da igual el uid
        name: 'Joni'
    },
    ui: {
        loading: false,
        msgError: null   
    },
    notes: {
        active: {
            id:1234,
            title: 'hola',
            body: 'mundo',
            date: 0
        },
        notes: [],
    }
};
let store = mockStore(initState);
store.dispatch=jest.fn();

const wrapper = mount(
    <Provider store={store}>
            <NoteScreen />
    </Provider>
);


describe('Pruebas en <NoteScreen />', () => {
    test('debe mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })
        
    test('debe de disparar el active note', () => {
        wrapper.find('input[name="title"]').simulate('change', ()=>{
            target: {//simulacion del cambio en la caja de texto
                name: 'title'
                value: 'Hola de nuevo'
            }
        });

        // expect(activeNote).toHaveBeenCalled();
        expect(activeNote).toHaveBeenLastCalledWith(
            1234,   //utlima vez que fue llamada
            {
                body: 'mundo',
                title: 'hola',
                id: 1234,
                date: 0
            }
        );
    })
    

})
