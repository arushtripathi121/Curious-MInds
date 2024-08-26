import React, { useEffect, useState } from 'react'
import { FaCross, FaCrosshairs } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { api } from '../Utils/Constants';
const Search = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onHandleChange = (e) => {
        setSearch(e.target.value);
    }

    const onHandleClose = (e) => {
        setSearch('');
    }

    const GetSearchResults = async () => {
        const data = await fetch(api+'getUserByName', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ search })
        })
        const users = await data.json();
        setSearchResults(users.data);
        setIsMenuOpen(true);
        console.log(searchResults);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            GetSearchResults();
        }, 300)
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex flex-col justify-center items-center relative">
            <form
                className="flex space-x-2 bg-white px-3 py-1 rounded-full border border-gray-700 focus-within:border-blue-600 transition-all"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="w-[72svh] outline-none px-4 py-2 text-lg text-gray-700 rounded-full placeholder-gray-500"
                    onChange={(e) => onHandleChange(e)}
                />
                <button onClick={onHandleClose}>
                    {searchResults && <IoClose className='w-6 h-auto'/>}
                </button>
            </form>

            {searchResults && searchResults.length > 0 && isMenuOpen &&  (
                <div className="absolute top-14 p-4 bg-white border border-gray-300 rounded-lg shadow-md w-[72svh] mt-2">
                    {searchResults.map(user => (
                        <Link to={`/profile/${user.id}`}><p key={user._id} className="text-lg text-gray-800 mb-2 cursor-pointer border border-b-gray-900 py-2">{user.name}</p></Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search;
