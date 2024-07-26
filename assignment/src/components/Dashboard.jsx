import React, { useState, useEffect } from 'react';
import PMItem from './PMItem';
import Pagination from './Pagination';
import demoData from './demoData';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','sunday'];

const groupByStatus = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {});
};

const Dashboard = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const weekData = getWeekData(currentWeek);
    console.log(`Setting weekData: `, weekData);
    setWeekData(weekData);
  }, [currentWeek, selectedTags]);

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    }
  };

  const getWeekData = (week) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + week * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    console.log(`Current Week Range: ${startOfWeek} - ${endOfWeek}`);

    const weekData = demoData.filter(item => {
      const itemDate = new Date(item.date);
      console.log(`Checking item: ${item.name} on ${item.date}`);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    });

    console.log(`Week Data before filtering:`, weekData);

    return filterByTags(weekData, selectedTags);
  };

  const filterByTags = (data, tags) => {
    if (tags.length === 0) return data;
    return data.filter(item => tags.includes(item.tag));
  };

  const groupedData = groupByStatus(weekData);

  console.log(`Grouped Data:`, groupedData);

  const uniqueTags = [...new Set(demoData.map(item => item.tag))];

  return (
    <div className="dashboard">
      <h1>PM Schedule</h1>
      <div className="tag-filter">
        <h3>Filter by Tags:</h3>
        {uniqueTags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              onChange={handleTagChange}
            />
            {tag}
          </label>
        ))}
      </div>
      <div className="week-schedule">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-column">
            <h2>{day}</h2>
            {Object.entries(groupedData).map(([status, items]) => (
              <div key={status} className={`status-group ${status.toLowerCase()}`}>
                <h3>{status}</h3>
                {items
                  .filter(item => {
                    const itemDate = new Date(item.date);
                    const itemDay = itemDate.getDay();
                    console.log(`Item ${item.name} is on ${daysOfWeek[itemDay]}`);
                    return itemDay === index;
                  })
                  .map((pm, i) => (
                    <PMItem key={i} name={pm.name} time={pm.time} date={pm.date} tag={pm.tag} />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Pagination onPrev={handlePrevWeek} onNext={handleNextWeek} />
    </div>
  );
};

export default Dashboard;
