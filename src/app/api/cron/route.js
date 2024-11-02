import { NextResponse } from 'next/server';
import { generateMonthlyFeeRecords, updateOverdueFees } from '@/lib/cron';

export async function GET(request) {
  // Verify the request is authorized (optional but recommended)
 /* const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }*/

  try {
    // Choose which job to run based on a query parameter
   
        await generateMonthlyFeeRecords();
        return NextResponse.json({ message: 'Monthly fee records generated' });
      
    
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Job execution failed' }, { status: 500 });
  }
}