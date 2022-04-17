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

export const clearLocalStorageOnLogout = () => {
    LocalStorage.remove("token");
    LocalStorage.remove("valid");
}

export const getLocale = () => {
    return LocalStorage.getItem("locale");
}

export const setLocale = (locale) => {
    return LocalStorage.set("locale", locale);
}