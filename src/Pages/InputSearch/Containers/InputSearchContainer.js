import { connect } from 'react-redux'
import {
    setSearchText
} from '../../../Actions/Recordings'
import InputSearch from '../Components/InputSearch'

const mapStateToProps = state => ({
    searchText: state.recordingReducer.searchText
})

const mapDispatchToProps = (dispatch) => ({
    setSearchText : (text) => dispatch(setSearchText(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch)
