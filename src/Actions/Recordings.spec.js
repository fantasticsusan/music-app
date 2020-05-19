import * as actions from './Recordings'
import ActionTypes from './ActionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const store = mockStore()

const RECORDING = {title: 'Test', artist: 'Test artist', isrc: "654443", duration: "433"}
const SEARCH_TEXT = "Search test"
const INPUT_RECORDING = {title: 'Input recording', artist: 'Test artist', isrc: "654443", duration: "433"}
const DB_RECORDING = {title: 'DB recording', artist: 'Test artist', isrc: "654443", duration: "433"}

describe('recording actions', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions()
    })

    it('addRecordingToDB should create ADD_DB_RECORDINGS action', () => {
        expect(actions.addRecordingToDB(RECORDING)).toEqual({
            type: ActionTypes.ADD_DB_RECORDINGS,
            recording: RECORDING
        })
    })

    it('matchRecording should create MATCH_RECORDING action', () => {
        expect(actions.matchRecording(INPUT_RECORDING, DB_RECORDING)).toEqual({
            type: ActionTypes.MATCH_RECORDING,
            inputRecording: INPUT_RECORDING,
            databaseRecording: DB_RECORDING,
        })
    })

    it('unmatchRecording should create UNMATCH_RECORDING action', () => {
        expect(actions.unmatchRecording(RECORDING)).toEqual({
            type: ActionTypes.UNMATCH_RECORDING,
            recording: RECORDING,
        })
    })

    it('setSelectedRecording should create SELECT_RECORDING action', () => {
        expect(actions.setSelectedRecording(RECORDING)).toEqual({
            type: ActionTypes.SELECT_RECORDING,
            recording: RECORDING,
        })
    })

    it('setSearchText should create SEARCH_RECORDING action', () => {
        expect(actions.setSearchText(SEARCH_TEXT)).toEqual({
            type: ActionTypes.SEARCH_RECORDING,
            text: SEARCH_TEXT,
        })
    })

    it('creates REQUEST_INPUT_RECORDINGS when requesting input recordings', () => {

        const expectedActions = [
            {type: ActionTypes.REQUEST_INPUT_RECORDINGS}
        ]

        store.dispatch(actions.fetchInputRecordings())
        expect(store.getActions()).toEqual(expectedActions)

    })

    it('creates REQUEST_DB_RECORDINGS when requesting db recordings', () => {

        const expectedActions = [
            {type: ActionTypes.REQUEST_DB_RECORDINGS}
        ]

        store.dispatch(actions.fetchDatabaseRecordings())
        expect(store.getActions()).toEqual(expectedActions)

    })
})
