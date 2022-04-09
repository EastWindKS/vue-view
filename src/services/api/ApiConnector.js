import axios from "axios";

export class ApiConnector {

    URI = "https://localhost:7179/api/";

    token;

    constructor(controllerName) {
        this.URI += controllerName + '/';
        this.token = ApiConnector.getTokenFromLocalStorage();
    }

    async get(methodName, queryParams) {
        await axios.get(this.URI + methodName, {
            params: queryParams,
            headers: {
                Authorization: this.token
            }
        }).then(r => console.log(r.data)).catch(e => console.log(e));
    }

    async post(methodName, data) {
        return await axios.post(this.URI + methodName, data, {
            headers: {
                Authorization: this.token
            }
        })
            .then(r => Promise.resolve(r.data))
            .catch(e => Promise.reject(e.response.data));
    }

    static getTokenFromLocalStorage() {
        const token = localStorage.getItem('token');
        if (token === null) {
            return "";
        }

        const bearer = "Bearer";
        return bearer + token;
    }
}
