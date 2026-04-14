import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subject = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/subject/${editId}`, form);
        alert('Subject updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/subject', form);
        alert('Subject added successfully');
      }
      setForm({ name: '', description: '' });
      setEditId(null);
      handlefetch();
    } catch (err) {
      alert('Error occurred, try again later');
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/subject');
    setData(res.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  //handle delete logic
  const handleDelete =async  (id) => {
     // console.log(id);
      const res = await axios.delete(`http://localhost:5000/api/subject/${id}`);
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
    setEditId(item._id);
  };

  // Theme styles matching Session page
  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    background: '#ffffff',
    border: 'none'
  };

  const headingStyle = {
    color: '#4a00e0',
    fontSize: '22px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '16px'
  };

  const buttonStyle = {
    backgroundColor: '#8e2de2',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    letterSpacing: '0.5px'
  };

  const editBtn = {
    backgroundColor: '#ffd700',
    border: 'none',
    color: '#000',
    fontWeight: '500',
    borderRadius: '6px',
    padding: '6px 12px',
    marginRight: '6px'
  };

  const deleteBtn = {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    fontWeight: '500',
    borderRadius: '6px',
    padding: '6px 12px'
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f1f3f6', minHeight: '100vh' }}>
      
      {/* Form Section */}
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-5'>
          <div className='card p-4' style={cardStyle}>
            <h4 style={headingStyle}>{editId ? 'Edit Subject' : 'Add New Subject'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Subject Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter subject name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Enter description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="form-control" style={buttonStyle}>
                {editId ? 'Update Subject' : 'Add Subject'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-5 justify-content-center">
        <div className="col-md-11">
          <div className="card p-4" style={cardStyle}>
            <h4 style={headingStyle}>Subjects</h4>
            <div className="table-responsive">
              <table className="table table-hover text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Subject Name</th>
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
                      <td style={{ maxWidth: '300px', wordBreak: 'break-word' }}>{item.description}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button style={deleteBtn} onClick={() => handleDelete(item._id)}>Delete</button>
                        <button style={editBtn} onClick={() => handleEdit(item)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No subjects available</td>
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

export default Subject;
