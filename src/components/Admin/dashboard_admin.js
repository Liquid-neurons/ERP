import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "../contexts/context";

export const Dashboard_admin = () => {
    const { userEmail } = useUser();
    
    const handleDownloadPdf = () => {
        // Replace 'path_to_your_pdf.pdf' with the actual path to your PDF file
        const pdfUrl = 'http://49.206.252.212:8000/user/harish/files/forms/form_pdf.pdf?_xsrf=2%7Cb4883c89%7Ce0ba613f0fa8d15594fa755e475f5ea9%7C1714138476';
    
        // Create a new anchor element
        const anchorElement = document.createElement('a');
        anchorElement.href = pdfUrl;
    
        // Set the download attribute to force the browser to download the file instead of navigating to it
        anchorElement.setAttribute('download', '');
    
        // Append the anchor element to the body
        document.body.appendChild(anchorElement);
    
        // Trigger a click event on the anchor element to start the download
        anchorElement.click();
    
        // Clean up: remove the anchor element from the DOM after the download starts
        document.body.removeChild(anchorElement);
      };
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">


            <div className="flex items-center">
                <Link to="/review-applications">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>Review new applicants</span></h2>
                        </div>
                    </div>
                </Link>
                <Link to="/register">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>Register accepted applicants</span></h2>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Dashboard_admin;
