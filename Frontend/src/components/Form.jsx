import InputForm from "./InputForm"
import { Link } from "react-router-dom";

const Form = ({ title, inputs, onSubmit, buttonText, links, errorMessage }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6  max-w-lg w-full">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">{title}</h2>

        {/* Inputs */}
        {inputs.map((input, index) => (
            <InputForm key={index} {...input} />
        ))}

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        {/* Submit Button */}
        <button type="submit" className="bg-[--secondary2] text-[--secondary1] p-2 rounded-lg hover:bg-[--secondary3] Heading_Bold_04">
            {buttonText}
        </button>

        {/* Links (Forgot Password, Sign Up, etc.) */}
        {links?.length > 0 && (
            <div className="text-center mt-2 Heading_06">
            {links.map((link, index) => (
                <p key={index}>
                    {link.text}{" "}
                    <Link to={link.to} className="text-[--secondary3] hover:underline Heading_Bold_06">
                        {link.linkText}
                    </Link>
                </p>
            ))}
            </div>
        )}
        </form>
    );
};

export default Form;
