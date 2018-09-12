class ScoreboardModel {
    getData() {
        return fetch('/api/scoreboard')
    }
}

export {ScoreboardModel}