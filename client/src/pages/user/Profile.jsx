import React from 'react'
import { Outlet } from 'react-router'
const Profile = () => {
    return (
        <div className="content">
            <Outlet />
            {/* Cards */}
            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div
                        className="card shadow-lg border-0 h-100"
                        style={{ minHeight: "150px" }}
                    >
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h4 className="fw-bold text-dark">Total Exams</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div
                        className="card shadow-lg border-0 h-100"
                        style={{ minHeight: "150px" }}
                    >
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h4 className="fw-bold mb-3">Performance Overview</h4>
                            <div className="d-flex gap-5">
                                <div className="text-center">
                                    <h5 className="fw-bold text-success">
                                        Passed <i className="fa-solid fa-check"></i>
                                    </h5>
                                </div>
                                <div className="text-center">
                                    <h5 className="fw-bold text-danger">
                                        Failed <i className="fa-solid fa-xmark"></i>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Exams</th>
                            <th>Marks</th>
                            <th>Total Marks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Profile