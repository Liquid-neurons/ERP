import { Link } from "react-router-dom";
import React from "react";

export const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">


            <div className="flex items-center">
                <Link to="/applications">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>New applications</span></h2>
                        </div>
                    </div>
                </Link>
                <Link to="/forms">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>Enter data</span></h2>
                        </div>
                    </div>
                </Link>
                <Link to="/register">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>Register applicant</span></h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
