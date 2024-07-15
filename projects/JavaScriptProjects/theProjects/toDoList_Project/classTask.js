export default class Task {
    id;
    name;
    creationDate;
    complete;

    getSimpleDate() {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        return `${day}-${month}-${year}`;
    };

    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.creationDate = this.getSimpleDate();
        this.complete = false;
    };
}