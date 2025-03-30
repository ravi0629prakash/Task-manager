// Dashboard.jsx
import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";
import FilterDisplay from "../components/FilterDisplay";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Container, Paper, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks) || [];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for TaskForm
  const [taskText, setTaskText] = useState("");
  const [taskPriority, setTaskPriority] = useState("Normal");
  const [taskDate, setTaskDate] = useState(new Date().toLocaleDateString());

  // State for TaskFilters
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [markedTasks, setMarkedTasks] = useState([]);
  const [filterMarked, setFilterMarked] = useState(false);
  const [sortMarked, setSortMarked] = useState(false);

  // State to hold filter values temporarily during dialog
  const [tempFilterPriority, setTempFilterPriority] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempSortField, setTempSortField] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("asc");
  const [tempFilterMarked, setTempFilterMarked] = useState(false);
  const [tempSortMarked, setTempSortMarked] = useState(false);

  const filteredAndSortedTasks = useMemo(() => {
    // ... (same filtering and sorting logic as before)
    let filteredTasks = [...tasks];

    if (filterMarked) {
      filteredTasks = filteredTasks.filter((task) =>
        markedTasks.includes(task.id)
      );
    }

    if (filterPriority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filterPriority
      );
    }

    if (filterDate) {
      filteredTasks = filteredTasks.filter((task) => task.date === filterDate);
    }
     
    if (sortMarked) {
      filteredTasks.sort((a, b) => {
        const aMarked = markedTasks.includes(a.id);
        const bMarked = markedTasks.includes(b.id);
        if (aMarked && !bMarked) return -1;
        if (!aMarked && bMarked) return 1;
        if (sortField) {
          let aValue = a[sortField];
          let bValue = b[sortField];
          if (sortField === "date") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          } else if (sortField === "priority") {
            const priorityValues = { Low: 1, Normal: 2, High: 3 };
            aValue = priorityValues[aValue];
            bValue = priorityValues[bValue];
          }
          if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
          return 0;
        }
        return 0;
      });
    } else if (sortField) {
      filteredTasks.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        if (sortField === "date") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortField === "priority") {
          const priorityValues = { Low: 1, Normal: 2, High: 3 };
          aValue = priorityValues[aValue];
          bValue = priorityValues[bValue];
        }
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredTasks;
  }, [
    tasks,
    filterPriority,
    filterDate,
    sortField,
    sortOrder,
    markedTasks,
    filterMarked,
    sortMarked,
  ]);
  //   if (sortMarked) {
  //     filteredTasks.sort((a, b) => {
  //       const aMarked = markedTasks.includes(a.id);
  //       const bMarked = markedTasks.includes(b.id);

  //       if (aMarked && !bMarked) return -1;
  //       if (!aMarked && bMarked) return 1;

  //       if (sortField) {
  //         let aValue = a[sortField];
  //         let bValue = b[sortField];

  //         if (sortField === "date") {
  //           aValue = new Date(aValue);
  //           bValue = new Date(bValue);
  //         }

  //         if (aValue < bValue) {
  //           return sortOrder === "asc" ? -1 : 1;
  //         }
  //         if (aValue > bValue) {
  //           return sortOrder === "asc" ? 1 : -1;
  //         }
  //         return 0;
  //       }

  //       return 0;
  //     });
  //   } else if (sortField) {
  //     filteredTasks.sort((a, b) => {
  //       let aValue = a[sortField];
  //       let bValue = b[sortField];

  //       if (sortField === "date") {
  //         aValue = new Date(aValue);
  //         bValue = new Date(bValue);
  //       }

  //       if (aValue < bValue) {
  //         return sortOrder === "asc" ? -1 : 1;
  //       }
  //       if (aValue > bValue) {
  //         return sortOrder === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }

  //   return filteredTasks;
  // }, [
  //   tasks,
  //   filterPriority,
  //   filterDate,
  //   sortField,
  //   sortOrder,
  //   markedTasks,
  //   filterMarked,
  //   sortMarked,
  // ]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Container maxWidth="md" style={{ marginTop: "30px" }}>
            <StyledPaper elevation={3} style={{ marginBottom: "30px" }}>
              <TaskForm
                taskText={taskText}
                setTaskText={setTaskText}
                taskPriority={taskPriority}
                setTaskPriority={setTaskPriority}
                taskDate={taskDate}
                setTaskDate={setTaskDate}
              />
              <TaskFilters
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                openFilterDialog={openFilterDialog}
                setOpenFilterDialog={setOpenFilterDialog}
                tempFilterPriority={tempFilterPriority}
                setTempFilterPriority={setTempFilterPriority}
                tempFilterDate={tempFilterDate}
                setTempFilterDate={setTempFilterDate}
                tempSortField={tempSortField}
                setTempSortField={setTempSortField}
                tempSortOrder={tempSortOrder}
                setTempSortOrder={setTempSortOrder}
                markedTasks={markedTasks}
                filterMarked={filterMarked}
                setFilterMarked={setFilterMarked}
                sortMarked={sortMarked}
                setSortMarked={setSortMarked}
                tempFilterMarked={tempFilterMarked}
                setTempFilterMarked={setTempFilterMarked}
                tempSortMarked={tempSortMarked}
                setTempSortMarked={setTempSortMarked}
              />
              <FilterDisplay // Render the FilterDisplay
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                filterMarked={filterMarked}
                setFilterMarked={setFilterMarked}
                sortMarked={sortMarked}
                setSortMarked={setSortMarked}
              />
              <TaskTable
                tasks={filteredAndSortedTasks}
                markedTasks={markedTasks}
                setMarkedTasks={setMarkedTasks}
              />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </StyledPaper>
          </Container>
        </Box>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;