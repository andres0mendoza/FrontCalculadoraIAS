import React from 'react';

import { shallow, mount } from "enzyme"
import { Calc } from "../../../components/calc/Calc"

describe('Pruebas calcular horas', () => {
    
    let wrapper;

    beforeEach( () => {
        
        wrapper = shallow( <Calc /> );

    })

    test('debe de mostrar <Calc /> correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();

    })
    
    test('el primer h3 debe de mostrar el valor que se le envia al input de técnico ', () => {
        
        const input = wrapper.find("#idTecnicoCalculo");
        const value = "pruebaUnitaria";
        
        input.simulate("change", { target: { value: value } } );
           
        expect( wrapper.find("h3").at(0).text() ).toBe( value );

    })

    test('el segundo h3 debe de mostrar el valor que se le envia al input de semana ', () => {
        
        const input = wrapper.find("#yearWeek");
        const value = "2021-W39";
        
        input.simulate("change", { target: { value: value } } );
           
        expect( wrapper.find("h3").at(1).text() ).toBe( value );

    })


})
