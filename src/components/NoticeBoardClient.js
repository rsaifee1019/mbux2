"use client";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from 'lucide-react';

export default function NoticeBoardClient({ notices }) {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          নোটিশ বোর্ড
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notices.length === 0 && <li>কোনো নোটিশ পাওয়া যায়নি</li>}
          {notices.map((notice) => (
            <li key={notice.id}>
              <Link href={`${notice.link}`} target="_blank" className="block hover:bg-accent rounded-lg p-3 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{notice.title}</span>
                  <Badge variant="secondary" className="ml-2 shrink-0 text-white">
                    {formatDate(notice.dateUploaded)}
                  </Badge>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
