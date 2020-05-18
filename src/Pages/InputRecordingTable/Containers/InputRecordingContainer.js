import { connect } from 'react-redux'
import {
    fetchInputRecordings,
    setSelectedRecording
} from '../../../Actions/Recordings'
import InputTable from '../Components/InputTable'

const mapStateToProps = state => ({
    inputRecordings: state.recordingReducer.inputRecordings.data || [],
    isLoading: state.recordingReducer.inputRecordings.isLoading,
    selectedRecording:  state.recordingReducer.selectedRecording
})

const mapDispatchToProps = (dispatch) => ({
    getInputRecordings: () => dispatch(fetchInputRecordings()),
    selectRecording: (recording) => dispatch(setSelectedRecording(recording))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputTable)
