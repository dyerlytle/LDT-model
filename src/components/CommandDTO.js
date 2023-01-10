import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import configData from "../config.json";

class CommandDTO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Type Commands Here'
        };
        console.log(configData.Camera_Broadcast_Topic)
    }

    render() {
        return (
            <label>
                <textarea id="commandarea" name="command"
                    rows="1" cols="80" defaultValue={this.state.value} />
            </label>
        );
    }
}

export default CommandDTO;
