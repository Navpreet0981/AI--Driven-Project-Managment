import { useState, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (token) navigate("/dashboard");
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            login(res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
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
                        Login
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
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
                            Login
                        </Button>
                    </Box>

                    <Typography sx={{ mt: 2 }}>
                        Don’t have an account?{" "}
                        <Link href="/register">Register</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Login;
