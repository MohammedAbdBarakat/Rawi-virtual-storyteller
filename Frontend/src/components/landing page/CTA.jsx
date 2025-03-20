import Button from "../Button";

const CTA = ({text, buttonText, buttonOnClick}) => {
    return ( 
        <section className="w-full h-screen bg-[--background] Heading_Bold_02 flex flex-col justify-around items-center text-[--text]">
            <h1 className="Heading_Bold_01"> {text} </h1>
            <div className="h-1/2 w-full flex flex-col justify-center items-center ">
                <Button buttonText = {buttonText} buttonOnClick={buttonOnClick} />
            </div>
        </section>

    );
}

export default CTA;