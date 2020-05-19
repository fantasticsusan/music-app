import React from 'react'
import {EMPTY_RECORDING} from '../../../../Utils/const'
import PropTypes from 'prop-types'

class AddRecordingDB extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            recording: EMPTY_RECORDING,
            show: false
        }
        this.submitRecording = this.submitRecording.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleShow() {
        this.setState({
            ...this.state,
            show: true
        })
    }

    copySelectedRecordingData() {
        this.setState({
            ...this.state,
            recording: this.props.selectedRecording
        })
    }

    handleClose() {
        this.setState({
            ...this.state,
            show: false
        })
    }

    submitRecording(e) {
        e.preventDefault()
        this.props.addRecordingToDB(this.state.recording)
        this.setState({
            recording: EMPTY_RECORDING
        },  this.handleClose)

    }

    handleChange(e) {
        const target = e.target
        this.setState({
            ...this.state,
            recording: {
                ...this.state.recording,
                [target.name]: target.value
            }
        })
    }

    render() {

        const {selectedRecording} = this.props
        const {recording, show} = this.state

        return (
            <React.Fragment>
                <div className="has-text-right">
                    <button className="button-add-recording" onClick={this.handleShow}><i
                        className="fas fa-plus-circle"/> Add
                        recording to database
                    </button>
                </div>

                <div className={`modal ${show ? 'is-active' : ''}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="modal-container">
                            <div className="modal-title-header">
                                <h2 className="modal-title text-center">New recording
                                </h2>
                            </div>
                            <form className="form-container" onSubmit={this.submitRecording}>
                                <div className="copy-song-container">
                                    <button type="button" onClick={() => this.copySelectedRecordingData()}
                                            disabled={selectedRecording.title === EMPTY_RECORDING.title}
                                            className={selectedRecording.title === EMPTY_RECORDING.title ? "button-copy-data disabled" : "button-copy-data"}>Copy
                                        data from selected recording
                                    </button>
                                </div>
                                <div className="columns">
                                    <div className="column">

                                        <div className="field">
                                            <label htmlFor="title" className="label">Title <span
                                                className="required-field">*</span></label>
                                            <div className="control is-expanded">
                                                <input
                                                    onChange={this.handleChange}
                                                    className="input"
                                                    required
                                                    value={recording.title}
                                                    name="title"
                                                    placeholder="Fantastic Baby"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label htmlFor="artist" className="label">Artist <span
                                                className="required-field">*</span></label>
                                            <div className="control is-expanded">
                                                <input
                                                    onChange={this.handleChange}
                                                    className="input"
                                                    required
                                                    value={recording.artist}
                                                    name="artist"
                                                    placeholder="BIGBANG"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <div className="field">
                                            <label htmlFor="isrc" className="label">ISRC</label>
                                            <div className="control is-expanded">
                                                <input
                                                    onChange={this.handleChange}
                                                    className="input"
                                                    value={recording.isrc}
                                                    name="isrc"
                                                    placeholder="GBA9234565"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label htmlFor="duration" className="label">Duration</label>
                                            <div className="control is-expanded">
                                                <input
                                                    onChange={this.handleChange}
                                                    className="input"
                                                    type="number"
                                                    min="0"
                                                    value={recording.duration}
                                                    name="duration"
                                                    placeholder="323"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="center">
                                    <button className="button-add-recording" type="submit">Add recording to database</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button onClick={this.handleClose} className="modal-close is-large" aria-label="close"></button>
                </div>
            </React.Fragment>
        )
    }
}
AddRecordingDB.propTypes = {
    selectedRecording: PropTypes.object,
    addRecordingToDB: PropTypes.func.isRequired
}
export default AddRecordingDB
