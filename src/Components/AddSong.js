import React, { useState } from 'react';
import {
    Form,
    Col,
    Collapse,
    Alert,
    Row,
    Modal
} from 'react-bootstrap';

function AddSong(params) {

    const emptySong = { 'title': '', 'artist': '', 'isrc': '', 'duration': '' };

    const submitSongDB = params.submitSong;
    const paramSong = params.paramSong;
    const msg = params.msg || "Add song";
    const [song, setSong] = useState(paramSong);
    const [successfulMsg, setSuccessfulMsg] = useState(false);

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const submitSong = (e) => {
        e.preventDefault();
        submitSongDB(song);
        setOpen(false);
        setSuccessfulMsg(true);
        setSong(emptySong);
        handleClose();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSong({
            ...song,
            [e.target.name]: value
        });
    }

    return (
        <Col>
            <Row>
                <Col>
                    <div className="d-flex justify-content-end">
                        <button className="button" onClick={handleShow} ><i className="fas fa-plus-circle"></i> {msg}</button>
                    </div>
                    {
                        successfulMsg === true ?
                            <div class="custom-alert">
                                <Alert variant="success" onClose={() => setSuccessfulMsg(false)} dismissible>
                                    <Alert.Heading>BOOM SHAKALAKA!</Alert.Heading>
                                    <p>Your song was successfully added!</p>
                                </Alert>
                            </div>
                            : ''
                    }
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-container">
                    <div className="modal-title-header">
                        <h2 class="modal-title text-center">Add song
                    <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </h2>
                    </div>

                    <Form className="form-container" onSubmit={submitSong}>
                        <Form.Row>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required value={song.title} name="title" placeholder="Fantastic Baby" />
                            </Form.Group>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridArtist">
                                <Form.Label>Artist</Form.Label>
                                <Form.Control required value={song.artist} name="artist" placeholder="BIGBANG" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} onChange={handleChange} controlId="formGridISR">
                                <Form.Label>ISRC</Form.Label>
                                <Form.Control name="isrc" value={song.isrc} placeholder="GBAHS1700245" />
                            </Form.Group>

                            <Form.Group as={Col} onChange={handleChange} controlId="formGridDuration">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="number" value={song.duration} name="duration" placeholder="323" />
                            </Form.Group>
                        </Form.Row>
                        <div className="center">
                            <button className="button" type="submit">Finish</button>
                        </div>
                    </Form>
                </div>
            </Modal>


        </Col>
    );

}

export default AddSong;
