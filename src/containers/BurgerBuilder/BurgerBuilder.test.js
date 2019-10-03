import React from 'react';
import {configure,shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('<BurgerBuilder />',()=>{
    it('Should render build controls when recieving ingredients',()=>{
        const wrapper = shallow(<BurgerBuilder ings = {{salad:0}} onInitIngredients = {()=> {}}/>);
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});