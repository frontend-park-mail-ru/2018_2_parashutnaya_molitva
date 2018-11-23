export default class UserBlock {
    constructor({userinfoComponent = {}, timerComponent = {}, iconsPresenterComponent = {} = {}} {
        this._userinfoComponent = userinfoComponent;
        this._timerComponent = timerComponent;
        this._iconsPresenterComponent = iconsPresenterComponent;
    }
}