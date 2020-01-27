import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import soundRecordingFile from '../files/sound_recordings.csv';
import soundRecordingInputReportFile from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Col,
    Row,
    Toast
} from 'react-bootstrap';
import AddSong from './AddSong';
import MatchTable from './MatchTable';
import InputTable from './InputTable';
import ResultTable from './ResultTable';

function Home() {

    const emptySong = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const [soundDatabase, setSoundDatabase] = useState([]);
    soundDatabase.sort(function (a, b) {
        if (a.artist < b.artist) { return -1; }
        if (a.artist > b.artist) { return 1; }
        if (a.artist === b.artist) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
        }
        return 0;
    })
    const [soundRecordingInput, setSoundRecordingInput] = useState([]);
    soundRecordingInput.sort(function (a, b) {
        if (a.artist < b.artist) { return -1; }
        if (a.artist > b.artist) { return 1; }
        if (a.artist === b.artist) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
        }
        return 0;
    })
    const [soundRecordingMatched, setSoundRecordingMatched] = useState([]);
    soundRecordingMatched.sort(function (a, b) {
        if (a.artist < b.artist) { return -1; }
        if (a.artist > b.artist) { return 1; }
        if (a.artist === b.artist) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
        }
        return 0;
    })
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterSong, setFilterSong] = useState(emptySong);

    /* Controled inputs */
    const [manualInput, setManualInput] = useState('');
    const [selectedSong, setSelectedSong] = useState(emptySong);

    /* Toast */
    const [open, setOpen] = useState(false);
    const [toastSong, setToastSong] = useState(emptySong);


    useEffect(() => {
        d3.csv(soundRecordingFile, function (response) {
            setSoundDatabase(response);
            setFilteredResults(response);
        });

        d3.csv(soundRecordingInputReportFile, function (response) {
            setSoundRecordingInput(response);
        });

    }, []);

    useEffect(() => {
        const results = soundDatabase.filter(function (song) {
            return song.title.toUpperCase().includes(filterSong.title.toUpperCase()) || song.artist.toUpperCase().includes(filterSong.artist.toUpperCase()) || song.isrc.toUpperCase().includes(filterSong.isrc.toUpperCase()) || song.duration.includes(filterSong.duration);
        });
        setFilteredResults(results);

    }, [filterSong, soundDatabase]);

    useEffect(() => {
        const results = soundDatabase.filter(function (song) {
            return (song.title.toUpperCase().includes(selectedSong.title.toUpperCase()) || selectedSong.title.toUpperCase().includes(song.title.toUpperCase())) && (song.artist.toUpperCase().includes(selectedSong.artist.toUpperCase()) || selectedSong.artist.toUpperCase().includes(song.artist.toUpperCase())) && (song.isrc.toUpperCase().includes(selectedSong.isrc.toUpperCase()) || selectedSong.isrc.toUpperCase().includes(song.isrc.toUpperCase()));
        });
        setFilteredResults(results);

    }, [selectedSong, soundDatabase]);



    const onTyping = (e) => {
        const value = e.target.value;
        let songObject = { 'title': value, 'artist': value, 'isrc': value, 'duration': value };
        setManualInput(value);
        setFilterSong(songObject);
    }

    const submitSong = (song) => {
        setOpen(true);
        setSoundDatabase([...soundDatabase, song]);
        setFilterSong(emptySong)
        setManualInput('');
        setToastSong(song);
    }


    const match = () => {
        const index = soundRecordingInput.indexOf(selectedSong);
        setSoundRecordingMatched([...soundRecordingMatched, selectedSong]);

        soundRecordingInput.splice(index, 1);
        setSoundRecordingInput([...soundRecordingInput]);

        setSelectedSong(emptySong);
        setFilterSong(emptySong);
        setManualInput('');

    }

    const deleteMatch = (song) => {
        const index = soundRecordingMatched.indexOf(song);

        soundRecordingMatched.splice(index, 1);
        setSoundRecordingMatched([...soundRecordingMatched]);

        setSoundRecordingInput([...soundRecordingInput, song]);
        setSelectedSong(emptySong);
        setFilterSong(emptySong);
        setManualInput('');
    }

    const onSelectedRow = (song) => {
        setManualInput('');
        setFilterSong(emptySong);
        setSelectedSong(song);
    }

    return (
        <div aria-live="polite" aria-atomic="true" className="body-container">
            {soundDatabase === undefined || soundDatabase.length === 0 ?
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <>
                    <Row>
                        <AddSong msg="Add song to database" submitSong={submitSong} paramSong={emptySong} />
                    </Row>
                    <Row>
                        <Col xs={12} lg={6}>
                            <InputTable selectedSong={selectedSong} onSelectedRow={onSelectedRow} soundRecordingInputReport={soundRecordingInput} />
                        </Col>
                        <Col xs={12} lg={6}>
                            <ResultTable soundDatabase={soundDatabase} selectedSong={selectedSong} submitSong={submitSong} filteredResults={filteredResults} match={match} onTyping={onTyping} manualInput={manualInput} />
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12}>
                            <MatchTable soundRecordingMatched={soundRecordingMatched} deleteMatch={deleteMatch} />
                        </Col>
                    </Row>
                    <Toast className="toast-success" onClose={() => setOpen(false)} show={open} delay={3000} autohide>
                        <div className="toast-success-body">
                            <span className="bolder">BOOM SHAKALAKA!</span><br />
                            The song {toastSong.title} by {toastSong.artist} was successfully added!
                            </div>
                    </Toast>
                </>
            }
        </div>
    );
}
export default Home;
