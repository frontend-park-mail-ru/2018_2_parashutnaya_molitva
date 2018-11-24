import Api from "../../lib/api";
import Game from "../../lib/chess/game";
import {GAME, ROUTER, SERVICE} from "../../lib/eventbus/events";
import {COLOR} from "../../components/chess/consts";
import Net from "../../lib/net";
import {User} from '../../lib/user.js';

export default class GameOnlineModel {
    constructor({eventBus = {}} = {}) {
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent(GAME.MOVE, this._onTryMove.bind(this));
        this._eventBus.subscribeToEvent(GAME.FIND_ROOM, this._onFindRoom.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH, this._onCheckAuth.bind(this));
        this._game = new Game();
    }

    _onCheckAuth(){
        if (!User.checkUser()) {
            Api.checkSession()
                .then(response => {
                    if (response.status !== 200) {
                        response.json().then(data => this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {
                            isAuth: false,
                        }));
                    } else {
                        response.json().then(data => this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {
                            isAuth: true,
                        }));
                    }
                })
                .catch(error => console.error(error));
        } else {
            this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {
                isAuth: true,
            })
        }
    }

    _onFindRoom({duration = 5*60} = {}) {
        console.log('find room');
        Api.findRoom({duration: duration})
            .then(response => {
                if (response.status !== 200){
                    console.log("Error status: " + response.status);
                } else {
                    response.json()
                        .then(data => {
                            if (!data.roomid) {
                                console.log("Invalid room id:" + data.roomid);
                            } else {
                                console.log("Connecting");
                                this._duration = duration;
                                this._onInitGame({roomid: data.roomid});
                            }
                        })
                }
            })
    }

    _onInitGame({roomid = ''} = {}) {
        this._ws = new WebSocket(Api.getGameAddress());
        this._ws.onopen = () => {
            this._ws.send(JSON.stringify({MsgType: "init", Data: {roomid}}));
        };

        this._ws.onerror = (event) => {
            // Добавить реконнект
            console.log("On error" + event.message);
        };

        this._ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.MsgType) {
                case "start":
                    Api.loadUser(msg.Data.guid)
                        .then((user) => {
                                const color = (msg.Data.color === 'w'? COLOR.WHITE : COLOR.BLACK);
                                const rival = {
                                    avatar: user.avatar === "" ? 'images/default-avatar.svg' : Net.getStorageURL() + user.avatar,
                                    score: user.score,
                                    email: user.email,
                                };

                                const you = {
                                    avatar: User.avatar,
                                    score: User.score,
                                };

                                this._eventBus.triggerEvent(GAME.START_GAME, {duration: this._duration,
                                    color, rival, you});
                        }).catch(()=> {
                            console.log("error load user");
                        });
                    break;
                case "turn":
                    this._game.move(msg.Data.turn);
                    this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, this._game.boardString(), this._game.turn());
                    break;
                case "result":
                    this._eventBus.triggerEvent(GAME.GAMEOVER, msg.Data);
                    break;
                case "error":
                    this._eventBus.triggerEvent(SERVICE.ON_ERR, msg.Data);
                    break;
            }
            console.log("On message" + event.data);
        };

        this._ws.onclose = (event) => {
            console.log("Close - Code: " + event.code + " reason" + event.reason);
            this._eventBus.triggerEvent(SERVICE.ON_CLOSE, event)
        };
    }

    _onTryMove(data) {
        if (!data.turn) {
            console.log("no turn");
            return;
        }

        let turn = {
            MsgType: "turn",
            Data: {
                turn: data.turn,
            }
        };

        this._ws.send(JSON.stringify(turn));
    }

}