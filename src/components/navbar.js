import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link to="/homepage" className="text-white font-semibold hover:text-gray-200">Home</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-white font-semibold hover:text-gray-200">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
