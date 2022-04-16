import {LocalStorage} from "quasar";

export const setToLocalStorageAfterAuth = (responseInfo) => {
    if (responseInfo) {
        LocalStorage.set("token", responseInfo.token);
        LocalStorage.set("valid", responseInfo.valid * 1000);
    }
};

export const isValidToken = () => {
    const validTimestamp = LocalStorage.getItem("valid");
    const dateNow = Date.now();
    return validTimestamp > dateNow;
}

export const clearLocalStorage = () => {
    LocalStorage.clear();
}