import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Layout from './Layout'
import {AddRecordingDB, InputRecordingTable, MatchedRecordingTable, ResultRecordingTable} from '../../../index'

Enzyme.configure({adapter: new Adapter()})

describe('Layout component', () => {
    it('should render self and subcomponents', () => {
        const enzymeWrapper = shallow(<Layout />)
        expect(enzymeWrapper.find('div.body-container').exists()).toBe(true)
        expect(enzymeWrapper.find('div.columns').length).toBe(3)
        expect(enzymeWrapper.find('div.column').length).toBe(4)
        expect(enzymeWrapper.find(AddRecordingDB).exists()).toBe(true)
        expect(enzymeWrapper.find(InputRecordingTable).exists()).toBe(true)
        expect(enzymeWrapper.find(ResultRecordingTable).exists()).toBe(true)
        expect(enzymeWrapper.find(MatchedRecordingTable).exists()).toBe(true)
    })


})
