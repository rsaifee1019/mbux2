"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function AbsentList({selectedStudents, setSelectedStudents}) {
    function handleSubmit() {
      
        axios.post('/api/absent', {studentIds: selectedStudents.map(student => student._id)})
        .then(res => {
       
        })
        .catch(err => {
            console.log('err', err);
        })
    }
    const handleRemove = (itemId) => {
        setSelectedStudents(selectedStudents.filter(item => item._id !== itemId));
      };

    return (
        <div className="mt-4 space-y-2">
          <div className="flex justify-start gap-14 items-center">
            <h2 className="text-lg font-semibold text-gray-800">আজকে অনুপস্থিত </h2>
            <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              জমা দিন
            </Button>
          </div>
          {selectedStudents.map((item) => (
            <div
              key={item._id}
              className="flex max-w-md items-center justify-between p-2 bg-white rounded-md hover:bg-gray-200"
            >
              <span className="text-red-500">{item.name}</span>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
    );
};
