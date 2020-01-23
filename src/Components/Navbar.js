import React from 'react';
import {
    Navbar,
    Form,
    Button
} from 'react-bootstrap';

function NavigationBar(params) {

    const selectInput = params.selectInput;
    const handleChange = params.handleChange;
    const onTyping = params.onTyping;
    const manualInput = params.manualInput;
    const soundRecordingInputReport = params.soundRecordingInputReport;
    const clearFilters = params.clearFilters;

    const renderOptions = () => {
        var result = [];
        for (var i = 0; i < soundRecordingInputReport.length; i++) {
            const song = soundRecordingInputReport[i];
            result.push(<option key={i} value={i}>{song.title} - {song.artist}</option>);
        }
        return result;
    }

    return (
        <Navbar sticky="top" bg="dark" variant="dark" className="navigation_bar_custom" expand="lg">
            <Navbar.Brand href="#home">BMAT</Navbar.Brand>
            <Form inline>
                <Form.Control  className="mr-sm-2" value={manualInput} placeholder="Type title or artist song ..." onChange={onTyping} />
            </Form>
            <Form inline>
                <Form.Control  className="mr-sm-2" value={selectInput} as="select" onChange={handleChange}>
                    <option value="-1">Choose one...</option>
                    {renderOptions()}
                </Form.Control>
            </Form>
            <Button variant="secondary" onClick={() => clearFilters()}><i className="fas fa-times-circle"></i> Clear filters</Button>
        </Navbar>
    );
}
export default NavigationBar;
