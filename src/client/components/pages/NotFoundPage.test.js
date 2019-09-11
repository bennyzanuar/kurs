import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from './NotFoundPage'

describe('<NotFoundPage />', () => {
    it('should render not found page', () => {
        const component = shallow(<NotFoundPage />)
        expect(component).toMatchSnapshot()
    })
})