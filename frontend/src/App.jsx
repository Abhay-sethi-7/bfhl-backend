import { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const apiUrl = "http://localhost:3000/bfhl"; // Update with deployed URL later

  const handleSubmit = async () => {
    try {
      console.log("Sending request with:", jsonInput);
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post(apiUrl, parsedData);
      console.log("Response received:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Invalid JSON input or API error");
    }
  };
  
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>BFHL Challenge</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON like { "data": ["A","C","z"] }'
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br /><br />

      {responseData && (
        <div>
          <h3>Select Data to Display:</h3>
          <select multiple onChange={handleFilterChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <h3>Response:</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(responseData).filter(([key]) =>
                  selectedFilters.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
