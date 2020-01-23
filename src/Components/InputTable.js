import React from 'react';
import {
    Table,
    Button
} from 'react-bootstrap';

function InputTable(params) {

    const selectInput = params.selectInput;
    const handleChange = params.handleChange;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    const soundRecordingInputReport = params.soundRecordingInputReport;

    return (
        <div>
            <div className="center">
                <h2 className="subtitle">INPUT</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>ISRC</th>
                        <th>Duration</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {soundRecordingInputReport.map((song, index) => {
                        return (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.isrc}</td>
                                <td>{song.duration}</td>
                                <td>X</td>
                                {/* <td><Button variant="danger" onClick={() => deleteMatch(song, index)}><i className="fas fa-trash-alt"></i></Button></td> */}
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
