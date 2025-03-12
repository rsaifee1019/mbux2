import AdminCreateEditTeacher from '@/components/admin/AdminCreateEditTeacher';

export default function TeacherPage({ params }) {
    return (
      <div className="p-6">
        <AdminCreateEditTeacher teacherId={params.id} />
      </div>
    );
  }
  