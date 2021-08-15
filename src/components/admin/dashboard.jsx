import React, { useEffect, useState } from 'react';
import UsersTable from './usersTable';
import EventsTable from './eventsTable';
import EventsForm from './eventsForm';

const DashboardAdmin = () => {
  const [users, setUsers] = useState();
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const userToken = sessionStorage.getItem('user');
    const resUsers = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    const resEvents = await fetch(`${process.env.NEXT_PUBLIC_EVENT_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    const dataUsers = await resUsers.json();
    const dataEvents = await resEvents.json();
    setUsers(dataUsers);
    setEvents(dataEvents);
    setIsLoading(false);
    if (resUsers.status !== 200) {
      window.location.href = '/';
      // sessionStorage.removeItem('user');
    }
  };

  if (users === undefined || events === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex justify-between'>
      <UsersTable data={users} />
      <EventsForm />
      <EventsTable data={events} />
    </div>
  );
};

export default DashboardAdmin;
