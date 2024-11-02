import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminFeeList = () => {
  const [fees, setFees] = useState([]);
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const fetchFees = async () => {
    // Construct the query string based on search inputs
    const query = new URLSearchParams();
    if (searchName) query.append('query', searchName);
    if (searchStudentId) query.append('query', searchStudentId);
  
    const response = await fetch(`/api/admin/fees?${query.toString()}`);
    const data = await response.json();
  
    // Map the data to include student details and format dates
    const formattedFees = data.data.map(fee => ({
      id: fee._id,
      student: fee.student,
      month: new Date(fee.month),
      amount: fee.amount,
      dueDate: new Date(fee.dueDate),
      status: fee.status,
    }));
  
    setFees(formattedFees);
  };

  useEffect(() => {

    fetchFees();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/fees/${id}`, { method: 'DELETE' });
    setFees(fees.filter((fee) => fee.id !== id));
  };

  return (
    <div>
      <button onClick={() => router.push('/admin/fees/new')}>Add New Fee</button>
      <input type="text" placeholder="Search by student name" onChange={(e) => setSearchName(e.target.value)} />
      <input type="text" placeholder="Search by student ID" onChange={(e) => setSearchStudentId(e.target.value)} />
      <button onClick={() => fetchFees()}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.student.name}</td> {/* Assuming you have student name available */}
              <td>{fee.month.toLocaleString('default', { month: 'long' })} {fee.month.getFullYear()}</td>
              <td>{fee.amount}</td>
              <td>{fee.dueDate.toLocaleDateString()}</td>
              <td>{fee.status}</td>
              <td>
                <button onClick={() => router.push(`/admin/fees/${fee.id}`)}>Edit</button>
                <button onClick={() => handleDelete(fee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeeList;