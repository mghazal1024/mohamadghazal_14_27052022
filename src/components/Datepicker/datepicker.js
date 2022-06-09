import React, {useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowCircleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './datepicker.scss';

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);

const DatePicker = ( props ) => {

    const { handleSelection } = props;


    const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdaysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getDayDetails = (args) => {
        let date = args.index - args.firstDay; 
        let day = args.index%7;
        let prevMonth = args.month-1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month, 
            timestamp,
            dayString: daysArray[day]
        }
    }

    const getMonthDetails = (year, month) => {
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;

        for( let row = 0; row < rows; row ++) {
            for (let col = 0; col < cols; col ++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++
            }
        }
        return monthArray;
    }


    const isCurrentDay = (day) => {
        return day.timestamp === todayTimestamp;
    }

    const isSelectedDay = (day) => {
        return date.timestamp === selectedDay;
    }

    const getStringMonth = (month) => monthsArray[Math.max(Math.min(11, month), 0)] || 'Month';

    // STATE

    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [selectedDay, setSelectedDay] = useState(todayTimestamp)
    const [monthDetails, setMonthDetails] = useState(getMonthDetails(year, month));
    const [showCalendar, setShowCalendar] = useState(false)

    const inputRef = useRef(null);


    // METHODS
    const dateClick = (day) => {
        setSelectedDay(day.timestamp);
        setDate(new Date(day.timestamp));
        setShowCalendar(false);
        let dateString = new Date(day.timestamp).toLocaleDateString();
        inputRef.current.value = dateString;
    }

    const changeYear = (offset) => {
        let nyear = year + offset;
        let nmonth = month;
        setYear(nyear);
        setMonthDetails(getMonthDetails(nyear, nmonth));
        // setShowCalendar(true);
    }

    const changeMonth = (offset) => {
        let nyear = year;
        let nmonth = month + offset;
        if(month === -1) {
            nmonth = 11;
            nyear--;
        } else if(nmonth === 12) {
            nmonth = 0;
            nyear++;
        }
        setYear(nyear);
        setMonth(nmonth);
        setMonthDetails(getMonthDetails(nyear, nmonth));
    }

    // -----

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowCalendar(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setShowCalendar(false);
            }
        })
    })

    useEffect(() => {
        handleSelection(date);
    }, [date]);



    // renders the calendar selection box
    
    return (
        <div className='datepicker'>
            <div className='datepicker__input'>
                <input type='text' value={date.toLocaleDateString()} readOnly onClick={() => {setShowCalendar(true)}} />
            </div>

            <div  className={`datepicker__calendar ${ showCalendar ? 'datepicker__calendar--show' : '' }`}>
                <div className='datepicker__header'>
                    <div onClick={() => {changeYear(-1)}} className='datepicker__arrow datepicker__arrow-prev-year'>
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </div>

                    <div onClick={() => {changeMonth(-1)}} className='datepicker__arrow datepicker__arrow-prev-month'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className='datepicker__header-text'>
                        <h2>{year}</h2>
                        <p>{getStringMonth(month)}</p>
                    </div>
                    <div onClick={() => {changeMonth(1)}} className='datepicker__arrow datepicker__arrow-next-month'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div onClick={() => {changeYear(1)}} className='datepicker__arrow datepicker__arrow-next-year'>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </div>
                </div>
                <div className='datepicker__body'>
                    <ul className='datepicker__daynames-list'>
                        {weekdaysArray.map((day, i) => {
                            return (
                                <li key={i} className='datepicker__daynames-list-item'>{day}</li>
                            )
                        })}
                    </ul>
                    <ul className='datepicker__days-list'>
                        {monthDetails.map((day, i) => {
                            return (
                                <li key={i} className='datepicker__days-list-item' onClick={() => {dateClick(day)}}>{day.date}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DatePicker