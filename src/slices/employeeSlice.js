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
            state.fistName = action.payload
        }
    }
})

export const { addFirstName } = employeeSlice.actions;

export default employeeSlice.reducer;