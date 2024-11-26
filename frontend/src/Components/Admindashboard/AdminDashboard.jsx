import React, { useState, useEffect } from "react";
import "./Admindashboard.css";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";
import CreateExaminer from './CreateExaminer.jsx'
import CreateStudent from './CreateStudent.jsx'
import Upcomingexam from "../Exam/Upcomingexam.jsx"
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import StudentProf from "../Profile/StudentProf.jsx";
import ExaminerProfile from "../Profile/ExaminerProfile.jsx"

function Admindashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 700);
  const [iscreateexamineropen,setiscreateexamineropen] = useState(false);
  const [iscreatestudentopen,setiscreatestudentopen] = useState(false);
  const [isupdatestudentopen,setisupdatestudentopen] = useState(false);
  const [isupdateexamineropen,setisupdateexamineropen] = useState(false);
  const [username,setUsername] = useState("");
  const { setIsLoggedIn, validateUser, isLoggedIn } = useAuth();

  const [students, setStudents] = useState([]);
  const [examiners, setExaminers] = useState([]);

  const { LogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token") === undefined) {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    if(activeIndex === 3){
        navigate("/reset-password")
    }
  }, [activeIndex]);

  const exam = [
    {
      name: 'Mathematics Final Exam',
      date: '04/05/2023',
      startTime: '10:00 AM',
      duration: '02:00:00',
      startIn: '9 days 8 hours 3 minutes',
      instructor: 'Dr. John Doe',
      totalMarks: 100,
      hours: '2',
      description: 'Comprehensive final exam covering all topics in the syllabus.'
    },
    {
      name: 'Physics Midterm',
      date: '04/06/2023',
      startTime: '12:00 PM',
      duration: '01:30:00',
      startIn: '7 days 6 hours 15 minutes',
      instructor: 'Prof. Alice Johnson',
      totalMarks: 75,
      hours: '1.5',
      description: 'Midterm covering classical mechanics and thermodynamics.'
    },
    {
      name: 'Chemistry Quiz',
      date: '04/07/2023',
      startTime: '09:00 AM',
      duration: '01:00:00',
      startIn: '5 days 2 hours 40 minutes',
      instructor: 'Dr. Emily Brown',
      totalMarks: 50,
      hours: '1',
      description: 'Quiz on organic chemistry basics.'
    },
    {
      name: 'History Exam',
      date: '04/08/2023',
      startTime: '11:00 AM',
      duration: '02:00:00',
      startIn: '8 days 11 hours 25 minutes',
      instructor: 'Prof. Mark Green',
      totalMarks: 100,
      hours: '2',
      description: 'Exam covering significant events from the 20th century.'
    },
    {
      name: 'Biology Test',
      date: '04/09/2023',
      startTime: '08:30 AM',
      duration: '01:45:00',
      startIn: '10 days 4 hours 50 minutes',
      instructor: 'Dr. Sarah Lee',
      totalMarks: 80,
      hours: '1.75',
      description: 'Test on human anatomy and physiology.'
    },
    {
      name: 'Geography Quiz',
      date: '04/10/2023',
      startTime: '10:15 AM',
      duration: '01:15:00',
      startIn: '6 days 9 hours 30 minutes',
      instructor: 'Prof. Michael Scott',
      totalMarks: 60,
      hours: '1.25',
      description: 'Quiz on world geography and map skills.'
    },
    {
      name: 'Computer Science Final',
      date: '04/11/2023',
      startTime: '01:00 PM',
      duration: '02:30:00',
      startIn: '4 days 7 hours 20 minutes',
      instructor: 'Dr. David Chen',
      totalMarks: 120,
      hours: '2.5',
      description: 'Final exam covering algorithms and data structures.'
    },
    {
      name: 'English Literature Exam',
      date: '04/12/2023',
      startTime: '02:00 PM',
      duration: '02:00:00',
      startIn: '3 days 5 hours 45 minutes',
      instructor: 'Ms. Lisa White',
      totalMarks: 90,
      hours: '2',
      description: 'Exam on British and American literature.'
    },
    {
      name: 'Art Theory Quiz',
      date: '04/13/2023',
      startTime: '09:45 AM',
      duration: '01:00:00',
      startIn: '12 days 3 hours 10 minutes',
      instructor: 'Mr. Kevin Robinson',
      totalMarks: 50,
      hours: '1',
      description: 'Quiz on art movements and theories from the Renaissance.'
    },
    {
      name: 'Economics Midterm',
      date: '04/14/2023',
      startTime: '11:30 AM',
      duration: '01:30:00',
      startIn: '2 days 8 hours 5 minutes',
      instructor: 'Dr. Nancy Adams',
      totalMarks: 75,
      hours: '1.5',
      description: 'Midterm exam covering microeconomic principles.'
    }
  ];
  
  const items = [
    { id: "student", label: "Student" },
    { id: "examiner", label: "Examiner" },
    { id: "exam", label: "Exam" },
    { id: "reser-password", label: "Reset Password"}
  ];

