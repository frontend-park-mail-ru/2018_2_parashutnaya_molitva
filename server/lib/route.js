
module.exports = class Route{
    constructor(path){
        this.path = path;
    }

    get route(){
        return this.path;
    }

    toString() {
        return this.path;
    }

};
