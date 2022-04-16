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
            {label: 'organizations', route: "/organizations"},
        ]
    }
];
