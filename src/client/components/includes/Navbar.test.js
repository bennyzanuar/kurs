import React from 'react'
import { shallow } from 'enzyme'
import Navbar from './Navbar'

describe('<Navbar />', () => {
    it('should render navbar', () => {
        const component = shallow(<Navbar />)
        expect(component).toMatchSnapshot()
    })
})