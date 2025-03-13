import React, { useState } from 'react';

const MonthYearRangePicker = ({ formData, setFormData }) => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const [isOpen, setIsOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(currentMonth);
  const [startYear, setStartYear] = useState(currentYear);
  const [endMonth, setEndMonth] = useState((currentMonth + 5) % 12);
  const [endYear, setEndYear] = useState(currentYear + Math.floor((currentMonth + 5) / 12));
  const [selectingStart, setSelectingStart] = useState(true);
  const [displayYear, setDisplayYear] = useState(currentYear);
  
  // Format date range for display
  const formatSelection = () => {
    if (formData.selectedMonths.length === 0) {
      return "মাস নির্বাচন করুন";
    }
    const firstDate = formData.selectedMonths[0];
    const lastDate = formData.selectedMonths[formData.selectedMonths.length - 1];
    return `${months[firstDate.getMonth()].slice(0, 3)} ${firstDate.getFullYear()} - ${months[lastDate.getMonth()].slice(0, 3)} ${lastDate.getFullYear()}`;
  };
  
  // Generate array of dates for the selected range
  const generateMonthsArray = () => {
    const months = [];
    let currentDate = new Date(startYear, startMonth, 1);
    const endDate = new Date(endYear, endMonth, 1);
    
    while (currentDate <= endDate) {
      months.push(new Date(currentDate));
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    
    return months;
  };
  
  // Handle month selection
  const handleMonthSelect = (monthIndex) => {
    if (selectingStart) {
      setStartMonth(monthIndex);
      setStartYear(displayYear);
      setSelectingStart(false);
      
      // If new start date is after current end date, adjust end date
      if (displayYear > endYear || (displayYear === endYear && monthIndex > endMonth)) {
        setEndMonth(monthIndex);
        setEndYear(displayYear);
      }
    } else {
      // Only allow end date to be after start date
      if (displayYear < startYear || (displayYear === startYear && monthIndex < startMonth)) {
        return;
      }
      
      setEndMonth(monthIndex);
      setEndYear(displayYear);
      setSelectingStart(true);
    }
  };
  
  // Navigate between years
  const changeYear = (increment) => {
    setDisplayYear(displayYear + increment);
  };
  
  // Apply selection and close picker
  const handleApply = () => {
    const selectedMonths = generateMonthsArray();
    setFormData({
      ...formData,
      selectedMonths: selectedMonths
    });
    setIsOpen(false);
  };
  
  // Check if a month should be highlighted as selected
  const isMonthInRange = (monthIndex) => {
    if (startYear === endYear) {
      return displayYear === startYear && monthIndex >= startMonth && monthIndex <= endMonth;
    }
    
    if (displayYear === startYear) {
      return monthIndex >= startMonth;
    }
    
    if (displayYear === endYear) {
      return monthIndex <= endMonth;
    }
    
    return displayYear > startYear && displayYear < endYear;
  };
  
  // Check if a month is the start or end of selection
  const isStartMonth = (monthIndex) => displayYear === startYear && monthIndex === startMonth;
  const isEndMonth = (monthIndex) => displayYear === endYear && monthIndex === endMonth;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        পেমেন্টের মাস
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded shadow-sm bg-white"
      >
        <span>{formatSelection()}</span>
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 border border-gray-200 rounded shadow-lg bg-white">
          <div className="p-2 text-center border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">
              {selectingStart ? "শুরুর মাস নির্বাচন করুন" : "শেষের মাস নির্বাচন করুন"}
            </p>
          </div>
          
          {/* Year navigation */}
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <button 
              type="button"
              onClick={() => changeYear(-1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="font-medium">{displayYear}</span>
            <button 
              type="button"
              onClick={() => changeYear(1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Help text */}
          <div className="px-3 pt-2">
            <p className="text-xs text-gray-500 mb-2">
              শুধুমাত্র একটি মাস নির্বাচন করতে সেই মাসটিতে দুবার ক্লিক করুন
            </p>
          </div>
          
          {/* Month grid */}
          <div className="grid grid-cols-3 gap-2 p-3">
            {months.map((month, index) => (
              <button
                type="button"
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`
                  px-2 py-2 text-sm rounded-md
                  ${isStartMonth(index) ? 'bg-blue-500 text-white' : ''}
                  ${isEndMonth(index) ? 'bg-blue-500 text-white' : ''}
                  ${isMonthInRange(index) && !isStartMonth(index) && !isEndMonth(index) 
                    ? 'bg-blue-100 text-blue-800' 
                    : ''}
                  ${!isMonthInRange(index) ? 'hover:bg-gray-100 text-gray-800' : ''}
                `}
              >
                {month}
              </button>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end p-3 border-t border-gray-200">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 mr-2"
            >
              বাতিল
            </button>
            <button 
              type="button"
              onClick={handleApply}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              নিশ্চিত করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearRangePicker;