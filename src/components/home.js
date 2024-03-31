import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

// Functional component example
function Home() {
    return(
        <div className='parent'>
        <center><h1> DATA ENTRY FORMS </h1></center>
       
        <div className='table-container'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Table</th>
                    <th>Entry</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Emp_TC</td>
                    <td><Link to='/Emp_TC'><button className="button">Enter data</button></Link></td>
                </tr>
                <tr>
                    <td>Emp_TC_OPT</td>
                    <td><Link to='/Emp_TC_OPT'><button className="button">Enter data</button></Link></td>
                </tr>
                <tr>
                    <td>Emp_master</td>
                    <td><button className="button">Enter data</button></td>
                </tr>
                <tr>
                    <td>STUDENT_MASTER</td>
                    <td><button className="button">Enter data</button></td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default Home;
