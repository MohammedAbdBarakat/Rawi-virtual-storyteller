import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StorySummarizationSection = ({ isActive, setActiveFeature }) => {
    const [storyText, setStoryText] = useState("");
    const [summary, setSummary] = useState("");
    const [storyLanguage, setStoryLanguage] = useState("");
    const [storyLessons, setStoryLessons] = useState()

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleSummarize = async () => {
        console.log("Start summary...");

        // Validation: Check if storyText is empty
        if (!storyText.trim()) {
            setError("Please fill the field!");
            return; 
        }

        // Clear any previous errors
        setError("");

        try {
            setIsLoading(true);

            const headers = {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
            };

            if (storyLanguage === "Arabic") {
                headers["language"] = "ar"; 
            }

            const requestBody = {
                data: storyText,
            };

            const response = await axios.post(
                "https://rawi.onrender.com/story/summary-story",
                requestBody,
                { headers }
            );

            console.log("response ", response.data.lessons);

            setStoryLessons(response.data.lessons)

            // Replace \n with actual new lines
            const formattedSummary = response.data.data.replace(/\\n/g, '\n');

            // Set the formatted summary to state
            setSummary(formattedSummary);

            console.log("Summary: ", formattedSummary);

            // Navigate to the summarization page with the summary
            nav("/summarization", { state: { summary: formattedSummary, language: storyLanguage, lessons: response.data.lessons} });

        } catch (error) {
            console.error("Story summarization failed! ", error);

            // Set a user-friendly error message
            setError("An error occurred while summarizing the story. Please try again.");

            if (error.response) {
                console.log("Response Data: ", error.response.data);
                console.log("Response Status: ", error.response.status);
                console.log("Response Headers: ", error.response.headers);
            } else if (error.request) {
                console.log("No response received: ", error.request);
            } else {
                console.log("Error: ", error.message);
            }
        } finally {
            // Reset loading state
            setIsLoading(false);
        }
    };


    const storyLanguageOptions = [
        "English", 
        "Arabic",
    ];

    return (
        <section
            onClick={() => setActiveFeature("storySummarization")}
            className={`w-[40%] h-[90vh] overflow-scroll bg-[--Buttons] rounded-3xl p-8 transition-all duration-300 ${
                isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
            }`}
        >
            <h2 className="Heading_Bold_02 text-[--text] font-bold mb-4">Story Summarization</h2>
            <p className="Heading_04 text-[--text] mb-8">Paste your story and let Rawi summarize it for you.</p>

            {/* Story Input Textarea */}
            <div className="mb-6">
                <textarea
                    disabled={!isActive}
                    value={storyText}
                    onChange={(e) => {
                        setStoryText(e.target.value);
                        // Clear error when user starts typing
                        setError("");
                    }}
                    placeholder="Paste your story here..."
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons] placeholder:text-[--placeholder]"
                    rows="10"
                />
            </div>

            {/* Optional: Character Count */}
            <p className="text-sm text-[--text] mb-6">
                {storyText.length} characters
            </p>
                
            
            {/* Story Language Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Story Language</label>
                <select
                    value={storyLanguage}
                    disabled={!isActive}
                    onChange={(e) => setStoryLanguage(e.target.value)} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {storyLanguageOptions.map((option, index) => (
                        <option>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Summarize Button */}
            {!isLoading ? (
                <button
                    disabled={!isActive}
                    onClick={handleSummarize}
                    className="w-full bg-[--text] text-[--background] Heading_06 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    Summarize Story
                </button>
            ) : (
                <button
                    disabled
                    className="w-full bg-[--text] text-[--background] Heading_06 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    Please Wait ...
                </button>
            )}

            {/* Error message */}
            {error && (
                <div className="Heading_5 text-red-500 p-4">
                    {error}
                </div>
            )}
        </section>
    );
};

export default StorySummarizationSection;