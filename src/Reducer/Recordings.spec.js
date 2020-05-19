import actionTypes from '../Actions/ActionTypes'
import reducer from './Recordings'
import {sortByArtist} from "../Utils/functions";
import {RECORDING, SEARCH_TEXT, EMPTY_INPUT, EMPTY_RECORDING, INPUT_RECORD, DB_RECORD, INPUT_RECORD_LIST, DB_RECORD_LIST} from "../Utils/constTest";

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
                payload: INPUT_RECORD_LIST
            })
        ).toEqual({
                ...INITIAL_STATE,
                inputRecordings: {
                    isLoading: false,
                    data: sortByArtist(INPUT_RECORD_LIST)
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
                payload: DB_RECORD_LIST
            })
        ).toEqual({
                ...INITIAL_STATE,
                databaseRecordings: {
                    isLoading: false,
                    data: sortByArtist(DB_RECORD_LIST)
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
                inputRecording: INPUT_RECORD,
                databaseRecording: DB_RECORD,
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
                        'title': INPUT_RECORD.title,
                        'artist': INPUT_RECORD.artist,
                        'isrc': INPUT_RECORD.isrc,
                        'duration': INPUT_RECORD.duration,
                        'matchedRecording': DB_RECORD
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
