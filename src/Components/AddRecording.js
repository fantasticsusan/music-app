import React, { useState } from 'react';
import {
    Form,
    Col,
    Row,
    Modal
} from 'react-bootstrap';

function AddRecording (params) {

    const EMPTY_RECORDING = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const submitRecordingDB = params.submitRecording;
    const selectedRecording = params.selectedRecording || EMPTY_RECORDING;

    const [recording, setRecording] = useState(EMPTY_RECORDING);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setRecording(EMPTY_RECORDING);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const copySelectedRecordingData = () => {
        setRecording(selectedRecording);
    }

    const submitRecording = (e) => {
        e.preventDefault();
        submitRecordingDB(recording);
        handleClose();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setRecording({
            ...recording,
            [e.target.name]: value
        });
    }

    return (
        <Col>
            <Row>
                <Col>
                    <div className="d-flex justify-content-end">
                        <button className="button" onClick={handleShow} ><i className="fas fa-plus-circle"></i> Add recording to database</button>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-container">
                    <div className="modal-title-header">
                        <h2 className="modal-title text-center">New recording
                    <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </h2>
                    </div>


                    <Form className="form-container" onSubmit={submitRecording}>
                        <div className="copy-song-container">
                            <button type="button" onClick={() => copySelectedRecordingData()} disabled={selectedRecording.title === EMPTY_RECORDING.title} className={selectedRecording.title === EMPTY_RECORDING.title ? "button-copy-data disabled" : "button-copy-data"} >Copy data from selected recording</button>
                        </div>
                        <Form.Row>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridTitle">
                                <Form.Label>Title <span className="required-field">*</span></Form.Label>
                                <Form.Control required value={recording.title} name="title" placeholder="Fantastic Baby" />
                            </Form.Group>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridArtist">
                                <Form.Label>Artist <span className="required-field">*</span></Form.Label>
                                <Form.Control required value={recording.artist} name="artist" placeholder="BIGBANG" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridISR">
                                <Form.Label>ISRC</Form.Label>
                                <Form.Control name="isrc" value={recording.isrc} placeholder="GBAHS1700245" />
                            </Form.Group>

                            <Form.Group as={Col} onChange={handleChange} controlId="formGridDuration">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control min="0" type="number" value={recording.duration} name="duration" placeholder="323" />
                            </Form.Group>
                        </Form.Row>
                        <div className="center">
                            <button className="button" type="submit">Add recording to database</button>
                        </div>
                    </Form>
                </div>
            </Modal>


        </Col>
    );

}

export default AddRecording;
