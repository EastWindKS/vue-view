// import {ref, watch} from "vue";
// import {useI18n} from "vue-i18n/index";
//
// export default function menuItems() {
//     const {t, locale} = useI18n();
//     const menuList = [
//         {
//             label: 'mail',
//             icon: 'mail',
//         },
//         {
//             label: 'counterparties',
//             icon: 'corporate_fare',
//             selectable: false,
//             children: [
//                 {label: 'Organizations', route: "/organizations"},
//             ]
//         }
//     ];
//
//     const setLocale = () => {
//         const menuListWithLocale = menuList.map((menuItem) => {
//             return {...menuItem, label: t(menuItem.label)}
//         });
//
//         return menuListWithLocale;
//     };
//
//     const items = ref(setLocale());
//
//     watch(locale, () => {
//         items.value = setLocale();
//     });
//
//     return {
//         items,
//     }
// }
//
//

export const menuItems = [
    {
        label: 'mail',
        icon: 'mail',
    },
    {
        label: 'counterparties',
        icon: 'corporate_fare',
        selectable: false,
        children: [
            {label: 'Organizations', route: "/organizations"},
        ]
    }
];
