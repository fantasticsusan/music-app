import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Badge from './Badge'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        children: 4
    }

    const enzymeWrapper = shallow(<Badge {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Badge component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('span').hasClass('tag')).toBe(true)
        expect(enzymeWrapper.find('span').props().children).toBe(4)

    })
})
