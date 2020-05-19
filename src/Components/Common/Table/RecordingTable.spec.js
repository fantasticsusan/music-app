import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RecordingTable from './RecordingTable'
import {Popover} from "../../index";
import {SELECTED_RECORDING, ELEMENTS, ELEMENTS_MATCHED} from '../../../Utils/constTest'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        elements: ELEMENTS,
        selectedRecording: SELECTED_RECORDING,
        handleClick: jest.fn(),
        undoMatch: jest.fn(),
        isMatchTable: false,
    }

    const enzymeWrapper = shallow(<RecordingTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function setupMatchTable() {
    const props = {
        elements: ELEMENTS_MATCHED,
        selectedRecording: SELECTED_RECORDING,
        handleClick: jest.fn(),
        undoMatch: jest.fn(),
        isMatchTable: true,
    }

    const enzymeWrapper = shallow(<RecordingTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('RecordingTable component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('div').hasClass('table-scrollable')).toBe(true)
        expect(enzymeWrapper.find('table').hasClass('table is-hoverable')).toBe(true)
        expect(enzymeWrapper.find('th').length).toBe(4)
        expect(enzymeWrapper.find('td').length).toBe(4)
        expect(enzymeWrapper.find('tr').length).toBe(2)
        expect(enzymeWrapper.find('button').exists()).toBe(false)
        expect(enzymeWrapper.find(Popover).exists()).toBe(false)

    })

    it('should render self and subcomponents match table', () => {
        const { enzymeWrapper } = setupMatchTable()

        expect(enzymeWrapper.find('div').hasClass('table-scrollable ')).toBe(false)
        expect(enzymeWrapper.find('table').hasClass('table is-hoverable is-fullwidth')).toBe(true)
        expect(enzymeWrapper.find('th').length).toBe(6)
        expect(enzymeWrapper.find('td').length).toBe(6)
        expect(enzymeWrapper.find('tr').length).toBe(2)
        expect(enzymeWrapper.find('button').hasClass('button is-danger')).toBe(true)
        expect(enzymeWrapper.find(Popover).exists()).toBe(true)
    })

    it('should handle click', () => {
        const { enzymeWrapper, props } = setup()
        const tr =  enzymeWrapper.find('tbody').children()
        tr.simulate("click")
        expect(props.handleClick.mock.calls.length).toBe(1)
    })

    it('shouldn\'t handle click when match table', () => {
        const { enzymeWrapper, props } = setupMatchTable()
        const tr =  enzymeWrapper.find('tbody').children()
        tr.simulate("click")
        expect(props.handleClick.mock.calls.length).toBe(0)
    })

    it('should handle unmatch', () => {
        const { enzymeWrapper, props } = setupMatchTable()
        const button =  enzymeWrapper.find('button')
        button.simulate("click")
        expect(props.undoMatch.mock.calls.length).toBe(1)
    })
})
