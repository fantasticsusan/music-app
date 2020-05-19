import React from 'react'
import {EMPTY_RECORDING} from '../../../../Utils/const'
import {Spinner, Table, Badge} from '../../../../Components'
import PropTypes from 'prop-types'

class InputTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedRecording: EMPTY_RECORDING
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.getInputRecordings()
    }

    handleClick(newSelectedRecording) {
        let recording = newSelectedRecording === this.props.selectedRecording ? EMPTY_RECORDING : newSelectedRecording
        this.props.selectRecording(recording)
    }

    render() {

        const {inputRecordings, isLoading, selectedRecording} = this.props
        if (isLoading) {
            return (
                <Spinner/>
            )
        }

        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column">
                        <div className="table-header table-header-input">
                            <h2 className="subtitle"><i className="fas fa-file-alt"/> INPUT</h2>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="items-result">
                            <p><Badge>{inputRecordings.length}</Badge> recordings left to be matched</p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-full">
                        {inputRecordings.length === 0 ?
                            <div className="message is-success">
                                <div className="message-body">
                                    Hooray! You matched all your recordings!
                                </div>
                            </div>
                            :
                            <Table
                                elements={inputRecordings}
                                selectedRecording={selectedRecording}
                                handleClick={this.handleClick}
                            />
                        }
                    </div>
                </div>
            </React.Fragment>)
    }
}
InputTable.propTypes = {
    selectedRecording: PropTypes.object.isRequired,
    inputRecordings: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getInputRecordings: PropTypes.func.isRequired,
    selectRecording: PropTypes.func.isRequired
}
export default InputTable
