import React, { useEffect } from 'react'

const GetCommentsHook = (post) => {
    const getComments = async (post) => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getComments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post})
        })
        const message = await data.json();
        console.log(message);
    }

    useEffect(() => {
        getComments(post);
    })
}

export default GetCommentsHook
