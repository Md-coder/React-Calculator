import React from 'react';
import './Screen.css';

const Screen = ({ value }) => {
  return (
    <div>
      <input type='text' className='screen' readOnly value={value}></input>
    </div>
  );
};

export default Screen;
