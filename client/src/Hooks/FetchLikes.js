import React, { useEffect, useState } from 'react'

const FetchLikes = (postId) => {
    const [likes, setLikes] = useState([]);
    const fetchData = async () => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getLikes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId })
        })
        const likes = await data.json();
        setLikes(likes);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return likes;
}

export default FetchLikes
