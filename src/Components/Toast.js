import React from 'react';
import {
    Toast
} from 'react-bootstrap';

function ToastSuccess(params) {

    const EMTPY_RECORDING = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const setOpen = params.setOpen;
    const open = params.open;
    const msg = params.msg;
    const recording = params.recording || EMTPY_RECORDING;

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
    );



}
export default ToastSuccess