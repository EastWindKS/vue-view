/**
 * @param row organization object.
 * @param row.country organization country object.
 * @param row.country.internationalName organization country name string.
 * @param row.managers organization manager name string.
 */

export default [
    {name: 'name', required: true, label: 'Name', align: 'left', field: row => row.nativeName, sortable: true},
    {name: 'country', required: true, label: 'Country', align: 'left', field: row => row.country.internationalName, sortable: false},
    // {name: 'managers', align: 'center', label: 'Managers', field: row=>row.managers, sortable: true},

]