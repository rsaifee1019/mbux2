'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useRouter, useParams } from 'next/navigation'; 
import Image from 'next/image';
import SearchParamsWrapper from '@/components/UseSearchParamsWrapper';
import { Suspense } from 'react';
import Cookies  from "js-cookie"
import axios from 'axios';
import html2pdf from 'html2pdf.js';
const AdmissionForm = () => {
  const router = useRouter();
  const [bSectionSubjects, setBSectionSubjects] = useState(false);
  const [fourthSubjectOptions, setFourthSubjectOptions] = useState(false);

  const { id } = useParams();

  const handleDownloadPDF = () => {
    const element = document.getElementById('hj'); // Reference to the form element
    const options = {
        margin: 5, // Reduced margin to 5mm to fit into one page
        filename: 'admission_form.pdf', // Name of the downloaded PDF
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5 }, // Adjusted scale to make the content smaller
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf()
      .from(element)
      .set(options) // Apply the options
      .save();
};
  const getSearchParams = () => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const searchParams = new URL(window.location.href).searchParams
      return {
        subject: searchParams.get('subject')
      }
    }
    return {}
  }

  const params = getSearchParams()
  const subject = params.subject;

  useEffect(() => {
    if (subject === 'science') {
      setBSectionSubjects([
        { id: 'higherMath', label: 'উচ্চতর গণিত (২৬৫,২৬৬)' },
        { id: 'chemistry', label: 'রসায়ন (১৭৬,১৭৭)' },
        { id: 'biology', label: 'জীববিজ্ঞান (১৭৮,১৭৯)' },
        { id: 'physics', label: 'পদার্থবিজ্ঞান (১৭৪,১৭৫)' },
      ]);
    
      setFourthSubjectOptions([
        { id: 'psychology', label: 'মনোবিজ্ঞান (১২৩,১২৪)' },
        { id: 'biology', label: 'জীববিজ্ঞান (১৭৮,১৭৯)' },
        { id: 'higherMath', label: 'উচ্চতর গণিত (২৬৫,২৬৬)' },
      ]);

      console.log(bSectionSubjects);
    } else if (subject === 'humanities') {
      setBSectionSubjects([
        { id: 'economics', label: 'অর্থনীতি (১০৯,১১০)' },
        { id: 'politics', label: 'পৌরনীতি (২৬৯,২৭০)' },
        { id: 'islamicHistory', label: 'ইসলামের ইতিহাস (২৬৭,২৬৮)' },
        { id: 'socialWork', label: 'সমাজকর্ম (২৭১,২৭২)' },
      ]);
    
      setFourthSubjectOptions([
        { id: 'healthScience', label: 'গার্হস্থ্য বিজ্ঞান (২৭৩,২৭৪)' },
        { id: 'psychology', label: 'মনোবিজ্ঞান (১২৩,১২৪)' },
        { id: 'higherMath', label: 'উচ্চতর গণিত (২৬৫,২৬৬)' },
      ]);
    } 
    else {
  
      setFourthSubjectOptions([
        { id: 'psychology', label: 'মনোবিজ্ঞান (১২৩,১২৪)' },
        {id:'arts', label:'শিল্পকলা ও বস্ত্র পরিচ্ছদ (২৮৪,২৮৫)'}
      ]);
    }
  }, [subject]);

  const [formData, setFormData] = useState({
    subject,
    type: 'admission',
    ssc_registration: '',
    name_Bangla: '',
    name_English: '',
    birthRegNo: '',
    mobile: '',
    birth: '',
    nationality: '',
    religion  : '',
    married: '',
    fathers_Name_Bangla: '',
    fathers_Name_English: '',
    fathers_Nid: '',
    fathers_Mobile: '',
    mothers_Name_Bangla: '',
    mothers_Name_English: '',
    mothers_Nid: '',
    mothers_Mobile: '',
    address_Permanent: '',
    district_Permanent: '',
    zip_Permanent: '', // Assuming you have a zip field
    thana_Permanent: '',
    address_Current: '',
    district_Current: '',
    zip_Current: '', // Assuming you have a zip field
    thana_Current: '',
    guardians_Name: '',
    guardians_Occupation: '',
    guardians_Monthly_Income: '',
    guardians_Mobile_Number: '',
    sscBranch: '',
    ssc_Board: '',
    ssc_Roll: '',
    ssc_registration: '',
    sss_Year: '',
    sss_Year: '',
    ssc_GPA: '',
    sscInstituteName: '',
    ssc_Institution_District: '',
    ssc_Institution_Village: '',
    ssc_Institution_Thana: '',
    ssc_Institution_Zip: '',
    subjectsA: (subject !== 'hscience') ? ['বাংলা (১০১,১০২)', 'ইংরেজি (১০৭,১০৮)', 'তথ্য ও যোগাযোগ প্রযুক্তি (১০৯,১১০)'] : ['বাংলা (১০১,১০২)', 'ইংরেজি (১০৭,১০৮)', 'তথ্য ও যোগাযোগ প্রযুক্তি (১০৯,১১০)', 'খাদ্য ও পুষ্টি (১১১,১১২)', 'গৃহ ব্যবস্থাপনা (১১৩,১১৪)', 'শ��শু উন্নয়ন (১১৫,১১৬)'],
    subjectsB: [],
    fourthSubject: [],
    extraCurricularActivities: '',
    hobbies: '',
    socialServiceExperience: '',
    documents: {
      confirmationSlip: false,
      sscTranscript: false,
      sscCertificate: false,
      sscRegAndAdmitCard: false,
      photos: false,
      birthCertificate: false,
      parentsNID: false,
    },
  });

  useEffect(() => {
    axios.get(`/api/admin/applicants/${id}`)
    .then(response => {
      setFormData(response.data);
    })
    .catch(error => {
      console.error('Error fetching applicant:', error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log(formData);
  };
  const handleBSectionChange = (subjectId) => {
    setFormData(prevData => {
      const currentSelection = prevData.subjectsB;
      const isSelected = currentSelection.includes(subjectId);

      if (isSelected) {
        // Remove subject if already selected
        return {
          ...prevData,
          subjectsB: currentSelection.filter(id => id !== subjectId)
        };
      } else if (currentSelection.length < 3) {
        // Add subject if not selected and less than 3 subjects are selected
        return {
          ...prevData,
          subjectsB: [...currentSelection, subjectId]
        };
      }
      return prevData; // Do nothing if already 3 subjects are selected
    });
  };

  const handleFourthSubjectChange = (subjectId) => {
    setFormData(prevData => ({
      ...prevData,
      fourthSubject: subjectId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('/api/applicants', { // Adjust the API endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      Cookies.set("tran_id", data.tran_id);
      if (response.ok) {
        // Redirect to the checkout page on successful submission
        router.push('/checkout');
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error submitting form:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddressChange = (addressType, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value,
      },
    }));
  };

  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <SearchParamsWrapper>
    <Card className="w-full max-w-4xl mx-auto" id="hj">

      <CardHeader className="text-center">
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-gray-200">
            <Image src="/logo-icon.jpg" alt="Logo" width={200} height={200} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              মাদার বখ্শ্ গার্হস্থ্য অর্থনীতি কলেজ
            </CardTitle>
            <p className="text-sm">পদ্মা আবাসিক এলাকা, রাজশাহী-৬২০৭</p>
            <h2 className="text-lg font-semibold mt-2">
              একাদশ শ্রেণিতে ভর্তির ফরম
            </h2>
            <p className="text-sm">শিক্ষাবর্ষঃ ২০২৪-২০২৫</p>
          </div>
          <div className="w-24 h-24 "></div>
        </div>
        <div className="mt-4 p-2">
          <p className="font-bold">শাখাঃ {subject === 'humanities' ? 'মানবিক' : subject === 'science' ? 'বিজ্ঞান' : 'গার্হস্থ্য বিজ্ঞান'}</p>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Displaying information instead of input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div>
            <Label>১। এসএসসি রেজিস্ট্রেশন নম্বর:</Label>
            <p className="text-sm">{formData.ssc_registration}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>২। ছাত্রীর নাম (বাংলায়):</Label>
            <p className="text-sm">{formData.nameInBengali}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৩। ইংরেজিতে:</Label>
            <p className="text-sm">{formData.nameInEnglish}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৪। জন্ম নিবন্ধন নম্বর:</Label>
            <p className="text-sm">{formData.birthRegNo}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৫। মোবাইল নম্বর:</Label>
            <p className="text-sm">{formData.mobile}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৬। জন্ম তারিখ:</Label>
            <p className="text-sm">{formData.birth}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৭। জাতীয়তা:</Label>
            <p className="text-sm">{formData.nationality}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৮। ধর্ম:</Label>
            <p className="text-sm">{formData.religion}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>৯। বিবাহিত/অবিবাহিত:</Label>
            <p className="text-sm">{formData.maritalStatus}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying Father's Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>পিতার নাম (বাংলায়):</Label>
            <p className="text-sm">{formData.fathers_Name_Bangla}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>পিতার নাম (ইংরেজিতে):</Label>
            <p className="text-sm">{formData.fathers_Name_English}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>পিতার NID নম্বর:</Label>
            <p className="text-sm">{formData.fathers_Nid}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>পিতার মোবাইল নম্বর:</Label>
            <p className="text-sm">{formData.fathers_Mobile}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying Mother's Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>মায়ের নাম (বাংলায়):</Label>
            <p className="text-sm">{formData.mothers_Name_Bangla}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>মায়ের নাম (ইংরেজিতে):</Label>
            <p className="text-sm">{formData.mothers_Name_English}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>মায়ের NID নম্বর:</Label>
            <p className="text-sm">{formData.mothers_Nid}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>মায়ের মোবাইল নম্বর:</Label>
            <p className="text-sm">{formData.mothers_Mobile}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying Permanent Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          <div className="col-span-2">
            <Label>স্থায়ী ঠিকানা (গ্রাম):</Label>
            <p className="text-sm">{formData.address_Permanent}</p> {/* Smaller text */}
          </div>
          <div className="col-span-1">
            <Label>স্থায়ী ঠিকানা (পোস্ট অফিস):</Label>
            <p className="text-sm">{formData.zip_Permanent}</p> {/* Smaller text */}
          </div>
          <div className="col-span-2">
            <Label>স্থায়ী ঠিকানা (থানা):</Label>
            <p className="text-sm">{formData.thana_Permanent}</p> {/* Smaller text */}
          </div>
          <div className="col-span-1">
            <Label>স্থায়ী ঠিকানা (জেলা):</Label>
            <p className="text-sm">{formData.district_Permanent}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying Present Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          <div className="col-span-2">
            <Label>বর্তমান ঠিকানা (গ্রাম):</Label>
            <p className="text-sm">{formData.address_Current}</p> {/* Smaller text */}
          </div>
          <div className="col-span-1">
            <Label>বর্তমান ঠিকানা (পোস্ট অফিস):</Label>
            <p className="text-sm">{formData.zip_Current}</p> {/* Smaller text */}
          </div>
          <div className="col-span-2">
            <Label>বর্তমান ঠিকানা (থানা):</Label>
            <p className="text-sm">{formData.thana_Current}</p> {/* Smaller text */}
          </div>
          <div className="col-span-1">
            <Label>বর্তমান ঠিকানা (জেলা):</Label>
            <p className="text-sm">{formData.district_Current}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying Guardian Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>অভিভাবকের নাম:</Label>
            <p className="text-sm">{formData.guardians_Name}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>অভিভাবকের পেশা:</Label>
            <p className="text-sm">{formData.guardians_Occupation}</p> {/* Smaller text */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>অভিভাবকের আয়:</Label>
            <p className="text-sm">{formData.guardians_Monthly_Income}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>অভিভাবকের মোবাইল নম্বর:</Label>
            <p className="text-sm">{formData.guardians_Mobile_Number}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying SSC Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>এসএসসি শাখা:</Label>
            <p className="text-sm">{formData.sscBranch}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>এসএসসি বোর্ড:</Label>
            <p className="text-sm">{formData.ssc_Board}</p> {/* Smaller text */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>এসএসসি রোল:</Label>
            <p className="text-sm">{formData.ssc_Roll}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>এসএসসি পাশের বছর:</Label>
            <p className="text-sm">{formData.sss_Year}</p> {/* Smaller text */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>এসএসসি জিপিএ:</Label>
            <p className="text-sm">{formData.ssc_GPA}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>এসএসসি প্রতিষ্ঠান নাম:</Label>
            <p className="text-sm">{formData.sscInstituteName}</p> {/* Smaller text */}
          </div>
        </div>

        {/* Displaying SSC Institute Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>এসএসসি প্রতিষ্ঠান ঠিকানা (গ্রাম):</Label>
            <p className="text-sm">{formData.ssc_Institution_Village}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>এসএসসি প্রতিষ্ঠান ঠিকানা (পোস্ট অফিস):</Label>
            <p className="text-sm">{formData.ssc_Institution_Zip}</p> {/* Smaller text */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <Label>এসএসসি প্রতিষ্ঠান ঠিকানা (থানা):</Label>
            <p className="text-sm">{formData.ssc_Institution_Thana}</p> {/* Smaller text */}
          </div>
          <div>
            <Label>এসএসসি প্রতিষ্ঠান ঠিকানা (জেলা):</Label>
            <p className="text-sm">{formData.ssc_Institution_District}</p> {/* Smaller text */}
          </div>
          </div>

         
        </form>
      </CardContent>
    </Card>
    <div className="text-center">
      <Button type="button" onClick={handleDownloadPDF} className="mt-4 mb-4 ">ডাউনলোড PDF</Button>
    </div>
    </SearchParamsWrapper>
    </Suspense>
  );
};

export default AdmissionForm;


