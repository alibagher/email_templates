// import { Container, Typography, Paper, Box } from "@mui/material";
import { Container, Typography, Paper, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState }  from "react";
import apiClient from "../api/axios";
import GenericForm from '../components//GenericForm';


interface UpdateTemplateProps {
    template: Template | null;
  }

interface Template {
  id: number;
  subject: string;
  body: string;
}

const UpdateTemplate: React.FC<UpdateTemplateProps> = ({ template }) => {
  const [createdTemplate, setCreatedTemplate] = useState<Template | null>(null);

  // Will be called by GenericForm
  const handleUpdateSubmit = async (formData) => {
        try {
            const updatedTemplate = { ...template, ...formData };
            const response = await apiClient.put(`http://127.0.0.1:3000/update_template?id=${template.id}`, updatedTemplate);
            setCreatedTemplate(response.data);
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

  return ( 
    <Container>
      <Box my={4}>
        <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h4" gutterBottom>
            Update Template
            </Typography>

          <GenericForm
            onSubmit={handleUpdateSubmit}
            initialValues={{ subject: template.subject, body: template.body }} // Pass initial values from UpdateTemplate state
            submitButtonLabel="Update"
          />
          {createdTemplate && (
            <Box mt={2}>
              <Typography variant="subtitle1">New Updated Template:</Typography>
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

export default UpdateTemplate;
