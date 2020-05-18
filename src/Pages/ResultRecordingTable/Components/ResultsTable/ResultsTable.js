import React from 'react'
import {filterByRecording, filterByText} from '../../../../Utils/functions'
import {EMPTY_INPUT, EMPTY_RECORDING} from '../../../../Utils/const'
import {Badge, Spinner, Table} from '../../../../Components'
import InputSearch from '../../../InputSearch'

class ResultsTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            filteredRecordings: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchDatabaseRecordings()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {databaseRecordings, selectedRecording, searchText} = this.props
        if (prevProps.selectedRecording !== selectedRecording || prevProps.databaseRecordings !== databaseRecordings || searchText !== prevProps.searchText) {
            if (searchText === EMPTY_INPUT) {
                this.setState({
                    ...this.state,
                    filteredRecordings: filterByRecording(databaseRecordings, selectedRecording)
                })
            } else {
                this.setState({
                    ...this.state,
                    filteredRecordings: filterByText(databaseRecordings, searchText)
                })
            }
        }
    }

    handleClick(newSelectedRecording) {
        if (this.props.selectedRecording !== EMPTY_RECORDING) {
            this.props.matchRecording(this.props.selectedRecording, newSelectedRecording)
        }
    }

    render() {

        const {databaseRecordings, isLoading} = this.props
        const {filteredRecordings, selectedRecording} = this.state

        if (isLoading) {
            return (
                <Spinner/>
            )
        }

        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column is-full">
                        <div className="table-header">
                            <h2 className="subtitle"><i className="fas fa-database"/> Database</h2>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-full">
                        <InputSearch/>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-full">
                        <div className="items-result">
                            <p>Showing <Badge>{filteredRecordings.length}</Badge> out
                                of <Badge>{databaseRecordings.length}</Badge> entries</p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-full">
                        {
                            filteredRecordings.length === 0 ?
                                <div className="message is-danger">
                                    <div className="message-body">
                                        Sorry, we couldn't find any recording that matches, but you can add a new one to
                                        the database.
                                    </div>
                                </div>
                                :
                                <Table
                                    elements={filteredRecordings}
                                    selectedRecording={selectedRecording}
                                    handleClick={this.handleClick}
                                />
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ResultsTable
