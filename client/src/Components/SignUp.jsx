import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { validate } from '../Utils/validate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const SignUp = () => {

    const [sign, setSign] = useState(true);
    const [message, setMessage] = useState('');
    const [login, setLogin] = useState(false);
    const email = useRef(null);
    const password = useRef(null);
    const dob = useRef(null);
    const name = useRef(null);
    const userName = useRef(null);
    const confirmPassword = useRef(null);
    const user = useSelector((store) => store.user)
    const handleSign = () => {
        setSign(!sign);
    }


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SignUp = async (name, email, userName, password, dateOfBirth) => {
        const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/signUp', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, userName, password, dateOfBirth })
        })

        const data = await response.json();
        return data;
    }


    const LogIn = async (userName, password) => {
        const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/logIn', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, password })
        })

        const data = await response.json();
        return data;
    }


    const handleOnLogin = async (value) => {
        console.log('Function called');
        console.log(value);
        if(user) {
            navigate('/main');
        }
        if (!value) {
            try {

                const message = validate(email.current.value, password.current.value, confirmPassword.current.value, dob.current.value,);
                if (message) {
                    setMessage(message);
                }

                if (!message) {
                    const data = await SignUp(name.current.value, email.current.value, userName.current.value, password.current.value, dob.current.value);
                    if (data.success == false) {
                        setMessage(data.message);
                    }
                    else {
                        navigate('/redirectToSignIn')
                    }
                }
            }

            catch (e) {
                console.log(e);
            }
        }

        else if(value){ 
            try{
                const data = await LogIn(userName.current.value, password.current.value);
                console.log(data);
                if (data.success == true) {
                    dispatch(addUser(data));
                    setLogin(true);
                    navigate('/main')
                }
                else {
                    setMessage(data.message);
                }
        }
        catch(e){
            console.log(e);
        }
    }
    }
    return (
        <div>
            <Header />
            <div className="min-h-[80svh] flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{sign ? "Sign In" : "Sign Up"}</h2>
                    <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {!sign && <input
                            type="text"
                            placeholder="Enter email"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            ref={email}
                        />}
                        {!sign && <input
                            type="text"
                            placeholder="Enter name"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            ref={name}
                        />}


                        {!sign && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2 px-2">
                                    Enter Date of Birth
                                </label>
                                <input
                                    type="date"
                                    placeholder="yyyy-mm-dd"
                                    className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    ref={dob}
                                />
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder={sign ? 'Enter user name' : 'Set user name'}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            ref={userName}
                        />
                        <input
                            type="password"
                            placeholder={sign ? 'Enter password' : 'Set password'}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            ref={password}
                        />
                        {!sign && <input
                            type="password"
                            placeholder="Confirm password"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            ref={confirmPassword}
                        />}
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            onClick={() => handleOnLogin(sign)}
                        >
                            {sign ? "Sign In" : "Sign Up"}
                        </button>

                        {message && <p className='text-red-500 font-sm px-2'>{message}</p>}
                    </form>

                    <p className='mt-2'>{!sign ? 'Already a user?' : 'New to DevelopersNest?'} <span className='font-bold cursor-pointer' onClick={() => handleSign()}>{!sign ? "Sign In" : "Sign Up"}</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
