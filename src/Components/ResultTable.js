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
import AddSong from './AddSong';

function ResultTable(params) {

    const emptyTitleSong = "";

    const soundDatabase = params.soundDatabase || [];

    const filteredResults = params.filteredResults || [];
    const match = params.match;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    const submitSong = params.submitSong;
    let selectedSong = params.selectedSong;

    const matchSong = (song) => {

        if (selectedSong.title !== emptyTitleSong) {
            selectedSong = {};
            match(song);
        }
    }
    return (
        <div>
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
                            <Form.Control value={manualInput} placeholder="Search by title, artist, ISRC or duration" onChange={onTyping} />
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

                {
                    filteredResults.length === 0 ?
                        <Col>
                            <div className="alert-custom">
                                <Alert variant="danger">Sorry, we couldn't find any song that matches.</Alert>
                            </div>
                            {selectedSong.title !== "" ?
                                <AddSong msg="Add selected song to database" submitSong={submitSong} paramSong={selectedSong} />
                                : ''
                            }
                        </Col>
                        :
                        <>
                            <div className="table-scrollable">

                                <Table responsive striped>
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
                        </>
                }
            </Row>
        </div>
    );
}
export default ResultTable;
