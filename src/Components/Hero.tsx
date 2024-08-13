import BlurFade from "./CustomDesignes/BlurFade";
import React, { useEffect, useState } from 'react';
import Particles from "./CustomDesignes/Particles";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../Api/apis";
import toast from 'react-hot-toast';
const Hero = () => {
    let data = localStorage.getItem('user')
    console.log(data)
    const navigate = useNavigate()
    const [color, setColor] = useState("#ffffff");
    const [name,setName] = useState('')
    const handleLogout = async () => {
        await logout()
        toast.success("You've Signed Out");
        setTimeout(() => {
            navigate('/login')
        }, 2000);

    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const profileResponse: any = await getProfile(data as string);
            setName(profileResponse.data.data.name);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
    return (
        <header className="bg-cover bg-center h-screen text-white relative bg-[url('https://res.cloudinary.com/dxriwp8sx/image/upload/v1723527227/neom-seX13AzLqls-unsplash_bsu2ic.jpg')]">

            <Particles
                className="absolute inset-0"
                quantity={200}
                ease={50}
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
                    {data ? (
                        <>
                            <li><a onClick={() => navigate(`/profile/${data}`)} className="hover:underline">{name}</a></li>
                            <li><a onClick={handleLogout} className="hover:underline">SignOut</a></li>
                        </>
                    ) : (
                        <>
                            <li><a onClick={() => navigate('/login')} className="hover:underline">Login</a></li>
                            <li><a onClick={() => navigate('/signup')} className="hover:underline">SignUp</a></li>
                        </>
                    )}
                </ul>

            </nav>

            <div className="pt-16 flex justify-center">
                <hr className="border-t w-3/4" />
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <BlurFade delay={0.25} inView>
                    <h1 className="text-6xl font-extrabold font-inter leading-10">Camp with us.</h1>
                </BlurFade>
                <div className='flex flex-col items-center mb-32'>
                    <BlurFade delay={0.25 * 2} inView>
                        <p className="text-xl mt-4 mb-2">Plan your Nature Camps on the most beautiful</p>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <p className='text-xl '>places of The Globe.</p>
                    </BlurFade>
                    {/* Button Added Below */}
                    <BlurFade delay={0.25 * 3} inView>
                        <div className="pt-10">
                            {data ?
                                <button className="btn-shine" onClick={() => navigate('/campList')}>
                                    Get Started
                                </button> : <button className="btn-shine" onClick={() => navigate('/login')}>
                                    Get Started
                                </button>
                            }
                        </div>
                    </BlurFade>
                </div>

            </div>
        </header >
    );
};

export default Hero;
