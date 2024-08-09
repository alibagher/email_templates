// import { Container, Typography, Paper, Box } from "@mui/material";
import { Container, Typography, Paper, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState }  from "react";
import apiClient from "../api/axios";

interface Template {
  id: number;
  subject: string;
  body: string;
}

const CreateTemplate: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [createdTemplate, setCreatedTemplate] = useState<Template | null>(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const newTemplate: Template = { subject, body };
      const response = await apiClient.post<Template>("http://127.0.0.1:3000/create_template", newTemplate);
      setCreatedTemplate(response.data);
      setSubject(""); // Clear input fields after successful creation
      setBody("");
    } catch (error) {
      console.error("Error creating template:", error);
      // Handle error gracefully (e.g., display an error message)
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Create Template
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Template subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="body"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              margin="normal"   

            />
            <Button type="submit" variant="contained" color="primary">
              Create Template
            </Button>
          </form>
          {createdTemplate && (
            <Box mt={2}>
              <Typography variant="subtitle1">Created Template:</Typography>
              <ul>
                <li>ID: {createdTemplate.id}</li>
                <li>Subject: {createdTemplate.subject}</li>
                <li>Body: {createdTemplate.body}</li>
              </ul>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTemplate;
