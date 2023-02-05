import React from "react";

const List = ({employees, handleEdit, handleDelete}) => {
  
  return (
    <div className="containe-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">PhoneNo</th>
            <th className="text-center">Date</th>
            <th className="text-center">Photo</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNo}</td>
                <td>{employee.phoneNo}</td>
                <td>{employee.date} </td>
                <td className="text-center">{employee.photo}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
