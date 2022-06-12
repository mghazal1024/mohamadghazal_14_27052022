import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    employee: {
        firstName: null,
        lastName: null,
        street: null,
        city: null,
        state: null,
        zip: null,
        department: null,
        startDate: null,
        birthDate: null
    }   
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addFirstName: (state, action) => {
            state.firstName = action.payload
            console.log(state.firstName)
        },
        addLastName: (state, action) => {
            state.lastName = action.payload
        },
        addBirthDate: (state, action) => {
            state.birthDate = action.payload
        },
        addStartDate: (state, action) => {
            state.startDate = action.payload
        },
        addStreet: (state, action) => {
            state.street = action.payload
        },
        addCity: (state, action) => {
            state.street = action.payload
        },
        addState: (state, action) => {
            state.state = action.payload
        },
        addZip: (state, action) => {
            state.zip = action.payload
        },
        addDepartment: (state, action) => {
            state.department = action.payload
        }
    }
})

export const { addFirstName, addLastName, addBirthDate, addStartDate, addStreet, addCity, addState, addZip, addDepartment } = employeeSlice.actions;

export default employeeSlice.reducer;