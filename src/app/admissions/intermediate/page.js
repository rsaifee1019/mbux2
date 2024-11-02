import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, BookOpen, Home } from 'lucide-react'

export default function IntermediateAdmissions() {
  const departments = [
    {slug: "home-science",
      title: "হোম সায়েন্স",
      description: "গৃহ ব্যবস্থাপনা, পুষ্টি এবং পারিবারিক জীবনের বিজ্ঞান ও কলা অধ্যয়ন করুন।",
      icon: <Home className="h-6 w-6" />,
      courses: ["পারিবারিক সম্পদ ব্যবস্থাপনা", "মানব উন্নয়ন", "খাদ্য ও পুষ্টি", "টেক্সটাইল ও পোশাক"],
      careerProspects: ["পুষ্টিবিদ", "অভ্যন্তরীণ নকশাকার", "শিশু উন্নয়ন বিশেষজ্ঞ", "ভোক্তা বিষয়ক কর্মকর্তা"],
    },
    {slug: "science",
      title: "বিজ্ঞান",
      description: "প্রাকৃতিক বিজ্ঞান এবং গণিতের মৌলিক নীতিগুলি অন্বেষণ করুন।",
      icon: <Beaker className="h-6 w-6" />,
      courses: ["পদার্থবিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "গণিত"],
      careerProspects: ["চিকিৎসক", "প্রকৌশলী", "গবেষণা বিজ্ঞানী", "তথ্য বিশ্লেষক"],
    },
    {slug: "humanities",
      title: "মানবিক",
      description: "মানব সংস্কৃতি, সাহিত্য এবং সামাজিক বিজ্ঞানের অধ্যয়নে গভীরে যান।",
      icon: <BookOpen className="h-6 w-6" />,
      courses: ["ইতিহাস", "ভূগোল", "রাষ্ট্রবিজ্ঞান", "অর্থনীতি"],
      careerProspects: ["সাংবাদিক", "শিক্ষক", "সমাজকর্মী", "সরকারি কর্মকর্তা"],
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">ইন্টারমিডিয়েট ভর্তি</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                {department.icon}
              </div>
              <CardTitle className="text-2xl mb-2">{department.title}</CardTitle>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="font-semibold mb-2">প্রধান কোর্সগুলি:</h3>
              <ul className="list-disc list-inside mb-4">
                {department.courses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-2">ক্যারিয়ার সম্ভাবনা:</h3>
              <ul className="list-disc list-inside">
                {department.careerProspects.map((career, idx) => (
                  <li key={idx}>{career}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/inter-form?subject=${department.slug}`}>
                  {department.title} এর জন্য আবেদন করুন
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}