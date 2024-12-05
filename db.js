export class InMemoryDB {
    _db;
    _temp;
    constructor() {
        this._db = new Map();
        this._temp = undefined;
    }

    begin_transaction() {
        this._temp = new Map(this._db);
    }

    put(key, value) {
        if (this._temp) {
            this._temp.set(key, value);
        }
        else {
            throw new Error("No transaction to put");
        }
    }

    get(key) {
        return this._db.get(key);
    }

    commit() {
        if (this._temp) {
            this._db = new Map(this._temp);
            this._temp = undefined;
        }
        else {
            throw new Error("No transaction to commit");
        }
    }

    rollback() {
        if (this._temp) {
            this._temp = undefined;
        }
        else {
            throw new Error("No transaction to rollback");
        }
    }
}