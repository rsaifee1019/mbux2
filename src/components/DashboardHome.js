// components/DashboardHome.js
"use client"
import { useState } from 'react';
import AdminPaymentList from './admin/AdminPaymentList';
import AdminApplicantList from './admin/AdminApplicantList';
import AdminNoticeList from './admin/AdminNoticeList';
import AdminTeacherList from './admin/AdminTeacherList';
import AdminStudentList from './admin/AdminStudentList';
import AdminFeeList from './admin/AdminFeeList';
const DashboardHome = () => {
  const [activeSection, setActiveSection] = useState('applicants');

  const renderSection = () => {
    switch (activeSection) {
      case 'applicants':
        return <AdminApplicantList />;
      case 'notices':
        return <AdminNoticeList />;
      case 'teachers':
        return <AdminTeacherList />;
      case 'payments':
        return <AdminPaymentList />;
      case 'students':
        return <AdminStudentList />;
      case 'fees':
        return <AdminFeeList />;
      default:
        return <AdminApplicantList />;
    }
  };

  return (
    <div style={styles.dashboardContainer} className='overflow-y-scroll'>
      <aside style={styles.sidebar}>
        <h2>Admin Dashboard</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('applicants')}>Applicants</button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('notices')}>Notices</button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('teachers')}>Teachers</button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('payments')}>Payments</button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('students')}>Students</button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveSection('fees')}>Fees</button>
          </li>
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
        {renderSection()}
      </main>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    marginBottom: '15px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
};

export default DashboardHome;
