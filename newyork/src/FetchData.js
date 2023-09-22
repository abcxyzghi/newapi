import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchData() {
  const [dataArray, setDataArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchDataArray();
  }, []);

  const fetchDataArray = () => {
    axios
      .get("http://175.41.185.23:8080/demo/api/v1/customers")
      .then((res) => {
        setDataArray(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addData = () => {
    axios
      .post("http://175.41.185.23:8080/demo/api/v1/customers", formData)
      .then((res) => {
        setDataArray([...dataArray, res.data]);
        setFormData({
          name: "",
          email: "",
          age: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const editDataFunc = (data) => {
    setEditData(data);
    setFormData({
      name: data.name,
      email: data.email,
      age: data.age,
    });
  };

  const updateData = () => {
    axios
      .put(`http://175.41.185.23:8080/demo/api/v1/customers/${editData.id}`, formData)
      .then((res) => {
        const updatedDataArray = dataArray.map((data) => {
          if (data.id === res.data.id) {
            return res.data;
          }
          return data;
        });
        setDataArray(updatedDataArray);
        setEditData(null);
        setFormData({
          name: "",
          email: "",
          age: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteData = (id) => {
    axios
      .delete(`http://175.41.185.23:8080/demo/api/v1/customers/${id}`)
      .then(() => {
        const filteredDataArray = dataArray.filter((data) => data.id !== id);
        setDataArray(filteredDataArray);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="abc">
        <h3>Customer list</h3>
        {/* Add data form */}
        <form onSubmit={editData ? updateData : addData}>
          <h4>{editData ? "Edit Data" : "Add Data"}</h4>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editData ? "Update" : "Add"}
          </button>
          {editData && (
            <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditData(null)}>
              Cancel
            </button>
          )}
        </form>
        {/* Rendering the array of objects */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>
                  <button type="button" className="btn btn-primary mr-2" onClick={() => editDataFunc(data)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteData(data.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FetchData; 