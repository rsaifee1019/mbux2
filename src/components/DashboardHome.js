// components/DashboardHome.js
"use client"
import { useState } from 'react';
import AdminPaymentList from './admin/AdminPaymentList';
import AdminApplicantList from './admin/AdminApplicantList';
import AdminNoticeList from './admin/AdminNoticeList';
import AdminTeacherList from './admin/AdminTeacherList';
import AdminStudentList from './admin/AdminStudentList';
import AdminFeeList from './admin/AdminFeeList';
import StudentCSVUpload from './admin/Students';
import AdminPostList from './admin/AdminPostList';
import Authorized from './absent/Authorized';
const DashboardHome = () => {
  const [activeSection, setActiveSection] = useState('applicants');

  const renderSection = () => {
    switch (activeSection) {
      case 'applicants':
        return <AdminApplicantList />;
      case 'notices':
        return <AdminNoticeList />;
      case 'posts':
        return <AdminPostList />;
      case 'teachers':
        return <AdminTeacherList />;
      case 'payments':
        return <AdminPaymentList />;
      case 'students':
        return <AdminStudentList />;
      case 'fees':
        return <AdminFeeList />;
      case 'import':
        return <StudentCSVUpload />;
        case "authorized":
          return <Authorized />
      default:
        return <AdminApplicantList />;
    }
  };

  return (
    <div style={styles.dashboardContainer} className='overflow-y-scroll'>
      <aside style={styles.sidebar}>
    
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <button className={`w-full  p-2 rounded-md ${activeSection === 'applicants' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('applicants')}>Applicants</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full p-2 rounded-md ${activeSection === 'notices' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('notices')}>Notices</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full  p-2 rounded-md ${activeSection === 'teachers' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('teachers')}>Teachers</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full  p-2 rounded-md ${activeSection === 'payments' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('payments')}>Payments</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full t p-2 rounded-md ${activeSection === 'students' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('students')}>Students</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full  p-2 rounded-md ${activeSection === 'fees' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('fees')}>Fees</button>
          </li>
          <li style={styles.navItem}>
            <button className={`w-full  p-2 rounded-md ${activeSection === 'posts' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('posts')}>Posts</button>
          </li>
          <li style={styles.navItem}>
          <button className={`w-full  p-2 rounded-md ${activeSection === 'import' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('import')}>Import</button>
        </li>
        <li style={styles.navItem}>
          <button className={`w-full  p-2 rounded-md ${activeSection === 'authorized' ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setActiveSection('authorized')}>Authorized</button>
        </li>
        </ul>
      </aside>

      <main style={styles.mainContent}>

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
