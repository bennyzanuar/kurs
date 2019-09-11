import React from 'react'
import { shallow } from 'enzyme'
import SelectCurrency from './SelectCurrency'

describe('<SelectCurrency />', () => {
    it('should render select', () => {
        const component = shallow(<SelectCurrency />)
        expect(component).toMatchSnapshot()
    })

    it('should render select with props', () => {
        const suggestions = {
            JPY: '110.7579',
            ISK: '120.1523'
        }
        const amount = 10
        const component = shallow(<SelectCurrency suggestions={suggestions} amount={amount} />)
        expect(component).toMatchSnapshot()
    })
})