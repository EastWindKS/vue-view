import en from "../locales/en.json";
import ru from "../locales/ru.json";
import {createI18n} from 'vue-i18n/index'
import {Quasar} from 'quasar';
import {getLocale} from "../services/localStorageWorker";
import {setLocale} from "../services/localStorageWorker";

const definitionLocale = () => {
    let locale = getLocale();
    if (locale === undefined || locale === null) {
        locale = Quasar.lang.getLocale();
    }

    switch (locale) {
        case "ru-RU":
            setLocale("ru-RU");
            return "ru";
        default :
            setLocale("en");
            return "en"
    }
}

export default createI18n({
    legacy: false,
    locale: definitionLocale(),
    messages: {
        en,
        ru
    },
})