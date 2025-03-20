import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeAssets from "../../assets/home/homeAssets";
import lottie from 'lottie-web';
import { FaPlay, FaStop, FaChevronLeft, FaChevronRight, FaHeadphones, FaSpinner } from "react-icons/fa";
import axios from "axios";

const StoryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [story, setStory] = useState("");
    const [storyLanguage, setStoryLanguage] = useState("");
    const [storyLength, setStoryLength] = useState(""); // Add storyLength state
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [audioReady, setAudioReady] = useState(false); // Track if audio is ready
    const [isError, setIsError] = useState(""); // Track error messages

    const storyTellerAnimationContainer = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.story) {
            setStory(location.state.story);
        }
        if (location.state && location.state.language) {
            setStoryLanguage(location.state.language);
        }
        if (location.state && location.state.storyLength) {
            setStoryLength(location.state.storyLength); // Set storyLength from location state
        }
    }, [location]);

    useEffect(() => {
        const storyTellerAnim = lottie.loadAnimation({
            container: storyTellerAnimationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: homeAssets.storyTeller,
        });

        return () => {
            storyTellerAnim.destroy();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 1000); // Duration of the fade-to-black transition
        return () => clearTimeout(timer);
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSpeedChange = () => {
        const newSpeed = playbackRate === 2 ? 1 : playbackRate + 0.5;
        setPlaybackRate(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    const generateSound = async () => {
        // Clear any previous error message
        setIsError("");
        
        // Validation for long stories
        if (storyLength == 2) {
            setIsError(
                storyLanguage === "Arabic"
                    ? "نأسف، ولكن توليد الصوت غير متاح حاليًا للقصص الطويلة. نحن نعمل على إضافة هذه الميزة قريبًا!"
                    : "We're sorry, but sound generation is currently unavailable for long stories. We're working on adding this feature soon!"
            );
            return; // Exit the function early
        }

        try {
            setIsLoading(true);
            setAudioReady(false); // Reset audio ready state
            console.log("Generating Sound ...");

            const headers = {
                'accept': 'audio/mpeg',
                'Content-Type': 'application/json',
            };

            if (storyLanguage === "Arabic") {
                headers["language"] = "ar";
            }
            console.log("story: ", story);

            const response = await axios.post(
                "https://rawi.onrender.com/api/TextToSpeech/synthesize",
                story,
                {
                    headers,
                    responseType: 'blob', // Set the response type to 'blob' for binary data
                }
            );

            console.log("Sound generation response:", response);

            // Create a URL for the binary data
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // Update the audio element's source
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play(); // Automatically play the audio
                setAudioReady(true); // Audio is ready
                setIsPlaying(true); // Automatically play the audio
            }
        } catch (error) {
            console.log("Sound generation error:", error);
            setIsError(
                storyLanguage === "Arabic"
                    ? "حدث خطأ أثناء توليد الصوت. يرجى المحاولة مرة أخرى لاحقًا."
                    : "An error occurred while generating the audio. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`w-screen h-screen ${isTransitioning ? "animate-fadeToBlack" : ""}`}
            style={{ backgroundImage: `url(${homeAssets.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
            <div className="w-full h-full flex justify-center items-center p-8">
                {/* Old Paper Background */}
                <div className="relative w-3/4 h-full bg-[--Buttons] bg-cover bg-center p-8 rounded-l-lg rounded-b-lg shadow-2xl transition-all duration-300 opacity-80 hover:opacity-100">
                    {/* Story Text */}
                    <div className="w-3/4 h-full overflow-x-scroll">
                        <p className={`text-[--text] text-[32px] leading-relaxed ${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"} `}>
                            {story.data}
                        </p>
                    </div>

                    {/* Error Message */}
                    {isError && (
                        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-[--secondary] p-4 rounded-lg shadow-lg ${storyLanguage === "Arabic" ? "text-right" : "text-left"}`}>
                            <p className="text-[--text]">{isError}</p>
                        </div>
                    )}

                    {/* Mini Sound Player */}
                    <div
                        className={`absolute -right-16 top-0 max-w-16 flex flex-col space-y-2 bg-[--secondary] p-4 rounded-r-lg shadow-lg transition-all duration-300`}
                    >
                        {/* Generate Speech / Play Button */}
                        <button
                            className="p-2 rounded-full"
                            onClick={!audioReady ? generateSound : handlePlayPause}
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin" /> // Loading spinner
                            ) : audioReady ? (
                                isPlaying ? <FaStop /> : <FaPlay /> // Play/Pause button
                            ) : (
                                <FaHeadphones /> // Headphones icon
                            )}
                        </button>

                        {/* Control Speed */}
                        <button
                            onClick={handleSpeedChange}
                            className="p-2 rounded-full"
                        >
                            {playbackRate}x
                        </button>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio ref={audioRef} playbackRate={playbackRate} />

                    {/* Storyteller Illustration */}
                    <div className="absolute right-0 top-0 w-1/4 h-[90%] flex justify-center items-center">
                        <div
                            ref={storyTellerAnimationContainer}
                            className="w-full h-full"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryPage;