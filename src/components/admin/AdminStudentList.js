// components/TeacherList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    studentId: '',
    email: '',
    degree: 'all',
    department: '',
    paymentStatus: 'all',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const router = useRouter();

  const filterConfig = [
    {
      id: 'name',
      type: 'text',
      placeholder: 'Search by name...',
      value: filters.name,
    },
    {
      id: 'studentId',
      type: 'text',
      placeholder: 'Search by ID...',
      value: filters.studentId,
    },
    {
      id: 'email',
      type: 'text',
      placeholder: 'Search by email...',
      value: filters.email,
    },
    {
      id: 'degree',
      type: 'select',
      placeholder: 'Filter by degree',
      value: filters.degree,
      options: [
        { value: 'all', label: 'All' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'bachelor', label: 'Bachelor' },
        { value: 'masters', label: 'Masters' },
      ],
    },
    {
      id: 'department',
      type: 'text',
      placeholder: 'Search by department...',
      value: filters.department,
    },
    {
      id: 'paymentStatus',
      type: 'select',
      placeholder: 'Filter by payment',
      value: filters.paymentStatus,
      options: [
        { value: 'all', label: 'All' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
      ],
    },
  ];

  useEffect(() => {
    fetchStudents();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchStudents = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/students?${queryParams}`);
    const data = await response.json();
    
    setStudents(data.students);
    setPagination(prev => ({
      ...prev,
      totalItems: data.totalItems,
      totalPages: Math.ceil(data.totalItems / pagination.pageSize)
    }));
  };

  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      studentId: '',
      email: '',
      degree: '',
      department: '',
      paymentStatus: '',
    });
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1 // Reset to first page when changing page size
    }));
  };

  const filteredStudents = students.filter(student => {
    return (
      (!filters.name || student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.studentId || student.studentId.toLowerCase().includes(filters.studentId.toLowerCase())) &&
      (!filters.email || student.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.degree === 'all' || student.degree === filters.degree) && // Change here
      (!filters.department || student.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (filters.paymentStatus === 'all' || student.paymentStatus === filters.paymentStatus) // Change here
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      setStudents(students.filter((student) => student._id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Students</h2>
        <Button 
          onClick={() => router.push('/admin/students/new')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Student
        </Button>
      </div>

      <DataTableFilter
        filters={filterConfig}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
      />

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.degree}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/students/${student._id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(student._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="border-t p-4">
          <Pagination
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStudentList;
