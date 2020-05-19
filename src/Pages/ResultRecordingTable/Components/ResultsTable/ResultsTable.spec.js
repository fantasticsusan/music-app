import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ResultsTable from './ResultsTable'
import {
    SELECTED_RECORDING,
    EMPTY_RECORDING,
    EMPTY_LIST,
    EMPTY_INPUT,
    DB_RECORD_LIST, INPUT_RECORD, DB_RECORD
} from '../../../../Utils/constTest'
import {Badge, Spinner, Table} from '../../../../Components'
import InputSearch from '../../../InputSearch'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        selectedRecording: SELECTED_RECORDING,
        databaseRecordings: DB_RECORD_LIST,
        isLoading: false,
        searchText: EMPTY_INPUT,
        fetchDatabaseRecordings: jest.fn(),
        matchRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<ResultsTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function setupLoading() {
    const props = {
        selectedRecording: EMPTY_RECORDING,
        databaseRecordings: EMPTY_LIST,
        isLoading: true,
        searchText: EMPTY_INPUT,
        fetchDatabaseRecordings: jest.fn(),
        matchRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<ResultsTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function setupEmptyList() {
    const props = {
        selectedRecording: EMPTY_RECORDING,
        databaseRecordings: EMPTY_LIST,
        isLoading: false,
        searchText: EMPTY_INPUT,
        fetchDatabaseRecordings: jest.fn(),
        matchRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<ResultsTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('ResultsTable component', () => {
    it('should render self and subcomponents', () => {
        const {enzymeWrapper, props} = setup()

        expect(enzymeWrapper.find('div.columns').length).toBe(4)
        expect(enzymeWrapper.find('div.column').length).toBe(4)

        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" Database")
        expect(enzymeWrapper.find('i').hasClass("fas fa-database")).toBe(true)

        expect(enzymeWrapper.find(InputSearch).exists()).toBe(true)

        expect(enzymeWrapper.find('div.items-result').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("Showing <Badge /> out of <Badge /> entries")
        expect(enzymeWrapper.find(Badge).length).toBe(2)

        enzymeWrapper.setProps({...props, searchText: "record"})
        expect(enzymeWrapper.find(Spinner).exists()).toBe(false)
        expect(enzymeWrapper.find('div.message').exists()).toBe(false)
        expect(enzymeWrapper.find(Table).exists()).toBe(true)
        const tableProps = enzymeWrapper.find(Table).props()
        console.log(tableProps)
        expect(tableProps.elements).toStrictEqual(DB_RECORD_LIST)

    })

    it('should render self and subcomponents loading', () => {
        const {enzymeWrapper} = setupLoading()
        expect(enzymeWrapper.find(Spinner).exists()).toBe(true)

    })

    it('should render self and subcomponents empty list', () => {
        const {enzymeWrapper} = setupEmptyList()

        expect(enzymeWrapper.find('div.columns').length).toBe(4)
        expect(enzymeWrapper.find('div.column').length).toBe(4)

        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" Database")
        expect(enzymeWrapper.find('i').hasClass("fas fa-database")).toBe(true)

        expect(enzymeWrapper.find(InputSearch).exists()).toBe(true)

        expect(enzymeWrapper.find('div.items-result').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("Showing <Badge /> out of <Badge /> entries")
        expect(enzymeWrapper.find(Badge).length).toBe(2)

        expect(enzymeWrapper.find('div.message').exists()).toBe(true)
        expect(enzymeWrapper.find('div.message-body').text()).toBe("Sorry, we couldn't find any recording that matches, but you can add a new one to the database.")

    })

    it('should handle match', () => {
        const {enzymeWrapper, props} = setup()
        enzymeWrapper.setProps({...props, searchText: "record"})
        expect(props.matchRecording.mock.calls.length).toBe(0)
        const tableProps = enzymeWrapper.find(Table).props()
        tableProps.handleClick(INPUT_RECORD, DB_RECORD)
        expect(props.matchRecording.mock.calls.length).toBe(1)
    })


})
