import React, { useState } from 'react';
import {
    Form,
    Col,
    Collapse,
    Button
} from 'react-bootstrap';

function AddSong(params) {
    const open = params.open;
    const submitSongDB = params.submitSong;

    const [song, setSong] = useState({});

    const submitSong = (e) => {
        e.preventDefault();
        submitSongDB(song);
        setSong({'title': '', 'artist':'', 'isrc': '', 'duration':''});
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSong({
            ...song,
            [e.target.name]: value
        });
    }


    return (
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
    );
}

export default AddSong;
