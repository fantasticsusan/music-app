import React from 'react';
import {
    Toast
} from 'react-bootstrap';

function ToastSuccess(params) {

    const emptySong = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const setOpen = params.setOpen;
    const open = params.open;
    const msg = params.msg;
    const song = params.song || emptySong;

    return (
        <Toast className="toast-success" onClose={() => setOpen(false)} show={open} delay={3000} autohide>
            <div className="toast-success-body">
                {msg === "databaseSuccess" ?
                    <>
                        <span className="bolder">BOOM SHAKALAKA!</span><br/>
                        The song {song.title} by {song.artist} was successfully added!
                    </>
                    :
                    <>
                        <span className="bolder">BOOM SHAKALAKA!</span><br/>
                        The song {song.title} by {song.artist} was successfully matched!
                    </>
                }
            </div>
        </Toast>
    );



}
export default ToastSuccess