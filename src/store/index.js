import create from 'zustand';
import employeesData from '../data/employeesData.json'

const useStore = create(set => ({
  employees: employeesData,
  addEmployee: employee =>
    set(state => ({
      employees: [
        {
          id: Math.random() * 100 + '',
          firstName: employee.firstName,
          lastName: employee.lastName,
          street: employee.street,
          city: employee.city,
          state: employee.state,
          zip: employee.zip,
          birthDate: employee.birthDate,
          startDate: employee.startDate,
          department: employee.department
        },
        ...state.employees
      ]
    })),
}));
export const useEmployeesStore = useStore;