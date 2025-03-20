import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const [otp, setOtp] = useState(new Array(4).fill("")); // for a 6-digit OTP
    const nav = useNavigate();

    const handleChange = (value, index) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") { // Check if alphanumeric
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const code = otp.join("")

    const handleVerify = () => {
        console.log("Handle Verify.....")
        nav("/reset-password")
    }
    const handleResendCode = () => {
        console.log("Handle Resend Code.....")
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('.otp-input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener('input', () => {});
                input.removeEventListener('keydown', () => {});
            });
        };
    }, []);



    const verifyFields = [
        { label: "", type: "text", placeholder: "", value: 2 , required: true },
    ];
    return ( 
        <>
        <main className="bg-[--primary] flex justify-center items-center w-screen h-screen">
            <div className="bg-[--secondary1] shadow-2xl h-[70%]">
                <div className="m-6">
                    <h2 className="Heading_Bold_02">Reset Code</h2>
                    <p className="font1 text-[18px]">ENTER THE 6-DIGIT CODE (CONTAINS LETTERS AND NUMBERS) <br /> 
                    THAT WE SENT TO YOUR EMAIL ADDRESS TO VERIFY YOUR NEW ACCOUNT</p>
                </div>
                <form className="flex flex-col justify-center items-center mt-14">
                    {/* Input Fields */}
                    <div className="flex justify-center space-x-8 m-6">
                        {otp.map((_, index) => (
                            <div className="flex justify-center items-center text-2xl sm:text-3xl bg-#3D624F0F border-2 border-[--secondary2] w-[100px] h-[55px] m-1" key={index}>
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index]}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className="otp-input bg-transparent text-center w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center my-6">
                        {/* {isLoading && <button disabled className="bg-green-400 border-2 rounded-lg border-black w-48 h-14 sm:w-56 sm:h-16 shadow-md">
                            <p className="font-medium text-sm sm:text-base">LOADING</p>
                        </button>} */}
                        <button className="bg-[--secondary2] text-[--secondary1] p-2 rounded-lg hover:bg-[--secondary3] Heading_Bold_04 w-[349px] h-[59px]" onClick={handleVerify}>
                            <p className="font-medium text-sm sm:text-base">VERIFY AND CONTINUE</p>
                        </button>
                        <p>
                            Didn't receive the code? {" "}
                            <button onClick={handleResendCode} className="text-[--secondary3] hover:underline Heading_Bold_06">
                                Resend the code
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </main>
        </>
    );
}

export default EmailVerification;