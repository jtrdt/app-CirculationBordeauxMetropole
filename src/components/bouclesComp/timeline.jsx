import React, { useState } from 'react';

const TimeLine = props => {
  const [date, setDate] = useState(props.sendedDate.date);
  const now = Date.now();

  const dateAlert = days => {
    if (date) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      if (now > result) {
        return true;
      }
      return false;
    }
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
        <td className='px-6 py-1 whitespace-nowrap bg-red-600 text-center'>
          <span>j+{since()}</span>
        </td>
      );
    }
    if (dateAlert(45) && !dateAlert(90)) {
      return (
        <td className='px-6 py-1 whitespace-nowrap bg-yellow-500 text-center'>
          <span>j+{since()}</span>
        </td>
      );
    }
    return (
      <td className='px-6 py-1 whitespace-nowrap bg-green-500 text-center'>
        <span>j+{since()}</span>
      </td>
    );
  }
  return <td className='p-1 text-center w-20'></td>;
};

export default TimeLine;
