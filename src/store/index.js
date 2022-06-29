import create from 'zustand';
import { persist } from 'zustand/middleware'
import employeesData from '../data/employeesData.json'

import { normalizeText } from '../helpers';

const useStore = create(
  persist (
    (set, get) => ({
      employees: employeesData,
      searchedEmployees: employeesData,
      sorted: false,
      currentPage: 1,
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
      deleteEmployee: (id) => {
        set(state => ({
          employees: state.employees.filter(employee => employee.id !== id)
        }))
        console.log(get().employees)
      },
      searchEmployees: (e) => {
        set(state => ({
          employees: state.searchedEmployee.filter( el => {
            return el.firstName.toLowerCase().includes(e.target.value.toLowerCase())
            || el.lastName.toLowerCase().includes(e.target.value.toLowerCase())
            || el.department.toLowerCase().includes(e.target.value.toLowerCase())
            || el.street.toLowerCase().includes(e.target.value.toLowerCase())
            || el.city.toLowerCase().includes(e.target.value.toLowerCase())
            || el.state.toLowerCase().includes(e.target.value.toLowerCase())
            || el.zip.toString().includes(e.target.value.toLowerCase())
          })
        }))
        console.log(get().mulemployees)
      },
      sortEmployees: ( label ) => {
        if(get().sorted) {
          set(state => ({
            employees: state.employees.sort((a,b) => {
              const aElement = normalizeText(a[label]);
              const bElement = normalizeText(b[label]);
  
              if (aElement < bElement) {
                  return -1
              }
              if (aElement > bElement) {
                  return 1;
              }
              return 0;
          })
          }))
            set(state => ({sorted : !state.sorted}))
        } else {
            set(state => ({
              employees: state.employees.sort((a,b) => {
                const aElement = normalizeText(a[label]);
                const bElement = normalizeText(b[label]);
    
                if (aElement > bElement) {
                    return -1
                }
                if (aElement < bElement) {
                    return 1;
                }
                return 0;
            })
            }))
            set(state => ({sorted : !state.sorted}))
        }
      },
      paginate: (pageNumber) => {
        set( () => ({
          currentPage: pageNumber
        }))
      }
    }),
    {
      name: 'employee-storage'
    }
  )
);
export const useEmployeesStore = useStore;