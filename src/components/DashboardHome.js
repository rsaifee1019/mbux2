// components/DashboardHome.js
"use client";
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
import SetAd from './admin/SetAd';

const sections = {
  applicants: <AdminApplicantList />,
  notices: <AdminNoticeList />,
  posts: <AdminPostList />,
  teachers: <AdminTeacherList />,
  payments: <AdminPaymentList />,
  students: <AdminStudentList />,
  fees: <AdminFeeList />,
  setFees: <SetAd />,
  import: <StudentCSVUpload />,
  authorized: <Authorized />,
};

const navItems = [
  { id: 'applicants', label: 'Applicants' },
  { id: 'notices', label: 'Notices' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'payments', label: 'Payments' },
  { id: 'students', label: 'Students' },
  { id: 'fees', label: 'Fees' },
  { id: 'setFees', label: 'Set Fees' },
  { id: 'posts', label: 'Posts' },
  { id: 'import', label: 'Import' },
  { id: 'authorized', label: 'Authorized' },
];

const DashboardHome = () => {
  const [activeSection, setActiveSection] = useState('applicants');

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-5">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-4">
              <button
                className={`w-full p-2 rounded-md text-left hover:bg-gray-700 ${
                  activeSection === item.id ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-5 overflow-y-auto">
        {sections[activeSection] || <AdminApplicantList />}
      </main>
    </div>
  );
};

export default DashboardHome;