import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import InputTable from './InputTable'
import {SELECTED_RECORDING, INPUT_RECORD_LIST, EMPTY_RECORDING, EMPTY_LIST} from '../../../../Utils/constTest'
import {Badge, Spinner, Table} from '../../../../Components'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        selectedRecording: SELECTED_RECORDING,
        inputRecordings: INPUT_RECORD_LIST,
        isLoading: false,
        getInputRecordings: jest.fn(),
        selectRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<InputTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function setupLoading() {
    const props = {
        selectedRecording: EMPTY_RECORDING,
        inputRecordings: EMPTY_LIST,
        isLoading: true,
        getInputRecordings: jest.fn(),
        selectRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<InputTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}
function setupEmptyList() {
    const props = {
        selectedRecording: EMPTY_RECORDING,
        inputRecordings: EMPTY_LIST,
        isLoading: false,
        getInputRecordings: jest.fn(),
        selectRecording: jest.fn()
    }

    const enzymeWrapper = shallow(<InputTable {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('InputTable component', () => {
    it('should render self and subcomponents', () => {
        const {enzymeWrapper} = setup()

        expect(enzymeWrapper.find('div.columns').length).toBe(3)
        expect(enzymeWrapper.find('div.column').length).toBe(3)

        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" INPUT")
        expect(enzymeWrapper.find('i').hasClass("fas fa-file-alt")).toBe(true)

        expect(enzymeWrapper.find('div.items-result').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("<Badge /> recordings left to be matched")
        expect(enzymeWrapper.find(Badge).exists()).toBe(true)

        expect(enzymeWrapper.find(Table).exists()).toBe(true)
        const tableProps = enzymeWrapper.find(Table).props()
        expect(tableProps.elements).toBe(INPUT_RECORD_LIST)
        expect(tableProps.selectedRecording).toBe(SELECTED_RECORDING)

    })

    it('should render self and subcomponents loading', () => {
        const {enzymeWrapper} = setupLoading()
        expect(enzymeWrapper.find(Spinner).exists()).toBe(true)

    })

    it('should render self and subcomponents empty list', () => {
        const {enzymeWrapper} = setupEmptyList()

        expect(enzymeWrapper.find('div.columns').length).toBe(3)
        expect(enzymeWrapper.find('div.column').length).toBe(3)

        expect(enzymeWrapper.find('div.table-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2.subtitle').text()).toBe(" INPUT")
        expect(enzymeWrapper.find('i').hasClass("fas fa-file-alt")).toBe(true)

        expect(enzymeWrapper.find('div.items-result').exists()).toBe(true)
        expect(enzymeWrapper.find('p').text()).toBe("<Badge /> recordings left to be matched")
        expect(enzymeWrapper.find(Badge).exists()).toBe(true)

        expect(enzymeWrapper.find('div.message').exists()).toBe(true)
        expect(enzymeWrapper.find('div.message-body').text()).toBe("Hooray! You matched all your recordings!")

    })

    it('should handle click', () => {
        const {enzymeWrapper, props} = setup()
        expect(props.selectRecording.mock.calls.length).toBe(0)
        const tableProps = enzymeWrapper.find(Table).props()
        tableProps.handleClick(SELECTED_RECORDING)
        expect(props.selectRecording.mock.calls.length).toBe(1)
    })


})
