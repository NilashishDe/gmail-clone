import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import useGetAllEmails from '../hooks/useGetAllEmails.js';
import useGetDrafts from '../hooks/useGetDrafts.js';
import useGetSentEmails from '../hooks/useGetSentEmails.js';
import SendEmail from './SendEmail.jsx';

const UserDataFetcher = () => {
  useGetAllEmails();
  useGetDrafts();
  useGetSentEmails();
  return null;
}

const Body = () => {
  const { user, open } = useSelector(store => store.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className='w-full bg-[#F6F8FC] relative'>
      <Navbar />
      <UserDataFetcher />
      <div className='flex'>
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      {open && <SendEmail />}
    </div>
  )
}

export default Body;
