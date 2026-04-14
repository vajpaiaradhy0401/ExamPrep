import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      window.location.href = '/adlogin';
    }
  }, [role]);

  const email = localStorage.getItem('email');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    else if (hour < 17) return 'Good Afternoon';
    else return 'Good Evening';
  };

 const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Segoe UI, Inter, sans-serif',
    background: 'linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)', // vibrant purple theme
  },
  sidebar: {
    width: collapsed ? '80px' : '240px',
    background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)', // Rich purple gradient
    color: '#fff',
    padding: '24px 18px',
    transition: 'width 0.3s',
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    boxShadow: '5px 0 20px rgba(0,0,0,0.25)',
    fontSize: '18px',
    fontWeight: '500',
  },
  sidebarHeader: {
    fontSize: '23px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#ffffff',
    letterSpacing: '1px',
  },
  navLinks: {
    listStyle: 'none',
    padding: 0,
    marginTop: '10px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    marginBottom: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    flex: 1,
    transition: 'color 0.3s',
  },
  navItemHover: {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.02)',
  },
  main: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f3e9ff', // Light lavender background
    overflow: 'auto',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  greeting: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#6e00ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#4a00e0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    height: '200%',
  },
};

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Exam Prep</div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <i className="fa-solid fa-chart-bar"></i>
            <Link to="/admin/session" style={styles.link}>Session</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-book-open"></i>
            <Link to="/admin/subject" style={styles.link}>Subject</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-user"></i>
            <Link to="/admin/examinee" style={styles.link}>Examinee</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-database"></i>
            <Link to="/admin/questionbank" style={styles.link}>Question Bank</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-pencil"></i>
            <Link to="/admin/examination" style={styles.link}>Examination</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-award"></i>
            <Link to="/admin/report" style={styles.link}>Report Generation</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-check-double"></i>
            <Link to={"/admin/resultdec"}><span style={styles.link}>Result Declaration</span></Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-headset"></i>
            <Link to="/admin/contact" style={styles.link}>Contact Us</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-key"></i>
            <Link to="/admin/password" style={styles.link}>Change Password</Link>
          </li>
          <li style={styles.navItem}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <Link
              to="#"
              style={styles.link}
              onClick={() => {
                localStorage.removeItem('role');
                localStorage.removeItem('email');
                window.location.href = '/adlogin';
              }}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h4 style={styles.greeting}>{getGreeting()}, Admin</h4>
          <h2 style={styles.heading}>
            Admin Dashboard <i className="fa-solid fa-chart-line ms-2"></i>
          </h2>
        </div>
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
