import axios from "axios";
import {Loading, LocalStorage} from "quasar";
import {notifyError, success} from "../promiseResultService";

export default class ApiWorker {
    //URI = "https://192.168.0.202:44301/api"; // outside server
    URI = "https://localhost:7179/api/"; // localhost server
    token;

    constructor(controllerName) {
        this.URI += controllerName + '/';
        this.token = this.getTokenFromLocalStorage();
    }

    async get(methodName, queryParams) {
        Loading.show({spinnerColor: 'secondary'});
        return await axios.get(this.URI + methodName, {
            params: queryParams, headers: {
                Authorization: this.token
            }
        })
            .then(result => success(result))
            .catch(error => notifyError(error));
    }

    async post(methodName, data) {
        Loading.show({spinnerColor: 'secondary'});
        return await axios.post(this.URI + methodName, data, {
            headers: {
                Authorization: this.token
            }
        })
            .then(result => success(result))
            .catch(error => notifyError(error))
    }

    getTokenFromLocalStorage() {
        const token = LocalStorage.getItem('token');
        if (token === null) {
            return "";
        }

        const bearer = "Bearer ";
        return bearer + token;
    }
}
