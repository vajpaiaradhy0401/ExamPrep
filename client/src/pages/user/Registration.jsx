import axios from "axios";
import React, { useEffect, useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    password: '',
    college: '',
    qualification: '',
    session: '',
  });

  const [sessions, setSessions] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session");
      setSessions(res.data.data);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/examinee', formData);
    if(res.data.message=="Registered Succussfully"){
      alert(res.data.message)
    }
      
   
      setFormData({
        name: '',
        email: '',
        number: '',
        address: '',
        password: '',
        college: '',
        qualification: '',
        session: '',
      });
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to register');
    }
  };

  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: '#1e3a5f' }}>
      {/* Left Panel */}
<div
  className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
  style={{
    background:  'linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)', // purple/blue gradient
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    padding: '3rem'
  }}
>
  <div className="text-center px-4">
    <h1 className="fw-bold display-5">Welcome!</h1>
    <p className="mt-3 fs-5">
      Register now to get started with your journey.
    </p>
  </div>
</div>

      {/* Right Panel */}
      <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container px-4 py-5" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">Sign Up Here</h3>
            <p className="text-muted">Please fill in this form to create an account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 d-flex gap-2">
              <input
                name="number"
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <select
                name="session"
                className="form-select"
                value={formData.session}
                onChange={handleChange}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                name="address"
                className="form-control"
                placeholder="Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <input
                name="college"
                type="text"
                className="form-control"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                name="qualification"
                type="text"
                className="form-control"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center mt-4">
              <button
                background= 'linear-gradient(to right, #4a00e0, #8e2de2)'
                type="submit"
                className="btn btn-dark w-100 py-2 rounded-pill"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
