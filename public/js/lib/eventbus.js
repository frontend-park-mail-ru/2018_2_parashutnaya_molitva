export default class EventBus {
    /**
     * @param listOfEvents Array[string] массив ивентов, доступных в этом eventBus
     */
    constructor(listOfEvents) {
        this.events = new Map();
        listOfEvents.forEach((eventName) =>
            this.events.set(eventName, [])
        )
    }

    /**
     * Подписка на событие eventBus
     * @param eventName string имя события
     * @param callback Function функция, которая выполнится при событии
     */
    subscribeToEvent(eventName, callback) {
        if (!this.events.has(eventName)){
            throw "EventBus: Unknown event in";
        }
        
        this.events.get(eventName).push(callback);
    }

    /**
     * Стриггерить все коллбеки ивенты.
     * @param eventName string имя события
     * @param args
     */
    triggerEvent(eventName, ...args) {
        if (!this.events.has(eventName)) {
            throw "EventBus: Unknown event in";
        }
        let eventListeners = this.events.get(eventName);
        eventListeners.forEach((callback) =>
            callback(...args)
        )
    }
}