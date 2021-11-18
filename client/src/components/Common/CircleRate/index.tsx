import React from 'react';

interface IProps {
  width?: string;
  rate: number;
}

const CircleRate: React.FC<IProps> = ({ width, rate }) => {
  const total = rate || 0;
  const percentage = Math.min(Math.max(0, total * 20), 100);

  /*
    2021-11-17
    송명회
    코드 참고: https://codepen.io/sergiopedercini/pen/jmKdbj
  */
  return (
    <div style={{ width: width ?? '150px' }}>
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#EEEEEE"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeDasharray={`${percentage}, 100`}
          fill="none"
          stroke="#33AB74"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="18" y="20.35" textAnchor="middle" fontSize="0.5em">
          {isNaN(rate) ? 'N/A' : rate.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default CircleRate;
