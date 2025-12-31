import { useEffect, useState } from "react";
import API from "../services/api";

function AISuggestions() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRecommendations = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await API.get("/ai/recommendations");
            setRecommendations(res.data.recommendations || []);
        } catch (err) {
            setError("Failed to load AI recommendations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>AI Recommendations</h2>

            <button onClick={fetchRecommendations}>Refresh AI Suggestions</button>

            {loading && <p>Analyzing tasks...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {recommendations.length === 0 && !loading ? (
                <p>No AI suggestions available</p>
            ) : (
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index} style={{ marginBottom: "15px" }}>
                            <strong>{rec.title}</strong>
                            <br />
                            Suggested Priority: <b>{rec.suggestedPriority}</b>
                            <br />
                            Suggested Status: <b>{rec.suggestedStatus}</b>
                            <br />
                            Reason: {rec.reason}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AISuggestions;
