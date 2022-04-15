import {Notify} from "quasar";

export const notifyError = (error) => {
    let message = error.response.data;

    if (message === undefined || message === "") {
        message = "Oops... Something go wrong.";
    }

    Notify.create({
        type: 'negative',
        message: message,
    });

    return Promise.reject(error.response.data);
}


