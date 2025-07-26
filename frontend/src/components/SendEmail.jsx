import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, setSelectedDraft, setDrafts } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const SendEmail = () => {
    const { selectedDraft, drafts } = useSelector(store => store.app);
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDraft) {
            setTo(selectedDraft.to || "");
            setSubject(selectedDraft.subject || "");
            setMessage(selectedDraft.message || "");
        } else {
            // Clear fields when composing a new message
            setTo("");
            setSubject("");
            setMessage("");
        }
    }, [selectedDraft]);

    const handleCloseAndSaveDraft = async () => {
        if (to || subject || message) {
            try {
                const draftData = { to, subject, message };
                if (selectedDraft) {
                    draftData._id = selectedDraft._id;
                }
                const res = await axios.post('http://localhost:8080/api/v1/draft/save', draftData, { withCredentials: true });
                
                if (selectedDraft) {
                    const updatedDrafts = drafts.map(d => d._id === selectedDraft._id ? res.data.draft : d);
                    dispatch(setDrafts(updatedDrafts));
                } else {
                    dispatch(setDrafts([...drafts, res.data.draft]));
                }
                
                toast.success("Draft saved!");
            } catch (error) {
                console.error("Error saving draft:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Failed to save draft.");
            }
        }
        dispatch(setOpen(false));
        dispatch(setSelectedDraft(null));
    };

    const sendMail = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/email/create', { to, subject, message }, { withCredentials: true });
            toast.success(res.data.message);

            if (selectedDraft) {
                await axios.delete(`http://localhost:8080/api/v1/draft/${selectedDraft._id}`, { withCredentials: true });
                const updatedDrafts = drafts.filter(d => d._id !== selectedDraft._id);
                dispatch(setDrafts(updatedDrafts));
            }
        } catch (error) {
            console.error("Error sending mail:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            dispatch(setOpen(false));
            dispatch(setSelectedDraft(null));
        }
    };

    return (
        // Using 'fixed' positioning ensures it's always in the bottom right of the viewport
        <div className='fixed bottom-0 right-8 bg-white w-[35%] rounded-t-lg shadow-2xl z-10'>
            <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC] rounded-t-lg'>
                <h1>{selectedDraft ? "Draft" : "New Message"}</h1>
                <div onClick={handleCloseAndSaveDraft} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                    <IoMdClose size={'20px'} />
                </div>
            </div>
            <form onSubmit={sendMail} className='flex flex-col p-3 gap-2'>
                <input onChange={(e) => setTo(e.target.value)} value={to} type="text" placeholder="To" className='outline-none border-b border-gray-300 py-1' />
                <input onChange={(e) => setSubject(e.target.value)} value={subject} type="text" placeholder='Subject' className='outline-none border-b border-gray-300 py-1' />
                <textarea onChange={(e) => setMessage(e.target.value)} value={message} className='outline-none py-1 h-40' cols="30" rows="10"></textarea>
                <button type='submit' className='bg-[#0B57D0] rounded-full px-6 py-2 text-white font-medium w-fit'>Send</button>
            </form>
        </div>
    )
}

export default SendEmail;
