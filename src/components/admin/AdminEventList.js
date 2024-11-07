// components/NoticeList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, ExternalLink } from "lucide-react";
import { DataTableFilter } from '@/components/ui/DataTableFilter';
import { Pagination } from "@/components/ui/Pagination";

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
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
      id: 'title',
      type: 'text',
      placeholder: 'Search by title...',
      value: filters.title,
    },
    {
      id: 'date',
      type: 'select',
      placeholder: 'Filter by date',
      value: filters.date,
      options: [
        { value: 'all', label: 'All' },
       
        { value: 'other', label: 'Other' },
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
    fetchEvents();
  }, [pagination.currentPage, pagination.pageSize, filters]);

  const fetchEvents = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all' && value !== '')
      )
    });

    const response = await fetch(`/api/admin/events?${queryParams}`);
    const data = await response.json();
    
    setEvents(data.events);
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
      currentPage: 1 // Reset to first page when filter changes
    }));
  };

  const resetFilters = () => {
    setFilters({
      title: '',
      category: '',
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
    if (window.confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      fetchEvents(); // Refresh the list after deletion
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
        <Button 
          onClick={() => router.push('/admin/events/new')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Event
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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                      {event.date}
                  </span>
                </TableCell>
                <TableCell>
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {event.link && (
                    <a 
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/events/${event._id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(event._id)}
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

export default AdminPostList;
