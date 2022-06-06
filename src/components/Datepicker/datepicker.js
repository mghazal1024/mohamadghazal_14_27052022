import React, {useEffect, useState, useRef } from 'react';
import './datepicker.scss';

const DatePicker = () => {
    return (
        <div className='datepicker'>
            <div className='datepicker__header'>
                <div className='datepicker__arrow datepicker__arrow-left'>
                    <p>prev</p>
                </div>
                <div className='datepicker__header-text'>
                    <h2>2022</h2>
                    <p>June</p>
                </div>
                <div className='datepicker__arrow datepicker__arrow-right'>
                    <p>next</p>
                </div>
            </div>
            <div className='datepicker__body'>
                <ul className='datepicker__daynames-list'>
                    <li className='datepicker__daynames-list-item'>Sun</li>
                    <li className='datepicker__daynames-list-item'>Mon</li>
                    <li className='datepicker__daynames-list-item'>Tue</li>
                    <li className='datepicker__daynames-list-item'>Wed</li>
                    <li className='datepicker__daynames-list-item'>Thu</li>
                    <li className='datepicker__daynames-list-item'>Fri</li>
                    <li className='datepicker__daynames-list-item'>Sat</li>
                </ul>
                <ul className='datepicker__days-list'>
                    <li className='datepicker__days-list-item'>1</li>
                    <li className='datepicker__days-list-item'>2</li>
                    <li className='datepicker__days-list-item'>3</li>
                    <li className='datepicker__days-list-item'>4</li>
                    <li className='datepicker__days-list-item'>5</li>
                    <li className='datepicker__days-list-item'>6</li>
                    <li className='datepicker__days-list-item'>7</li>
                    <li className='datepicker__days-list-item'>8</li>
                    <li className='datepicker__days-list-item'>9</li>
                    <li className='datepicker__days-list-item'>10</li>
                    <li className='datepicker__days-list-item'>11</li>
                    <li className='datepicker__days-list-item'>12</li>
                    <li className='datepicker__days-list-item'>13</li>
                    <li className='datepicker__days-list-item'>14</li>
                    <li className='datepicker__days-list-item'>15</li>
                    <li className='datepicker__days-list-item'>16</li>
                    <li className='datepicker__days-list-item'>17</li>
                    <li className='datepicker__days-list-item'>18</li>
                    <li className='datepicker__days-list-item'>19</li>
                    <li className='datepicker__days-list-item'>20</li>
                    <li className='datepicker__days-list-item'>21</li>
                    <li className='datepicker__days-list-item'>22</li>
                    <li className='datepicker__days-list-item'>23</li>
                    <li className='datepicker__days-list-item'>24</li>
                    <li className='datepicker__days-list-item'>25</li>
                    <li className='datepicker__days-list-item'>26</li>
                    <li className='datepicker__days-list-item'>27</li>
                    <li className='datepicker__days-list-item'>28</li>
                    <li className='datepicker__days-list-item'>29</li>
                    <li className='datepicker__days-list-item'>30</li>
                    <li className='datepicker__days-list-item'>31</li>
                    <li className='datepicker__days-list-item'>1</li>
                    <li className='datepicker__days-list-item'>2</li>
                    <li className='datepicker__days-list-item'>3</li>
                    <li className='datepicker__days-list-item'>4</li>
                </ul>
            </div>
        </div>
    )
}

export default DatePicker