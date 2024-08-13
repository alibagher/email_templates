// import { Box, Container, Paper, Typography } from "@mui/material";
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";
import CreateTemplateForm from './CreateTemplate';
import UpdateTemplates from './UpdateTemplates';

interface Template {
  id: number;
  subject: string;
  body: string;
}

const fetchTemplates = async () => {
  try {
    const response = await apiClient.get("http://127.0.0.1:3000/select_templates");
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetchTemplates().then(data => setTemplates(data));
  }, []); // Empty dependency array ensures fetching data on mount

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`http://127.0.0.1:3000/delete_template?id=${id}`);
      const updatedTemplates = templates.filter((template) => template.id !== id);
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };


  ////// EDIT ////
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const handleUpdateTemplate = async (updatedTemplate: Template) => {
    try {
      await apiClient.put(`/update_template/${updatedTemplate.id}`, updatedTemplate);
      const updatedTemplates = templates.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t));
      setTemplates(updatedTemplates);
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setOpenEditModal(true);
  };
//////// EDIT


  const [open, setOpen] = useState(false);

  const handleGenericFormClose = () => {
    setOpen(false);
    setOpenEditModal(false)
    // Refetch templates here
    fetchTemplates().then(data => setTemplates(data));
  };

  const handleCreateTemplate = async (newTemplate: Template) => {
    try {
      console.log("got here!!!!!!")
      const response = await apiClient.post<Template>("http://127.0.0.1:3000/create_template", newTemplate);
      setTemplates([...templates, response.data]); // Update local state with new template
      setOpen(false); // Close the modal after successful creation
      
    } catch (error) {
      console.error("Error creating template:", error);
    }
  }


  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Template List
        </Typography>
        {templates.length > 0 ? (
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
                        <IconButton onClick={() => handleEdit(template)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(template.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Typography variant="body1">No templates found</Typography>
        )}
        <Button onClick={() => setOpen(true)}>Create Template</Button>
      </Box>
      <Modal open={openEditModal} onClose={handleGenericFormClose}>
        <UpdateTemplates template={editingTemplate} />
      </Modal>
      <Modal open={open} onClose={handleGenericFormClose}>
        <CreateTemplateForm />
      </Modal>
    </Container>
  );
};

export default TemplateList;
