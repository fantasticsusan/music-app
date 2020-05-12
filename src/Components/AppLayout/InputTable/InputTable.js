import React from 'react'
import {
    Row,
    Col,
    Badge
} from 'react-bootstrap'
import RecordingTable from '../../Common/Table'
import {EMPTY_RECORDING} from '../../../utils/const'

function InputTable(params) {
    const soundRecordingInputReport = params.soundRecordingInputReport || []
    const selectedRecording = params.selectedRecording || EMPTY_RECORDING

    const handleClick = (newSelectedRecording) => {
        let recording = newSelectedRecording === selectedRecording ? EMPTY_RECORDING : newSelectedRecording
        params.onSelectedRow(recording)
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="table-header table-header-input">
                        <h2 className="subtitle"><i className="fas fa-file-alt"/> INPUT</h2>
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
                    <RecordingTable
                        elements={soundRecordingInputReport}
                        selectedRecording={selectedRecording}
                        handleClick={handleClick}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default InputTable
