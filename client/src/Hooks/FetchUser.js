import React, { useEffect, useState } from 'react'
import { api } from '../Utils/Constants';

const FetchUser = (userId) => {
    console.log(userId);
    
    const [data, setData] = useState([]);

    const fetchData = async (userId) => {
        const data = await fetch(api+'getUserById', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
        })
        const res = await data.json();
        setData(res.user.following);
        console.log(res);
        
    }

    useEffect(() => {
        fetchData(userId);
    }, [1])

    return data;
}

export default FetchUser;
