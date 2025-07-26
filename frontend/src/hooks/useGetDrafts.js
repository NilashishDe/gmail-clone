import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDrafts } from '../redux/appSlice';

const useGetDrafts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/draft', {
                    withCredentials: true
                });
                dispatch(setDrafts(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchDrafts();
    }, [dispatch]);
}

export default useGetDrafts;
