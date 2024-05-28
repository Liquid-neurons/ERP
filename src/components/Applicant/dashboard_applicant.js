import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "../contexts/context";

export const Dashboard_applicant = () => {
    const { userEmail,userRole } = useUser();
    
    const handleDownloadPdf = () => {
        // Replace 'path_to_your_pdf.pdf' with the actual path to your PDF file
        const pdfUrl = '/pdf';
    
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
                <Link to="/liststatus">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>View application status</span></h2>
                        </div>
                    </div>
                </Link>
                <Link to="/STUDENT_MASTER">
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span>Fill application</span></h2>
                        </div>
                    </div>
                </Link>
                    <div className="w-fit rounded-[25px] bg-white p-8 aspect mr-8">
                        <div className="my-2">
                            <h2 className="text-4xl font-bold"><span onClick={handleDownloadPdf}>Download blank form</span></h2>
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default Dashboard_applicant;
