import React, { useEffect, useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const onHandleChange = (e) => {
        setSearch(e.target.value);
    }

    const GetSearchResults = async () => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getUserByName', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ search })
        })
        const users = await data.json();
        setSearchResults(users);
        console.log(searchResults);
        
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            GetSearchResults();
        }, 3000)
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex justify-center items-center">
            <form className="flex space-x-3 bg-white px-2 py-1 rounded-2xl border border-gray-700 focus-within:border-blue-900 transition-all" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-[50svh] outline-none px-4 py-2 text-xl text-gray-700 rounded-full"
                    onChange={(e) => onHandleChange(e)}
                />
            </form>
        </div>


    )
}

export default Search;
