import React, { useEffect, useState } from 'react'

const GetAllPostUser = (user) => {

    console.log(user);
    
    const [post, setPost] = useState([]);

    const fetchPosts = async () => {
        console.log(user);
        
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getPost', {
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
