import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginAssets from "../../assets/login&signup/loginAndSignupAssets"
import Form from "../../components/Form";
import EmailVerification from "./EmailVerification";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [resetPass, setResetPass] = useState(false)

    const nav = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }
        if (email === "admin@gmail.com" && password === "admin") {
            nav("/home")
        }
        setError(""); // Clear error on successful login
    };

    const handleBack = () => {
        nav("/")
    }

    const loginFields = [
        { label: "", type: "email", placeholder: "Enter your email", value: email, icon: loginAssets.emailIcon, onChange: setEmail, required: true },
        { label: "", type: "password", placeholder: "Enter your password", value: password, icon: loginAssets.keyIcon, onChange: setPassword, required: true },
    ];

    return (
        <>
        <main className="w-screen h-screen flex">
            {/* image section */}
            <section className="w-1/2 bg-[--primary] flex justify-center items-center">
                <img src={loginAssets.loginAvatar} alt="YCart logo with background" />
            </section>

            {/* Login section */}
            <section className="w-1/2 bg-[--secondary1]">
                <div className="flex items-center w-[17%] justify-evenly border-b-2 border-[--secondary2] m-4 cursor-pointer" onClick={handleBack}>
                    <img src={loginAssets.backArrow} alt="back-arrow" className="w-[17.73px] h-[14.78]" />
                    <p className="Heading_Bold_06">Back</p>
                </div>
                <div className="w-full h-[90%] flex justify-center items-center">
                    <Form
                        title=""
                        inputs={loginFields}
                        onSubmit={handleLogin}
                        buttonText="Login"
                        errorMessage={error}
                        links={[{ text: "Forgot your password?", linkText: "Reset Password", to: "/email-verify" }, { text: "Don't have an account?", linkText: "Sign up", to: "/signup" } ]}
                    />
                </div>
            </section>
        </main>
        </>
    );
};

export default Login;
