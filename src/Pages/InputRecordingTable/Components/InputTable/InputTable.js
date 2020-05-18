import React from 'react'
import {
    Row,
    Col
} from 'react-bootstrap'
import {EMPTY_RECORDING} from '../../../../Utils/const'
import {Spinner, Table, Badge} from '../../../../Components'

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

    handleClick (newSelectedRecording) {
        let recording = newSelectedRecording === this.props.selectedRecording ? EMPTY_RECORDING : newSelectedRecording
        this.props.selectRecording(recording)
    }

    render(){

        const {inputRecordings, isLoading, selectedRecording} = this.props
        if(isLoading){
            return (
                <Spinner/>
            )
        }

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <div className="table-header table-header-input">
                            <h2 className="subtitle"><i className="fas fa-file-alt"/> INPUT</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="items-result">
                            <p><Badge>{inputRecordings.length}</Badge> recordings left to be matched</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table
                            elements={inputRecordings}
                            selectedRecording={selectedRecording}
                            handleClick={this.handleClick}
                        />
                    </Col>
                </Row>
            </React.Fragment>)
    }
}
export default InputTable
