import React from 'react';

const PMItem = ({ name, time, date, tag }) => {
  return (
    <div className="pm-item">
      <h4>{name}</h4>
      <p>{time}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
      <span className="tag">{tag}</span>
    </div>
  );
};

export default PMItem;
