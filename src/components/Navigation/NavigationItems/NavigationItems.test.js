import React from 'react';
import {configure,shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<NavigationItems />',()=>{

    it('should render one <Navigation /> item if user is not authenticated',()=>{
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(1);
    });

    it('should render three <Navigation /> item if user is authenticated',()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contains the log out node if user is authenticated',()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>));
    });
});