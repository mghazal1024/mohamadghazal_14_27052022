// import React from 'react';
// import Dropdown from '../../components/Dropdown/dropdown'
// import { states, departments } from '../../data/dropdownData'
// import db from '../../firebaseConfig'
// import DatePicker from '../../components/Datepicker/datepicker'

// const EditEmployee = () => {
//     return (
//         <section className='create-employee'>
//                 <h1 className='create-employee__title'>Create Employee</h1>
//                 <div className='create-employee__form-container'>
//                     <form className='create-employee__form'>
//                         <div className='create-employee__form-block'>
//                             <div className='create-employee__input'>
//                                 <label htmlFor='firstName'>First Name</label>
//                                 <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor='lastName'>Last Name</label>
//                                 <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor='date-of-first'>Date of Birth</label>
//                                 <DatePicker
//                                     handleSelection = {handleBirthDateSelection}
//                                 ></DatePicker>
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor="start-date">Start Date</label>
//                                 <DatePicker
//                                     handleSelection = {handleStartDateSelection}
//                                 ></DatePicker>
//                             </div>
//                         </div>
//                         <div className='create-employee__form-block create-employee__form-block--background'>
//                             <div className='create-employee__input'>
//                                 <label htmlFor="street">Street</label>
//                                 <input id="street" type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor="city">City</label>
//                                 <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor="state">State</label>
//                                 <Dropdown
//                                     list = {states}
//                                     name = "state"
//                                     handleSelection = {handleStateSelection}
//                                     reset = {reset}
//                                 ></Dropdown>
//                             </div>

//                             <div className='create-employee__input'>
//                                 <label htmlFor="zip-code">Zip Code</label>
//                                 <input id="zip-code" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
//                             </div>
//                         </div>
//                         <div className='create-employee__form-block'>
//                             <div className='create-employee__input'>
//                                 <label htmlFor="department">Department</label>
//                                 <Dropdown
//                                     list = {departments}
//                                     name = "department"
//                                     handleSelection = {handleDepartmentSelection}
//                                     reset = {reset}
//                                 ></Dropdown>
//                             </div>
//                             <button onClick={handleSubmit}>Save</button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//     )
// }

// export default EditEmployee