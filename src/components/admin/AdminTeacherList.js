// components/TeacherList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";

const AdminTeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    designation: '',
    status: 'all',
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
      id: 'email',
      type: 'text',
      placeholder: 'Search by email...',
      value: filters.email,
    },
    {
      id: 'designation',
      type: 'text',
      placeholder: 'Search by designation...',
      value: filters.designation,
    },
    {
      id: 'status',
      type: 'select',
      placeholder: 'Filter by status',
      value: filters.status,
      options: [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'on-leave', label: 'On Leave' },
      ],
    },
  ];

  useEffect(() => {
    fetchTeachers();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchTeachers = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/teachers?${queryParams}`);
    const data = await response.json();
    
    setTeachers(data.teachers);
    setPagination(prev => ({
      ...prev,
      totalItems: data.totalItems,
      totalPages: Math.ceil(data.totalItems / pagination.pageSize)
    }));
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
      currentPage: 1
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
      email: '',
      designation: '',
      status: '',
    });
  };

  const filteredTeachers = teachers.filter(teacher => {
    return (
      (!filters.name || teacher.title.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email || teacher.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.designation || teacher.designation.toLowerCase().includes(filters.designation.toLowerCase())) &&
      (!filters.status || teacher.status === filters.status)
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    }
  };
console.log(teachers);
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Teachers</h2>
        <Button 
          onClick={() => router.push('/admin/teachers/new')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Teacher
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
              <TableHead>Email</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.title}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.designation}</TableCell>
                <TableCell>{teacher.mobileNo}</TableCell>
                <TableCell className="max-w-xs truncate">{teacher.educationQualifications}</TableCell>
                <TableCell>{teacher.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/teachers/${teacher.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(teacher._id)}
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

export default AdminTeacherList;
