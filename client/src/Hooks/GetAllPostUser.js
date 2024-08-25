import React, { useEffect, useState } from 'react'
import { api } from '../Utils/Constants';
const GetAllPostUser = (user) => {

    console.log(user);
    
    const [post, setPost] = useState([]);

    const fetchPosts = async () => {
        console.log(user);
        
        const data = await fetch(api+'getPost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
        })

        const post = await data.json();
        setPost(post.posts);
    }

    useEffect(() => {
        fetchPosts();
    }, [user])

    return post;
}

export default GetAllPostUser
