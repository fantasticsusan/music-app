import React from 'react';
import {
    Table,
    Form,
    Alert,
    Row,
    Col,
    InputGroup,
    Badge
} from 'react-bootstrap';

function ResultTable(params) {

    const emptyTitleSong = "";

    const soundDatabase = params.soundDatabase || [];

    const filteredResults = params.filteredResults || [];
    const match = params.match;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    let selectedSong = params.selectedSong;

    const matchSong = (song) => {

        if (selectedSong.title !== emptyTitleSong) {
            const registry = { 'song': selectedSong, 'matchedSong': song };
            match(registry);
            selectedSong = {};
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <div className="table-header">
                        <h2 className="subtitle"><i className="fas fa-database"></i> Database</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="search-input">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="search" value={manualInput} placeholder="Search by title, artist, ISRC or duration" onChange={onTyping} />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="items-result">
                        <p>Showing <Badge variant="light">{filteredResults.length}</Badge> out of <Badge variant="light">{soundDatabase.length}</Badge> entries</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {
                        filteredResults.length === 0 ?

                            <div className="alert-custom">
                                <Alert variant="danger">
                                    Sorry, we couldn't find any song that matches, but you can add a new one to the database.
                                    </Alert>
                            </div>

                            :

                            <div className="table-scrollable">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th className="thead-custom">Title</th>
                                            <th className="thead-custom">Artist</th>
                                            <th className="thead-custom">ISRC</th>
                                            <th className="thead-custom column-width-small">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredResults.map((song, index) => {
                                            return (
                                                <tr onClick={() => matchSong(song)} className={selectedSong.title !== emptyTitleSong ? "custom-row" : ""} key={index}>
                                                    <td>{song.title}</td>
                                                    <td>{song.artist}</td>
                                                    <td>{song.isrc}</td>
                                                    <td>{song.duration}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                    }
                </Col>
            </Row>
        </>
    );
}
export default ResultTable;
