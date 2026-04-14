import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });

  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');

  const [editForm, setEditForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subject'),
        axios.get('http://localhost:5000/api/session'),
        axios.get('http://localhost:5000/api/exams/exams'),
      ]);
      setSubjects(subjectRes.data.data || []);
      setSessions(sessionRes.data.data || []);
      setExams(examRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load subjects or sessions');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
    setError('');
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [
        ...formData.questionDistribution,
        { subject: '', numberOfQuestions: '' },
      ],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    const {
      examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      questionDistribution,
    } = formData;

    if (
      !examName ||
      !date ||
      !time ||
      !duration ||
      !totalMarks ||
      !passingMarks ||
      !sessionId
    ) {
      return 'All fields are required';
    }

    if (parseInt(passingMarks) > parseInt(totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }

    if (
      questionDistribution.some(
        (dist) =>
          !dist.subject || !dist.numberOfQuestions || parseInt(dist.numberOfQuestions) <= 0
      )
    ) {
      return 'All question distributions must have a valid subject and number of questions';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/exams', formData);
      alert('Exam Created Successfully');
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.put('http://localhost:5000/api/exams/${editId}', formData);
      alert('Exam Updated Successfully');
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error updating exam:', err);
      setError(err.response?.data?.error || 'Error updating exam');
    }
  };

  const resetForm = () => {
    setFormData({
      examName: '',
      date: '',
      time: '',
      duration: '',
      totalMarks: '',
      passingMarks: '',
      sessionId: '',
      status: 'Scheduled',
      questionDistribution: [{ subject: '', numberOfQuestions: '' }],
    });
    setEditForm(false);
    setEditId(null);
  };

  const handleEdit = (exam) => {
    setFormData({
      examName: exam.examName || exam.title || '',
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      sessionId: exam.sessionId?._id || exam.sessionId,
      status: exam.status,
      questionDistribution: exam.questionDistribution || [
        { subject: '', numberOfQuestions: '' },
      ],
    });
    setEditId(exam._id);
    setEditForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/exams/${id}');
      alert('Deleted Successfully');
      fetchData();
    } catch (err) {
      alert('Try Again Later');
      console.error(err);
    }
  };

  return (
    <div className="container mt-2">
      <div className="card shadow-sm">
        <div className="card-header text-center py-2">
          <h6 className="mb-0">{editForm ? 'Edit Examination' : 'Create Examination'}</h6>
        </div>
        <div className="card-body p-3">
          {error && <div className="alert alert-danger py-1 px-2">{error}</div>}
          <form onSubmit={editForm ? handleUpdate : handleSubmit}>
            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label small mb-1">Exam Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="examName"
                  value={formData.examName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small mb-1">Total Marks</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small mb-1">Passing Marks</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small mb-1">Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small mb-1">Time</label>
                <input
                  type="time"
                  className="form-control form-control-sm"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small mb-1">Duration (mins)</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small mb-1">Session</label>
                <select
                  className="form-select form-select-sm"
                  name="sessionId"
                  value={formData.sessionId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Session</option>
                  {sessions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small mb-1">Status</label>
                <select
                  className="form-select form-select-sm"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <hr className="my-2" />
            <h6 className="mb-2">Question Distribution</h6>
            {formData.questionDistribution.map((item, index) => (
              <div className="row g-1 align-items-center mb-2" key={index}>
                <div className="col-md-5">
                  <select
                    className="form-select form-select-sm"
                    name="subject"
                    value={item.subject}
                    onChange={(e) => handleQuestionDistChange(index, e)}
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
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="numberOfQuestions"
                    placeholder="Questions"
                    value={item.numberOfQuestions}
                    onChange={(e) => handleQuestionDistChange(index, e)}
                    min="1"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => removeDistributionField(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={addDistributionField}
              >
                + Add Subject
              </button>
            </div>
            <div className="text-end">
              <button type="submit" className="btn-sm px-4" style={{ backgroundColor: '#A6B1E1' }}>
                {editForm ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-3">
        <h6>Exam Preview</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-primary">
              <tr>
                <th>S.No.</th>
                <th>Exam Name</th>
                <th>Total Marks</th>
                <th>Passing Marks</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Session</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={exam._id}>
                  <td>{index + 1}</td>
                  <td>{exam.examName || exam.title}</td>
                  <td>{exam.totalMarks}</td>
                  <td>{exam.passingMarks}</td>
                  <td>{exam.date}</td>
                  <td>{exam.time}</td>
                  <td>{exam.duration}</td>
                  <td>{exam.sessionId?.name || 'N/A'}</td>
                  <td>{exam.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(exam)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleDelete(exam._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Examination;