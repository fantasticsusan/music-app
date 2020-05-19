import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddRecordingDB from './AddRecordingDB'
import {SELECTED_RECORDING} from '../../../../Utils/constTest'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const props = {
        selectedRecording: SELECTED_RECORDING,
        addRecordingToDB: jest.fn(),
    }

    const enzymeWrapper = shallow(<AddRecordingDB {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('AddRecordingDB component', () => {
    it('should render self and subcomponents', () => {
        const {enzymeWrapper} = setup()

        //Button
        expect(enzymeWrapper.find('div.has-text-right').exists()).toBe(true)
        const addButton = enzymeWrapper.find('button.button-add-recording').at(1)
        expect(addButton.text()).toBe("Add recording to database")

        //Modal
        expect(enzymeWrapper.find('div.modal').exists()).toBe(true)
        expect(enzymeWrapper.find('div.modal-background').exists()).toBe(true)
        expect(enzymeWrapper.find('div.modal-content').exists()).toBe(true)
        expect(enzymeWrapper.find('div.modal-container').exists()).toBe(true)

        //Modal header
        expect(enzymeWrapper.find('div.modal-title-header').exists()).toBe(true)
        expect(enzymeWrapper.find('h2').hasClass('modal-title text-center')).toBe(true)
        expect(enzymeWrapper.find('h2').text()).toBe('New recording')

        //Modal body
        expect(enzymeWrapper.find('form.form-container').exists()).toBe(true)

        //Copy recording data
        expect(enzymeWrapper.find('div.copy-song-container').exists()).toBe(true)
        expect(enzymeWrapper.find('div.copy-song-container').exists()).toBe(true)
        expect(enzymeWrapper.find("button.button-copy-data").text()).toBe("Copy data from selected recording")


        //Form inputs
        expect(enzymeWrapper.find('div.columns').length).toBe(2)
        expect(enzymeWrapper.find('div.column').length).toBe(4)
        expect(enzymeWrapper.find('div.field').length).toBe(4)

        const titleInputProps = enzymeWrapper.find('input[name="title"]').props()

        expect(titleInputProps.name).toBe("title")
        expect(titleInputProps.required).toBe(true)
        expect(titleInputProps.placeholder).toBe("Fantastic Baby")
        expect(titleInputProps.className).toBe("input")

        const artistInputProps = enzymeWrapper.find('input[name="artist"]').props()

        expect(artistInputProps.name).toBe("artist")
        expect(artistInputProps.required).toBe(true)
        expect(artistInputProps.placeholder).toBe("BIGBANG")
        expect(artistInputProps.className).toBe("input")

        const isrcInputProps = enzymeWrapper.find('input[name="isrc"]').props()

        expect(isrcInputProps.name).toBe("isrc")
        expect(isrcInputProps.placeholder).toBe("GBA9234565")
        expect(isrcInputProps.className).toBe("input")

        const durationInputProps = enzymeWrapper.find('input[name="duration"]').props()

        expect(durationInputProps.name).toBe("duration")
        expect(durationInputProps.placeholder).toBe("323")
        expect(durationInputProps.className).toBe("input")
        expect(durationInputProps.type).toBe("number")

        //Button submit
        expect(enzymeWrapper.find('div.center').exists()).toBe(true)
        expect(enzymeWrapper.find('button[type="submit"]').text()).toBe("Add recording to database")

        //Close modal X
        expect(enzymeWrapper.find('button.modal-close').exists()).toBe(true)
    })

    it('should handle submit', () => {
        const {enzymeWrapper, props} = setup()
        expect(props.addRecordingToDB.mock.calls.length).toBe(0)
        const form = enzymeWrapper.find('form')
        form.simulate("submit", { preventDefault () {} })
        expect(props.addRecordingToDB.mock.calls.length).toBe(1)
    })


})
