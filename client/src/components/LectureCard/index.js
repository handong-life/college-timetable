import React from 'react';
import './style.scss';

export default function LectureCard({ lecture, onAddClick, onBookmarkClick, onUnbookmarkClick }) {
  return (
    <div className="LectureCard">
      <div className="First">
        <div className="Name">{lecture.name}</div>
        <div className="Professor">
          {lecture.professor}/{lecture.credit}학점
        </div>
        <div className="Code">{lecture.code}</div>
      </div>
      <div className="Second">
        <div className="Hakbu">{lecture.hakbu}</div>
        <div className="Gubun">{lecture.gubun}</div>
        <div className="Gyoyang">{lecture.gyoyang}</div>
      </div>
      <div className="Third">
        {lecture.period.split(',').map((period, index) => (
          <div key={index} className="Period">
            {period}
          </div>
        ))}
        <div className="ButtonBar">
          <div className="Button" onClick={onAddClick}>
            ➕
          </div>
          {lecture.isBookmarked ? (
            <div className="Button" onClick={onUnbookmarkClick}>
              ❌
            </div>
          ) : (
            <div className="Button" onClick={onBookmarkClick}>
              ⭐️
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
