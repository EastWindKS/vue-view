/**
 * @param row organization object.
 * @param row.country organization country string.
 * @param row.managers organization manager name string.
 * @param row.offices organization offices string.
 */

export default [
    {name: 'name', required: true, label: 'name_item', align: 'left', field: row => row.nativeName, sortable: true},
    {name: 'country', required: true, label: 'country', align: 'left', field: row => row.country, sortable: true},
    {name: 'managers', align: 'center', label: 'managers', field: row => row.managers, sortable: false},
    {name: 'office', align: 'center', label: 'offices', field: row => row.offices, sortable: false}
]