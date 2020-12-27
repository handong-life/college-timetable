import React from 'react';
import './style.scss';
import { TIMETABLE_DAYS } from '../../commons/constants';

export default function Timetable() {
  return (
    <div className="Timetable">
      <div className="TimetableHeader">
        {TIMETABLE_DAYS.map((indicator, index) => (
          <div className="DayIndicator" key={index}>
            {indicator}
          </div>
        ))}
      </div>
      <div className="TimetableBody">
        {Array.from(Array(63)).map((value, index) =>
          index % 7 === 0 ? (
            <div className="PeriodIndicator" key={index}>
              {parseInt(index / 7) + 1}
            </div>
          ) : (
            <div className="PeriodGrid" key={index}></div>
          ),
        )}
      </div>
    </div>
  );
}
