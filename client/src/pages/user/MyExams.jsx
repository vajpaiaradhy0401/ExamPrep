import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router';

const MyExams = () => {
    const [exam , setExam] = React.useState([]);
    const fetchExams = async () =>{
        const res =await axios.get('http://localhost:5000/api/exams/exams');
        setExam(res.data);
    }            
    useEffect(() =>{
        fetchExams();
    },[]);

  return (
     <div
      className="card mx-auto mt-2"
      style={{ width: "95%", maxWidth: "1300px", borderRadius: "12px" }}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="fw-bold text-Dark">Details</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <table className="table table-bordered table-hover text-center">
              <thead
              
                className="table-primary"
              >
                <tr>
                  <th>S.No.</th>
                  <th >Exam Name</th>
                  <th>Date Of Exam </th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                     {exam.map((item,i)=>(
                        <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>{item.title}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.time}</td>
                            <td>
                                <Link to={`/user/getexam/${item._id}`} className="btn btn-primary">
                                 Start Exam </Link>
                            </td>
                        </tr>
                     ))}
                     </tbody>
            </table>
          </div>
        </div>                      
      </div>
    </div>
  )
}

export default MyExams