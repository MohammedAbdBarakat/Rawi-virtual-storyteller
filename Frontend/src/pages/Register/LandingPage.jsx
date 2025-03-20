//packages:
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'; // Import useState
//Assets:
import landingPageAssets from "../../assets/landing page/landingPageAssets";
import Footer from "../../components/Footer";
import socialAssets from "../../assets/social/socialAssets";
import lottie from 'lottie-web';
//components:
import Hero from "../../components/landing page/Hero";
import SubHeadline from "../../components/landing page/SubHeadline";
import CTA from "../../components/landing page/CTA";

const LandingPage = () => {
    const nav = useNavigate();

    const campfireAnimationContainer = useRef(null);
    const bookAnimationContainer = useRef(null);
    const summaryAnimationContainer = useRef(null);

    // State to track hover
    const [isHoveredBook, setIsHoveredBook] = useState(false);
    const [isHoveredSummary, setIsHoveredSummary] = useState(false);

    useEffect(() => {
        const campFireAnim = lottie.loadAnimation({
            container: campfireAnimationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: landingPageAssets.campfire,
        });

        const bookAnim = lottie.loadAnimation({
            container: bookAnimationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: landingPageAssets.book,
        });

        const summaryAnim = lottie.loadAnimation({
            container: summaryAnimationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: landingPageAssets.summary,
        });

        return () => {
            campFireAnim.destroy();
            bookAnim.destroy();
            summaryAnim.destroy();
        };
    }, []);



    const heroText = (
        <>
        <p>Unleash Your Imagination with <br /> <i className="text-[100px] text-[--Buttons]">Rawi</i> </p>
        <p>Your AI-Powered Storyteller</p>
        </>
    )

    const subText = (
        <>
        Create, explore, and listen to captivating stories tailored to your preferences, or let <span className="text-[63px] text-[--Buttons]">Rawi</span> summarize and extract lessons from your favorite tales.
        </>
    )

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


    const handleClick = () => {
        nav("home")
    }
    return (
        <>
            <main className="w-screen h-screen">
                <Hero text={heroText} animationRef={campfireAnimationContainer} />
                <SubHeadline text={subText} buttonText={"Start your story now!"} buttonOnClick={handleClick} />
                
                {/* Feature Cards Section */}
                <section className="w-full h-screen bg-[--background] flex justify-around items-center text-[--text]">
                    {/* Feature Card 1 */}
                    <div 
                        className="w-1/3 p-12 h-[66%] bg-[--Buttons] rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 relative"
                        onMouseEnter={() => setIsHoveredBook(true)}
                        onMouseLeave={() => setIsHoveredBook(false)}
                    >
                        <div className="flex justify-center items-center h-1/3">
                            <h1 className="Heading_Bold_03 text-center items-center">
                                Craft Your Perfect Story
                            </h1>
                        </div>

                        {/* Horizontal Line */}
                        <div className="flex justify-center">
                            <div className="h-1 w-[90%] bg-[--secondary] justify-center">
                            </div>
                        </div>

                        {/* Body Text */}
                        <div className="transition-opacity duration-300 absolute top-1/2 left-0 w-full text-center"
                            style={{ opacity: isHoveredBook ? 1 : 0 }}
                        >
                            <p className="bodyFont text-[24px] px-4">
                                Choose your genre, characters, and tone, and let Rawi weave a tale just for you. Whether it's a short story or an epic adventure, the possibilities are endless
                            </p>
                        </div>

                        {/* Lottie Animation */}
                        <div className="absolute bottom-0 left-0 w-full h-2/3 flex justify-center items-center transition-opacity duration-300"
                            style={{ opacity: isHoveredBook ? 0 : 1 }}
                        >
                            <div 
                                ref={bookAnimationContainer} 
                                className="w-full h-full"
                            ></div>
                        </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div 
                        className="w-1/3 h-[66%] p-12 bg-[--Buttons] rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 relative"
                        onMouseEnter={() => setIsHoveredSummary(true)}
                        onMouseLeave={() => setIsHoveredSummary(false)}
                    >
                        <div className="flex justify-center items-center h-1/3">
                            <h1 className="Heading_Bold_03 font-bold text-center">
                                Discover the Lessons in Every Tale
                            </h1>
                        </div>

                        {/* Horizontal Line */}
                        <div className="flex justify-center">
                            <div className="h-1 w-[90%] bg-[--secondary] justify-center">
                            </div>
                        </div>

                        {/* Body Text */}
                        <div className="transition-opacity duration-300 absolute top-1/2 left-0 w-full text-center"
                            style={{ opacity: isHoveredSummary ? 1 : 0 }}
                        >
                            <p className="bodyFont text-[24px] px-4">
                                Paste your favorite story, and Rawi will summarize it, extract key lessons, and even narrate it in a captivating voice                        
                            </p>
                        </div>

                        {/* Lottie Animation */}
                        <div className="absolute bottom-0 left-0 w-full h-2/3 flex justify-center items-center transition-opacity duration-300"
                            style={{ opacity: isHoveredSummary ? 0 : 1 }}
                        >
                            <div 
                                ref={summaryAnimationContainer} 
                                className="w-full h-full"
                            ></div>
                        </div>
                    </div>
                </section>


                {/* CTA section */}
                <CTA text={"Ready to Explore Your Imagination?"} buttonText={"Try Rawi for FREE!"}  buttonOnClick={handleClick} />

                {/* Footer */}
                <Footer
                    logo={"Rawi"}
                    links={footerLinks}
                    socialMedia={socialMedia}
                    copyrightText={`© ${currentYear} Rawi. All rights reserved.`}
                />
            </main>
        </>
    );
};

export default LandingPage;