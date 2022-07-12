import {makeAutoObservable} from "mobx";

export default class CompanyStorage{

    constructor() {
        this._companies = []
        this._myCompanies = []
        // для того чтоб потом ре-рендерить навбар
        // this._lastCompanyUploadedStatus = 0
        makeAutoObservable(this)
    }

    get companies() {
        return this._companies;
    }

    set companies(value) {
        this._companies = value;
    }

    get myCompanies() {
        return this._myCompanies;
    }

    set myCompanies(value) {
        this._myCompanies = value;
    }

    addMyCompany(value) {
       this._myCompanies.push(value)
    }
    removeCompany(value) {
        this.myCompanies = this.myCompanies.filter(function(ele){
            return ele._id !== value;
        })
    }
}