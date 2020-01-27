import React from 'react';
import {
    Table,
    Button,
    Badge,
    OverlayTrigger,
    Tooltip,
    Popover
} from 'react-bootstrap';


function MatchTable(param) {

    const soundRecordingMatched = param.soundRecordingMatched;
    const deleteMatch = param.deleteMatch;

    const emptyField = "";

    const popover = (matchedSong) => {
        return (<Popover id="popover-basic">
            <Popover.Title as="h3">Matched song</Popover.Title>
            <Popover.Content>
                <ul>
                    <li><strong>Title: </strong> {matchedSong.title}</li>
                    <li><strong>Artist: </strong> {matchedSong.artist}</li>
                    {matchedSong.isrc !== emptyField ?
                        <li><strong>ISRC: </strong> {matchedSong.isrc}</li>
                        :
                        ''}
                    {matchedSong.duration !== emptyField ?
                        <li><strong>Duration: </strong> {matchedSong.duration}</li>
                        :
                        ''}
                </ul>
            </Popover.Content>
        </Popover>);
    }


    return (
        <div className="table-match-container">
            <div className="table-header">
                <h2 className="subtitle"><i className="fas fa-database"></i> Registry</h2>
                <div className="table-header-body">
                    <p><Badge variant="light">{soundRecordingMatched.length}</Badge> total matches</p>
                </div>
            </div>
            {soundRecordingMatched.length !== 0 ?
                <Table responsive className="match-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>ISRC</th>
                            <th>Duration</th>
                            <th>Matched song</th>
                            <th>Unmatch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soundRecordingMatched.map((registry, index) => {
                            const song = registry.song;
                            const matchedSong = registry.matchedSong;
                            return (
                                <tr key={index}>
                                    <td>{song.title}</td>
                                    <td>{song.artist}</td>
                                    <td>{song.isrc}</td>
                                    <td>{song.duration}</td>
                                    <td>
                                        <OverlayTrigger trigger="click" placement="right" overlay={popover(matchedSong)}>
                                            <Button variant="secondary"><i className="fas fa-info-circle"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td><Button variant="danger" onClick={() => deleteMatch(song, index)}><i className="fas fa-undo-alt"></i></Button></td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
                :
                ""}
        </div>
    );
}
export default MatchTable;
