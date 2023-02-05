
import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
function Add({ employees, setEmployees, setIsAdding }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const[photo,setPhoto]=useState('')

  const textInput = useRef(null);

  useEffect(() => {
      textInput.current.focus();
  }, [])

  const handleAdd = e => {
      e.preventDefault();
      if (!firstName || !lastName || !email ||!phoneNo|| !date|| !photo) {
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'All fields are required.',
              showConfirmButton: true
          });
      }

      const id = employees.length + 1;
      const newEmployee = {
          id,
          firstName,
          lastName,
          email,
          phoneNo,
          date,
          photo
      }
      employees.push(newEmployee);
      setEmployees(employees);
      setIsAdding(false);

      Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${firstName} ${lastName}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500
      });
  }


  return (
      <div className="small-container">
          <form onSubmit={handleAdd}>
              <h1>Add Employee</h1>
              <label htmlFor="firstName">First Name</label>
              <input
                  id="firstName"
                  type="text"
                  ref={textInput}
                  name="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
               <label htmlFor="phoneNo">PhoneNo </label> 
              <input
              id="phoneNo"
              type="text"
                pattern="[0-9]*"
                max={10}
              country={'India'}
               value={phoneNo}
                onChange={e =>setPhoneNo(e.target.value)}
               /> 
              <label htmlFor="photo">Photo</label>
              <input
                  id="photo"
                  type="file"
                  name="photo"
                  value={photo}
                  
                  onChange={e => setPhoto(e.target.value)}
              />
              <label htmlFor="date">Date</label>
              <input
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
              />
              <div style={{ marginTop: '30px' }}>
                  <input type="submit" value="Add" />
                  <input
                      style={{ marginLeft: '12px' }}
                      className="muted-button"
                      type="button"
                      value="Cancel"
                      onClick={() => setIsAdding(false)}
                  />
              </div>
          </form>
      </div>
  );
}

export default Add