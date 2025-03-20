import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import socialAssets from "../../assets/social/socialAssets";
import Footer from "../../components/Footer";
import StoryGenerationSection from "../../components/Home/StoryGenerationSection"
import StorySummarizationSection from "../../components/Home/StorySummarizationSection"; 
import { useNavigate } from "react-router-dom";

const Home = ( {setStory} ) => {
    const [activeFeature, setActiveFeature] = useState("storyGeneration"); // State to track active feature
    
    const nav = useNavigate();

    const footerLinks = [
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact" },
        { to: "/privacy", text: "Privacy Policy" },
        { to: "/terms", text: "Terms of Service" },
    ];

    const socialMedia = [
        { name: "Facebook", icon: socialAssets.facebook, url: "https://facebook.com" },
        { name: "Twitter", icon: socialAssets.twitter, url: "https://twitter.com" },
        { name: "Instagram", icon: socialAssets.instagram, url: "https://instagram.com" },
        { name: "LinkedIn", icon: socialAssets.linkedIn, url: "https://linkedin.com" },
    ];

    const currentYear = new Date().getFullYear();


    return (
        <main className="bg-[--background]">
            <NavBar />
            <main className="w-screen min-h-screen  flex flex-col justify-start items-center pt-8">
                {/* Toggle Buttons */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                            activeFeature === "storyGeneration"
                                ? "bg-[--Buttons] text-white shadow-lg bodyFont"
                                : "bg-[--secondary] text-[--text] opacity-50"
                        }`}
                        onClick={() => setActiveFeature("storyGeneration")}
                    >
                        Story Generation
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                            activeFeature === "storySummarization"
                                ? "bg-[--Buttons] text-white shadow-lg bodyFont"
                                : "bg-[--secondary] text-[--text] opacity-50"
                        }`}
                        onClick={() => setActiveFeature("storySummarization")}
                    >
                        Story Summarization
                    </button>
                </div>

                {/* Feature Sections */}
                <div className="w-full h-full flex justify-around items-center mb-4">
                    {/* Story Generation Section */}
                    <StoryGenerationSection
                        setActiveFeature = {setActiveFeature}
                        isActive={activeFeature === "storyGeneration"}
                        setStory={setStory}
                    />

                    {/* Story Summarization Section */}
                    <StorySummarizationSection
                        setActiveFeature = {setActiveFeature}
                        isActive={activeFeature === "storySummarization"}
                    />
                </div>
            </main>
            <Footer
                logo={"Rawi"}
                links={footerLinks}
                socialMedia={socialMedia}
                copyrightText={`© ${currentYear} Rawi. All rights reserved.`}
            />
        </main>
    );
};

export default Home;