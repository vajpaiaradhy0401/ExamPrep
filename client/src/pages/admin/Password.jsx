import axios from 'axios';
import React, { useState } from 'react'


const Password = () => {
    const email = localStorage.getItem('email');
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
            const res = await axios.put(`http://localhost:5000/api/admin/change/${email}`, data);
            console.log(res)
            if (res) {
                alert(res.data.message);
                if(res.data.message === "Password Changed Successfully"){
                    localStorage.removeItem('email')
                    localStorage.removeItem('role')
                    window.location.href = "/adlogin";
                }    
            }
        }
        catch (er) {
            alert("Sorry Try Again Later")
            console.log(er);
            
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
};

export default Password;
