import {makeAutoObservable} from "mobx";

export default class UserStorage{

    constructor() {
        this._isAuthenticated = false
        this._user = {}
        this._updateUserStorage = 0
        makeAutoObservable(this)
    }


    get isAuthenticated() {
        return this._isAuthenticated;
    }

    set isAuthenticated(bool) {
        this._isAuthenticated = bool;
    }

    get user() {
        return this._user
    }

    set user(value) {
        this._user = value
    }

    get updateUserStorage() {
        return this._updateUserStorage;
    }

    set updateUserStorage(value) {
        this._updateUserStorage = value;
    }
}