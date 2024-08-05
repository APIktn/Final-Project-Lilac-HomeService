import { useState } from "react";
import axios from "axios";

function App() {
  const [apiData, setApiData] = useState(null);

  const insertDataToSupabase = async (data) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/questions`,
        data,
        {
          headers: {
            apikey: "your-supabase-key",
            Authorization: `Bearer your-supabase-key`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data inserted to Supabase:", response.data);
    } catch (error) {
      console.error("Error inserting data to Supabase:", error.message);
    }
  };

  const handleButtonClick = async () => {
    const data = { column1: "value1", column2: "value2" }; // Replace with your data
    await insertDataToSupabase(data);
  };

  return (
    <div className="App">
      <button onClick={handleButtonClick}>Insert Data to Supabase</button>
    </div>
  );
}

export default App;
