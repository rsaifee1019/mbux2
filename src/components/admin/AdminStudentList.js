// components/TeacherList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/admin/students');
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className=''>
      <h2>Students</h2>
      <button onClick={() => router.push('/admin/students/new')}>Add New Student</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.emailID}</td>
              <td>
                <button onClick={() => router.push(`/admin/students/${student._id}`)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentList;
