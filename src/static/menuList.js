export const menuList = [
    {
        label: 'Mail',
        icon: 'mail',

    },
    {
        label: 'Counterparties',
        icon: 'corporate_fare',
        selectable: false,
        children: [
            {label: 'Organizations', routes: "/organizations"},

        ]
    }
];