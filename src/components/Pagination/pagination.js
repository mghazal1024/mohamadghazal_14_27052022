import React from 'react';

const Pagination = ({ pageNumbers, paginate}) => {
    return (
        <ul className='employee__pagination'>
            {pageNumbers.map( number =>  (
                <li key={number} onClick={() => {paginate(number)}}>{number}</li>
            ))}
        </ul>
    )
}

export default Pagination