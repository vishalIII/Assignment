import React from 'react';

const Pagination = ({ onPrev, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev}>Previous Week</button>
      <button onClick={onNext}>Next Week</button>
    </div>
  );
};

export default Pagination;
