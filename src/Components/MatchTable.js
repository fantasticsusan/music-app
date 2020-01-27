import React from 'react';
import {
    Table,
    Button,
    Badge,
    OverlayTrigger,
    Popover
} from 'react-bootstrap';


function MatchTable(param) {

    const soundRecordingMatched = param.soundRecordingMatched;
    const deleteMatch = param.deleteMatch;

    const emptyField = "";

    const popover = (matchedSong) => {
        return (<Popover id="popover-basic">
            <Popover.Title as="h3">{matchedSong.title}</Popover.Title>
            <Popover.Content>
                <p><strong>Artist: </strong> {matchedSong.artist}</p>
                {matchedSong.isrc !== emptyField ?
                    <p><strong>ISRC: </strong> {matchedSong.isrc}</p>
                    :
                    ''
                }
                {matchedSong.duration !== emptyField ?
                    <p><strong>Duration: </strong> {matchedSong.duration}</p>
                    :
                    ''
                }
            </Popover.Content>
        </Popover>);
    }

    const undoMatch = (registry) => {
        console.log("The song is ", registry);
        deleteMatch(registry);
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
                <Table className="match-table" striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>ISRC</th>
                            <th className="text-center">Duration</th>
                            <th className="text-center">Matched song</th>
                            <th className="text-center">Unmatch</th>
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
                                    <td className="text-center">{song.duration}</td>
                                    <td className="text-center">
                                        <OverlayTrigger trigger="hover" placement="left" overlay={popover(matchedSong)}>
                                            <Button variant="info"><i className="fas fa-info-circle"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-center"><Button variant="danger" onClick={() => undoMatch(registry, index)}><i className="fas fa-undo-alt"></i></Button></td>
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
