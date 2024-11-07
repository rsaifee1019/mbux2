"use client"
import React, { useState } from 'react';

const departments = [
    { value: 'science', label: 'Science' },
    { value: 'hscience', label: 'H.Science' },
    { value: 'humanities', label: 'Humanities' },
];

const classes = [
    { value: 'degree', label: 'Degree' },
    { value: 'hsc', label: 'HSC' },
    { value: 'masters', label: 'Masters' },
    { value: 'honors', label: 'Honors' },
];

export default function Filter({ setFilter }) {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [studentId, setStudentId] = useState('');

    const handleFilter = () => {
        // Call the onFilter function passed as a prop with the selected values
        setFilter({
            department: selectedDepartment,
            class: selectedClass,
            studentId: studentId,
        });
    };

    return (
    
      
            <div className='flex  gap-2 w-full '>
            <div>
         
                <select
                    id="department"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="border rounded-md p-2 w-full h-12"
                >
                    <option value="">বিভাগ </option>
                    {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                            {dept.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
     
                <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border rounded-md p-2 w-full h-12"
                >
                    <option value="">ক্লাস </option>
                    {classes.map((cls) => (
                        <option key={cls.value} value={cls.value}>
                            {cls.label}
                        </option>
                    ))}
                </select>
            </div>
       
            <button
                onClick={handleFilter}
                className=" bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            >
                প্রয়োগ
            </button>
            </div>
       
    );
}