import actionTypes from '../Actions/ActionTypes'
import reducer from './Recordings'
import {EMPTY_INPUT, EMPTY_RECORDING} from "../Utils/const";
import {sortByArtist} from "../Utils/functions";

const INITIAL_STATE = {
    inputRecordings: {
        isLoading: false,
        data: []
    },
    matchRecordings: [],
    databaseRecordings: {
        isLoading: false,
        data: []
    },
    searchText: EMPTY_INPUT,
    selectedRecording: EMPTY_RECORDING
}

const RECORDING = {title: 'Test recording', artist: 'Test artist', isrc: "654443", duration: "433"}
const SEARCH_TEXT = "Search text"
const INPUT_RECORDING = {title: 'Input recording', artist: 'Test artist', isrc: "654443", duration: "433"}
const DB_RECORDING = {title: 'DB recording', artist: 'Test artist', isrc: "654443", duration: "433"}
const INPUT_RECORDING_LIST = [{title: 'Input recording', artist: 'Test artist', isrc: "654443", duration: "433"}]
const DB_RECORDING_LIST = [{title: 'DB recording', artist: 'Test artist', isrc: "654443", duration: "433"}]


describe('Recordings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}))
            .toEqual(INITIAL_STATE)
    })

    it('should handle REQUEST_INPUT_RECORDINGS', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.REQUEST_INPUT_RECORDINGS,
            })
        ).toEqual({
                ...INITIAL_STATE,
                inputRecordings: {
                    isLoading: true,
                    data: []
                }
            }
        )
    })

    it('should load input recordings', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.LOAD_INPUT_RECORDINGS,
                payload: INPUT_RECORDING_LIST
            })
        ).toEqual({
                ...INITIAL_STATE,
                inputRecordings: {
                    isLoading: false,
                    data: sortByArtist(INPUT_RECORDING_LIST)
                }
            }
        )
    })

    it('should handle REQUEST_DB_RECORDINGS', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.REQUEST_DB_RECORDINGS,
            })
        ).toEqual({
                ...INITIAL_STATE,
                databaseRecordings: {
                    isLoading: true,
                    data: []
                }
            }
        )
    })

    it('should load DB recordings', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.LOAD_DB_RECORDINGS,
                payload: DB_RECORDING_LIST
            })
        ).toEqual({
                ...INITIAL_STATE,
                databaseRecordings: {
                    isLoading: false,
                    data: sortByArtist(DB_RECORDING_LIST)
                }
            }
        )
    })

    it('should select recording', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.SELECT_RECORDING,
                recording: RECORDING
            })
        ).toEqual({
                ...INITIAL_STATE,
                selectedRecording: RECORDING
            }
        )
    })

    it('should set search text', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.SEARCH_RECORDING,
                text: SEARCH_TEXT
            })
        ).toEqual({
                ...INITIAL_STATE,
                searchText: SEARCH_TEXT
            }
        )
    })

    it('should match recordings', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.MATCH_RECORDING,
                inputRecording: INPUT_RECORDING,
                databaseRecording: DB_RECORDING,
            })
        ).toEqual({
                ...INITIAL_STATE,
                searchText: EMPTY_INPUT,
                selectedRecording: EMPTY_RECORDING,
                inputRecordings: {
                    ...INITIAL_STATE.inputRecordings,
                    data: INITIAL_STATE.inputRecordings.data.filter(recording => recording !== INITIAL_STATE.selectedRecording),
                },
                matchRecordings: sortByArtist([
                    ...INITIAL_STATE.matchRecordings,
                    {
                        'title': INPUT_RECORDING.title,
                        'artist': INPUT_RECORDING.artist,
                        'isrc': INPUT_RECORDING.isrc,
                        'duration': INPUT_RECORDING.duration,
                        'matchedRecording': DB_RECORDING
                    }
                ])
            }
        )
    })

    it('should unmatch recordings', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.UNMATCH_RECORDING,
                recording: RECORDING,
            })
        ).toEqual({
                ...INITIAL_STATE,
                searchText: EMPTY_INPUT,
                selectedRecording: EMPTY_RECORDING,
                matchRecordings: INITIAL_STATE.matchRecordings.filter(recording => recording !== RECORDING),
                inputRecordings: {
                    ...INITIAL_STATE.inputRecordings,
                    data: sortByArtist([
                        ...INITIAL_STATE.inputRecordings.data,
                        {
                            'title': RECORDING.title,
                            'artist': RECORDING.artist,
                            'isrc': RECORDING.isrc,
                            'duration': RECORDING.duration,
                        }
                    ])
                }
            }
        )
    })

    it('should add recording to DB', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: actionTypes.ADD_DB_RECORDINGS,
                recording: RECORDING
            })
        ).toEqual({
                ...INITIAL_STATE,
                databaseRecordings: {
                    ...INITIAL_STATE.databaseRecordings,
                    data: sortByArtist([
                        ...INITIAL_STATE.databaseRecordings.data,
                        RECORDING
                    ])
                }
            }
        )
    })
})
