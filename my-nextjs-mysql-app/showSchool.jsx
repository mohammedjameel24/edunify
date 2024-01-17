// Page 2: showSchools.jsx
// Import the required modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Define the component for the page
const ShowSchools = () => {
  // Use the useState hook to store the schools data in the state
  const [schools, setSchools] = useState([]);

  // Use the useEffect hook to fetch the schools data from the server
  useEffect(() => {
    // Define the async function to get the data
    const getSchools = async () => {
      // Send a GET request to the server
      try {
        const response = await axios.get('/api/schools');
        // If the request is successful, set the schools state with the data
        if (response.status === 200) {
          setSchools(response.data);
        }
      } catch (error) {
        // If there is an error, alert the user with the error message
        alert(error.response.data.message);
      }
    };
    // Call the function
    getSchools();
  }, []);

  // Return the JSX for the page
  return (
    <div className="container">
      <h1>Show Schools</h1>
      <div className="row">
        {schools.map((school) => (
          // For each school, render a card with the name, address, city and image
          <div className="col-md-4 col-sm-6" key={school.id}>
            <div className="card">
              <img src={`/schoolImages/${school.image}`} className="card-img-top" alt={school.name} />
              <div className="card-body">
                <h5 className="card-title">{school.name}</h5>
                <p className="card-text">{school.address}, {school.city}</p>
                <Link href={`/schools/${school.id}`}>
                  <a className="btn btn-primary">View Details</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the component
export default ShowSchools;
