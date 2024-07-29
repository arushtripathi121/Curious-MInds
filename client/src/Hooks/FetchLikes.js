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

export const checkLike = async (post, user) => {
    const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/likePost', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ post, user })
    })
    const message = await data.json();
    console.log(message.message);
}

export const checkDislike = async (id) => {
    const data = await fetch(`http://localhost:5000/Curious_Minds/api/v1/user/dislikePost/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
    })
    const message = await data.json();
    console.log(message.message);
}

export default FetchLikes;
