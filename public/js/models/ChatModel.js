import Api from "../lib/api";
import {VIEW} from "../lib/eventbus/events";
import {User} from "../lib/user.js";

const msg = {
    "MsgType" : "",
    "Data" : {},
};


// login, msg
const msgSend = {
    "MsgType" : "msg",
};

const msgGetGlobal = {
    "MsgType" : "getGlobal",
};

const msgGetDial = {
    "MsgType" : "getDial",
};



export default class ChatModel {
    constructor ({ eventBus = {} } = {}) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('sendMessage', this._onSendMessage.bind(this));
        this._eventBus.subscribeToEvent(VIEW.RENDER, this._onRender.bind(this));
        this._ws = {}
    }

    _onRender() {
        // this._ws = new WebSocket(Api.getChatAddress());

        // this._initCallbacks();


     }

    _initCallbacks() {
        this._ws.onopen = () => {
            console.log("On open")
        };

        this._ws.onmessage = (ev) => {
            const frame = JSON.parse(ev.data);

            switch (frame.MsgType) {
                case "msg":
                    const incomeMsg = JSON.parse(msg.Data);
                    this._resolveMessage({msg:incomeMsg});
                    break;
                case "getGlobal":
                    this._resolveGlobal({msg: JSON.parse(msg.Data)});
                    break;
                case "getDial":
                    this._resolveDial({msg: JSON.parse(msg.Data)});
                    break;

            }

        }
    }

    _resolveGlobal({msg = {}}) {
    }

    _resolveDial({msg = {}}) {

    }

    _resolveMessage({msg = {}}) {
        this._eventBus.triggerEvent('messageReceived', {message: msg.msg, login: msg.login});
    }

    _loadGlobal({date = 0, limit = 10}) {
        const msg = {
            ...msgGetGlobal,
            "Data" : {
                "date" : date,
                "limit" : limit,
            },
        };

        this._ws.send(JSON.stringify(msg));
    }

    _loadDialog({date = 0, limit = 10}) {
        const msg = {
            ...msgGetDial,
            "Data": {
                "date" : date,
                "limit" : limit,
            },
        };
        this._ws.send(JSON.stringify(msg));
    }

    _onSendMessage ({message = "", to = ""} = {}) {

        const sendMsg = {
            ...msgSend,
            "Data" : {
                "from" : User.login || "",
                "to" : to,
                "msg" : message,
            },
        };

        // this._ws.send(sendMsg);

        console.log(JSON.stringify(sendMsg));

        this._eventBus.triggerEvent('messageReceived', {message, login: User.login, avatar: User.avatar});
    }
}
