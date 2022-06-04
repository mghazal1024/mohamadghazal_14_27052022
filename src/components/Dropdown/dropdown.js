import React, {useState} from 'react'
import './dropdown.scss'

const Dropdown = (props) => {

    const [dropdownActive, setDropdownActive] = useState(false)
    const {list, title, handleResponse} = props

    const handleDropdownActive = () => {
        setDropdownActive(!dropdownActive);
    }
    return (
        <div className='dropdown'>
            <div className='dropdown__block dropdown__block--title' onClick={handleDropdownActive}>
                <p className='dropdown__title'>{`Select a ${title}`}</p>
            </div>
            <div className='dropdown__block'>
                <ul className={`dropdown__list ${ dropdownActive ? 'dropdown__list--active' : '' }`}>
                    {list.map((li, i) => {
                        return (
                            <li key={i} className='dropdown__list-item'>{li}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown