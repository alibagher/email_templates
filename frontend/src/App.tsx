import { Box } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBar";
import ReadmePage from "./pages/ReadMePage";
import TemplateList from "./pages/TemplateList";
import CreateTemplate from "./pages/CreateTemplate";

const App: React.FC = () => {
  return (
    <Router>
      <MenuAppBar />
      <Box mt={8}>
        {" "}
        <Routes>
          <Route path="/" element={<ReadmePage />} />
          <Route path="/list" element={<TemplateList />} />
          <Route path="/create" element={<CreateTemplate />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
