import React from 'react'
import {
    Button,
    OverlayTrigger,
    Table,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const RecordingTable = ({selectedRecording, elements, handleClick, isMatchTable , popover, undoMatch}) => (
    <div className={!isMatchTable && "table-scrollable"}>
        <Table striped hover={isMatchTable} responsive={isMatchTable} className="match-table">
            <thead>
            <tr>
                <th className="thead-custom">Title</th>
                <th className="thead-custom">Artist</th>
                <th className="thead-custom">ISRC</th>
                <th className="thead-custom column-width-small">Duration</th>
                {isMatchTable &&
                <>
                    <th className="thead-custom text-center">Matched recording</th>
                    <th className="thead-custom text-center">Unmatch</th>
                </>
                }
            </tr>
            </thead>
            <tbody>
            {elements.map((recording, index) => {
                const matchedRecording = isMatchTable ? recording.matchedRecording : ''
                const soundRecording = isMatchTable ? recording.recording: ''
                return (
                    <tr onClick={!isMatchTable ? () => handleClick(recording) : null}
                        className={!isMatchTable ? recording === selectedRecording ? "selected-row" : "custom-row": ''} key={index}>
                        <td>{isMatchTable ? soundRecording.title : recording.title}</td>
                        <td>{isMatchTable ? soundRecording.artist :recording.artist}</td>
                        <td>{isMatchTable ? soundRecording.isrc :recording.isrc}</td>
                        <td>{isMatchTable ? soundRecording.duration :recording.duration}</td>

                        {isMatchTable &&
                        <>
                            <td className="text-center">
                                <OverlayTrigger trigger="hover" placement="left" overlay={popover(matchedRecording)}>
                                    <Button variant="info"><i className="fas fa-info-circle"/></Button>
                                </OverlayTrigger>
                            </td>
                            <td className="text-center"><Button variant="danger" onClick={() => undoMatch(recording, index)}><i className="fas fa-undo-alt"/></Button></td>
                        </>
                        }
                    </tr>
                )})}
            </tbody>
        </Table>
    </div>
)
RecordingTable.propTypes = {
    elements: PropTypes.array.isRequired,
    selectedRecording: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    undoMatch: PropTypes.func,
    popover: PropTypes.func,
    isMatchTable: PropTypes.bool
}
export default RecordingTable
