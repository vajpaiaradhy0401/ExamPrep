import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormdata] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState({ id: '' });
  const [editform, setEditForm] = useState(false);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`http://localhost:5000/api/question/${id.id}`, formData);
        if (res) alert('Question updated successfully');
      } else {
        const res = await axios.post('http://localhost:5000/api/question', formData);
        if (res) alert('Question added successfully');
      }

      setFormdata({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject: "",
      });
      setEditForm(false);
      setId({ id: '' });
      handlefetch();
    } catch (err) {
      console.log(err);
      alert("Sorry, try again later");
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/question');
    setData(res.data.data);

    const res1 = await axios.get('http://localhost:5000/api/subject');
    setSubjects(res1.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/question/${id}`);
      if (res) {
        alert("Deleted Successfully");
        handlefetch();
      }
    } catch (err) {
      alert("Try Again Later");
    }
  };

  const handleEdit = (q) => {
    setFormdata({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      subject: q.subject,
    });
    setId({ id: q._id });
    setEditForm(true);
  };

  return (
    <div className="container my-4">
      {/* Heading */}
      <h2 className="text-center mb-4" style={{ background: 'linear-gradient(to right, #8e2de2, #4a00e0)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>
        {editform ? "Edit Question" : "Add New Question"}
      </h2>

      {/* Question Form */}
      <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Question</label>
          <textarea
            name="question"
            className="form-control"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter Question"
            required
          ></textarea>
        </div>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="optionA"
              className="form-control"
              placeholder="a.) Option 1"
              value={formData.optionA}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="optionB"
              className="form-control"
              placeholder="b.) Option 2"
              value={formData.optionB}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="optionC"
              className="form-control"
              placeholder="c.) Option 3"
              value={formData.optionC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="optionD"
              className="form-control"
              placeholder="d.) Option 4"
              value={formData.optionD}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <input
              name="correctAnswer"
              className="form-control"
              placeholder="Correct Option"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <select
              name="subject"
              className="form-select"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn text-white" style={{ background: '#4a00e0' }}>
          {editform ? "Update Question" : "Add Question"}
        </button>
      </form>

      {/* Question List */}
      <h2 className="text-center my-4" style={{ background: 'linear-gradient(to right, #8e2de2, #4a00e0)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>
        Question List
      </h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Subject</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Correct</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((q, index) => (
              <tr key={q._id}>
                <td>{index + 1}</td>
                <td>{q.question}</td>
                <td>{q.subject?.name}</td>
                <td>{q.optionA}</td>
                <td>{q.optionB}</td>
                <td>{q.optionC}</td>
                <td>{q.optionD}</td>
                <td>{q.correctAnswer}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(q)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(q._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="9">No questions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBank;
