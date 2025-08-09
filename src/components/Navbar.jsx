
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()
    return (
        <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/70 md:bg-transparent'>
            {/* Logo */}
            <Link to='/' className='max-md:flex-1'>
                <img src={assets.logo} alt="logo" className='w-36 h-auto' />
            </Link>

            {/* Navigation Links */}
            <div
                className={`${isOpen ? 'flex' : 'hidden'
                    } max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-black/90 max-md:flex-col max-md:items-center max-md:justify-center gap-8 text-lg font-medium z-40 md:flex md:flex-row md:static md:bg-transparent`}
            >
                {/* Close Icon (Mobile) */}
                <XIcon
                    className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                />

                <Link onClick={() => setIsOpen(false)} to='/'>Home</Link>
                <Link onClick={() => setIsOpen(false)} to='/movies'>Movies</Link>
                <Link onClick={() => setIsOpen(false)} to='/theaters'>Theaters</Link>
                <Link onClick={() => setIsOpen(false)} to='/releases'>Releases</Link>
                <Link onClick={() => setIsOpen(false)} to='/favorites'>Favorites</Link>
            </div>

            {/* Right Side Icons */}
            <div className='flex items-center gap-8'>
                <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer' />
                {
                    !user ? (
                        <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
                            Login
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="My Bookings"
                                    labelIcon={<TicketPlus width={15} />}
                                    onClick={() => navigate('/my-bookings')}
                                />
                            </UserButton.MenuItems>
                        </UserButton>

                    )
                }

            </div>

            {/* Menu Icon (Mobile) */}
            <MenuIcon
                className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer'
                onClick={() => setIsOpen(true)}
            />
        </div>
    );
};

export default Navbar;
