import React, {useEffect, useState} from 'react';
import Logo from '../assets/OIG.3DoXsO63VasZUxrc1O2M.png'
import {FaSearch} from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";

function Header(props) {
    const {currentUser} = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1>
                    <img src={Logo} alt="AR Estate" height={80} width={80}/>
                </h1>
                <form
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600'/>
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    {currentUser &&
                        <Link to='/view-property'>
                            <li className='hidden sm:inline text-slate-700 hover:underline'>
                                My Properties
                            </li>
                        </Link>
                    }
                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className='text-slate-700 hover:underline'>
                                Sign in
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}

export default Header;