const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());  // Enable CORS
app.use(express.json());

app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    const userId = "abhay_sethi_01012000"; 
    const email = "your_email@domain.com"; 
    const rollNumber = "CS123456"; 

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length
      ? [alphabets.reduce((a, b) => (a.toUpperCase() > b.toUpperCase() ? a : b))]
      : [];

    res.json({
        "is_success": true,
        "user_id": userId,
        "email": email,
        "roll_number": rollNumber,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highestAlphabet
    });
});

app.get("/bfhl", (req, res) => {
    res.json({ "operation_code": 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
