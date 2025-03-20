import Button from "../Button";

const SubHeadline = ({text, buttonText, buttonOnClick}) => {
    return ( 
        <>
        <section className="w-full h-screen bg-[--background] Heading_Bold_02 flex flex-col justify-around items-center text-[--text]">
            <div className="h-1/2 w-full flex flex-col justify-center items-start pl-16 mt-12 text-center">
                <h2>
                {text}
                </h2>
            </div>
            <div className="h-1/2 w-full flex flex-col justify-center items-center ">
                <Button buttonText = {buttonText} buttonOnClick={buttonOnClick} />
            </div>
        </section>
        </>
    );
}

export default SubHeadline;