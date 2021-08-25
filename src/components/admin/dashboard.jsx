import React, { useEffect, useState } from 'react';
import UsersTable from './usersTable';
import EventsTable from './eventsTable';
import EventsForm from './eventsForm';

const DashboardAdmin = () => {
  return (
    <div className='flex justify-between'>
      <UsersTable />
      <EventsForm />
      <EventsTable />
    </div>
  );
};

export default DashboardAdmin;
