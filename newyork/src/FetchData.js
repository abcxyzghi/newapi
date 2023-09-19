import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchData() {
  const [dataArray, setDataArray] = useState([]);
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    fetchDataArray();
    fetchSingleData();
  }, []);

  const fetchDataArray = () => {
    axios
      .get("https://yna1bjcoc3.execute-api.ap-southeast-1.amazonaws.com/v1/customers")
      .then((res) => {
        setDataArray(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSingleData = () => {
    axios
      .get("https://yna1bjcoc3.execute-api.ap-southeast-1.amazonaws.com/v1/customers")
      .then((res) => {
        if (res.data.length > 0) { // Check if data is not empty
          setSingleData(res.data[0]); // Set the first object in the response data
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="abc">
        <h3>Fetch Data from API in React with Axios</h3>
        {/* Rendering the array of objects */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Rendering the single object */}
        {singleData && (
          <div>
            <h4>Single Object:</h4>
            <p>ID: {singleData.id}</p>
            <p>Name: {singleData.name}</p>
            <p>Email: {singleData.email}</p>
            <p>Age: {singleData.age}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchData;