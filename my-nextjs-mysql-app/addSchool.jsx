// Page 1: addSchool.jsx
// Import the required modules
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Define the component for the form
const AddSchool = () => {
  // Use the useForm hook to handle the form data and validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Define the function to submit the form data to the server
  const onSubmit = async (data) => {
    // Create a FormData object to store the form data and the image file
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]);

    // Send a POST request to the server with the FormData object
    try {
      const response = await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // If the request is successful, alert the user and reset the form
      if (response.status === 200) {
        alert('School added successfully');
        document.getElementById('add-school-form').reset();
      }
    } catch (error) {
      // If there is an error, alert the user with the error message
      alert(error.response.data.message);
    }
  };

  // Return the JSX for the form
  return (
    <div className="container">
      <h1>Add School</h1>
      <form id="add-school-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            {...register('name', { required: true })}
          />
          {errors.name && <p className="text-danger">Name is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            {...register('address', { required: true })}
          />
          {errors.address && <p className="text-danger">Address is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            {...register('city', { required: true })}
          />
          {errors.city && <p className="text-danger">City is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-control"
            {...register('state', { required: true })}
          />
          {errors.state && <p className="text-danger">State is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            name="contact"
            className="form-control"
            {...register('contact', { required: true, min: 1000000000, max: 9999999999 })}
          />
          {errors.contact && <p className="text-danger">Contact is required and must be a valid 10-digit number</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email_id">Email</label>
          <input
            type="email"
            id="email_id"
            name="email_id"
            className="form-control"
            {...register('email_id', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          />
          {errors.email_id && <p className="text-danger">Email is required and must be a valid email address</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            accept="image/*"
            {...register('image', { required: true })}
          />
          {errors.image && <p className="text-danger">Image is required and must be an image file</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

// Export the component
export default AddSchool;
