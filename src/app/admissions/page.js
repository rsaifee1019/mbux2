import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, BookOpen, Award, Briefcase } from 'lucide-react'

export default function AdmissionsPage() {
  const admissionOptions = [
    {
      title: "ইন্টারমিডিয়েট",
      description: "একাদশ ও দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য",
      icon: <BookOpen className="h-6 w-6" />,
      link: "/admissions/intermediate"
    },
    {
      title: "ডিগ্রি",
      description: "২ বছরের ডিপ্লোমা প্রোগ্রাম",
      icon: <Briefcase className="h-6 w-6" />,
      link: "/admissions/degree"
    },
    {
      title: "অনার্স",
      description: "স্নাতক প্রোগ্রাম",
      icon: <Award className="h-6 w-6" />,
      link: "/admissions/honors"
    },
    {
      title: "মাস্টার্স",
      description: "স্নাতকোত্তর প্রোগ্রাম",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "/admissions/masters"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">বিশ্ববিদ্যালয় ভর্তি</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {admissionOptions.map((option, index) => (
          <Link href={option.link} key={index} className="block group">
            <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="rounded-full bg-primary p-3 mb-4">
                  {option.icon}
                </div>
                <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}