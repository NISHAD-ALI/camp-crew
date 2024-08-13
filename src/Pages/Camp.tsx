import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enrollToCamp, getCampsOne, getParticipants, getProfile, isEnrolled } from '../Api/apis';
import { FaCheck } from 'react-icons/fa';

const Camp = () => {
    const [camps,setCamps] = useState<any>()
    const [organiser,setOrganiser] = useState<any>()
    const [participants,setParticipants] = useState<any>()
    const [enrolled,setEnrolled] = useState(false)
    const { id } = useParams();
    let userId = localStorage.getItem('user')
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getCampsOne(id as string);
            setCamps(response?.data.camps);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [id]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getProfile(camps?.organiser as string);
            console.log(response?.data?.data)
            setOrganiser(response?.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [camps]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getParticipants(id as string);
           
            setParticipants(response?.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [id]);
      useEffect(() => {
        const fetchEnrollmnt = async () => {
          try {
            const response = await isEnrolled(id as string,userId as string);
            setEnrolled(response)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchEnrollmnt();
      }, [enrolled]);
      const handleEnroll = async() =>{
        const response = await enrollToCamp(id as string,userId as string)
        if(response){
            console.log('enrolled successfully')
        }
      }
  return (
    <div className='flex flex-col h-full items-center bg-black dark:bg-black text-white p-8'>
      <h1 className='text-4xl md:text-6xl font-bold mb-8 absolute top-8 text-center'>
      {camps?.name}
      </h1>

      <div className='flex flex-col md:flex-row h-full items-center justify-center w-full mt-24'>
        <div className='md:w-1/2 flex justify-center'>
          <img
            src= {camps?.image} 
            alt="Camp Image"
            className='w-full max-w-sm rounded-lg shadow-lg'
          />
        </div>

        <div className='md:w-1/2 mt-8 md:mt-0 md:ml-8 flex flex-col justify-center'>
          <p className='text-lg md:text-2xl font-light mb-4'>
          {camps?.description}
          </p>
          <p className='text-base md:text-xl font-medium mb-2'>Date: {camps?.date}</p>
        
          <div className='flex items-center mb-4'>
            <img
              src={organiser?.image}
              alt="Organizer Avatar"
              className='w-12 h-12 rounded-full mr-4'
            />
            <p className='text-base md:text-xl font-medium'>Organizer: {organiser?.name}</p>
          </div>

          <div className='flex items-center mb-4'>
            <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13401 2 5 5.13401 5 9C5 13.8656 12 22 12 22C12 22 19 13.8656 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5C14 10.6046 13.1046 11.5 12 11.5Z"></path></svg>
            <p className='text-base md:text-xl font-medium'>Location: {camps?.location}</p>
          </div>

          <div className='mb-4'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>Attendees:</h2>
            <ul className='list-none pl-0 space-y-3'>
              <li className='flex items-center'>
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Attendee 1"
                  className='w-10 h-10 rounded-full mr-3'
                />
                Attendee 1
              </li>
              <li className='flex items-center'>
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Attendee 2"
                  className='w-10 h-10 rounded-full mr-3'
                />
                Attendee 2
              </li>
              <li className='flex items-center'>
                <img
                  src="https://randomuser.me/api/portraits/women/46.jpg"
                  alt="Attendee 3"
                  className='w-10 h-10 rounded-full mr-3'
                />
                Attendee 3
              </li>
              <li className='flex items-center'>
                <img
                  src="https://randomuser.me/api/portraits/men/47.jpg"
                  alt="Attendee 4"
                  className='w-10 h-10 rounded-full mr-3'
                />
                Attendee 4
              </li>
            </ul>
          </div>

         <div className='relative'>
         <button className='btn-shine custom-btn flex items-center' onClick={handleEnroll}>
            {enrolled ? (
                <>
                    <FaCheck className="text-green-500 mr-2" /> You've already Enrolled
                </>
            ) : (
                "Enroll Now"
            )}
        </button>
         </div>
          
        </div>
      </div>
    </div>
  );
}

export default Camp;
