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

    const EMTPY_FIELD = "";

    const popover = (matchedRecord) => {
        return (<Popover id="popover-basic">
            <Popover.Title as="h3">{matchedRecord.title}</Popover.Title>
            <Popover.Content>
                <p><strong>Artist: </strong> {matchedRecord.artist}</p>
                {matchedRecord.isrc !== EMTPY_FIELD ?
                    <p><strong>ISRC: </strong> {matchedRecord.isrc}</p>
                    :
                    ''
                }
                {matchedRecord.duration !== EMTPY_FIELD ?
                    <p><strong>Duration: </strong> {matchedRecord.duration}</p>
                    :
                    ''
                }
            </Popover.Content>
        </Popover>);
    }

    const undoMatch = (registry) => {
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
                            <th className="text-center">Matched recording</th>
                            <th className="text-center">Unmatch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soundRecordingMatched.map((registry, index) => {
                            const soundRecording = registry.recording;
                            const matchedRecording = registry.matchedRecording;
                            return (
                                <tr key={index}>
                                    <td>{soundRecording.title}</td>
                                    <td>{soundRecording.artist}</td>
                                    <td>{soundRecording.isrc}</td>
                                    <td className="text-center">{soundRecording.duration}</td>
                                    <td className="text-center">
                                        <OverlayTrigger trigger="hover" placement="left" overlay={popover(matchedRecording)}>
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
