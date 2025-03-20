const Product = ({ image, name }) => {
    return (
        <div className="cursor-pointer">
            <img src={image} alt={name} className="w-[208px] h-[236px] rounded-[12px] shadow-2xl" />
            <p className="Heading_Bold_04 text-center">{name}</p>
        </div>
    );
}

export default Product;