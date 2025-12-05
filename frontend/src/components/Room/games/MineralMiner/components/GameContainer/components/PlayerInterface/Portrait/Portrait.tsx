import React from 'react';
import Advisor from '../../../../../assets/advisor.gif';
import './Portrait.scss';

export const Portrait = () => {
  return (
    <div className="portrait">
      <img src={Advisor} alt="advisor" title="advisor" />
    </div>
  );
};
