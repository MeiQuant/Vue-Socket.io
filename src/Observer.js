import Emitter from './Emitter'
import Socket from 'socket.io-client'

export default class{

    constructor(uri, opts) {

        this.Socket = Socket(uri, opts)
        this.onEvent()
    }

    onEvent(){
        this.Socket.onevent = (packet) => {
            Emitter.emit(packet.data[0], packet.data[1])
        }

        let _this = this;

        const listeners = Emitter.getListeners()

        listeners.forEach((_listeners, label) => {
            if (_listeners && _listeners.length) {
                _this.Socket.on(label, (data) => {
                    Emitter.emit(label, data)
                })
                return true;
            }
        })

        const events = [
            "connect",
            "error",
            "disconnect",
            "reconnect",
            "reconnect_attempt",
            "reconnecting",
            "reconnect_error",
            "reconnect_failed",
            "connect_error",
            "connect_timeout",
            "connecting",
            "ping",
            "pong"
        ]

        events.forEach((value) => {
            _this.Socket.on(value, (data) => {
                Emitter.emit(value, data)
            })
        })
    }

}
