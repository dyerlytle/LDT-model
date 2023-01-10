import React, { useState } from 'react';
import Canvas from "./Canvas";
import {
    Form,
    Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import im1 from "../assets/images/dumbbell-bw.jpg";

function CanvasControls() {

    var childRef = React.useRef(null);
    const [cam_topic, set_cam_topic] = useState(0);
    React.useEffect(() => {
        updateCanvas();
    }, [])

    const updateCanvas = () => {
        const ctx = childRef.current.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        const width = childRef.current.width;
        const height = childRef.current.height;
        var image1 = new Image();
        image1.src = im1;
        image1.onload = function () {
            var hRatio = width / image1.width;
            var vRatio = height / image1.height;
            var ratio = Math.min(hRatio, vRatio);
            ctx.drawImage(image1, 0, 0, image1.width, image1.height,
                0, 0, image1.width * ratio, image1.height * ratio);
        }
    }

    function handleChange(event) {
        set_cam_topic(event);
    }

    return (
        <div id="imdiv">
            {/* s */}
            <Form.Select
                id="camselect"
                size="sm"
                onChange={handleChange}
            >
                <option value="choose">Choose image</option>
                <option value="domecam">Dome Camera</option>
                <option value="allsky">All Sky Camera</option>
                <option value="lastfits">Latest FITS image</option>
            </Form.Select>
            <div id="cdiv">
                <Canvas forwardedRef={childRef} />
            </div>
            <div id="navi">
                <Button variant="outline-danger" size="sm"
                    style={{ width: "30px", height: "30px" }}>+</Button>
                <br></br>
                <Button variant="outline-danger" size="sm"
                    style={{ width: "30px", height: "30px" }}>-</Button>
            </div>
        </div >
    );

}

export default CanvasControls;
