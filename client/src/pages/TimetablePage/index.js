import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';
import { SearchBar } from '../../components';
import { SERVERURL } from '../../commons/constants';

export default function TimetablePage({ location }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(`${SERVERURL}/api/lecture/search?search=${search}`).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
    });
  }, [search]);

  return (
    <div className="TimetablePage">
      <div className="Header">
        <div className="Icon">🗓</div>
        <div className="TimetableTitle">예비시간표1</div>
      </div>
      <div className="Body">
        <div className="SearchTab">
          <div className="TabBar">
            <div className="Chip selected">강의 검색</div>
            <div className="Chip">강의 즐겨찾기</div>
          </div>
          <SearchBar onSearchSubmit={(search) => setSearch(search)} />
          <div className="SearchResult"></div>
        </div>
        <div className="TimetableTab">
          <div className="TimetableSidebar"></div>
          <div className="Timetable">
            <div className="TimetableHeader">
              <div className="DayIndicator"></div>
              <div className="DayIndicator">월</div>
              <div className="DayIndicator">화</div>
              <div className="DayIndicator">수</div>
              <div className="DayIndicator">목</div>
              <div className="DayIndicator">금</div>
              <div className="DayIndicator">토</div>
            </div>
            <div className="TimetableBody">
              <div className="PeriodIndicator">1</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">2</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">3</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">4</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">5</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">6</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">7</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">8</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodIndicator">9</div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
              <div className="PeriodGrid"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
