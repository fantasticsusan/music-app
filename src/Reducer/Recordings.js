import ActionTypes from "../Actions/ActionTypes"
import {EMPTY_INPUT, EMPTY_RECORDING} from "../Utils/const";

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

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_INPUT_RECORDINGS:
            return {
                ...state,
                inputRecordings: {
                    isLoading: true,
                    data: []
                }
            }
        case ActionTypes.LOAD_INPUT_RECORDINGS:
            return {
                ...state,
                inputRecordings: {
                    isLoading: false,
                    data: action.payload
                }
            }

        case ActionTypes.REQUEST_DB_RECORDINGS:
            return {
                ...state,
                databaseRecordings: {
                    isLoading: true,
                    data: []
                }
            }
        case ActionTypes.LOAD_DB_RECORDINGS:
            return {
                ...state,
                databaseRecordings: {
                    isLoading: false,
                    data: action.payload
                }
            }
        case ActionTypes.SELECT_RECORDING:
            return {
                ...state,
                selectedRecording: action.recording
            }

        case ActionTypes.SEARCH_RECORDING:
            return {
                ...state,
                searchText: action.text,
            }

        case ActionTypes.MATCH_RECORDING:
            return {
                ...state,
                searchText: EMPTY_INPUT,
                selectedRecording: EMPTY_RECORDING,
                inputRecordings: {
                    ...state.inputRecordings,
                    data: state.inputRecordings.data.filter(recording => recording !== state.selectedRecording),
                },
                matchRecordings: [
                    ...state.matchRecordings,
                    {
                        'title': action.inputRecording.title,
                        'artist': action.inputRecording.artist,
                        'isrc': action.inputRecording.isrc,
                        'duration': action.inputRecording.duration,
                        'matchedRecording': action.databaseRecording
                    }
                ]
            }

        case ActionTypes.UNMATCH_RECORDING:
            return {
                ...state,
                searchText: EMPTY_INPUT,
                selectedRecording: EMPTY_RECORDING,
                matchRecordings: state.matchRecordings.filter(recording => recording !== action.recording),
                inputRecordings: {
                    ...state.inputRecordings,
                    data: [
                        ...state.inputRecordings.data,
                        {
                            'title': action.recording.title,
                            'artist': action.recording.artist,
                            'isrc': action.recording.isrc,
                            'duration': action.recording.duration,
                        }
                    ]
                }
            }

        case ActionTypes.ADD_DB_RECORDINGS:
            return {
                ...state,
                databaseRecordings: {
                    ...state.databaseRecordings,
                    data: [
                        ...state.databaseRecordings.data,
                        action.recording
                    ]
                }

            }
        default:
            return state
    }
}

export default reducer
