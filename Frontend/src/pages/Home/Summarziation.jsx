import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeAssets from "../../assets/home/homeAssets";
import lottie from 'lottie-web';
import { FaPlay, FaStop, FaChevronLeft, FaChevronRight, FaHeadphones, FaSpinner } from "react-icons/fa";
import axios from "axios";

const Summarization = () => {
    const [story, setStory] = useState("");
    const [storyLessons, setStoryLessons] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [showLessons, setShowLessons] = useState(false);
    const [storyLanguage, setStoryLanguage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [audioReady, setAudioReady] = useState(false); // Track if audio is ready

    const location = useLocation();
    const storyTellerAnimationContainer = useRef(null);
    const audioRef = useRef(null);

    const cleanLessons = (lessons) => {
        return lessons.map(lesson => {
            // Remove the lesson label (e.g., "lesson1: ", "lesson2: ", etc.)
            lesson = lesson.replace(/lesson\d+: /i, '');
            // Remove square brackets [ and ]
            lesson = lesson.replace(/[\[\]]/g, '');
            return lesson;
        });
    };

    useEffect(() => {
        if (location.state && location.state.summary) {
            setStory(location.state.summary);
        }
        if (location.state && location.state.language) {
            setStoryLanguage(location.state.language);
        }
        if (location.state && location.state.lessons) {
            // Clean the lessons before setting the state
            const cleanedLessons = cleanLessons(location.state.lessons);
            setStoryLessons(cleanedLessons);
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

    const handleArrowClick = () => {
        setShowLessons(!showLessons); // Toggle between story and lessons
    };

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
            const storyObject = {
                data: story
            }
            
            const response = await axios.post(
                "https://rawi.onrender.com/api/TextToSpeech/synthesize",
                storyObject,
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
        } finally {
            setIsLoading(false);
        }
    };

    //translation
    const enTitle = "Summarized Story";
    const arTitle = "القصة الملخصة";
    const enLessonTitle = "Lessons Learned";
    const arLessonTitle = "الدروس المستفادة";
    const enLesson1 = "Lesson 1:";
    const enLesson2 = "Lesson 2:";
    const enLesson3 = "Lesson 3:";
    const arLesson1 = ":الدرس الأول";
    const arLesson2 = ":الدرس الثاني";
    const arLesson3 = ":الدرس الثالث ";


    return (
        <div
            className={`w-screen h-screen ${isTransitioning ? "animate-fadeToBlack" : ""}`}
            style={{ backgroundImage: `url(${homeAssets.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
            <div className="w-full h-full flex justify-center items-center p-8">
                {/* Old Paper Background */}
                <div className="relative w-3/4 h-full bg-[--Buttons] bg-cover bg-center p-8 rounded-l-lg rounded-b-lg shadow-2xl transition-all duration-300 opacity-80 hover:opacity-100">
                    {/* Story Text */}
                    <div
                        className={`w-3/4 h-full overflow-x-scroll transition-all duration-500 ease-in-out  ${
                            showLessons ? "translate-x-full" : "translate-x-0"
                        } ${showLessons ? "invisible opacity-0" : "visible opacity-100"}`} // Hide story when lessons are shown
                    >
                        <h1 className={`text-[50px] font-bold text-black  ${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"}`} >{storyLanguage == "Arabic" ? arTitle : enTitle}</h1>
                        <p className={`text-[--text] text-[32px] leading-relaxed ${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"} `}>
                            {story}
                        </p>
                    </div>

                    {/* Lessons Learned */}
                    <div
                        className={`absolute top-0 left-0 w-3/4 h-full p-8 transition-all duration-500 ease-in-out overflow-scroll
                            ${showLessons ? "translate-x-0" : "translate-x-full"} 
                            ${showLessons ? "visible opacity-100" : "invisible opacity-0"}`} // Hide lessons when story is shown
                    >
                        <h1 className={`text-[50px] font-bold text-black  ${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"}`}>{storyLanguage == "Arabic" ? arLessonTitle : enLessonTitle}</h1>
                        <ul className={`text-[--text] text-[32px] leading-relaxed ${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"} `}>
                            <li className={`${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"}`}> {storyLanguage == "Arabic" ? "" : enLesson1} {storyLessons[0]} </li>
                            <br />
                            <li className={`${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"}`}> {storyLanguage == "Arabic" ? "" : enLesson2} {storyLessons[1]}</li>
                            <br />
                            <li className={`${storyLanguage == "Arabic" ? "text-right arabicFont" : "text-left storyFont"}`}> {storyLanguage == "Arabic" ? "" : enLesson3} {storyLessons[2]}</li>
                        </ul>
                    </div>

                    {/* Mini Sound Player */}
                    <div
                        className={`absolute -right-16 top-0 flex flex-col space-y-2 bg-[--secondary] p-4 rounded-r-lg shadow-lg transition-all duration-300`}
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

                    {/* Storyteller Illustration and Arrow Button */}
                    <div className="absolute right-0 top-0 w-1/4 h-full flex justify-center items-center">
                        <div
                            ref={storyTellerAnimationContainer}
                            className="w-full h-full"
                        ></div>
                        {/* Sound Player Toggle Button */}
                        <button
                            onClick={handleArrowClick}
                            className="absolute right-0 bottom-1/2 transform -translate-y-1/2 bg-[--secondary] p-2 rounded-l-lg shadow-lg transition-all duration-300"
                        >
                            {showLessons ? <FaChevronRight /> : <FaChevronLeft />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summarization;