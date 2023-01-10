import React, { useState } from 'react';
import ThreeD from "./ThreeD";
import CanvasControls from "./CanvasControls";
import ICNavbar from "./ICNavbar";
import Controls from './Controls';
import StatusWindow from './StatusWindow';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';


function MainPage() {
    const [azimuth, setAzimuth] = useState(0.0)
    const [elevation, setElevation] = useState(0.0)
    const [dome_az, setDomeAz] = useState(0.0)
    const [dome_shut, setDomeShut] = useState(0)
    const [trackOn, setTrackOn] = useState(false);

    const trackSwitchAction = () => {
        setTrackOn(!trackOn);
        // console.log(trackOn);
    };

    const getTrack = () => {
        return (trackOn);
    }

    const setAzimuthRemote = (remoteAzimuth) => {
        setAzimuth(remoteAzimuth);
        // console.log(remoteAzimuth);
    }

    const setAzimuthFromStatus = (remoteAzimuth) => {
        setAzimuth(remoteAzimuth);
        // console.log(remoteAzimuth);
    }

    const setElevationRemote = (remoteElevation) => {
        setElevation(remoteElevation);
        // console.log(remoteElevation);
    }

    const setElevationFromStatus = (remoteElevation) => {
        setElevation(remoteElevation);
        // console.log(remoteElevation);
    }

    const setDomeAzRemote = (remoteDomeAz) => {
        setDomeAz(remoteDomeAz);
        // console.log(remoteDomeAz);
    }

    const setDomeAzFromStatus = (remoteDomeAz) => {
        setDomeAz(remoteDomeAz);
        // console.log(remoteDomeAz);
    }

    const setDomeShutRemote = (remoteDomeShut) => {
        setDomeShut(remoteDomeShut);
        // console.log(remoteDomeAz);
    }

    return (
        <Container fluid style={{ width: "98%", height: "100%" }}>
            <ICNavbar />

            {/* Add a little space at the top, below the Navbar, above the Grid. */}
            console.log(trackOn);
            <Row style={{ marginLeft: 0, marginRight: 0 }} ><p />
                <StatusWindow
                    setAzimuthFromStatus={setAzimuthFromStatus}
                    setElevationFromStatus={setElevationFromStatus}
                    setDomeAzFromStatus={setDomeAzFromStatus}
                    getTrack={getTrack} />
            </Row>
            <Row style={{ marginLeft: 0, marginRight: 0 }} >
                <Col md="auto"><ThreeD azimuth={azimuth}
                    elevation={elevation} dome_az={dome_az}
                    dome_shut={dome_shut} trackOn={trackOn} /></Col>
                {/* <Col md="auto"><CanvasControls /></Col> */}
                <Col md="auto"><Controls
                    setAzimuthRemote={setAzimuthRemote}
                    setElevationRemote={setElevationRemote}
                    setDomeAzRemote={setDomeAzRemote}
                    setDomeShutRemote={setDomeShutRemote}
                    trackSwitchAction={trackSwitchAction}
                /></Col>
            </Row>

            <p />
        </Container >
    )
}

export default MainPage;
