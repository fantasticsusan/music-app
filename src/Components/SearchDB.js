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
    Alert
} from 'react-bootstrap';

function SearchDB() {

    const [soundRecording, setSoundRecording] = useState([]);
    const [soundRecordingInputReport, setSoundRecordingInputRecord] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [emptyError, setEmptyError] = useState(false);

    useEffect(() => {
        d3.csv(sound_recording, function (res) {
            console.log("soundRecording ", res)
            setSoundRecording(res);
        });

        d3.csv(sound_recording_input_report, function (res) {
            console.log("soundRecordingInputReport: ", res)
            setSoundRecordingInputRecord(res);
            setFilteredResults(res);
        });
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        var result = soundRecordingInputReport;
        if (value !== "-1") {
            const objectToFilter = soundRecording[value];
            result = soundRecordingInputReport.filter(function (song) {
                return song.title.includes(objectToFilter.title);
            });
            if (result.length === 0) {
                setEmptyError(true);
            } else {
                setEmptyError(false);
            }

        }
        setFilteredResults(result);
    }

    const renderOptions = () => {
        var result = [];
        for (var i = 0; i < soundRecording.length; i++) {
            const song = soundRecording[i];
            result.push(<option value={i}>{song.title} - {song.artist}</option>);
        }
        return result;
    }

    const onType = (e) => {
        const value = e.target.value;
        var result = soundRecordingInputReport;

        result = soundRecordingInputReport.filter(function (song) {
            return song.title.includes(value) || song.artist.includes(value);
        });

        if (result.length === 0) {
            setEmptyError(true);
        } else {
            setEmptyError(false);
        }
        setFilteredResults(result);
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
                        <Form.Group controlId="soundRecordingSelect">
                            <Form.Label>Please select one song</Form.Label>
                            <Form.Control as="select" onChange={handleChange}>
                                <option value="-1">Choose one...</option>
                                {renderOptions()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="soundRecordingSelect">
                            <Form.Label>Or manually type a song</Form.Label>
                            <Form.Control placeholder="Type title or artist song ..." onChange={onType} />

                        </Form.Group>
                    </Col>
                    <Col>
                        <h2>Results</h2>
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
