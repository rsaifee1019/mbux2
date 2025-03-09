import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
const AdminFeeList = () => {
  const [fees, setFees] = useState([]);
  const [filters, setFilters] = useState({
    studentName: '',
    studentId: '',
    status: 'all',
    paymentType: 'all',
    monthFrom: '',
    monthTo: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const filterConfig = [
    {
      id: 'studentName',
      type: 'text',
      placeholder: 'Search by student name...',
      value: filters.studentName,
    },
    {
      id: 'studentId',
      type: 'text',
      placeholder: 'Search by student ID...',
      value: filters.studentId,
    },
    {
      id: 'status',
      type: 'select',
      placeholder: 'Filter by status',
      value: filters.status,
      options: [
        { value: 'all', label: 'All' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'overdue', label: 'Overdue' },
      ],
    },
    {
      id: 'paymentType',
      type: 'select',
      placeholder: 'Filter by payment type',
      value: filters.paymentType,
      options: [
        { value: 'all', label: 'All' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'admission', label: 'Admission' },
        { value: 'exam', label: 'Exam' },
      ],
    },
    {
      id: 'monthFrom',
      type: 'date',
      placeholder: 'From month',
      value: filters.monthFrom,
    },
    {
      id: 'monthTo',
      type: 'date',
      placeholder: 'To month',
      value: filters.monthTo,
    },
  ];

  useEffect(() => {
    fetchFees();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchFees = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/fees?${queryParams}`);
    const data = await response.json();
    
    setFees(data.fees);
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
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  const resetFilters = () => {
    setFilters({
      studentName: '',
      studentId: '',
      status: 'all',
      paymentType: 'all',
      monthFrom: '',
      monthTo: '',
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
      currentPage: 1
    }));
  };

  const handleStatusChange = async (id, status) => {
    const response = await axios.put(`/api/admin/fees/${id}`, { status });
    await fetchFees();
   
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Fee Records</h2>
        <Button 
        onClick={() => router.push('/admin/fees')}
        className="flex items-center gap-2 rounded-[10px]"
      >
        <PlusCircle className="h-4 w-4" />
        Add New Fee
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
              <TableHead>Student Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee._id}>
                <TableCell>{fee.student?.name}</TableCell>
                <TableCell>{fee.student?.studentId}</TableCell>
                <TableCell>
                  {new Date(fee.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </TableCell>
                <TableCell>৳{fee.amount}</TableCell>
                <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>{fee.paymentType}</TableCell>
                <TableCell onClick={() => handleStatusChange(fee._id, fee.status)} style={{ cursor: 'pointer' }}>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    fee.status === 'PAID' 
                      ? 'bg-green-100 text-green-800'
                      : fee.status === 'OVERDUE'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {fee.status}
                  </span>
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

export default AdminFeeList;