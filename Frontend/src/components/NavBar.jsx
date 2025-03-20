import headerAssets from "../assets/header/headerAssets";
import { Link } from "react-router-dom";
const NavBar = () => {
    return ( 
        <header className="bg-[--secondary] top-0 z-1000">
            <section className="mx-4 p-4 flex justify-between items-center h-[79px]">
                {/* logo */}
                <div className="flex md:border-r-[2px] lg:border-r-[2px] xl:border-r-[2px]">
                    {/* <h1 className="Heading_Bold_02 text-[--text] mx-12">Rawi</h1> */}
                    <img src={headerAssets.logo} alt="rawi logo" className="w-20 h-20 mx-12" />
                </div>
                <div className="flex gap-8 justify-around items-center Heading_Bold_03 text-[--text] pr-16">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Features</Link>
                    <Link>Contact</Link>
                </div>
            </section>
        </header>
    );
}

export default NavBar;