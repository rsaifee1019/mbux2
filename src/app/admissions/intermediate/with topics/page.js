import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, BookOpen, Home } from 'lucide-react'

export default function IntermediateAdmissions() {
  const subjects = [
    {
      title: "Home Science",
      description: "Study the science and art of home management, nutrition, and family living.",
      icon: <Home className="h-6 w-6" />,
      courses: ["Family Resource Management", "Human Development", "Food and Nutrition", "Textile and Clothing"],
      careerProspects: ["Nutritionist", "Interior Designer", "Child Development Specialist", "Consumer Affairs Officer"],
    },
    {
      title: "Science",
      description: "Explore the fundamental principles of natural sciences and mathematics.",
      icon: <Beaker className="h-6 w-6" />,
      courses: ["Physics", "Chemistry", "Biology", "Mathematics"],
      careerProspects: ["Doctor", "Engineer", "Research Scientist", "Data Analyst"],
    },
    {
      title: "Humanities",
      description: "Delve into the study of human culture, literature, and social sciences.",
      icon: <BookOpen className="h-6 w-6" />,
      courses: ["History", "Geography", "Political Science", "Economics"],
      careerProspects: ["Journalist", "Teacher", "Social Worker", "Civil Servant"],
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Intermediate Admissions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                {subject.icon}
              </div>
              <CardTitle className="text-2xl mb-2">{subject.title}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="font-semibold mb-2">Key Courses:</h3>
              <ul className="list-disc list-inside mb-4">
                {subject.courses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-2">Career Prospects:</h3>
              <ul className="list-disc list-inside">
                {subject.careerProspects.map((career, idx) => (
                  <li key={idx}>{career}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/apply/${subject.title.toLowerCase().replace(' ', '-')}`}>
                  Apply for {subject.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}