import Image from "next/image";
import Teacher3 from "@/models/Teacher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import connectionToDatabase from "@/lib/mongodb";

export default async function Faculty({ params }) {
    await connectionToDatabase();
    const { id } = params; // Get the ID from the URL parameters
    const teacherDoc = await Teacher3.findOne({ id: id });

    // Convert the Mongoose document to a plain object
    const teacher = teacherDoc ? teacherDoc.toObject() : null;

    // If teacher is not found, handle that case
    if (!teacher) {
        return (
            <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <h1 className="text-xl font-semibold">Faculty Member Not Found</h1>
                    <p>Sorry, we couldn't find the faculty member you're looking for.</p>
                </div>
                <Link href="/faculty" passHref>
                    <Button className="mt-6">Return to Faculty List</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-accent">Faculty Profile</h1>
                <Link href="/faculty" passHref>
                    <Button variant="outline" className="flex items-center gap-2">
                        <span>←</span> Back to Faculty
                    </Button>
                </Link>
            </div>

            {/* Main Profile Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-50 flex justify-center p-6">
                        <Image
                            src={teacher.imageUrl || "/placeholder.svg"}
                            alt={teacher.title || "Faculty Member"}
                            width={250}
                            height={300}
                            className="rounded-md object-cover border-2 border-accent shadow-md"
                        />
                    </div>
                    <div className="md:w-2/3 p-6">
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{teacher.title || "No Name Available"}</h2>
                            <p className="text-lg font-medium text-accent">{teacher.designation || "No Designation"}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">Email:</span>
                                    <a href={`mailto:${teacher.email}`} className="text-blue-600 hover:underline">
                                        {teacher.email || "No Email"}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">Mobile:</span>
                                    <a href={`tel:${teacher.mobileNo}`} className="text-blue-600 hover:underline">
                                        {teacher.mobileNo || "No Mobile Number"}
                                    </a>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">Qualifications:</span>
                                    <span>{teacher.educationQualifications || "No Information"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">Department:</span>
                                    <span>{teacher.department || "No Department"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Education */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-accent bg-opacity-10 px-4 py-3 border-l-4 border-accent">
                        <h3 className="text-lg font-semibold text-gray-800">Education Background</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <p><span className="font-medium">Qualifications:</span> {teacher.educationQualifications || "No Information"}</p>
                        <p><span className="font-medium">Background:</span> {teacher.educationBackground || "No Information"}</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-accent bg-opacity-10 px-4 py-3 border-l-4 border-accent">
                        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <p><span className="font-medium">Gender:</span> {teacher.gender || "No Information"}</p>
                            <p><span className="font-medium">Blood Group:</span> {teacher.bloodGroup || "No Information"}</p>
                            <p><span className="font-medium">Religion:</span> {teacher.religion || "No Information"}</p>
                            <p><span className="font-medium">Marital Status:</span> {teacher.maritalStatus || "No Information"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address & Family Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Addresses */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-accent bg-opacity-10 px-4 py-3 border-l-4 border-accent">
                        <h3 className="text-lg font-semibold text-gray-800">Address Information</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <div>
                            <p className="font-medium">Present Address:</p>
                            <p className="text-gray-700 pl-4">{teacher.presentAddress || "No Information"}</p>
                        </div>
                        <div>
                            <p className="font-medium">Permanent Address:</p>
                            <p className="text-gray-700 pl-4">{teacher.permanentAddress || "No Information"}</p>
                        </div>
                    </div>
                </div>

                {/* Family Information */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-accent bg-opacity-10 px-4 py-3 border-l-4 border-accent">
                        <h3 className="text-lg font-semibold text-gray-800">Family Information</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <p><span className="font-medium">Father's Name:</span> {teacher.fathersName || "No Information"}</p>
                        <p><span className="font-medium">Mother's Name:</span> {teacher.mothersName || "No Information"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}