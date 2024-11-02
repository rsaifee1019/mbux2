import AdminCreateEditStudent from '@/components/admin/AdminCreateEditStudent';

export default function StudentPage({ params }) {
    return (
      <div className="p-6">
        <AdminCreateEditStudent studentId={params.id} />
      </div>
    );
  }
  