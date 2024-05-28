import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './contexts/context';

function Navbar() {
    const navigate = useNavigate();
    const { resetUserEmail, userRole } = useUser();

    const handleLogout = () => {
        // Clear the user's email from the context
        resetUserEmail();
        // Redirect to the login page or any other desired page
        navigate("/");
    };

    const homepageLink = userRole === 'admin' ? '/homepage-admin' : '/homepage';

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link to={homepageLink} className="text-white font-semibold hover:text-gray-200">Home</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" onClick={handleLogout} className="text-white font-semibold hover:text-gray-200">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
