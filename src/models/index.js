   // src/models/index.js
   import mongoose from 'mongoose';
   import Applicant from './Applicant.js';
   import Student from './Student.js';
   import Payment from './Payment.js';
   import PersonalDetails from './PersonalDetails.js';
   import Teacher from './Teacher.js';
   import Notice from './Notice.js';

   const models = {
    Applicant,
    Student,
    Payment,
    PersonalDetails,
    Teacher,
    Notice,
  };
  export default models;


  
   // Ensure you are exporting the models correctly
  