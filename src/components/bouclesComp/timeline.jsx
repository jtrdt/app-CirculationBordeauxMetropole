import React, { useState } from 'react';

const TimeLine = props => {
  const [date, setDate] = useState(props.sendedDate);
  const now = Date.now();

  const dateAlert = days => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    if (now > result) {
      return true;
    }
    return false;
  };

  const since = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date);
    const secondDate = Date.now();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };

  if (date) {
    if (dateAlert(90)) {
      return (
        <td className='border border-black p-1 text-center w-20 bg-red-600'>j-{since()}</td>
      );
    }
    if (dateAlert(45) && !dateAlert(90)) {
      return (
        <td className='border border-black p-1 text-center w-20 bg-yellow-300'>j-{since()}</td>
      );
    }
    return (
      <td className='border border-black p-1 text-center w-20 bg-green-500'>j-{since()}</td>
    );
  }
  return <td className='border border-black p-1 text-center w-20'></td>;
};

export default TimeLine;
