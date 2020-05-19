import React from 'react'
    import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from '../Footer'

Enzyme.configure({adapter: new Adapter()})

describe('Footer component', () => {
    it('should render self and subcomponents', () => {
        const enzymeWrapper = shallow(<Footer />)

        expect(enzymeWrapper.find('div').hasClass('footer')).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("© Webpage made by Susana Mayo Cano with ReactJS + Redux + Bulma")
        expect(enzymeWrapper.find('a').hasClass('footer-link')).toBe(true)
    })
})
