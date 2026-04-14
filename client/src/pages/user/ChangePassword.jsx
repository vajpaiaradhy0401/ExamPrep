import axios from 'axios';
import React, { useState } from 'react'

const ChangePassword = () => {
    const userId = localStorage.getItem('userId');
    const [data, formData] = useState({
        op: '',
        np: '',
        cnp: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        formData((prev) => (
            { ...prev, [name]: value }
        ));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/examinee/pass/${userId}`, data);
            if (res) {
                alert(res.data.message);
                if(res.data.message === "Password Changed Successfully"){
                    localStorage.removeItem('userId')
                    localStorage.removeItem('userEmail')
                    localStorage.removeItem('userRole')
                    window.location.href = "/";
                }    
            }
        }
        catch (er) {
            alert("Sorry Try Again Later")
        }
    }
    return (
        <div
            className="d-flex justify-content-center align-items-start min-vh-100"
            style={{
                background: 'white',
                paddingTop: '60px' 
            }}
        >
            <div
                className="card shadow"
                style={{
                    width: '550px',
                    borderRadius: '16px',
                    borderTop: '6px solid #6a11cb',
                    backgroundColor: 'white'
                }}
            >
                <div className="p-5">
                    <h4 className="text-center mb-4 fw-bold" style={{ color: '#6a11cb' }}>
                        Update Password
                    </h4>

                    <form onSubmit={handleSubmit} method="post">
                        <div className="mb-3">
                            <label className="form-label">Old Password</label>
                            <input
                                type="password"
                                name="op"
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                name="np"
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                name="cnp"
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-grid mt-4">
                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    backgroundColor: '#6a11cb',
                                    color: '#fff',
                                    borderRadius: '30px'
                                }}
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword