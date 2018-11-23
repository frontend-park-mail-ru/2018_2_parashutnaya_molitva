export default class UserInfo {
    render() {
        return `
        <div class="user-info">
            <div class="user-info__text column">
                <div class="text-h2">
                    Nickname
                </div>
                <div class="js-header-score text-base">
                    1001
                </div>
            </div>
            <div class="header-bar__column">
                <img class="header-bar__avatar"></img>
            </div>
            <div class="header-bar__column">
                <img src="../images/dropdown.svg" class="header-bar__dropdown-array js-dropdown-array"></img>
            </div>
        </div>`
    }
}
