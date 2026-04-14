import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/examinee');
    setData(res.data.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try Again Later");
    }
    handlefetch();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      number: item.number,
      address: item.address,
      college: item.college,
      qualification: item.qualification,
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
        alert('Examinee Updated Successfully');
      setForm({
        name: '',
        email: '',
        number: '',
        address: '',
        college: '',
        qualification: ''
      });
      setEditingId(null);
      setEditFormVisible(false);
      handlefetch();
    } catch (error) {
      console.error("Error updating examinee:", error);
      alert("Error updating examinee");
    }
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  };

  const headerStyle = {
    fontSize: '22px',
    fontWeight: '600',
    color: '#073b3a',
    marginBottom: '20px',
  };

  
return (
  <>
    {editFormVisible && (
      <div className="card mx-auto mt-2 mb-3" style={{ border: "1px solid #6f42c1", width: "100%" }}>
        <div className="card-body">
          <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Edit Examinee</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-sm-4">
                <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="number" value={form.number} onChange={handleChange} placeholder="Number" required />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="College" />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" />
              </div>
            </div>
            <button type="submit" className="btn btn-light text-white mb-1 me-2" style={{ background: "#39064fff " }}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditFormVisible(false)}>Cancel</button>
          </form>
        </div>
      </div>
    )}

    <div className='container mt-5'>
      <div style={cardStyle}>
        <h3 style={headerStyle}>Student Details</h3>

        <div className="table-responsive">
          <table className='table table-bordered table-hover'>
            <thead style={{ backgroundColor: '#2a9d8f', color: 'white' }}>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Number</th>
                <th>Address</th>
                <th>College</th>
                <th>Qualification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{item.address}</td>
                  <td>{item.college}</td>
                  <td>{item.qualification}</td>
                  <td>
                    <button className="btn btn-success me-2" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);

};

export default Examinee;
