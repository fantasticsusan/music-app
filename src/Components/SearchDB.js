import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import sound_recording from '../files/sound_recordings.csv';
import sound_recording_input_report from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Col,
    Row
} from 'react-bootstrap';
import AddSong from './AddSong';
import MatchTable from './MatchTable';
import InputTable from './InputTable';
import ResultTable from './ResultTable';
function SearchDB() {

    const emptySong = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const [soundDatabase, setSoundDatabase] = useState([]);
    const [soundRecordingInput, setSoundRecordingInput] = useState([]);
    const [soundRecordingMatched, setSoundRecordingMatched] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterSong, setFilterSong] = useState(emptySong);

    /* Controled inputs */
    const [manualInput, setManualInput] = useState('');
    const [selectedSong, setSelectedSong] = useState(emptySong);


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
        setFilteredResults(results);

    }, [filterSong, soundDatabase]);



    const onTyping = (e) => {
        const value = e.target.value;
        var songObject = { 'title': value, 'artist': value };
        setManualInput(value);
        setFilterSong(songObject);
    }

    const submitSong = (song) => {
        setSoundDatabase([...soundDatabase, song]);
        setFilterSong(emptySong)
        setManualInput('');
    }


    const match = () => {
        const index = soundRecordingInput.indexOf(selectedSong);
        setSoundRecordingMatched([...soundRecordingMatched, selectedSong]);

        soundRecordingInput.splice(index, 1);
        setSoundRecordingInput([...soundRecordingInput]);
        setSelectedSong(emptySong);
        setFilterSong(emptySong)

    }

    const deleteMatch = (song) => {
        const index = soundRecordingMatched.indexOf(song);

        soundRecordingMatched.splice(index, 1);
        setSoundRecordingMatched([...soundRecordingMatched]);

        setSoundRecordingInput([...soundRecordingInput, song]);
    }

    const onSelectedRow = (song) => {
        setSelectedSong(song);
        setFilterSong(song);
    }

    return (
        <>
            <div className="container_div">
                {soundDatabase === undefined || soundDatabase.length === 0 ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <>

                        <AddSong msg="Add new song to database" submitSong={submitSong} paramSong={{ 'title': '', 'artist': '', 'isrc': '', 'duration': '' }} />
                        <Row>
                            <Col>
                                <InputTable onSelectedRow={onSelectedRow} soundRecordingInputReport={soundRecordingInput} />
                            </Col>
                            <Col>
                                <ResultTable selectedSong={selectedSong} submitSong={submitSong} filteredResults={filteredResults} match={match}  onTyping={onTyping} manualInput={manualInput} />
                            </Col>

                        </Row>
                        <Row>
                            <MatchTable soundRecordingMatched={soundRecordingMatched} deleteMatch={deleteMatch} />
                        </Row>
                    </>
                }
            </div>
        </>
    );
}
export default SearchDB;
