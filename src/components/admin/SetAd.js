import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";import { PlusCircle, Pencil, Trash2, ExternalLink } from "lucide-react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SetAd = () => {
  const [fees, setFees] = useState([]);
  const router = useRouter()
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

    const response = await fetch(`/api/fees`);
    const data = await response.json();
    console.log(data)
    
    setFees(data);
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

  const handleEdit = async (id) => {
console.log('clicked')
 router.push(`/admin/fees/${id}`)
   
   
  };

  const handleDelete = async (id, status) => {
    console.log('clicked')
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
        <PlusCircles className="h-4 w-4" />
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
       
              <TableHead>Degree</TableHead>
 
              <TableHead>Type</TableHead>
            
              <TableHead>Years</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee._id}>
              <TableCell>{fee.degree}</TableCell>
               
                <TableCell>{fee.subtype}</TableCell>
            
                <TableCell >

         
                {fee.year || '?'}</TableCell>
               
           <TableCell>৳{fee.amount}      </TableCell>
           <TableCell 
           onClick={() => handleEdit(fee._id)} style={{ cursor: 'pointer' }}>
           <Pencil className="h-4 w-4" />
           </TableCell>

           <TableCell
           onClick={() => handleDelete(fee._id)} style={{ cursor: 'pointer' }}>
           <Trash2 className="h-4 w-4" />
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

export default SetAd;