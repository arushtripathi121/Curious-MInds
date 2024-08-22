import React, { useEffect, useState } from 'react'

const FetchUser = (userId) => {
    console.log(userId);
    
    const [data, setData] = useState([]);

    const fetchData = async (userId) => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getUserById', {
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
