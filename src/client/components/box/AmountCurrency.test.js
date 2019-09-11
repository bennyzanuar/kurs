import React from 'react'
import { shallow } from 'enzyme'
import AmountCurrency from './AmountCurrency'

describe('<AmountCurrency />', () => {
    it('should render amount box', () => {
        const component = shallow(<AmountCurrency />)
        expect(component).toMatchSnapshot()
    })
})