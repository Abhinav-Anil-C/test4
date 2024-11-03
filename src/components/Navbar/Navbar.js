import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Items", link: "/all-items" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "Admin Profile", link: "/profile" }
        ,
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const filteredLinks = isLoggedIn ? links : links.slice(0, 2); // Remove Cart and Profile for non-logged-in users
    if(isLoggedIn == true && role === "admin"){
        link: links.splice(3,1);
    }
    if(isLoggedIn == true && role === "user"){
        link: links.splice(4,1);
    }
    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img className="h-10 me-4" src="https://pbs.twimg.com/profile_images/1522590644300128257/L7xX4mUt_400x400.jpg" alt="logo" />
                    <h1 className="text-2xl font-semibold">EatsExpress</h1>
                </Link>
                <div className="nav-links-eatsexpress block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {filteredLinks.map((item) => (
                            <Link to={item.link} className="hover:text-blue-500 transition-all duration-100" key={item.link}>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    {!isLoggedIn && (
                        <div className="hidden md:flex gap-4">
                            <Link to="/LogIn" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100">LogIn</Link>
                            <Link to="/SignUp" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100">SignUp</Link>
                        </div>
                    )}
                    <button className="block md:hidden text-white text-2xl hover:text-zinc-400" onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {filteredLinks.map((item) => (
                    <Link to={item.link} className="text-white text-4xl mb-4 font-semibold hover:text-blue-500 transition-all duration-100" key={item.link} onClick={() => setMobileNav("hidden")}>
                        {item.title}
                    </Link>
                ))}
                {!isLoggedIn && (
                    <>
                        <Link to="/LogIn" className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-100">LogIn</Link>
                        <Link to="/SignUp" className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100">SignUp</Link>
                    </>
                )}
            </div>
        </>
    );
}

export default Navbar;
