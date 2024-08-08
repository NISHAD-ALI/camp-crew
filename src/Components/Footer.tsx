import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-gradient-to-r from-gray-900 to-neutral-900 text-white py-8'>
            <div className='container mx-auto px-6 md:px-12 lg:px-24'>
                {/* Upper section with links */}
                <div className='flex flex-wrap justify-between items-start mb-8'>
                    {/* About Section */}
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h4 className='text-lg font-semibold mb-4'>About Us</h4>
                        <p className='text-sm'>
                            Explore Nature like no other.
                        </p>
                    </div>
                    {/* Links Section */}
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
                        <ul className='text-sm space-y-2'>
                            <li><a href='#' className='hover:text-gray-400'>Home</a></li>
                            <li><a href='#' className='hover:text-gray-400'>About</a></li>
                            <li><a href='#' className='hover:text-gray-400'>Services</a></li>
                            <li><a href='#' className='hover:text-gray-400'>Contact</a></li>
                        </ul>
                    </div>
                    {/* Social Media Section */}
                    <div className='w-full md:w-1/3'>
                        <h4 className='text-lg font-semibold mb-4'>Follow Us</h4>
                        <div className='flex space-x-4'>
                            <a href='#' className='hover:text-gray-400'><FaFacebook size={24} /></a>
                            <a href='#' className='hover:text-gray-400'><FaTwitter size={24} /></a>
                            <a href='#' className='hover:text-gray-400'><FaInstagram size={24} /></a>
                            <a href='#' className='hover:text-gray-400'><FaLinkedin size={24} /></a>
                        </div>
                    </div>
                </div>
                {/* Bottom section with copyright */}
                <div className='border-t border-gray-700 pt-6'>
                    <p className='text-sm text-center'>
                        &copy; {new Date().getFullYear()} Camp&Crew. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
