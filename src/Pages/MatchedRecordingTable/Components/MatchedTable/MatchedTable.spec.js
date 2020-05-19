import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MatchedTable from './MatchedTable'
import {
    SELECTED_RECORDING,
    EMPTY_RECORDING,
    EMPTY_LIST,
    MATCH_RECORD_LIST
} from '../../../../Utils/constTest'
import {Badge, Table} from '../../../../Components'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        matchRecordings: MATCH_RECORD_LIST,
        unmatchRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<MatchedTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function setupEmptyList() {
    const props = {
        matchRecordings: EMPTY_LIST,
        unmatchRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<MatchedTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('MatchedTable component', () => {
    it('should render self and subcomponents', () => {
        const {enzymeWrapper} = setup()

        expect(enzymeWrapper.find('div.table-match-container').exists()).toBe(true)
        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" Registry")
        expect(enzymeWrapper.find('i').hasClass("fas fa-database")).toBe(true)

        expect(enzymeWrapper.find('div.table-header-body').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("<Badge /> total matches")
        expect(enzymeWrapper.find(Badge).exists()).toBe(true)

        expect(enzymeWrapper.find(Table).exists()).toBe(true)
        const tableProps = enzymeWrapper.find(Table).props()
        expect(tableProps.elements).toBe(MATCH_RECORD_LIST)
        expect(tableProps.selectedRecording).toStrictEqual(EMPTY_RECORDING)
        expect(tableProps.isMatchTable).toBe(true)

    })

    it('should render self and subcomponents empty list', () => {
        const {enzymeWrapper} = setupEmptyList()

        expect(enzymeWrapper.find('div.table-match-container').exists()).toBe(true)
        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" Registry")
        expect(enzymeWrapper.find('i').hasClass("fas fa-database")).toBe(true)

        expect(enzymeWrapper.find('div.table-header-body').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("<Badge /> total matches")
        expect(enzymeWrapper.find(Badge).exists()).toBe(true)
    })

    it('should handle unmatch', () => {
        const {enzymeWrapper, props} = setup()
        expect(props.unmatchRecording.mock.calls.length).toBe(0)
        const tableProps = enzymeWrapper.find(Table).props()
        tableProps.undoMatch(SELECTED_RECORDING)
        expect(props.unmatchRecording.mock.calls.length).toBe(1)
    })


})
