import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { setDrafts, setOpen, setSelectedDraft } from '../redux/appSlice';
import toast from 'react-hot-toast';

const Drafts = () => {
    const { drafts } = useSelector(store => store.app);
    const dispatch = useDispatch();

    // This function runs when a draft is clicked
    const openDraftToEdit = (draft) => {
        // Set the selected draft in Redux state
        dispatch(setSelectedDraft(draft));
        // Open the compose window
        dispatch(setOpen(true));
    };

    // This function runs when the delete icon is clicked
    const deleteDraft = async (e, id) => {
        e.stopPropagation(); // This prevents the 'openDraftToEdit' function from running
        try {
            await axios.delete(`http://localhost:8080/api/v1/draft/${id}`, { withCredentials: true });
            // Remove the deleted draft from the local state to update the UI instantly
            const updatedDrafts = drafts.filter(draft => draft._id !== id);
            dispatch(setDrafts(updatedDrafts));
            toast.success("Draft deleted.");
        } catch (error) {
            toast.error("Failed to delete draft.");
        }
    };

    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            <div className='p-4 border-b'>
                <h1 className='text-2xl font-medium'>Drafts</h1>
            </div>
            <div className='p-2'>
                {
                    drafts && drafts.length > 0 ? (
                        drafts.map(draft => (
                            <div key={draft._id} onClick={() => openDraftToEdit(draft)} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md rounded-lg my-1'>
                                <div className='flex items-center gap-3'>
                                    <h4 className='font-semibold text-red-600'>Draft</h4>
                                </div>
                                <div className='flex-1 ml-4'>
                                    <p className='text-gray-600 truncate'>
                                        <span className='font-semibold'>{draft.subject || '(no subject)'}</span>
                                        <span className='ml-2'> - {draft.message || '(no content)'}</span>
                                    </p>
                                </div>
                                <div className='flex-none text-gray-400 text-xs mx-4'>
                                    <p>{new Date(draft.updatedAt).toLocaleDateString()}</p>
                                </div>
                                 <button onClick={(e) => deleteDraft(e, draft._id)} className='p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-600'>
                                    <MdDeleteOutline size={'20px'} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-center p-4 text-gray-500'>You have no saved drafts.</p>
                    )
                }
            </div>
        </div>
    )
}

export default Drafts;
