import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import sound_recording from '../files/sound_recordings.csv';
import sound_recording_input_report from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Form,
    Table,
    Col,
    Row,
    Alert,
    Button
} from 'react-bootstrap';
import AddSong from './AddSong';

function SearchDB() {

    const [soundRecording, setSoundRecording] = useState([]);
    const [soundRecordingInputReport, setSoundRecordingInputRecord] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const [emptyError, setEmptyError] = useState(false);

    const [open, setOpen] = useState(false);
    const [filterSong, setFilterSong] = useState({ 'title': '', 'artist': '' });
    
    const [manualInput, setManualInput] = useState('');
    const [selectInput, setSelectInput] = useState('-1');

    useEffect(() => {
        d3.csv(sound_recording, function (res) {
            setSoundRecording(res);
        });

        d3.csv(sound_recording_input_report, function (res) {
            setSoundRecordingInputRecord(res);
            setFilteredResults(res);
        });
    }, []);

    useEffect(() => {

        var result = soundRecordingInputReport;
        result = soundRecordingInputReport.filter(function (song) {
            return song.title.includes(filterSong.title) || song.artist.includes(filterSong.artist);
        });
        if (result.length === 0) {
            setEmptyError(true);
        } else {
            setEmptyError(false);
        }
        setFilteredResults(result);

    }, [filterSong, soundRecordingInputReport]);


    const handleChange = (e) => {
        clearManualInput();
        const value = e.target.value;

        setSelectInput(value);

        if (value !== "-1") {
            setFilterSong(soundRecording[value]);
        }
    }

    const renderOptions = () => {
        var result = [];
        for (var i = 0; i < soundRecording.length; i++) {
            const song = soundRecording[i];
            result.push(<option value={i}>{song.title} - {song.artist}</option>);
        }
        return result;
    }


    const onTyping = (e) => {
        clearSelectInput();
        const value = e.target.value;
        var songObject = { 'title': value, 'artist': value };
        setManualInput(value);
        setFilterSong(songObject);
    }

    const submitSong = (song) => {
        var array = soundRecordingInputReport;
        array.push(song);
        setSoundRecordingInputRecord(array);
        setFilteredResults(array);
        setOpen(false);
    }

    const clearSelectInput = () => {
        setFilteredResults(soundRecordingInputReport);
        setSelectInput('');
    }

    const clearManualInput = () => {
        setFilteredResults(soundRecordingInputReport);
        setManualInput('');
    }

    return (
        <div className="container_div">
            {soundRecording === undefined || soundRecording.length === 0 ?
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
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
                            <Button variant="secondary" type="reset"><i className="fas fa-times-circle"></i> Clear filters</Button>

                        </Form>
                        <hr />
                        <button onClick={() => setOpen(!open)} className="button"><i className="fas fa-plus-circle"></i> Add a song manually</button>
                        <AddSong open={open} submitSong={submitSong} />
                    </Col>
                    <Col>
                        <div className="center">
                            <h2 className="subtitle">Results</h2>
                        </div>
                        {emptyError === true ?
                            <Alert variant="danger">Sorry, we couldn't find any song that matches.</Alert>
                            :
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Artist</th>
                                        <th>ISRC</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults.map(song => {
                                        return (
                                            <tr>
                                                <td>{song.title}</td>
                                                <td>{song.artist}</td>
                                                <td>{song.isrc}</td>
                                                <td>{song.duration}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                        }

                    </Col>
                </Row>
            }

        </div>
    );
}
export default SearchDB;
