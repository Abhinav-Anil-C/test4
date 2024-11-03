import React from "react";
import {Link} from "react-router-dom";
const Hero= ()=>{
    return(
    <div className="h-[70vh] flex flex-col md:flex-row items-center justify-center">
        <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center"><h1 className="text-4xl lg:text-6xl font-semibold text-yello-100 text-center lg:text-left">
        Find Your Flavor.</h1>
        <p className="mt-4 text-xl text-zinc-300">Discover your flavor with our food ordering website, where every meal is an adventure waiting to be explored. Savor your cravings and indulge in a delightful culinary journey from the comfort of your home!</p>
        <div className="mt-8"><Link to="/all-items" className="text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">Discover Menu</Link></div>
        </div>
        <div className="w-fll lg:w-3/6 flex items-center">
        <img src="https://th.bing.com/th/id/OIP.Tp4P5yGmXRA91812rO9W5gHaEK?rs=1&pid=ImgDetMain" alt="hero"/>
        </div>
    </div>
    );
}
export default Hero;