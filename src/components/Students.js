import { Button, Container, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Students = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ padding: "30px 20px", width: 600, margin: "20px auto" }}
      >
        <h3 className="flex justify-center text-red-700 ">
          <b>Add Student</b>
        </h3>
        <form>
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              margin: "auto",
              marginTop: 1,
              textAlign: "center",
              alignItems: "center",
            }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </form>
        {name}
        {address}
      </Paper>
      <h1>Students</h1>
      <Paper
        elevation={3}
        sx={{ padding: "30px 20px", width: 600, margin: "20px auto" }}
      >
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            Id:{student.id}
            Name:{student.name}
            Address:{student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default Students;
