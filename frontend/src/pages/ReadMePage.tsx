import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const ReadmePage: React.FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then((response) => response.text())
      .then((text) => {setContent(text);
      console.log("Updated content:", text);});
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Project README
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Paper>
      </Box>
    </Container>
  );
};

export default ReadmePage;
