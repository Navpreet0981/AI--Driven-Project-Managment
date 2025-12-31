import { useEffect, useState } from "react";
import { useThemeMode } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    Select,
    MenuItem,
    Grid,
    Divider,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import AISuggestions from "../components/AISuggestions";

function Dashboard() {
    const { logout } = useAuth();
    const { toggleTheme, mode } = useThemeMode();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await API.post("/tasks", { title, priority });
            setTitle("");
            setPriority("medium");
            fetchTasks();
        } catch {
            alert("Failed to create task");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/tasks/${id}`, { status });
            fetchTasks();
        } catch {
            alert("Failed to update task");
        }
    };

    const renderColumn = (status, label, nextStatus, nextLabel) => (
        <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
                {label}
            </Typography>

            {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                    <Card key={task._id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {task.title}
                            </Typography>
                            <Typography variant="body2">
                                Priority: {task.priority}
                            </Typography>

                            {nextStatus && (
                                <Button
                                    size="small"
                                    sx={{ mt: 1 }}
                                    variant="outlined"
                                    onClick={() => updateStatus(task._id, nextStatus)}
                                >
                                    Move to {nextLabel}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
        </Grid>
    );

    return (
        <Box sx={{ p: 4 }}>
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h4">Project Dashboard</Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={toggleTheme}
                        startIcon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    >
                        {mode === "light" ? "Dark Mode" : "Light Mode"}
                    </Button>

                    <Button variant="contained" color="error" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* CREATE TASK */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Create New Task
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleCreateTask}
                        sx={{ display: "flex", gap: 2, mt: 1 }}
                    >
                        <TextField
                            label="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            fullWidth
                        />

                        <Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>

                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* KANBAN BOARD */}
            <Typography variant="h5" gutterBottom>
                Project Board
            </Typography>

            <Grid container spacing={3}>
                {renderColumn("todo", "Todo", "in-progress", "In Progress")}
                {renderColumn("in-progress", "In Progress", "done", "Done")}
                {renderColumn("done", "Done")}
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* AI PANEL */}
            <AISuggestions />
        </Box>
    );
}

export default Dashboard;
