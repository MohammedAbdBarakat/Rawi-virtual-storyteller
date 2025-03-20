import { useState } from "react";
import loginAssets from "../../assets/login&signup/loginAndSignupAssets"
import Form from "../../components/Form";

const ResetPassword = () => {
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    
    const resetPassFields = [
        { label: "", type: "password", placeholder: "Enter your password", value: password, icon: loginAssets.keyIcon, onChange: setPassword, required: true },
        { label: "", type: "password", placeholder: "ٌRe-Enter your password", value: rePassword, icon: loginAssets.keyIcon, onChange: setRePassword, required: true },
    ]

    const handleChangePassword = () => {
        console.log("Changing Password...");
    }
    return ( 
        <>
        <main className="bg-[--primary] flex justify-center items-center w-screen h-screen">
            <div className="bg-[--secondary1] shadow-2xl h-[70%]">
                <div className="m-6">
                    <h2 className="Heading_Bold_02">Reset your password</h2>
                    <Form
                        title = ""
                        inputs = {resetPassFields}
                        onSubmit = {handleChangePassword}
                        buttonText = "Change Password"
                    />
                </div>
            </div>
        </main>
        </>
    );
}

export default ResetPassword;