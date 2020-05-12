import React from 'react';
import {
    Form,
    Alert,
    Row,
    Col,
    InputGroup,
    Badge
} from 'react-bootstrap';
import RecordingTable from "../../Common/Table";

function ResultTable(params) {

    const emptyTitleRecording = "";

    const soundDatabase = params.soundDatabase || [];

    const filteredResults = params.filteredResults || [];
    const match = params.match;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    let selectedRecording = params.selectedRecording;

    const matchSoundRecording = (recording) => {

        if (selectedRecording.title !== emptyTitleRecording) {
            const registry = {'recording': selectedRecording, 'matchedRecording': recording};
            match(registry);
            selectedRecording = {};
        }
    }
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="table-header">
                        <h2 className="subtitle"><i className="fas fa-database"/> Database</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="search-input">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-search"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="search" value={manualInput}
                                          placeholder="Search by title, artist, ISRC or duration" onChange={onTyping}/>
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="items-result">
                        <p>Showing <Badge variant="light">{filteredResults.length}</Badge> out of <Badge
                            variant="light">{soundDatabase.length}</Badge> entries</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {
                        filteredResults.length === 0 ?

                            <div className="alert-custom">
                                <Alert variant="danger">
                                    Sorry, we couldn't find any recording that matches, but you can add a new one to the
                                    database.
                                </Alert>
                            </div>

                            :
                            <RecordingTable
                                elements={filteredResults}
                                selectedRecording={selectedRecording}
                                handleClick={matchSoundRecording}
                            />
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ResultTable
