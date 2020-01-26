import React from 'react';
import {
    Table,
    Button
} from 'react-bootstrap';


function MatchTable(param) {

    const soundRecordingMatched = param.soundRecordingMatched;
    const deleteMatch = param.deleteMatch;

    return (
        <div>
            <div className="table-header">
                <h2 className="subtitle"><i className="fas fa-database"></i> Registry</h2>
                <div className="table-header-body">
                    <p>Total matchs:  <strong>{soundRecordingMatched.length}</strong></p>
                </div>
            </div>
            <Table className="match-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>ISRC</th>
                        <th>Duration</th>
                        <th>Unmatch</th>
                    </tr>
                </thead>
                <tbody>
                    {soundRecordingMatched.map((song, index) => {
                        return (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.isrc}</td>
                                <td>{song.duration}</td>
                                <td><Button variant="danger" onClick={() => deleteMatch(song, index)}><i className="fas fa-undo-alt"></i></Button></td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default MatchTable;
