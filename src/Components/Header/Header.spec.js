import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from '../Header'

Enzyme.configure({adapter: new Adapter()})

describe('Header component', () => {
    it('should render self and subcomponents', () => {
        const enzymeWrapper = shallow(<Header />)

        expect(enzymeWrapper.find('div').hasClass('header')).toBe(true)
        expect(enzymeWrapper.find('h1').text()).toBe('Matching-recordings app ')
        expect(enzymeWrapper.find('h1').hasClass('title')).toBe(true)
        expect(enzymeWrapper.find('hr').exists()).toBe(true)
        expect(enzymeWrapper.find('i').hasClass('fas fa-music')).toBe(true)
    })
})
