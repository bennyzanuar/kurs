import React from 'react'
import { shallow } from 'enzyme'
import ListCurrency from './ListCurrency'

describe('<ListCurrency />', () => {
    it('should render list with props', () => {
        const ratesDisplay = {
            IDR: '14102.0011',
            EUR: '0.8854',
            GBP: '0.7720',
            SGD: '1.3568'
        }
        const amount = 10
        const component = shallow(<ListCurrency rates={ratesDisplay} amount={amount}  />)
        expect(component).toMatchSnapshot()
    })
})