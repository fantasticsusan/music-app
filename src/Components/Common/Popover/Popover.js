import React, {Component} from 'react'
import Popover from 'react-popover'
import PropTypes from 'prop-types'
import {EMPTY_FIELD} from '../../../Utils/const'

class RecordPopover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    togglePopover = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {matchedRecord} = this.props
        return (
            <Popover
                isOpen={this.state.isOpen}
                body={
                    <div className="popover-container">
                        <p><b>Title:</b> {matchedRecord.title} </p>
                        <p><b>Artist:</b>{matchedRecord.artist}</p>
                        {matchedRecord.isrc !== EMPTY_FIELD &&
                        <p><b>ISRC:</b> {matchedRecord.isrc}</p>
                        }
                        {matchedRecord.duration !== EMPTY_FIELD &&
                        <p><b>Duration:</b> {matchedRecord.duration}</p>
                        }
                    </div>
                }
                place="above"
                onOuterAction={this.togglePopover}
                tipSize={.01}
            >
                <button className="button is-info" onMouseLeave={this.togglePopover} onMouseEnter={this.togglePopover}>
                    <i className="fas fa-info-circle"/>
                </button>
            </Popover>
        )
    }
}

RecordPopover.propTypes = {
    matchedRecord: PropTypes.object.isRequired
}
export default RecordPopover
