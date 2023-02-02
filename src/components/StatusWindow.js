import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import mqtt from "mqtt";


class StatusWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'not tracking',
            stat_topic: 'choose'
        };
        global.outtext = "not tracking";
    }



    // componentDidMount() {
    // this.handleConnect();
    // }

    doConnect = (host, mqttOptions) => {
        console.log(host);
        if (!this.client) {
            this.client = mqtt.connect(host, mqttOptions);
        }
        var tags;
        var i;
        if (this.client) {
            console.log(this.client);
        }

        if (this.client) {
            this.client.on("connect", () => {
                console.log("Connected");
            });
            this.client.on("error", (err) => {
                console.error("Connection error: ", err);
                this.client.end();
            });
            this.client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                const changed = message.toString();
                // var outtext;

                // console.log("got a message");
                var parser = new DOMParser();
                var doc = parser.parseFromString(changed, 'text/xml');

                var az = doc.getElementsByTagName("TCSCurrentAzimuth");
                az = az[0].childNodes[0].nodeValue;
                // console.log(az);
                var el = doc.getElementsByTagName("TCSCurrentElev");
                el = el[0].childNodes[0].nodeValue;
                // console.log(el);
                var mountdomeaz = doc.getElementsByTagName("MountDomeAzimuthDifference");
                mountdomeaz = parseFloat(mountdomeaz[0].childNodes[0].nodeValue);
                if (!mountdomeaz) { mountdomeaz = "0" }
                var azaz = parseFloat(az);

                // console.log(mountdomeaz);
                var domeaz = azaz - parseFloat(mountdomeaz);
                // console.log(domeaz);
                domeaz = domeaz.toString();
                // console.log(this.props.trackOn);
                var oldTrackOn = trackOn;
                var trackOn = this.props.getTrack();
                console.log(trackOn);

                if (trackOn) {
                    this.props.setAzimuthFromStatus(az);
                    this.props.setElevationFromStatus(el);
                    this.props.setDomeAzFromStatus(domeaz);
                    global.outtext = "azimuth: " + az;
                    global.outtext = global.outtext + "\nelevation: " + el;
                    global.outtext = global.outtext + "\ndome-az: " + domeaz;
                } else {
                    global.outtext = "not tracking";
                }

                this.setState({ value: global.outtext });
            });
        }
    };

    handleConnect = () => {
        const url = "ws://joe.lowell.edu:61614/mqtt";
        console.log(url);
        const options = {
            keepalive: 30,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: "WillMsg",
                payload: "Connection Closed abnormally..!",
                qos: 0,
                retain: false,
            },
            clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
            username: "username",
            password: "password",
            rejectUnauthorized: false
        };

        this.doConnect(url, options);
        this.handleSubscribe("tcs/loisTelemetry", 0);
    }


    handleSubscribe = (topic, qos) => {
        console.log("xyz");
        if (this.client) {
            this.client.subscribe(topic, 1, (error) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
            });
        }
    };

    handleUnsub = (topic, qos) => {
        if (this.client) {
            this.client.unsubscribe(topic, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
                this.setState({ isSubed: false });
            });
        }
    };

    // handlePublish = (pubRecord) => {
    //     if (this.client) {
    //         const { topic, qos, payload } = pubRecord;
    //         this.client.publish(topic, payload, { qos }, (error) => {
    //             if (error) {
    //                 console.log("Publish error: ", error);
    //             }
    //         });
    //     }
    // };

    handleDisconnect = () => {
        if (this.client) {
            this.client.end(() => {
                this.setState({ connectStatus: "Connect" });
                this.setState({ client: null });
            });
        }
    };

    render() {
        var trackOn = this.props.getTrack();
        if (trackOn && !this.client) {
            this.handleConnect();
        }
        if (!trackOn) {
            global.outtext = "not tracking";
        }
        return (
            <div>
                <label>
                    <textarea id="statusarea" name="status"
                        rows="10" cols="40" value={this.state.value}
                        readOnly />
                </label>
            </div>
        );
    }
}

export default StatusWindow;
