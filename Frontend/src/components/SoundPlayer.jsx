import React, { useRef, useState } from "react";

const SoundPlayer = ({ audioSrc }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Play/Pause toggle
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Skip forward/backward
    const skip = (seconds) => {
        audioRef.current.currentTime += seconds;
    };

    // Change playback speed
    const changeSpeed = () => {
        let newSpeed = playbackSpeed + 0.5;
        if (newSpeed > 2) newSpeed = 1; // Reset to 1x after 2x
        audioRef.current.playbackRate = newSpeed;
        setPlaybackSpeed(newSpeed);
    };

    // Update progress bar
    const updateProgress = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    // Handle progress bar change
    const handleProgressChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="mini-sound-player bg-[--secondary] p-4 rounded-lg shadow-lg">
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            />

            {/* Progress Bar */}
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full mb-4"
            />

            {/* Controls */}
            <div className="flex justify-between items-center">
                {/* Skip Backward */}
                <button
                    onClick={() => skip(-10)}
                    className="p-2 rounded-full bg-[--Buttons] text-[--text] hover:bg-[--Buttons-hover] transition-all"
                >
                    ⏪ 10s
                </button>

                {/* Play/Pause */}
                <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-[--Buttons] text-[--text] hover:bg-[--Buttons-hover] transition-all"
                >
                    {isPlaying ? "⏸️" : "▶️"}
                </button>

                {/* Skip Forward */}
                <button
                    onClick={() => skip(10)}
                    className="p-2 rounded-full bg-[--Buttons] text-[--text] hover:bg-[--Buttons-hover] transition-all"
                >
                    10s ⏩
                </button>

                {/* Speed Control */}
                <button
                    onClick={changeSpeed}
                    className="p-2 rounded-full bg-[--Buttons] text-[--text] hover:bg-[--Buttons-hover] transition-all"
                >
                    {playbackSpeed}x
                </button>
            </div>
        </div>
    );
};

export default SoundPlayer;