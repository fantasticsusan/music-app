import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Popover from './Popover'
import {SELECTED_RECORDING} from '../../../Utils/constTest'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        matchedRecord: SELECTED_RECORDING
    }

    const enzymeWrapper = shallow(<Popover {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Popover component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('Popover').length).toBe(1)
        expect(enzymeWrapper.find('button').hasClass('button is-info')).toBe(true)
        expect(enzymeWrapper.find('i').hasClass('fas fa-info-circle')).toBe(true)

    })
})
