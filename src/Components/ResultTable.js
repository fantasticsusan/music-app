import React from 'react';
import {
    Table,
    Button
} from 'react-bootstrap';


function ResultTable(param) {

    const filteredResults = param.filteredResults;
    const match = param.match;

    return (
        <div>
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
                            <tr>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.isrc}</td>
                                <td>{song.duration}</td>
                                <td><Button variant="success" onClick={() => match(song, index)}><i className="fas fa-check-circle"></i></Button></td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default ResultTable;
