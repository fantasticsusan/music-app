import { connect } from 'react-redux'
import {
    fetchDatabaseRecordings,
    matchRecording
} from '../../../Actions/Recordings'
import ResultsTable from '../Components/ResultsTable'

const mapStateToProps = state => ({
    databaseRecordings: state.recordingReducer.databaseRecordings.data || [],
    isLoading: state.recordingReducer.databaseRecordings.isLoading,
    searchText: state.recordingReducer.searchText,
    selectedRecording: state.recordingReducer.selectedRecording
})

const mapDispatchToProps = (dispatch) => ({
    fetchDatabaseRecordings: () => dispatch(fetchDatabaseRecordings()),
    matchRecording : (inputRecording, databaseRecording) => dispatch(matchRecording(inputRecording, databaseRecording))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable)
