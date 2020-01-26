import React from 'react';
import {
    Table,
    Row,
    Col
} from 'react-bootstrap';

function InputTable(params) {

    const emptySong = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const soundRecordingInputReport = params.soundRecordingInputReport;
    const onSelectedRow = params.onSelectedRow;

    const selectedSong = params.selectedSong || emptySong;

    const handleClick = (newSelectedSong) => {
        let song = newSelectedSong === selectedSong ? emptySong : newSelectedSong;
        onSelectedRow(song);
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="table-header table-header-input">
                        <h2 className="subtitle"><i className="fas fa-file-alt"></i> INPUT</h2>
                        <div className="table-header-body">
                            <p>Total: <strong>{soundRecordingInputReport.length}</strong></p>
                        </div>
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
                                    <th className="thead-custom">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soundRecordingInputReport.map((song, index) => {
                                    return (
                                        <tr onClick={() => handleClick(song)} className={song === selectedSong ? "selected-row" : "custom-row"} key={index}>
                                            <td>{song.title}</td>
                                            <td>{song.artist}</td>
                                            <td>{song.isrc}</td>
                                            <td>{song.duration}</td>
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
