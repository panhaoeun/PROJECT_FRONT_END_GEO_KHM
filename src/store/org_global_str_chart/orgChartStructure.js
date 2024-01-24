// const panzoom = require("panzoom");
import "core-js/es/map";
import 'core-js/es/set';
// const _ = require('lodash');

const state = {
    config: {
        // You can set the header color and title,
        title: {
            color: '#05668d',
            text: 'Interactive organization chart'
        },

        // provide text to display when clicked on the (i) button (you can use HTML). Leave empty if not needed
        information: 'Do you see something wrong?',
        photoUrl: {
            prefix: 'photos/',
            suffix: '.png'
        },
        // Sets the inital options (the user can change them in the menu bar)
        startView: {
            photos: true,
            names: true,
            columnview: true,
            staffColumnview: false,
            showNrDepartments: true,
            showNrPeople: true
        },
        enableScreenCapture: true,
        //The colors of each level in the org-chart
        levelColors: [
            '#0c058d',
            '#05668d',
            '#8d6e05',
            '#8d2305',
            '#cfb303'
        ],
        // the command to type in the searchbar to switch to edit mode
        editCommand: '_edit',
        dataFields: [{
            name: 'Location',
            type: 'text'
        }]
    },
    uiNames: {
        person: {
            name: 'Name',
            function: 'Function',
            id: 'Employee ID',
            departments: 'Departments'
        },
        sidebar: {
            detailTabName: 'Details',
            peopleTabName: 'People',
            departmentName: 'Name',
            departmentManager: 'Manager',
            departmentDescription: 'Description',
            departmentType: 'Department type',
            departmentHierarchy: 'Hierarchy',
            departmentTypeStaff: 'Staff department',
            departmentTypeNormal: 'Normal department',
            managerOfDepartment: 'Manager of department'
        }
    },
    chart: null,
    people: [],
    assignments: [],
    orgArray: null,
    lines: [],
    showSideScreen: true,
    columnView: true,
    columnView_noStaff: true,
    managerNameView: true,
    managerPhotoView: true,
    activeDepartment: null,
    moveDepartment: null,
    editMode: false,
    showEditMenu: null,
    showViewMenu: null,
    selectedPerson: null,
    onlyShowParents: false,
    zoomInstance: null,
    showNrDepartments: null,
    showNrPeople: null,
    showPerson: null,
    defaultPersonProperties: [{
            name: 'Email',
            type: 'email',
            order: 0
        },
        {
            name: 'Phone',
            type: 'text',
            order: 1
        },
        {
            name: 'Homepage',
            type: 'url',
            order: 2
        },
        {
            name: 'Country',
            type: 'text',
            order: 3
        },
        {
            name: 'City',
            type: 'text',
            order: 4
        },
        {
            name: 'Street',
            type: 'text',
            order: 5
        }
    ]
}
const getters = {

}
const mutations = {}
const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}