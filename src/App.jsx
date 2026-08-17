import { Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Saved from "./pages/Saved";
import JobDetails from "./pages/jobsdetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </>
  );
}

export default App;