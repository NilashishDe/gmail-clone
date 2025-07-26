import React from 'react';
import { useSelector } from 'react-redux';
import { MdStarBorder } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Sent = () => {
    const { sentEmails } = useSelector(store => store.app);
    const navigate = useNavigate();

    const openMail = (id) => {
        navigate(`/mail/${id}`)
    }

    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            <div className='p-2'>
                {
                    sentEmails && sentEmails.map(email => (
                        <div onClick={() => openMail(email._id)} key={email._id} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
                            <div className='flex items-center gap-3'>
                                <div className='flex-none text-gray-300'>
                                    <MdStarBorder size={'20px'} />
                                </div>
                                <h4 className='font-semibold'>To: {email.to}</h4>
                            </div>
                            <div className='flex-1 ml-4'>
                                <p className='text-gray-600 truncate'>
                                    <span className='font-semibold'>{email.subject}</span>
                                    <span> - {email.message}</span>
                                </p>
                            </div>
                            <div className='flex-none text-gray-400 text-xs'>
                                <p>{new Date(email.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sent;
