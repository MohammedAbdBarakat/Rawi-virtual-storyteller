import { useState } from "react";
import Form from "../../components/Form";
import loginAssets from "../../assets/login&signup/loginAndSignupAssets"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email || !userName || !password || !conPassword) {
            setError("Email and password are required!");
            return;
        }
        console.log("Signing up...");
        setError(""); // Clear error on successful signup
    };

    const handleBack = () => {
        nav("/")
    }

    const signupFields = [
        { label: "", type: "text", placeholder: "Enter your user name", value: userName, icon: loginAssets.avatarIcon, onChange: setUserName, required: true },
        { label: "", type: "email", placeholder: "Enter your email", value: email, icon: loginAssets.emailIcon, onChange: setEmail, required: true },
        { label: "", type: "password", placeholder: "Enter your password", value: password, icon: loginAssets.keyIcon, onChange: setPassword, required: true },
        { label: "", type: "password", placeholder: "Re-Enter your password", value: conPassword, icon: loginAssets.keyIcon, onChange: setConPassword, required: true },
    ];

    return (
        <>
        <main className="w-screen h-screen flex">
            {/* image section */}
            <section className="w-1/2 bg-[--primary] flex justify-center items-center">
                <img src={loginAssets.signupAvatar} alt="YCart logo with background" />
            </section>

            {/* signup section */}
            <section className="w-1/2 bg-[--secondary1]">
                <div className="flex items-center w-[17%] justify-evenly border-b-2 border-[--secondary2] m-4 cursor-pointer" onClick={handleBack}>
                    <img src={loginAssets.backArrow} alt="back-arrow" className="w-[17.73px] h-[14.78]" />
                    <p className="Heading_Bold_06">Back</p>
                </div>
                <div className="w-full h-[90%] flex justify-center items-center">
                    <Form
                        title=""
                        inputs={signupFields}
                        onSubmit={handleSignup}
                        buttonText="Sign up"
                        errorMessage={error}
                        links={[{ text: "Already have an account?", linkText: "Login", to: "/login" } ]}
                    />
                </div>
            </section>
        </main>
        </>
    );
};

export default Signup;
