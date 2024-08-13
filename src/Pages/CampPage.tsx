import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHome, FaRandom } from 'react-icons/fa';
import { getCamps } from "../Api/apis";

const CampPage = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState<any[]>([]);
  const [filteredCamps, setFilteredCamps] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCamps();
        setCamps(response);
        setFilteredCamps(response); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleRandomSelect = () => {
    const randomCamp = camps[Math.floor(Math.random() * camps.length)];
    if (randomCamp) {
      navigate(`/camp/${randomCamp._id}`);
    }
  };

  const handleMyCamps = () => {
    
    const userId = localStorage.getItem('user'); // Retrieve user ID from local storage or context
    if (userId) {
      const enrolledCamps = camps.filter(camp => camp.participants.includes(userId));
      setFilteredCamps(enrolledCamps);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-start px-4 h-full mt-8"
      >
        <div className="flex justify-between w-full px-4">
          {/* Heading */}
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Camps near you
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button 
              className="btn bg-transparent text-white flex items-center gap-2 hover:text-black"
              onClick={handleRandomSelect}
            >
              <FaRandom /> Random
            </button>
            <button 
              className="btn text-white bg-transparent hover:text-black"
              onClick={handleMyCamps}
            >
              My Camps
            </button>
            <button 
              className="btn bg-transparent text-white items-center gap-2 hover:text-black"
              onClick={() => navigate('/')}
            >
              <FaHome /> Home
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 mt-5">
          {filteredCamps.map(camp => (
            <div key={camp.id} className="card glass w-72 md:w-80">
              <figure>
                <img
                  src={camp.image}
                  alt={camp.title} 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{camp.name}</h2>
                <p>{camp.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => navigate(`/camp/${camp._id}`)}>Learn now!</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CampPage;
