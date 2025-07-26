import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSentEmails } from '../redux/appSlice';

const useGetSentEmails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSentEmails = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/email/sent', {
                    withCredentials: true
                });
                dispatch(setSentEmails(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchSentEmails();
    }, [dispatch]);
}

export default useGetSentEmails;
