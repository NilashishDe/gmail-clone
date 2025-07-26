import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdInbox, MdOutlineDrafts, MdOutlineSend } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';
import { useNavigate } from "react-router-dom";

const sidebarItems = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Inbox"
    },
    {
        icon: <MdOutlineSend size={'20px'} />,
        text: "Sent"
    },
    {
        icon: <MdOutlineDrafts size={'20px'} />,
        text: "Drafts"
    },
]

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }

    return (
        <div className='w-[15%]'>
            <div className='p-3'>
                <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md'>
                    <IoMdAdd size={"24px"} />
                    Compose
                </button>
            </div>
            <div className='text-gray-600'>
                {
                    sidebarItems.map((item, index) => {
                        return (
                            <div key={index} onClick={() => navigateTo(item.text.toLowerCase() === 'inbox' ? '/' : `/${item.text.toLowerCase()}`)} className='flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200 my-2'>
                                {item.icon}
                                <p>{item.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
