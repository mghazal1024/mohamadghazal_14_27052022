// import React, {useState, useRef, useEffect} from 'react'
// import './dropdown.scss'

// const Dropdown = (props) => {

//     const [dropdownActive, setDropdownActive] = useState(false)
//     const {list, title} = props

//     const handleDropdownActive = () => {
//         setDropdownActive(!dropdownActive);
//     }
//     return (
//         <div className='dropdown'>
//             <div className='dropdown__block dropdown__block--title' onClick={handleDropdownActive}>
//                 <p className='dropdown__title'>{`Select a ${title}`}</p>
//             </div>
//             <div className='dropdown__block'>
//                 <ul className={`dropdown__list ${ dropdownActive ? 'dropdown__list--active' : '' }`}>
//                     {list.map((li, i) => {
//                         return (
//                             <li key={i} className='dropdown__list-item'>{li}</li>
//                         )
//                     })}
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Dropdown



import React, {useState, useRef, useEffect} from 'react'
import './dropdown.scss'

const Dropdown = (props) => {

    const [dropdownActive, setDropdownActive] = useState(false);
    const [selection, setSelection] = useState('');

    const ref = useRef(null);
    const title = useRef(null);

    const {list, name, handleSelection, reset} = props

    const handleDropdownActive = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setDropdownActive(false);
        }
        if (!dropdownActive && title.current && title.current.contains(e.target)) {
            setDropdownActive(true);
        }
    };

    useEffect(() => {
            document.addEventListener('click', handleDropdownActive, true);
        return () => {
            document.removeEventListener('click', handleDropdownActive, true);
        }
    });

    useEffect(() => {
        setSelection('')
    }, [reset])

    const handleChange = (data) => {
        handleSelection(data)
    }
    return (
        <div className='dropdown'>
            <div ref={title} className='dropdown__block dropdown__block--title' onClick={() => handleDropdownActive}>
                <p className='dropdown__title'>{!selection ? `Select a ${name}` : selection}</p>
            </div>
            <div className='dropdown__block'>
                <ul ref={ref} className={`dropdown__list ${ dropdownActive ? 'dropdown__list--active' : '' }`}>
                    {list.map((li, i) => {
                        return (
                            <li key={i} className='dropdown__list-item' onClick={() => { setSelection(li); setDropdownActive(false); handleChange(li)} }>{li}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown