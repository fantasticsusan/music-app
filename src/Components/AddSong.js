import React, { useState } from 'react';
import {
    Form,
    Col,
    Collapse,
    Button,
    Alert,
    Row
} from 'react-bootstrap';

function AddSong(params) {
    // const open = params.open;
    const submitSongDB = params.submitSong;
    const paramSong = params.paramSong;
    const msg = params.msg || "Add song";

    const [song, setSong] = useState(paramSong);
    const [successfulMsg, setSuccessfulMsg] = useState(false);
    const [open, setOpen] = useState(false);

    const submitSong = (e) => {
        e.preventDefault();
        submitSongDB(song);
        setOpen(false);
        setSuccessfulMsg(true);
        setSong({ 'title': '', 'artist': '', 'isrc': '', 'duration': '' });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSong({
            ...song,
            [e.target.name]: value
        });
    }

    return (
        <div>
            <Row>
                <div className="col ml-auto">
                    <Button variant="primary" onClick={() => setOpen(!open)}><i className="fas fa-plus-circle"></i> {msg}</Button>
                </div>
            </Row>
            <Collapse in={open}>
                <Form className="formContainer" onSubmit={submitSong}>
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
                        <Button variant="primary" type="submit">Finish</Button>
                    </div>
                </Form>
            </Collapse>
            {
                successfulMsg === true ?
                    <div class="alert_custom">
                        <Alert variant="success" onClose={() => setSuccessfulMsg(false)} dismissible>
                            <Alert.Heading>BOOM SHAKALAKA!</Alert.Heading>
                            <p>Your song was successfully added!</p>
                        </Alert>
                    </div>
                    : ''
            }
        </div>
    );

}

export default AddSong;
