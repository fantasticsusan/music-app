import React from 'react'
import {EMPTY_RECORDING} from '../../../../Utils/const'
import {Badge, Table} from '../../../../Components'
import PropTypes from 'prop-types'

class MatchedTable extends React.Component {

    constructor(props) {
        super(props)
        this.unmatch = this.unmatch.bind(this)

    }

    unmatch(recording) {
        this.props.unmatchRecording(recording)
    }


    render() {
        const {matchRecordings} = this.props
        return (
            <div className="table-match-container">
                <div className="table-header">
                    <h2 className="subtitle"><i className="fas fa-database"/> Registry</h2>
                    <div className="table-header-body">
                        <p><Badge>{matchRecordings.length}</Badge> total matches</p>
                    </div>
                </div>
                {matchRecordings.length !== 0 &&
                <Table
                    elements={matchRecordings}
                    selectedRecording={EMPTY_RECORDING}
                    undoMatch={this.unmatch}
                    isMatchTable={true}
                />
                }
            </div>
        )
    }
}
MatchedTable.propTypes = {
    matchRecordings: PropTypes.array.isRequired,
    unmatchRecording: PropTypes.func.isRequired
}
export default MatchedTable
