export default class ScoreboardModel {
    getData() {
        return fetch('/api/scoreboard').json();
    }
}
