import ActionTypes from './ActionTypes'
import soundRecordingFile from '../Files/sound_recordings.csv';
import * as d3 from "d3"
import soundRecordingInputReportFile from "../Files/sound_recordings_input_report.csv";

export function fetchInputRecordings() {
    return (dispatch) => {
        dispatch(requestInputRecordings())
        return d3.csv(soundRecordingInputReportFile, function (response) {
            dispatch(loadInputRecordings(response))
        })
    }
}

export function fetchDatabaseRecordings() {
    return (dispatch) => {
        dispatch(requestDBRecordings())
        return d3.csv(soundRecordingFile, function (response) {
            dispatch(loadDBRecordings(response))
        })

    }
}

export function setSelectedRecording(recording) {
    return (dispatch) => {
        dispatch(selectRecording(recording));
    }
}

export function matchRecording(inputRecording, databaseRecording) {
    return (dispatch) => {
        dispatch(matchSound(inputRecording, databaseRecording))
    }
}

export function unmatchRecording(recording) {
    return (dispatch) => {
        dispatch(unmatchSound(recording))
    }
}

export function addRecordingToDB(recording) {
    return (dispatch) => {
        dispatch(addRecording(recording))
    }
}


function addRecording(recording) {
    return {
        type: ActionTypes.ADD_DB_RECORDINGS,
        recording: recording
    }
}

function requestInputRecordings() {
    return {
        type: ActionTypes.REQUEST_INPUT_RECORDINGS
    }
}

function matchSound(inputRecording, databaseRecording) {
    return {
        type: ActionTypes.MATCH_RECORDING,
        inputRecording: inputRecording,
        databaseRecording: databaseRecording
    }
}

function unmatchSound(recording) {
    return {
        type: ActionTypes.UNMATCH_RECORDING,
        recording: recording,
    }
}

function loadInputRecordings(payload) {
    return {
        type: ActionTypes.LOAD_INPUT_RECORDINGS,
        payload
    }
}

function requestDBRecordings() {
    return {
        type: ActionTypes.REQUEST_DB_RECORDINGS
    }
}

function loadDBRecordings(payload) {
    return {
        type: ActionTypes.LOAD_DB_RECORDINGS,
        payload
    }
}

export function setSearchText(text) {
    return {
        type: ActionTypes.SEARCH_RECORDING,
        text
    }
}

function selectRecording(recording) {
    return {
        type: ActionTypes.SELECT_RECORDING,
        recording
    }
}
