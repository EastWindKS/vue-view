import en from "../locales/en.json";
import ru from "../locales/ru.json";
import {createI18n} from 'vue-i18n/index'
import {Quasar} from 'quasar';

const getLocale = () => {
    const locale = Quasar.lang.getLocale();

    switch (locale) {
        case "ru-RU":
            return "ru";
        default :
            return "en"
    }
}

export default createI18n({
    legacy: false,
    locale: getLocale(),
    messages: {
        en,
        ru
    },
})