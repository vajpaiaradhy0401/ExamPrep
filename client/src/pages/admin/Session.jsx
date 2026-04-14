import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Session = () => {
    const [form, setForm] = useState({
        name: '',
        description: ''
    });

    const [data, setData] = useState([]);
    const [editForm, setEditForm] = useState(null);
    const [id, setId] = useState({ id: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editForm) {
                const res = await axios.put(`http://localhost:5000/api/session/${id.id}`, form);
                if (res) alert('Session Updated Successfully');
            } else {
                const res = await axios.post('http://localhost:5000/api/session', form);
                if (res) alert('Session Added Successfully');
            }
            setForm({ name: '', description: '' });
            setEditForm(null);
            handlefetch();
        } catch (er) {
            alert('Sorry, try again later');
        }
    };

    const handlefetch = async () => {
        const res = await axios.get('http://localhost:5000/api/session');
        setData(res.data.data);
    };

    useEffect(() => {
        handlefetch();
    }, []);

   //handle delete logic
    const handleDelete =async  (id) => {
      console.log(id);
      const res = await axios.delete(`http://localhost:5000/api/session/${id}`);
    if(res){
        alert("Deleted Successfully")
    }
    else{
        alert("Try again later");
    }
    handlefetch();
   
    }

    const handleEdit = (item) => {
        setForm({ name: item.name, description: item.description });
        setId({ id: item._id });
        setEditForm(true);
    };

    const cardStyle = {
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        border: 'none',
        background: '#ffffff',
    };

    const headingStyle = {
        color: '#4a00e0',
        fontSize: '22px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '12px'
    };

    const buttonStyle = {
        backgroundColor: '#8e2de2',
        border: 'none',
        color: '#fff',
        borderRadius: '8px',
        padding: '8px 20px',
        margin: '0 6px',
        transition: '0.3s ease-in-out',
    };

    const deleteBtn = {
        ...buttonStyle,
        backgroundColor: '#ff4d4f'
    };

    const editBtn = {
        ...buttonStyle,
        backgroundColor: '#ffd700',
        color: '#000'
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-5'>
                <div className='col-sm-6 mx-auto'>
                    <div className='card p-4' style={cardStyle}>
                        <div style={headingStyle}>{editForm ? 'Edit Session' : 'Add New Session'}</div>
                        <form method='POST' onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label>Session Name:</label>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Enter Session'
                                    className='form-control'
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label>Description:</label>
                                <textarea
                                    name='description'
                                    value={form.description}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Enter Description'
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <button className='form-control' style={buttonStyle}>
                                {editForm ? 'Update Session' : 'Add Session'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Table section */}
            <div className='row mt-5'>
                <div className='col-sm-12 col-md-10 mx-auto'>
                    <div className='card p-4' style={cardStyle}>
                        <div style={headingStyle}>Session List</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className='table table-striped table-hover text-center'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>Session Name</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={item._id}>
                                            <td>{i + 1}</td>
                                            <td>{item.name}</td>
                                            <td style={{ maxWidth: "250px", wordBreak: "break-word" }}>{item.description}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    style={deleteBtn}
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    style={editBtn}
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">No sessions available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Session;
