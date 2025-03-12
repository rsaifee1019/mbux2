import AdminSetFee from '@/components/admin/AdminSetFee';

export default function NoticePage({ params }) {
  console.log('id')
  console.log(params.id)
    return (
      <div className="p-6">
        <AdminSetFee feeId={params.id} />
      </div>
    );
  }
  