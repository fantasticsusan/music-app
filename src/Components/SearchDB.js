import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import sound_recording from '../files/sound_recordings.csv';
import sound_recording_input_report from '../files/sound_recordings_input_report.csv';
import {
    Spinner,
    Form,
    Table
} from 'react-bootstrap';

function SearchDB() {

    const [soundRecording, setSoundRecording] = useState([]);
    const [soundRecordingInputReport, setSoundRecordingInputRecord] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

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



    return (
        <div className="container_div">
            {soundRecording === undefined || soundRecording.length === 0 ?
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <>

                    <Form.Group controlId="soundRecordingSelect">
                        <Form.Label>Please select one song</Form.Label>
                        <Form.Control as="select" onChange={handleChange}>
                            <option value="-1">Choose one...</option>
                            {renderOptions()}
                        </Form.Control>
                    </Form.Group>

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
                </>
            }

        </div>
    );
}
export default SearchDB;
