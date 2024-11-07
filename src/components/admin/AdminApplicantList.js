// components/ApplicantList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";

const AdminApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    ssc_registration: '',
    status: 'all',
    phone: '',
    dateFrom: '',
    dateTo: '',
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
      id: 'ssc_registration',
      type: 'text',
      placeholder: 'Search by SSC registration...',
      value: filters.ssc_registration,
    },
    {
      id: 'phone',
      type: 'text',
      placeholder: 'Search by phone...',
      value: filters.phone,
    },
    {
      id: 'status',
      type: 'select',
      placeholder: 'Filter by status',
      value: filters.status,
      options: [
        { value: 'all', label: 'All' },
        { value: 'unpaid', label: 'Unpaid' },
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' },
      ],
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
    fetchApplicants();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchApplicants =  async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/applicants?${queryParams}`);
    const data = await response.json();
    
    setApplicants(data.applicants);
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
      name: '',
      ssc_registration: '',
      status: '',
      phone: '',
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
    if (window.confirm('Are you sure you want to delete this applicant?')) {
      await fetch(`/api/admin/applicants/${id}`, { method: 'DELETE' });
      fetchApplicants();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Applicants</h2>
        <Button 
          onClick={() => router.push('/admin/applicants/new')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Applicant
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
              <TableHead>SSC Registration</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant._id}>
                <TableCell>{applicant.name_English}</TableCell>
                <TableCell>{applicant.ssc_registration}</TableCell>
                <TableCell>{applicant.phone}</TableCell>
                <TableCell>{new Date(applicant.application_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    applicant.status === 'accepted' 
                      ? 'bg-green-100 text-green-800'
                      : applicant.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : applicant.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {applicant.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/applicants/${applicant._id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(applicant._id)}
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

export default AdminApplicantList;
