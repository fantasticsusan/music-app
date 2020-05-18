import { connect } from 'react-redux'
import {
    addRecordingToDB,
} from '../../../Actions/Recordings'
import AddRecordingDB from '../Components/AddRecordingDB'

const mapStateToProps = state => ({
    selectedRecording: state.recordingReducer.selectedRecording
})

const mapDispatchToProps = (dispatch) => ({
    addRecordingToDB : (recording) => dispatch(addRecordingToDB(recording))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRecordingDB)
