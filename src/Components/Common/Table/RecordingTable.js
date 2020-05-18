import React from 'react'
import PropTypes from 'prop-types'
import {Popover} from '../../../Components'

class RecordingTable extends React.Component {

    handleClick(recording) {
        const {isMatchTable, handleClick} = this.props

        if (!isMatchTable)
            handleClick(recording)

    }

    render() {
        const {selectedRecording, elements, isMatchTable, undoMatch} = this.props
        return (
            <div className={!isMatchTable ? "table-scrollable" : ''}>
                <table className={`table is-hoverable ${isMatchTable ? 'is-fullwidth' : ''}`}>
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
                        return (
                            <tr onClick={() => this.handleClick(recording)}
                                className={!isMatchTable ? recording === selectedRecording ? "selected-row" : "custom-row" : ''}
                                key={index}>
                                <td>{recording.title}</td>
                                <td>{recording.artist}</td>
                                <td>{recording.isrc}</td>
                                <td>{recording.duration}</td>

                                {isMatchTable &&
                                <>
                                    <td><Popover matchedRecord={recording.matchedRecording}/></td>
                                    <td className="text-center">
                                        <button className="button is-danger"
                                                onClick={() => undoMatch(recording)}><i
                                            className="fas fa-undo-alt"/></button>
                                    </td>
                                </>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

RecordingTable.propTypes = {
    elements: PropTypes.array.isRequired,
    selectedRecording: PropTypes.object,
    handleClick: PropTypes.func,
    undoMatch: PropTypes.func,
    isMatchTable: PropTypes.bool
}
export default RecordingTable
