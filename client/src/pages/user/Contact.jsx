import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/message', formData);
            alert(response.data.message);
            setFormData({ question: '', email: formData.email });
        }
        catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message')
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
    useEffect(()=>{
        fetchMessages()
    },[])
    return (
        <div className="container my-5">
            {/* Contact Form */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-light text-center">
                            <h4><u>Contact Us</u></h4>
                        </div>
                        <div className="card-body">
                            <form method='post' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label"><strong>Message</strong></label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        name="question"
                                        rows="4"
                                        placeholder="Ask question here"
                                        required
                                    ></textarea>
                                </div>
                                <button type="Submit" value="Send" className="btn btn-primary w-100">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table  */}
            <div className="row justify-content-center mt-5">
                <div className="col-md-9">
                    <h5 className="mb-3"><u>User Feedbacks</u></h5>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Question</th>
                                <th>Date</th>
                                <th>Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, index) => (
                                <tr key={message._id}>
                                    <td>{index + 1}</td>
                                    <td>{message.question}</td>
                                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                                    <td>{message.reply || 'No reply yet'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Contact;