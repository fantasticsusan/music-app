import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import sound_recording from '../files/sound_recordings.csv';
import sound_recording_input_report from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Col,
    Row,
    Alert,
    Button
} from 'react-bootstrap';
import AddSong from './AddSong';
import MatchTable from './MatchTable';
import ResultTable from './ResultTable';
import NavigationBar from './Navbar';
function SearchDB() {

    const [soundDatabase, setSoundDatabase] = useState([]);
    const [soundRecordingInput, setSoundRecordingInput] = useState([]);
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
            setSoundDatabase(res);
            setFilteredResults(res);
        });

        d3.csv(sound_recording_input_report, function (res) {
            setSoundRecordingInput(res);
        });

    }, []);

    useEffect(() => {
        var results = soundDatabase;
        results = soundDatabase.filter(function (song) {
            return song.title.toUpperCase().includes(filterSong.title.toUpperCase()) || song.artist.toUpperCase().includes(filterSong.artist.toUpperCase());
        });

        if (results.length === 0) {
            setEmptyError(true);
        } else {
            setEmptyError(false);
        }

        setFilteredResults(results);

    }, [filterSong, soundDatabase]);

    const handleChange = (e) => {
        clearManualInput();
        const value = e.target.value;
        setSelectInput(value);

        if (value !== "-1") {
            setFilterSong(soundRecordingInput[value]);
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
        setSoundDatabase([...soundDatabase, song]);
        setOpen(false);
        clearFilters();
        setSuccessfulMsg(true);
    }

    const clearSelectInput = () => {
        setFilteredResults(soundDatabase);
        setSelectInput('');
    }

    const clearManualInput = () => {
        setFilteredResults(soundDatabase);
        setManualInput('');
    }

    const clearFilters = () => {
        clearSelectInput();
        clearManualInput();
        setFilterSong({ 'title': '', 'artist': '' });

    }

    const match = (song) => {
        const index = soundDatabase.indexOf(song);
        setSoundRecordingMatched([...soundRecordingMatched, song]);

        soundDatabase.splice(index, 1);
        setSoundDatabase([...soundDatabase]);
    }
    const deleteMatch = (song) => {

        const index = soundRecordingMatched.indexOf(song);

        soundRecordingMatched.splice(index, 1);
        setSoundRecordingMatched([...soundRecordingMatched]);

        setSoundDatabase([...soundDatabase, song]);
    }

    return (
        <>
            <NavigationBar clearFilters={clearFilters} soundRecordingInputReport={soundRecordingInput} selectInput={selectInput} handleChange={handleChange} onTyping={onTyping} manualInput={manualInput} />
            <div className="container_div">
                {soundDatabase === undefined || soundDatabase.length === 0 ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <>

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
                        <Row>
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
        </>
    );
}
export default SearchDB;
