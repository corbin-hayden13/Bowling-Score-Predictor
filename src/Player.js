export default class Player {
    constructor(index=0, name="", handicap=0) {
        this.index = index;
        this.name = name;
        this.handicap = handicap;
        this.game = new Game();
    }

    setName(newName) {
        this.name = newName;
    }
    setHandicap(newHandicap) {
        this.handicap = newHandicap;
    }


}