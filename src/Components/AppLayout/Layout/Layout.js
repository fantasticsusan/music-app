import React, {useState, useEffect} from 'react'
import * as d3 from "d3"
import soundRecordingFile from '../../../files/sound_recordings.csv'
import soundRecordingInputReportFile from '../../../files/sound_recordings_input_report.csv'
import {
    Col,
    Row
} from 'react-bootstrap'
import {AddRecording, MatchTable, InputTable, ResultTable} from '../../AppLayout'
import {sortByArtist} from '../../../utils/functions'
import {EMPTY_FIELD, EMPTY_INPUT, EMPTY_RECORDING} from '../../../utils/const'
import {Toast, Spinner} from '../../Common'

function Layout() {

    let [soundDatabase, setSoundDatabase] = useState([])
    soundDatabase = sortByArtist(soundDatabase)

    let [soundRecordingInput, setSoundRecordingInput] = useState([])
    soundRecordingInput = sortByArtist(soundRecordingInput)

    let [soundRecordingMatched, setSoundRecordingMatched] = useState([])
    soundRecordingMatched = sortByArtist(soundRecordingMatched)

    const [filteredResults, setFilteredResults] = useState([])
    const [filterRecording, setFilterRecording] = useState(EMPTY_RECORDING)

    /* Controled inputs */
    const [manualInput, setManualInput] = useState(EMPTY_INPUT)
    const [selectedRecording, setSelectedRecording] = useState(EMPTY_RECORDING)

    /* Toast */
    const [open, setOpen] = useState(false)
    const [toast, setToast] = useState({'recording': EMPTY_RECORDING, 'msg': EMPTY_FIELD})

    useEffect(() => {
        d3.csv(soundRecordingFile, function (response) {
            setSoundDatabase(response)
            setFilteredResults(response)
        })

        d3.csv(soundRecordingInputReportFile, function (response) {
            setSoundRecordingInput(response)
        })

    }, [])

    useEffect(() => {
        const results = soundDatabase.filter(function (recording) {
            return recording.title.toUpperCase().includes(filterRecording.title.toUpperCase()) || recording.artist.toUpperCase().includes(filterRecording.artist.toUpperCase()) || recording.isrc.toUpperCase().includes(filterRecording.isrc.toUpperCase()) || recording.duration.includes(filterRecording.duration)
        })
        setFilteredResults(results)

    }, [filterRecording, soundDatabase])

    useEffect(() => {
        const results = soundDatabase.filter(function (recording) {
            return (recording.isrc !== "" && selectedRecording.isrc !== "" && recording.isrc.toUpperCase() === selectedRecording.isrc.toUpperCase()) || ((recording.title.toUpperCase().includes(selectedRecording.title.toUpperCase()) || selectedRecording.title.toUpperCase().includes(recording.title.toUpperCase())) && (recording.artist.toUpperCase().includes(selectedRecording.artist.toUpperCase()) || selectedRecording.artist.toUpperCase().includes(recording.artist.toUpperCase())))
        })
        setFilteredResults(results)

    }, [selectedRecording, soundDatabase])

    const onTyping = (e) => {
        const value = e.target.value
        let recordingObject = {'title': value, 'artist': value, 'isrc': value, 'duration': value}
        setManualInput(value)
        setFilterRecording(recordingObject)
    }

    const submitRecording = (recording) => {
        setOpen(true)
        setSoundDatabase([...soundDatabase, recording])
        setFilterRecording(EMPTY_RECORDING)
        setManualInput(EMPTY_INPUT)
        setToast({'recording': recording, 'msg': 'databaseSuccess'})
    }

    const match = (registry) => {
        const index = soundRecordingInput.indexOf(registry.recording)
        setSoundRecordingMatched([...soundRecordingMatched, registry])

        soundRecordingInput.splice(index, 1)
        setSoundRecordingInput([...soundRecordingInput])

        setSelectedRecording(EMPTY_RECORDING)
        setFilterRecording(EMPTY_RECORDING)
        setManualInput(EMPTY_INPUT)
        setToast({'recording': registry.recording, 'msg': 'matchSuccess'})
        setOpen(true)

    }

    const deleteMatch = (registry) => {
        const index = soundRecordingMatched.indexOf(registry)

        soundRecordingMatched.splice(index, 1)
        setSoundRecordingMatched([...soundRecordingMatched])

        setSoundRecordingInput([...soundRecordingInput, registry.recording])
        setSelectedRecording(EMPTY_RECORDING)
        setFilterRecording(EMPTY_RECORDING)
        setManualInput(EMPTY_INPUT)
    }

    const onSelectedRow = (recording) => {
        setManualInput(EMPTY_INPUT)
        setFilterRecording(EMPTY_RECORDING)
        setSelectedRecording(recording)
    }

    return (
        <div aria-live="polite" aria-atomic="true" className="body-container">
            {soundDatabase === undefined || soundDatabase.length === 0 ?
                <Spinner/>
                :
                <>
                    <Row>
                        <AddRecording submitRecording={submitRecording} selectedRecording={selectedRecording}/>
                    </Row>
                    <Row>
                        <Col xs={12} lg={6}>
                            <InputTable selectedRecording={selectedRecording} onSelectedRow={onSelectedRow}
                                        soundRecordingInputReport={soundRecordingInput}/>
                        </Col>
                        <Col xs={12} lg={6}>
                            <ResultTable soundDatabase={soundDatabase} selectedRecording={selectedRecording}
                                         filteredResults={filteredResults} match={match} onTyping={onTyping}
                                         manualInput={manualInput}/>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12}>
                            <MatchTable soundRecordingMatched={soundRecordingMatched} deleteMatch={deleteMatch}/>
                        </Col>
                    </Row>
                    <Toast setOpen={setOpen} open={open} recording={toast.recording} msg={toast.msg}/>
                </>
            }
        </div>
    )
}

export default Layout
