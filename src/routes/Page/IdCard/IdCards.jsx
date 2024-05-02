/* eslint-disable react/no-unescaped-entities */

import AddIdCards from "./AddIdCards";
import './Id.css'

export default function IdCards() {
  return (
    <>
      <AddIdCards />
      <div className="card">
      <div className="header">
        <h1 className="title">SCHOOL ID CARD</h1>
      </div>
      <div className="avatar">
        <img className="avatar-img" src="student-avatar.jpg" alt="Student Avatar" />
      </div>
      <div className="details">
        <h2 className="name">John Doe</h2>
        <p className="info">Grade 10 - Class A</p>
        <p className="info">Roll No: 12345</p>
      </div>
      <div className="school-info">
        <h2 className="info-title">SCHOOL INFORMATION</h2>
        <div className="info-item">
          <span className="material-icons">location_on</span>
          <p className="info-text">123 School Street, Cityville</p>
        </div>
        <div className="info-item">
          <span className="material-icons">phone</span>
          <p className="info-text">123-456-7890</p>
        </div>
        <div className="info-item">
          <span className="material-icons">email</span>
          <p className="info-text">info@school.com</p>
        </div>
      </div>
    </div>
    </>
  );
}
