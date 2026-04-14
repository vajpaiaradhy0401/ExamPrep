import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/admin/login', form);
    if (res.data.message === "Admin login successfully") {
      localStorage.setItem("role", res.data.admin.role);
      localStorage.setItem("email", res.data.admin.email);
      window.location.href = '/admin';
    } else {
      window.alert("Your email or password are incorrect");
    }
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      width: '950px',
      height: '580px',
      display: 'flex',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      backgroundColor: '#fff',
    },
    leftPanel: {
      flex: 1,
      background: 'linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: '40px',
    },
    abstractCircles: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    bigCircle: {
      width: '180px',
      height: '180px',
      top: '20%',
      left: '10%',
    },
    smallCircle: {
      width: '100px',
      height: '100px',
      bottom: '15%',
      right: '10%',
    },
    welcomeText: {
      fontSize: '30px',
      fontWeight: '600',
      marginBottom: '10px',
      zIndex: 1,
    },
    subText: {
      fontSize: '16px',
      opacity: 0.9,
      zIndex: 1,
    },
    rightPanel: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
    },
    formBox: {
      width: '100%',
      maxWidth: '320px',
    },
    heading: {
      fontSize: '22px',
      marginBottom: '4px',
      fontWeight: '600',
      color: '#4a00e0',
    },
    subheading: {
      color: '#8e2de2',
      fontSize: '30px',
      marginBottom: '20px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '4px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderBottom: '2px solid #ccc',
      fontSize: '14px',
      marginBottom: '20px',
      outline: 'none',
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '4px',
      background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '16px',
    },
    orDivider: {
      textAlign: 'center',
      color: '#999',
      fontSize: '13px',
      marginBottom: '16px',
    },
    googleButton: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '16px',
    },
    createAccount: {
      textAlign: 'center',
      fontSize: '13px',
      marginTop: '10px',
      color: '#444',
    },
    link: {
      marginLeft: '6px',
      color: '#8e2de2',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={{ ...styles.abstractCircles, ...styles.bigCircle }} />
          <div style={{ ...styles.abstractCircles, ...styles.smallCircle }} />
          <div style={styles.welcomeText}>Admin Panel</div>
          <div style={styles.subText}>Sign in to manage Exam Mastery Hub</div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox}>
            <div style={styles.subheading}>Welcome Back!!</div>
            <div style={styles.heading}>Admin Login</div>

            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>Log In</button>

            <div style={styles.orDivider}>or</div>

            <div style={styles.googleButton}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                style={{ width: '16px', verticalAlign: 'middle' }}
              />
              Sign in with Google
            </div>

            <div style={styles.createAccount}>
              Don't have an account?
              <a href="#" style={styles.link}>Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
