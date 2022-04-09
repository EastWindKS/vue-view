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
            {label: 'Organizations'},
            {label: 'Leeds'},
            {label: 'Individuals', icon: 'people', route: '/individuals'},
        ]
    }
];