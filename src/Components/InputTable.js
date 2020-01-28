import React from 'react';
import {
    Table,
    Row,
    Col,
    Badge
} from 'react-bootstrap';

function InputTable(params) {

    const EMPTY_SOUND_RECORDING = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const soundRecordingInputReport = params.soundRecordingInputReport || [];
    const onSelectedRow = params.onSelectedRow;

    const selectedRecording = params.selectedRecording || EMPTY_SOUND_RECORDING;

    const handleClick = (newSelectedRecording) => {
        let recording = newSelectedRecording === selectedRecording ? EMPTY_SOUND_RECORDING : newSelectedRecording;
        onSelectedRow(recording);
    }


    return (
        <>
            <Row>
                <Col>
                    <div className="table-header table-header-input">
                        <h2 className="subtitle"><i className="fas fa-file-alt"></i> INPUT</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="items-result">
                        <p><Badge variant="light">{soundRecordingInputReport.length}</Badge> recordings left to be matched</p>                    
                        </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
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
                                {soundRecordingInputReport.map((recording, index) => {
                                    return (
                                        <tr onClick={() => handleClick(recording)} className={recording === selectedRecording ? "selected-row" : "custom-row"} key={index}>
                                            <td>{recording.title}</td>
                                            <td>{recording.artist}</td>
                                            <td>{recording.isrc}</td>
                                            <td>{recording.duration}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    );
}
export default InputTable;
