const Hero = ({text, animationRef}) => {
    return ( 
        <>
        <section className="w-full h-screen bg-[--background] Heading_Bold_01 flex justify-between items-center text-[--text]">
        <div className="w-1/2 flex flex-col justify-center items-start pl-16">
            {text}
        </div>

        <div className="w-1/2 h-full relative">
            <div 
                ref={animationRef} 
                className="w-full h-full"
            ></div>
        </div>
    </section>
    </>
    );
}

export default Hero;