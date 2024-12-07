import AdminCreateEditNotice from '@/components/admin/AdminCreateEditNotice';

export default function NoticePage({ params }) {
    return (
      <div className="p-6">
        <AdminCreateEditNotice noticeId={params.id} />
      </div>
    );
  }
  