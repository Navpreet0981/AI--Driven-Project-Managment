import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Card,
    CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </Box>

                    <Typography sx={{ mt: 2 }}>
                        Already have an account? <Link href="/">Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Register;
