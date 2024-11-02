import Image from "next/image";
import Teacher3 from "@/models/Teacher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import connectionToDatabase from "@/lib/mongodb";

export default async function Faculty({ params }) {
    await connectionToDatabase();
    const { id } = params; // Get the ID from the URL parameters
    const teacher = await Teacher3.findOne({ id: id });
    console.log(teacher);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-[#a6192e]">Faculty Profile</h1>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
                <div className="flex-shrink-0">
                    <Image
                        src={teacher.imageUrl || "/placeholder.svg"} // Use the image from the API or a placeholder
                        alt={teacher.title || "No Title"}
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-[#a6192e] mb-4"
                    />
                </div>
                <div className="md:ml-6">
                    <h2 className="text-xl font-semibold">{teacher.title || "No Title"}</h2>
                    <p className="text-gray-600">{teacher.designation || "No Designation"}</p>
                    <p className="text-gray-600">Email: {teacher.email || "No Email"}</p>
                    <p className="text-gray-600">Mobile No: {teacher.mobileNo || "No Mobile No"}</p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                    <p><strong>National ID:</strong> {teacher.nationalId || "No National ID"}</p>
                    <p><strong>Gender:</strong> {teacher.gender || "No Gender"}</p>
                    <p><strong>Religion:</strong> {teacher.religion || "No Religion"}</p>
                    <p><strong>Blood Group:</strong> {teacher.bloodGroup || "No Blood Group"}</p>
                    <p><strong>Marital Status:</strong> {teacher.maritalStatus || "No Marital Status"}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <p><strong>Qualifications:</strong> {teacher.educationQualifications || "No Education"}</p>
                    <p><strong>Background:</strong> {teacher.educationBackground || "No Education Background"}</p>
                </div>
            </div>

            <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Addresses</h3>
                <p><strong>Present Address:</strong> {teacher.presentAddress || "No Present Address"}</p>
                <p><strong>Permanent Address:</strong> {teacher.permanentAddress || "No Permanent Address"}</p>
            </div>

            <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Family Information</h3>
                <p><strong>Father's Name:</strong> {teacher.fathersName || "No Father's Name"}</p>
                <p><strong>Mother's Name:</strong> {teacher.mothersName || "No Mother's Name"}</p>
            </div>

            <Link href="/faculty" passHref>
                <Button className="bg-[#e81727] hover:bg-[#c71522] text-white mt-6">Back to Faculty List</Button>
            </Link>
        </div>
    );
}