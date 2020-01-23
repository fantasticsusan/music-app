import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import sound_recording from '../files/sound_recordings.csv';
import sound_recording_input_report from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Form,
    Col,
    Row,
    Alert,
    Button
} from 'react-bootstrap';
import AddSong from './AddSong';
import MatchTable from './MatchTable';
import ResultTable from './ResultTable';

function SearchDB() {

    const [soundRecording, setSoundRecording] = useState([]);
    const [soundRecordingInputReport, setSoundRecordingInputRecord] = useState([]);
    const [soundRecordingMatched, setSoundRecordingMatched] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterSong, setFilterSong] = useState({ 'title': '', 'artist': '' });

    /* Messages and errors */
    const [emptyError, setEmptyError] = useState(false);
    const [successfulMsg, setSuccessfulMsg] = useState(false);

    /* Collapse */
    const [open, setOpen] = useState(false);

    /* Controled inputs */
    const [manualInput, setManualInput] = useState('');
    const [selectInput, setSelectInput] = useState('-1');

    useEffect(() => {
        d3.csv(sound_recording, function (res) {
            setSoundRecording(res);
            setFilteredResults(res);
        });

        d3.csv(sound_recording_input_report, function (res) {
            setSoundRecordingInputRecord(res);
        });

    }, []);

    useEffect(() => {
        console.log("Calling use effect");
        var result = soundRecording;
        result = soundRecording.filter(function (song) {
            return song.title.toUpperCase().includes(filterSong.title.toUpperCase()) || song.artist.toUpperCase().includes(filterSong.artist.toUpperCase());
        });
        if (result.length === 0) {
            setEmptyError(true);
        } else {
            setEmptyError(false);
        }

        setFilteredResults(result);

    }, [filterSong, soundRecording]);

    const renderOptions = () => {
        var result = [];
        for (var i = 0; i < soundRecordingInputReport.length; i++) {
            const song = soundRecordingInputReport[i];
            result.push(<option value={i}>{song.title} - {song.artist}</option>);
        }
        return result;
    }

    const handleChange = (e) => {
        clearManualInput();
        const value = e.target.value;

        setSelectInput(value);

        if (value !== "-1") {
            setFilterSong(soundRecordingInputReport[value]);
        } else {
            setFilterSong({ 'title': '', 'artist': '' });
        }
    }


    const onTyping = (e) => {
        clearSelectInput();
        const value = e.target.value;
        var songObject = { 'title': value, 'artist': value };
        setManualInput(value);
        setFilterSong(songObject);
    }

    const submitSong = (song) => {
        setSoundRecordingInputRecord([...soundRecording, song]);
        setOpen(false);
        clearFilters();
        setSuccessfulMsg(true);
    }

    const clearSelectInput = () => {
        setFilteredResults(soundRecording);
        setSelectInput('');
    }

    const clearManualInput = () => {
        setFilteredResults(soundRecording);
        setManualInput('');
    }

    const clearFilters = () => {
        clearSelectInput();
        clearManualInput();
        setFilterSong({ 'title': '', 'artist': '' });

    }

    const match = (song, index) => {
        setSoundRecordingMatched([...soundRecordingMatched, song]);

        soundRecording.splice(index, 1);
        setSoundRecording([...soundRecording]);
    }
    const deleteMatch = (song, index) => {
        soundRecordingMatched.splice(index, 1);
        setSoundRecordingMatched([...soundRecordingMatched]);

        setSoundRecording([...soundRecording, song]);
    }

    return (
        <div className="container_div">
            {soundRecording === undefined || soundRecording.length === 0 ?
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <>
                    <Row>
                        <Col>
                            <div className="center">
                                <h2 className="subtitle"><i className="fas fa-search"></i> SEARCH</h2>
                            </div>
                            <Form>
                                <Form.Group controlId="soundRecordingSelect">
                                    <Form.Label>Please select one song</Form.Label>
                                    <Form.Control value={selectInput} as="select" onChange={handleChange}>
                                        <option value="-1">Choose one...</option>
                                        {renderOptions()}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="soundRecordingSelect">
                                    <Form.Label>Or manually type a song</Form.Label>
                                    <Form.Control value={manualInput} placeholder="Type title or artist song ..." onChange={onTyping} />
                                </Form.Group>
                                <Button variant="secondary" onClick={() => clearFilters()}><i className="fas fa-times-circle"></i> Clear filters</Button>

                            </Form>
                            <hr />
                            <Button variant="primary" onClick={() => setOpen(!open)}><i className="fas fa-plus-circle"></i> Add a song manually</Button>
                            <AddSong open={open} submitSong={submitSong} />
                            {successfulMsg === true ?
                                <div class="alertSucess">
                                    <Alert variant="success" onClose={() => setSuccessfulMsg(false)} dismissible>
                                        <Alert.Heading>BOOM SHAKALAKA!</Alert.Heading>
                                        <p>Your song was successfully added!</p>
                                    </Alert>
                                </div>
                                :
                                ''
                            }
                        </Col>
                        <Col>
                            <div className="center">
                                <h2 className="subtitle">Results</h2>
                            </div>
                            {emptyError === true ?
                                <Alert variant="danger">Sorry, we couldn't find any song that matches.</Alert>
                                :
                                <ResultTable filteredResults={filteredResults} match={match} />
                            }

                        </Col>
                        <Col>
                            <MatchTable soundRecordingMatched={soundRecordingMatched} deleteMatch={deleteMatch} />
                        </Col>
                    </Row>
                </>
            }
        </div>
    );
}
export default SearchDB;
