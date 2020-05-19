import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import InputSearch from './InputSearch'
import {EMPTY_INPUT} from '../../../../Utils/constTest'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        searchText: EMPTY_INPUT,
        setSearchText: jest.fn(),
    }

    const enzymeWrapper = shallow(<InputSearch {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('InputSearch component', () => {
    it('should render self and subcomponents', () => {
        const  { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('div.search-input').exists()).toBe(true)
        expect(enzymeWrapper.find('div.field').exists()).toBe(true)
        expect(enzymeWrapper.find('p').hasClass('control has-icons-left')).toBe(true)
        expect(enzymeWrapper.find('input').hasClass('input')).toBe(true)
        expect(enzymeWrapper.find('span').hasClass('icon is-small is-left')).toBe(true)
        expect(enzymeWrapper.find('i').hasClass('fas fa-search')).toBe(true)
    })

    it('should handle change', () => {
        const { enzymeWrapper, props } = setup()
        expect(props.setSearchText.mock.calls.length).toBe(0)
        enzymeWrapper.find('input').simulate('change', { target: { value: 'Test' } })
        enzymeWrapper.update()
        expect(props.setSearchText.mock.calls.length).toBe(1)
    })


})
