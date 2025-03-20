import { useState } from "react";
import { axiosPrivate, Story as storyAPI } from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "../CheckBox";

const StoryGenerationSection = ({ isActive, setStory, setActiveFeature}) => {
    const [category, setCategory] = useState(0);
    const [setting, setSetting] = useState(0);
    const [storyLength, setStoryLength] = useState(0);
    const [storyLanguage, setStoryLanguage] = useState("");
    const [theme, setTheme] = useState(0);
    const [gender, setGender] = useState(0);
    const [job, setJob] = useState(0);
    const [numberOfCharacters, setNumberOfCharacters] = useState("");
    const [nameOfMainCharacter, setNameOfMainCharacter] = useState("");
    const [isKidsStory, setIsKidsStory] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleGenClick = async () => {
        const storyInputs = {
            Category: category,
            Setting: setting,
            Length: storyLength,
            Language: storyLanguage,
            Theme: theme,
            Gender: gender,
            Job: job,
            NumberOfCharacters: numberOfCharacters,
            NameOfMainCharacter: nameOfMainCharacter,
        };
        

        //validation
        if (!nameOfMainCharacter.trim()) {
            setError("Please fill the character name field")
            return;
        }

        if (nameOfMainCharacter.length < 3) {
            setError("The name of the main character must be at least 3 letters")
            return;
        }
        if (numberOfCharacters < 2 || numberOfCharacters > 8) {
            setError("The Number of story characters must be between 2 and 8")
            return;
        }


        const link =  `https://rawi.onrender.com/story/generate-story?Category=${storyInputs.Category}&Setting=${storyInputs.Setting}&Length=${storyInputs.Length}&Theme=${storyInputs.Theme}&Gender=${storyInputs.Gender}&Job=${storyInputs.Job}&NumberOfCharacters=${storyInputs.NumberOfCharacters}&NameOfMainCharcter=${storyInputs.NameOfMainCharacter}&Age=${isKidsStory}`;
        console.log("Link: ", link);
        
        try {
            setIsLoading(true);

            console.log("Sending user inputs ...");

            const headers = {};
            if (storyLanguage === "Arabic") {
                headers["language"] = "ar"; 
            }

            const response = await axios.get(
                `https://rawi.onrender.com/story/generate-story?Category=${storyInputs.Category}&Setting=${storyInputs.Setting}&Length=${storyInputs.Length}&Theme=${storyInputs.Theme}&Gender=${storyInputs.Gender}&Job=${storyInputs.Job}&NumberOfCharacters=${storyInputs.NumberOfCharacters}&NameOfMainCharcter=${storyInputs.NameOfMainCharacter}&Age=${isKidsStory}`,
                { headers }
            );
    
            nav("/story", { state: { story: response.data, language: storyLanguage, storyLength: storyLength } });
        } catch (error) {
            console.log("Story generation, story inputs sending failed! ", error);
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

    // Dropdown options
    const categoryOptions = [
        { label: "Fiction", value: 0 },
        { label: "NonFiction", value: 1 },
        { label: "Mystery", value: 2 },
        { label: "Fantasy", value: 3 },
        { label: "ScienceFiction", value: 4 },
        { label: "Horror", value: 5 },
        { label: "Romance", value: 6 },
        { label: "Historical", value: 7 },
        { label: "Adventure", value: 8 },
        { label: "Children", value: 9 },
        { label: "YoungAdult", value: 10 },
        { label: "Comedy", value: 11 },
        { label: "Drama", value: 12 },
        { label: "Thriller", value: 13 },
    ];
    
    const settingOptions = [
        { label: "FantasyWorld", value: 0 },
        { label: "Futuristic", value: 1 },
        { label: "Historical", value: 2 },
        { label: "ModernDay", value: 3 },
        { label: "PostApocalyptic", value: 4 },
        { label: "Medieval", value: 5 },
        { label: "Space", value: 6 },
        { label: "Underwater", value: 7 },
        { label: "VirtualReality", value: 8 },
        { label: "HorrorHouse", value: 9 },
        { label: "WildWest", value: 10 },
        { label: "MysteryTown", value: 11 },
        { label: "SciFiCity", value: 12 },
        { label: "Desert", value: 13 },
        { label: "Jungle", value: 14 },
        { label: "Arctic", value: 15 },
        { label: "Steampunk", value: 16 },
        { label: "SuperheroCity", value: 17 },
        { label: "Dystopian", value: 18 },
    ];
    
    const genderOptions = [
        { label: "Male", value: 0 },
        { label: "Female", value: 1 },
    ];
    
    const storyLengthOptions = [
        { label: "FlashStory", value: 0 },
        { label: "ShortStory", value: 1 },
        { label: "Novella", value: 2 },
    ];

    const storyLanguageOptions = [
        "English", 
        "Arabic",
    ];
    
    const jobOptions = [
        { label: "SoftwareEngineer", value: 0 },
        { label: "DataScientist", value: 1 },
        { label: "ProjectManager", value: 2 },
        { label: "Designer", value: 3 },
        { label: "Writer", value: 4 },
        { label: "Teacher", value: 5 },
        { label: "Doctor", value: 6 },
        { label: "Nurse", value: 7 },
        { label: "Lawyer", value: 8 },
        { label: "Accountant", value: 9 },
        { label: "SalesManager", value: 10 },
        { label: "MarketingSpecialist", value: 11 },
        { label: "Mechanic", value: 12 },
        { label: "Electrician", value: 13 },
        { label: "Chef", value: 14 },
        { label: "PoliceOfficer", value: 15 },
        { label: "Firefighter", value: 16 },
        { label: "Pilot", value: 17 },
        { label: "Actor", value: 18 },
        { label: "Musician", value: 19 },
    ];
    
    const themeOptions = [
        { label: "Love", value: 0 },
        { label: "Betrayal", value: 1 },
        { label: "Revenge", value: 2 },
        { label: "Friendship", value: 3 },
        { label: "Courage", value: 4 },
        { label: "Survival", value: 5 },
        { label: "GoodVsEvil", value: 6 },
        { label: "Redemption", value: 7 },
        { label: "SelfDiscovery", value: 8 },
        { label: "Family", value: 9 },
        { label: "War", value: 10 },
        { label: "Peace", value: 11 },
        { label: "Freedom", value: 12 },
        { label: "Power", value: 13 },
        { label: "Mystery", value: 14 },
        { label: "Justice", value: 15 },
        { label: "Hope", value: 16 },
        { label: "Tragedy", value: 17 },
        { label: "Horror", value: 18 },
        { label: "Adventure", value: 19 },
        { label: "Supernatural", value: 20 },
        { label: "ScienceFiction", value: 21 },
        { label: "Fantasy", value: 22 },
        { label: "Historical", value: 23 },
        { label: "Dystopian", value: 24 },
        { label: "Utopian", value: 25 },
    ];
    return (
        <section 
            onClick={() => setActiveFeature("storyGeneration")}
            className={`w-[40%] h-[90vh] shadow-inner overflow-x-auto bg-[--Buttons] rounded-3xl p-8 transition-all duration-300 ${
                isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
            }`}
        >
            <h2 className="Heading_Bold_02 text-[--text] font-bold mb-4">Story Generation</h2>
            <p className="Heading_04 text-[--text] mb-8">Create your own story by choosing category, characters, and gender.</p>

             {/* Main Character Input */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Name Of Main Character</label>
                <input
                    minLength={3}
                    maxLength={12}
                    disabled={!isActive}
                    type="text"
                    value={nameOfMainCharacter}
                    onChange={(e) => setNameOfMainCharacter(e.target.value)}
                    placeholder="Character name"
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                />
            </div>

            {/* Category Dropdown */}
            <label className="block text-[--text] Heading_06 mb-2">Category</label>
            <select
                value={category}
                disabled={!isActive}
                onChange={(e) => setCategory(Number(e.target.value))} // Convert to number
                className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
            >
                {categoryOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label} {/* Render the label here */}
                    </option>
                ))}
            </select>

            {/* Setting Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Setting</label>
                <select
                    value={setting}
                    disabled={!isActive}
                    onChange={(e) => setSetting(Number(e.target.value))} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {settingOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Render the label here */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Theme Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Theme</label>
                <select
                    value={theme}
                    disabled={!isActive}
                    onChange={(e) => setTheme(Number(e.target.value))} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {themeOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Render the label here */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gender Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Gender</label>
                <select
                    value={gender}
                    disabled={!isActive}
                    onChange={(e) => setGender(Number(e.target.value))} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {genderOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Render the label here */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Story Length Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Story Length</label>
                <select
                    value={storyLength}
                    disabled={!isActive}
                    onChange={(e) => setStoryLength(Number(e.target.value))} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {storyLengthOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Render the label here */}
                        </option>
                    ))}
                </select>
            </div>

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

            {/* Job Dropdown */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Job</label>
                <select
                    value={job}
                    disabled={!isActive}
                    onChange={(e) => setJob(Number(e.target.value))} // Convert to number
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                >
                    {jobOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Render the label here */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Number of Characters Input */}
            <div className="mb-6">
                <label className="block text-[--text] Heading_06 mb-2">Number of Characters</label>
                <input
                    max={4}
                    type="number"
                    disabled={!isActive}
                    value={numberOfCharacters}
                    onChange={(e) => setNumberOfCharacters(e.target.value)}
                    placeholder="e.g., 4"
                    className="w-full p-2 bodyFont rounded-lg bg-[--secondary] text-[--text] placeholder:text-[--text] border border-[--text] focus:outline-none focus:border-[--Buttons]"
                />
            </div>
            
            {/* Kids Story */}
            <div className="mb-6 flex justify-between items-center">
                <label className="block text-[--text] Heading_06 mb-2">Kids Story?</label>
                <Checkbox
                    checked={isKidsStory}
                    onChange={(e) => setIsKidsStory(e.target.checked)}
                />
            </div>

            
            {/* Generate Story Button */}
            {!isLoading && <button
                disabled={!isActive}
                className="w-full bg-[--text] text-[--background] Heading_06 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={handleGenClick}
            >
                Generate Story
            </button>}

            {isLoading && <button
                disabled
                className="w-full bg-[--text] text-[--background] Heading_06 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={handleGenClick}
            >
                Generating Story ...
            </button>}

            {/* Error message */}
            {error && (
                <div className="Heading_5 text-red-500 p-4">
                    {error}
                </div>
            )}
        </section>
    );
};

export default StoryGenerationSection;