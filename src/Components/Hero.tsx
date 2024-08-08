
import BlurFade from "./CustomDesignes/BlurFade";
import React, { useState } from 'react';
import Particles from "./CustomDesignes/Particles";

const Hero = () => {
    const [color, setColor] = useState("#ffffff");
    return (
        <header className="bg-cover bg-center h-screen text-white relative bg-[url('./neom-seX13AzLqls-unsplash.jpg')]">

            <Particles
                className="absolute inset-0"
                quantity={200}
                ease={100}
                color={color}
                refresh
            />
            <nav className="absolute top-0 left-0 right-0 flex justify-center items-center p-4 z-10">
                <ul className="flex space-x-4">
                    <li><a href="#about" className="hover:underline">About</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                </ul>
                <div className="text-xl font-extrabold px-96 leading-8">Camp&Crew</div>
                <ul className="flex space-x-4">
                    <li><a href="#about" className="hover:underline">SignIn</a></li>
                    <li><a href="#contact" className="hover:underline">SignUp</a></li>
                </ul>
            </nav>

            <div className="pt-16 flex justify-center">
                <hr className="border-t w-3/4" />
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <BlurFade delay={0.25} inView>
                    <h1 className="text-6xl font-extrabold font-inter leading-10">Camp with us.</h1>
                </BlurFade>
                <div className='flex flex-col items-center'>
                    <BlurFade delay={0.25 * 2} inView>
                        <p className="text-xl mt-4 mb-2">Plan your Nature Camps on the most beautiful</p>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <p className='text-xl mb-28'>places of The Globe.</p>

                    </BlurFade>
                </div>

            </div>
        </header >
    );
};

export default Hero;






