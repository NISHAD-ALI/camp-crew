"use client";
import { useState } from "react";
import Particles from "./CustomDesignes/Particles";
import React from 'react';
import NumberTicker from "./CustomDesignes/NumberTicker";

const End = () => {
    const [color, setColor] = useState("#ffffff");

    return (
        <div className='bg-black h-screen w-full flex relative'>
            <Particles
                className="absolute inset-0"
                quantity={200}
                ease={100}
                color={color}
                refresh
            />

            {/* Left side with text */}
            <div className='w-1/2 flex items-center justify-center p-24'>
                <h1 className='text-white font-extrabold font-inter text-4xl'>Wanna Start your own Camp?</h1>
            </div>

            {/* Right side with vertical cards */}
            <div className='w-1/2 flex flex-col items-center justify-center space-y-6'>
                <div className='bg-gradient-to-r from-gray-900 to-neutral-900 text-white p-6 rounded-lg shadow-lg w-1/2'>
                    <h2 className='text-2xl font-bold mb-4'>No.of Camps organised</h2>
                    <p className="whitespace-pre-wrap text-8xl font-medium font-inter tracking-tighter text-white dark:text-black flex justify-center">
                        <NumberTicker value={99} />
                    </p>
                    {/* <p className='text-base'>This is the description for the first card. You can add more details here.</p> */}
                </div>
                <div className='bg-gradient-to-r from-gray-900 to-neutral-900 text-white p-6 rounded-lg shadow-lg w-1/2'>
                    <h2 className='text-2xl font-bold mb-4'>No. of people</h2>
                    {/* <p className='text-base'>This is the description for the second card. You can add more details here.</p> */}
                    <p className="whitespace-pre-wrap text-8xl font-medium font-inter tracking-tighter text-white dark:text-black flex justify-center">
                        <NumberTicker value={66} />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default End;
