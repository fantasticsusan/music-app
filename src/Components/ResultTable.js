import React, { useState } from 'react';
import {
    Table,
    Form,
    Alert,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import AddSong from './AddSong';

function ResultTable(params) {

    const filteredResults = params.filteredResults;
    const match = params.match;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    const submitSong = params.submitSong;
    const selectedSong = params.selectedSong;
    console.log("Selected song ", selectedSong);
    return (
        <div>
            <Col>
                <Row>
                    <div className="center">
                        <h2 className="subtitle">Database</h2>
                        <p>Total results: {filteredResults.length}</p>

                    </div>
                </Row>
                <Row>
                    <Form.Control value={manualInput} placeholder="Search database..." onChange={onTyping} />
                </Row>
                <Row>

                    {
                        filteredResults.length === 0 ?
                            <Col>
                                <div class="alert_custom">
                                    <Alert variant="danger">Sorry, we couldn't find any song that matches.</Alert>
                                </div>
                                <AddSong msg="Add selected song to database" submitSong={submitSong} paramSong={selectedSong} />
                            </Col>
                            :
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Artist</th>
                                        <th>ISRC</th>
                                        <th>Duration</th>
                                        <th>Match</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults.map((song, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{song.title}</td>
                                                <td>{song.artist}</td>
                                                <td>{song.isrc}</td>
                                                <td>{song.duration}</td>
                                                {selectedSong.title === "" ?
                                                    <td><Button disabled className="match_disabled" variant="secondary" onClick={() => match(song)}><i className="fas fa-check-circle"></i></Button></td>
                                                    :
                                                    <td><Button className="match" variant="secondary" onClick={() => match(song)}><i className="fas fa-check-circle"></i></Button></td>
                                                }
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>}
                </Row>
            </Col>
        </div>
    );
}
export default ResultTable;
