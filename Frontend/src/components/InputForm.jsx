const InputForm = ({ label, type, placeholder, value, icon, onChange, required }) => {
    return (
    <div className="flex items-center border-b-2 border-b-[--secondary2] my-4"> 
        {label && <label className="text-sm font-medium">{label}</label>}
        <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="m-2 bg-transparent w-full font1 text-lg"
        />
        <img src={icon} alt="email" className="w-[24.7px] h-[19px]" />
    </div>
    );
};

export default InputForm;
