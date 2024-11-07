// components/PaymentList.js
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";

const AdminPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    userType: 'all',
    transactionId: '',
    dateFrom: '',
    dateTo: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const filterConfig = [
    {
      id: 'status',
      type: 'select',
      placeholder: 'Filter by status',
      value: filters.status,
      options: [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' },
      ],
    },
    {
      id: 'userType',
      type: 'select',
      placeholder: 'Filter by user type',
      value: filters.userType,
      options: [
        { value: 'all', label: 'All' },
        { value: 'student', label: 'Student' },
        { value: 'applicant', label: 'Applicant' },
      ],
    },
    {
      id: 'transactionId',
      type: 'text',
      placeholder: 'Search by transaction ID...',
      value: filters.transactionId,
    },
    {
      id: 'dateFrom',
      type: 'date',
      placeholder: 'From date',
      value: filters.dateFrom,
    },
    {
      id: 'dateTo',
      type: 'date',
      placeholder: 'To date',
      value: filters.dateTo,
    },
  ];

  useEffect(() => {
    fetchPayments();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchPayments = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/payments?${queryParams}`);
    const data = await response.json();
    
    setPayments(data.payments);
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
      status: '',
      userType: '',
      transactionId: '',
      dateFrom: '',
      dateTo: '',
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      await fetch(`/api/admin/payments/${id}`, { method: 'DELETE' });
      fetchPayments();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Payment Records</h2>
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
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Student/Applicant ID</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>৳{payment.amount}</TableCell>
                <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : payment.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.userType}</TableCell>
                <TableCell>{payment.transactionId || 'N/A'}</TableCell>
                <TableCell>{payment.studentId || payment.applicantId || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(payment._id)}
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

export default AdminPaymentList;
