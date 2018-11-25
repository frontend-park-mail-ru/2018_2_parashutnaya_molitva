import Api from "../../lib/api";
import Game from "../../lib/chess/game";
import {GAME, HEADER, ROUTER, SERVICE, VIEW} from "../../lib/eventbus/events";
import {COLOR} from "../../components/chess/consts";
import Net from "../../lib/net";
import {User} from '../../lib/user.js';

const close1013Msg = "Sorry, but there's no opponent for you. Try again later";
const closeUnexpected = "Unexpected error. Try again later";

const turnMsg = {
    "MsgType" : "turn",
};

const surrender = {
    "MsgType" : "surrender",
};

export default class GameOnlineModel {
    constructor({eventBus = {}, globalEventBus = {}} = {}) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
        this._eventBus.subscribeToEvent(GAME.MOVE, this._onMove.bind(this));
        this._eventBus.subscribeToEvent(GAME.FIND_ROOM, this._onFindRoom.bind(this));
        this._eventBus.subscribeToEvent(GAME.PROMOTION_RESPONSE, this._onPromotionResponse.bind(this));
        this._eventBus.subscribeToEvent(GAME.SURRENDER, this._onSurrender.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH, this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent(VIEW.CLOSE, this._onViewClose.bind(this));


        this._game = null;
    }

    _onPromotionResponse({figure}) {
        if (!this._promotionMove) {
            return;
        }

        this._onMove({move:this._promotionMove + figure});
    }

    _onViewClose() {
        this._ws.onclose = () => null;
        this._ws.close();
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
                .catch(error => {
                    console.error(error);
                    this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {isAuth: false, error});
                });
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

    _onSurrender(){
        this._ws.send(JSON.stringify(surrender));
    }

    _onInitGame({roomid = ''} = {}) {
        this._game = new Game();
        this._ws = new WebSocket(Api.getGameAddress());
        this._ws.onopen = () => {
            this._ws.send(JSON.stringify({MsgType: "init", Data: {roomid}}));
        };

        this._ws.onerror = (event) => {
            console.log("On error" + event.message);
        };

        this._ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.MsgType) {
                case "start":
                    this._onStartMsg({msg});
                    break;
                case "turn":
                    this._onTurnMsg({msg});
                    break;
                case "result":
                    this._onResultMsg({msg});
                    break;
                case "error":
                    this._onErrorMsg({msg});
                    break;
            }
            console.log("On message" + event.data);
        };

        this._ws.onclose = (event) => {
            console.log("Close - Code: " + event.code + " reason" + event.reason);
            switch (event.code) {
                case 1013:
                    this._eventBus.triggerEvent(SERVICE.ON_CLOSE, {message: close1013Msg});
                    break;
                default:
                    this._eventBus.triggerEvent(SERVICE.ON_CLOSE, {message: closeUnexpected});
                    break;
            }
        };
    }

    _onStartMsg({msg = {}} = {}) {
        Api.loadUser(msg.Data.guid)
            .then((user) => {
                const color = (msg.Data.color === 'w'? COLOR.WHITE : COLOR.BLACK);
                this._yourColor = (msg.Data.color === 'w');
                const rival = {
                    avatar: user.avatar === "" ? 'images/default-avatar.svg' : Net.getStorageURL() + user.avatar,
                    score: user.score,
                    email: user.email,
                    login: user.login,
                };

                const you = {
                    avatar: User.avatar,
                    score: User.score,
                    login: User.login,
                };

                this._eventBus.triggerEvent(GAME.START_GAME, {duration: this._duration,
                    color, rival, you});
            }).catch(()=> {
            console.log("error load user");
        });
    }

    _onTurnMsg({msg = {}} = {}) {
        this._game.move(msg.Data.turn);
        this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, {state: this._game.boardString(),
            turn: this._game.turn(), deadPiece: this._game.findNewDeadPiece(), yourColor: this._yourColor});
    }

    _onResultMsg({msg = {}} = {}) {
        this._eventBus.triggerEvent(GAME.GAMEOVER, {result: msg.Data});
        this._globalEventBus.triggerEvent(HEADER.LOAD);
    }

    _onErrorMsg({msg = {}} = {}) {
        this._eventBus.triggerEvent(SERVICE.ON_ERR, msg.Data);
    }



    _onMove({move = ""} = {}) {
        if (!move) {
            console.log("no turn");
            return;
        }

        if (this._game.legalMoves().includes(move)) {
            let turn = {
                ...turnMsg,
                Data: {
                    turn: move,
                }
            };

            this._ws.send(JSON.stringify(turn));
        } else if (this._game.isLegalPromotionMove(move)) {
            this._promotionMove = move;
            this._eventBus.triggerEvent(GAME.PROMOTION, {turn: this._game.turn()});
        }

    }

}