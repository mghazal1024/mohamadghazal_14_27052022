import React, {useState, useRef, useEffect} from 'react'
import './dropdown.scss'

const Dropdown = (props) => {

    const {list, name, handleSelection, reset, initialValue} = props

    // STATES
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selection, setSelection] = useState();
    
    // REFS
    const ref = useRef(null);
    const dropdownRef = useRef(null);
    const title = useRef(null);

    // Handles dropdown
    const handleDropdownActive = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setDropdownActive(false);
        }
        if (!dropdownActive && title.current && title.current.contains(e.target)) {
            setDropdownActive(true);
        }
    };

    // Handles data change
    const handleChange = (data) => {
        handleSelection(data)
    }


    // LIFECYCLE of the Component
    useEffect(() => {
        document.addEventListener('click', handleDropdownActive, true);
        dropdownRef.current.addEventListener('focusin', () => {
            setDropdownActive(true);
        })
        dropdownRef.current.addEventListener('focusout', () => {
            setDropdownActive(false);
        })
    },[]);

    useEffect(() => {
        setSelection(initialValue ? initialValue : '')
    }, [reset])

    return (
        <div className='dropdown' tabIndex={0} ref={dropdownRef}>
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