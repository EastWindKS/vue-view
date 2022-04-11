import {Loading, Notify} from "quasar";

export const notifyError = (error) => {
    let message = error.response.data;

    if (message === undefined || message === "") {
        message = "Oops... Something go wrong.";
    }

    Notify.create({
        type: 'negative',
        message: message,
    });
    Loading.hide();
    return Promise.reject(error.response.data);
}

export const success = (result) => {
    Loading.hide();
    return Promise.resolve(result.data);
}