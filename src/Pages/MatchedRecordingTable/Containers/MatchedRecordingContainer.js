import { connect } from 'react-redux'
import {
    unmatchRecording
} from '../../../Actions/Recordings'
import MatchedTable from '../Components/MatchedTable'

const mapStateToProps = state => ({
    matchRecordings: state.recordingReducer.matchRecordings,
})

const mapDispatchToProps = (dispatch) => ({
    unmatchRecording: (recording) => dispatch(unmatchRecording(recording))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchedTable)
