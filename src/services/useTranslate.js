import useI18n from "../i18n/index";

export const useTranslate = (obj) => {
    const {t} = useI18n.global
    let newObj = {...obj, label: t(obj.label), children: []};
    if (obj.children) {
        obj.children.forEach((item) => {
            newObj.children.push(useTranslate(item))
        })
    }

    return newObj;
}



