import connectionToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from 'lucide-react';

export default async function EventsCalendar() {
  await connectionToDatabase();
  
  let events = [
    { date: '2024-05-15', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
    { date: '2024-05-20', title: 'সাংস্কৃতিক অনুষ্ঠান' },
    { date: '2024-06-01', title: 'গ্র্যাজুয়েশন সেরিমনি' },
  ];


  return (
    <Card className="w-full rounded-none shadow-none ">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl font-bold flex items-center gap-2">
          <CalendarDays className="h-6 w-6 mr-2" />
          ইভেন্ট ক্যালেন্ডার
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="block hover:bg-accent  p-3 transition-colors border-b-2 border-b-gray-300"
            >
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-3 shrink-0 bg-accent hover:bg-accent text-white">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Badge>
                <span className="font-banglaStraight">{event.title}</span>
              </div>
            </div>
          ))}
          {events.length === 0 && <div>কোনো ইভেন্ট পাওয়া যায়নি</div>}
        </div>
      </CardContent>
    </Card>
  );
}