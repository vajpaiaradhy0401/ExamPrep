import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')

    const handlefetch = async () => {
        const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        console.log(res);

        const resultArray = Array.isArray(res.data.message)
            ? res.data.message
            : res.data.message
                ? [res.data.message]
                : [];

        setData(resultArray);
    }

    useEffect(() => {
        handlefetch();
    }, [])

    console.log(data);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Exam name</td>
                        <td>Your Name</td>
                        <td>Total Marks</td>
                        <td>Score</td>
                        <td>Passing Marks</td>
                        <td>Status</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.examId.title}</td>
                            <td>{item.examineeId.name || item.examineeId}</td>
                            <td>{item.totalMarks}</td>
                            <td>{item.score}</td>
                            <td>{item.passingMarks}</td>
                            <td>{item.status}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Result
