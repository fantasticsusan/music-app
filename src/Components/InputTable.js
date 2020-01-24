import React, { useState } from 'react';
import {
    Table
} from 'react-bootstrap';

function InputTable(params) {

    const soundRecordingInputReport = params.soundRecordingInputReport;
    const onSelectedRow = params.onSelectedRow;

    const selectedSong = params.selectedSong || { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const handleClick = (song) => {
        onSelectedRow(song);
    }

    return (
        <div>
            <div className="center">
                <h2 className="subtitle">INPUT</h2>
                <p>Total input: {soundRecordingInputReport.length}</p>
                <p>Please select one song</p>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>ISRC</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {soundRecordingInputReport.map((song, index) => {
                        return (
                            <tr onClick={() => handleClick(song)} className={song === selectedSong ? "selected_row" : "custom_row"} key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.isrc}</td>
                                <td>{song.duration}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        </div>
        // <Form.Control  className="mr-sm-2" value={selectInput} as="select" onChange={handleChange}>
        //     <option value="-1">Choose one...</option>
        //     {renderOptions()}
        // </Form.Control>
    );
}
export default InputTable;