//   const [examiners, setExaminers] = useState([
//     { id: 1, name: "John Doe", email: "john.doe@example.com" },
//     { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
//     { id: 3, name: "Robert Brown", email: "robert.brown@example.com" },
//   ]);

//   const [students, setstudents] = useState([
//     { id: 1, name: "Nishank kansara", email: "202201111@example.com" },
//     { id: 2, name: "Nishank kansara", email: "202201111@example.com" },
//     { id: 3, name: "Nishank kansara", email: "202201111@example.com" },
//   ]);

  const handleCreateExaminer = () => {
    setiscreateexamineropen(true);
  };
  
  const handleCreateStudent = () => {
    setiscreatestudentopen(true);
  };

  const handleCloseCreateExaminer = () => {
    setiscreateexamineropen(false);
  };
  const handleCloseCreateStudent = () => {
    setiscreatestudentopen(false);
  };

  const handleCloseUpdateStudent = () => {
    setisupdatestudentopen(false);
  };

  const handleCloseUpdateExaminer = () => {
    setisupdateexamineropen(false);
  };

  const fetchAllStudents = async () => {
    try{
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        };

        const result = await axios.get((config.BACKEND_API || "http://localhost:8000") + "/all-students", {headers});

        if(result.status !== 200){
            toast.error((result?.message) || ("Internal server error"));
            return;
        }
        setStudents(Object.values(result.data.students));
    } catch(e){
        throw e;
    }
  };

  const fetchAllExaminers = async () => {
    try{
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        };

        const result = await axios.get((config.BACKEND_API || "http://localhost:8000") + "/all-examiners", {headers});

        console.log(result);
        
        if(result.status !== 200){
            toast.error((result?.message) || ("Internal server error"));
            return;
        }
        setExaminers(Object.values(result.data.examiners));
    } catch(e){
        throw e;
    }
  };

  useEffect(() => {
    if(activeIndex === 0){
        // fetch all students

        try{
            fetchAllStudents();
        }catch(e){
            toast.error((e?.response?.data?.message) || ("Internal server error"));
        }
    }else if(activeIndex == 1){
        try{
            fetchAllExaminers();
        }catch(e){
            toast.error((e?.response?.data?.message) || ("Internal server error"));
        }
    }
  }, [activeIndex]);

  const handleDeleteStudent = async (username) => {
    try{
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
        };

        const result = await axios.delete((config.BACKEND_API || "http://localhost:8000") + `/delete-student/${username}`, {headers});

        // console.log(result);

        if(result.status !== 200){
            toast.error((result?.message) || ("Internal server error"));
            return;
        }
        
        setStudents((prev) => prev.filter((item) => item.username !== username));
        toast.success("Student Deleted Successfully");
    } catch(e){
        // console.log(e);
        
        toast.error((e?.response?.data?.message) || ("Internal server error"));
    }
  };

  const handleDeleteExaminer = async (username) => {
    try{
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
        };

        const result = await axios.delete((config.BACKEND_API || "http://localhost:8000") + `/delete-examiner/${username}`, {headers});

        console.log(result);

        if(result.status !== 200){
            toast.error((result?.message) || ("Internal server error"));
            return;
        }
        
        setExaminers((prev) => prev.filter((item) => item.username !== username));
        toast.success("Student Deleted Successfully");
    } catch(e){
        // console.log(e);
        
        toast.error((e?.response?.data?.message) || ("Internal server error"));
    }
  };

  const handleUpdateStudent = (username) => {
    setUsername(username);
    setisupdatestudentopen(true);
  };

  const handleUpdateExaminer = (username) => {
    setUsername(username);
    setisupdateexamineropen(true);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
      if (window.innerWidth >= 700) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard">
      {isMobileView && (
        <button className="togglebtn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="sidebar">
          <div className="sidebar-menu">
            <img src={logo} alt="Logo" id="logo" />
            <ul className="menu">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    // href={`#${item.id}`}
                    className={activeIndex === index ? "active" : ""}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="logout" onClick={LogOut}>Log out</p>
        </aside>
      )}
    <div className="admin-dashboard-main-content">
      {/* Top Bar */}
      <header className="top-bar">
        <span className="welcome-text">Welcome, Admin!</span>
      </header>

        {activeIndex == 1 && iscreateexamineropen &&
        (<div className="createExaminer-div">
        <CreateExaminer onClose={handleCloseCreateExaminer} setExaminers={setExaminers} toast={toast}/>
        </div>)
        }
        {activeIndex == 1 && !iscreateexamineropen && (
        <div>
            <div className="examiner-list">
            <div className="examiners-grid">
                {examiners.map((examiner) => (
                <div key={examiner._id} className="examiner-card">
                    <h3>{examiner.username}</h3>
                    <p>{examiner.email}</p>
                    <div className="btn-del-upd">
                    <button onClick={() => handleDeleteExaminer(examiner.username)}>Delete</button>
                    <button onClick={() => handleUpdateExaminer(examiner.username)}>Update</button>
                    </div>
                </div>
                ))}
            </div>
            </div>
            <button className="create-examiner-button" onClick={handleCreateExaminer}>
            + Create Examiner
            </button>
        </div>
        )}


        {activeIndex == 0 && iscreatestudentopen &&
        <div className="createstudent-div">
        <CreateStudent onClose={handleCloseCreateStudent} setStudents={setStudents} toast={toast}/>
        </div>
        }
        {activeIndex == 0 && !iscreatestudentopen && (
        <div>
            <div className="examiner-list">
            <div className="examiners-grid">
                {students.map((student, index) => (
                <div key={student._id} className="examiner-card">
                    <h3>{index + 1}</h3>
                    <p>{student.email}</p>
                    <div className="btn-del-upd">
                    <button onClick={() => handleDeleteStudent(student.username)}>Delete</button>
                    <button onClick={() => handleUpdateStudent(student.username)}>Update</button>
                    </div>
                </div>
                ))}
            </div>
            </div>
            <button className="create-student-button" onClick={handleCreateStudent}>
            + Create Student
            </button>
        </div>
        )}

        {activeIndex == 0 && isupdatestudentopen &&
        <div className="createstudent-div">
        <StudentProf onClose={handleCloseUpdateStudent} toast={toast} username={username} setStudents={setStudents}/>
        </div>
        }

        {activeIndex == 1 && isupdateexamineropen &&
        <div className="createstudent-div">
        <ExaminerProfile onClose={handleCloseUpdateExaminer} toast={toast} username={username} setExaminers={setExaminers}/>
        </div>
        }   



        {activeIndex == 2 && 
        <div className="upcomingexam">
        <Upcomingexam exams={exam}/>
        </div>}

    </div>
    </div>

  );
}

export default Admindashboard;

