#!/usr/bin/env node

// This project is a simple console based Student Management System. In this project you will be learning how to add new students, 
// how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, 
// you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. 
// The status will show all the details of the student including name, id, courses enrolled and balance.

import { input, select, confirm } from '@inquirer/prompts';

// Define an interface for Student
interface Student  {
    
    id: string; 
    name: string;
    courses: string[];
    balance: number;
}
console.log("\n\t ------------------------------------");
console.log("\n\t Welcome to Student Management System");
console.log("\n\t ------------------------------------");


// Class for managing the Student Management System
class StudentManagementSystem{

    private students: Map<string, Student> = new Map();    // Map is a collection of key-value pairs. Keys are unique. If you add a new entry with the same key, it updates the value for that key.

    static startingId = 10000
    
    generateUniqueId() {
        return (StudentManagementSystem.startingId++).toString();
    }

    addStudent(name: string) {

        const id = this.generateUniqueId();

        const newStudent: Student = {
            id,
            name,
            courses: [],
            balance: 5000
        };
        this.students.set(id, newStudent);
        return newStudent;
    }

    enrollStudent(id: string, course: string) {

        const student = this.students.get(id);

        if (student) {

            if (!student.courses.includes(course)) {

                student.courses.push(course);

                return `Student ${student.name} enrolled in ${course}.`;
            } else {
                return `Student ${student.name} is already enrolled in ${course}.`;
            }
        } else {
            return `Student with ID ${id} not found.`;
        }
    }

    // View Student Balance
    viewBalance(id:string){

        const student = this.students.get(id);

        if (student){ 
            return `Student ${student.name} has a Balance of Rs.${student.balance}.`
        }else{
            return `Student with ID ${id} not found.`;
        }
    }

    // Pay Tution Fees
    payTuitionFee(id:string, amount:number){

        const student = this.students.get(id);

        if (student){

            if (amount > student.balance){

                console.log("Payment exceeds balance.");

            }else {

                student.balance -= amount;

                return `Student ${student.name} paid Tuition fees Rs.${amount}. New Balance is Rs.${student.balance}`;
            }
           
        }else{
            return `Student with ID ${id} not found.`;
        } 
    }

    // Show Student Status

    showStatus(id:string){

        const student = this.students.get(id);

        if(student){
            return `Student ID: ${student.id}\n Student Name: ${student.name} \n Courses Enrolled: ${student.courses} \n Balance: Rs.${student.balance} `

        }else{
            return `Student with ID ${id} not found.`;
        }

    }

}

const sms = new StudentManagementSystem();
sms.generateUniqueId()

let run = true;  // for while loop

async function result() {

   while(run){

    const choice = await select({message: 'Choose an action:', choices:[
        {name:"Add Student", value:"add student"},
        {name:"Enroll in Course", value:"enroll in course"},
        {name:"View Balance", value:"view balance"},
        {name:"Pay Tuition Fees", value:"pay tution fees"},
        {name:"Show Status", value:"status"},
        {name:"Exit", value: "exit"}
    ]});

    if (choice === "add student"){

        const sName = await input({message: "Enter Student Name:"});

        const studentDetail = sms.addStudent(sName);

        console.log(`Add Student ${studentDetail.name} with id ${studentDetail.id}`);

    }else if(choice === "enroll in course"){

        const studentEnrollId = await input({message: "Enter Student ID:"});

        const courseEnroll = await input({message: "Enter Course Name:"});
        
        console.log(sms.enrollStudent(studentEnrollId, courseEnroll));

    }else if(choice === "view balance"){

        const s_viewBalance = await input({message: "Enter Student ID:"});

        console.log(sms.viewBalance(s_viewBalance));  

    }else if(choice === "pay tution fees"){

        const tuitionFeesId = await input ({message:"Enter Student ID"}); 

        const tuitionFees = await input ({message:"Enter Amount to pay:"});

        console.log(sms.payTuitionFee(tuitionFeesId,parseFloat(tuitionFees)));   // parseFloat used to convert a string into a floating-point number.parseFloat(string)   
   
    }else if(choice === "status"){

        const status = await input({message: "Enter Student ID:"});

        console.log(sms.showStatus(status)); 

    }else if(choice === "exit"){

        const programExit = await confirm({message: "Do you want to Exit?"});

        if (programExit){ 

            console.log("Thanks for using Student Management System!");

            run = false;
        }

        
    }

} 
}


result();
