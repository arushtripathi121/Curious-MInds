import React, { useEffect, useState } from 'react'
import { api } from '../Utils/Constants';

const FetchLikes = (postId) => {
    const [likes, setLikes] = useState([]);
    const fetchData = async () => {
        const data = await fetch(api+"getLikes", {
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
    const data = await fetch(api+'likePost', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ post, user })
    })
    const message = await data.json();
    return message.message;
}

export const checkDislike = async (id) => {
    const data = await fetch(api+'dislikePost/'+`${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
    })
    const message = await data.json();
    return message.message;
}
export default FetchLikes;
