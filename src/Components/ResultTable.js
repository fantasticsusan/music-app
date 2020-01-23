import React from 'react';
import {
    Table,
    Button,
    Alert
} from 'react-bootstrap';


function ResultTable(param) {

    const filteredResults = param.filteredResults;
    const match = param.match;
    const emptyError = param.emptyError;

    return (
        <div>
            <div className="center">
                <h2 className="subtitle">Results</h2>
            </div>

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

        </div>
    );
}
export default ResultTable;
