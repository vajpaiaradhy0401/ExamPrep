import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    question: '',
    email: localStorage.getItem('userEmail') || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/message', formData);
      alert(response.data.message);
      setFormData({ question: '', email: formData.email });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/message/${userId}`);
      setMessages(response.data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container my-5">
      {/* Contact Form */}
      <div className="row justify-content-center">
        <div className="col-md-8"> {/* Increased width from col-md-6 to col-md-8 */}
          <div
            className="card shadow"
            style={{
              borderRadius: '16px',
              padding: '24px',
              minHeight: '350px'
            }}
          >
            <div className="text-center mb-3">
              <h4 className="fw-bold">Contact Us</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label"><strong>Your Message</strong></label>
                  <textarea
                    className="form-control"
                    name="question"
                    rows="5"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: '#6a11cb', color: '#fff', borderRadius: '30px' }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* User Feedback Table */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <h5 className="mb-3 fw-semibold text-center text-uppercase" style={{ color: '#6a11cb' }}>
            User Feedbacks
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered shadow text-center">
              <thead className="text-white" style={{ backgroundColor: '#6a11cb' }}>
                <tr>
                  <th>S.No.</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <tr key={msg._id}>
                      <td>{index + 1}</td>
                      <td>{msg.question}</td>
                      <td className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-warning">Approve</button>
                        <button className="btn btn-sm btn-success">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
