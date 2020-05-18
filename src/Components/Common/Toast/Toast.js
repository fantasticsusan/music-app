import React from 'react'
import {
    Toast
} from 'react-bootstrap'
import {EMPTY_RECORDING} from '../../../Utils/const'
import PropTypes from 'prop-types'

function ToastSuccess(params) {

    const setOpen = params.setOpen;
    const open = params.open;
    const msg = params.msg;
    const recording = params.recording || EMPTY_RECORDING;

    return (
        <Toast className="toast-success" onClose={() => setOpen(false)} show={open} delay={3000} autohide>
            <div className="toast-success-body">
                {msg === "databaseSuccess" ?
                    <>
                        <span className="bolder">BOOM SHAKALAKA!</span><br/>
                        The recording {recording.title} by {recording.artist} was successfully added!
                    </>
                    :
                    <>
                        <span className="bolder">BOOM SHAKALAKA!</span><br/>
                        The recording {recording.title} by {recording.artist} was successfully matched!
                    </>
                }
            </div>
        </Toast>
    )
}
ToastSuccess.propTypes = {
    recording: PropTypes.object.isRequired,
    msg: PropTypes.string.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}
export default ToastSuccess
