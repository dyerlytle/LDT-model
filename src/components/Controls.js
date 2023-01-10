import React, { useState, setValue } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import './styles.css';

function Controls(props) {


    const trackSwitchAction = () => {
        props.trackSwitchAction();
    };


    return (
        <>
            <p></p>
            <Form.Group style={{ outline: "1px solid rgb(255, 255, 255)", padding: "4px" }}>
                <Form.Label style={{ color: "yellow" }}>Shutter</Form.Label>
                <Form.Range defaultValue={0} onChange={e => props.setDomeShutRemote(e.target.value)} />
            </Form.Group>
            <p></p>
            <Form.Group style={{ outline: "1px solid rgb(255, 255, 255)", padding: "4px" }}>
                <Form.Label style={{ color: "yellow" }}>Dome Azimuth</Form.Label>
                <Form.Range defaultValue={0} max={360} onChange={e => props.setDomeAzRemote(e.target.value)} />
            </Form.Group>
            <p></p>
            <Form.Group style={{ outline: "1px solid rgb(255, 255, 255)", padding: "4px" }}>
                <Form.Label style={{ color: "yellow" }}>Telescope Azimuth</Form.Label>
                <Form.Range defaultValue={0} max={360} onChange={e => props.setAzimuthRemote(e.target.value)} />
            </Form.Group>
            <p></p>
            <Form.Group style={{ outline: "1px solid rgb(255, 255, 255)", padding: "4px" }}>
                <Form.Label style={{ color: "yellow" }}>Telescope Elevation</Form.Label>
                <Form.Range defaultValue={0} max={90} onChange={e => props.setElevationRemote(e.target.value)} />
            </Form.Group>
            <Form.Group style={{ outline: "1px solid rgb(255, 255, 255)", padding: "4px" }}>
                <Form.Check
                    onChange={trackSwitchAction}
                    type="switch"
                    id="track-switch"
                    style={{ color: "yellow" }}
                    label="Track"
                />
            </Form.Group>
        </>
    );
}

export default Controls;