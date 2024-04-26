import React from 'react';
import { Link } from 'react-router-dom';

function Forms() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-gray-800 text-4xl font-serif mb-8">Data Entry Forms</h1>

            <div className="w-full md:w-1/2">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="flex justify-center px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Form Name</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link to="/Emp_TC" className="text-3xl flex justify-center text-indigo-600 hover:underline">Emp_TC</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link to="/Emp_TC_OPT" className="text-3xl flex justify-center text-indigo-600 hover:underline">Emp_TC_OPT</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link to="/Emp_master" className="text-3xl flex justify-center text-indigo-600 hover:underline">Employee master</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link to="/STUDENT_MASTER" className="text-3xl flex justify-center text-indigo-600 hover:underline">Student master</Link>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Forms;
