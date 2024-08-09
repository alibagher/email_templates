// import { Box, Container, Paper, Typography } from "@mui/material";
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

interface Template {
  id: number;
  subject: string;
  body: string;
}

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await apiClient.get("http://127.0.0.1:3000/select_templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        // Handle error gracefully (e.g., display an error message)
      }
    };

    fetchTemplates();
  }, []); // Empty dependency array ensures fetching data on mount

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`http://127.0.0.1:3000/delete_template?id=${id}`);
      const updatedTemplates = templates.filter((template) => template.id !== id);
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error deleting template:", error);
      // Handle error gracefully (e.g., display an error message)
    }
  };


  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Template List
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Body</TableCell>   
                </TableRow>
              </TableHead>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>{template.id}</TableCell>   
                    <TableCell>{template.subject}</TableCell>
                    <TableCell>{template.body}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(template.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(template.id)}>
                        {/* Replace with your preferred delete icon */}
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default TemplateList;
