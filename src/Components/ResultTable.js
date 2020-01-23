import React from 'react';
import {
    Table,
    Form,
    Alert,
    Row,
    Col
} from 'react-bootstrap';


function ResultTable(params) {

    const filteredResults = params.filteredResults;
    const match = params.match;
    const emptyError = params.emptyError;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;

    return (
        <div>
            <Col>
                <Row>
                    <div className="center">
                        <h2 className="subtitle">Possible matches</h2>
                    </div>
                </Row>
                <Row>
                    <Form.Control value={manualInput} placeholder="Search database..." onChange={onTyping} />
                </Row>
                <Row>

                    {
                        emptyError === true ?
                            <Alert variant="danger">Sorry, we couldn't find any song that matches.</Alert>
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
                                                <td><input type="checkbox" onClick={() => match(song)}></input></td>
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
