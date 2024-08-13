import React, { useEffect, useState } from 'react';
import { editProfile, getMyCamps, getProfile } from '../Api/apis';
import { useParams } from 'react-router-dom';
import CreateCampModal from '../Components/CreateCampModal';
import CampCard from '../Components/CampCard';

const ProfilePage: React.FC = () => {
  const [isCreateCampModalOpen, setIsCreateCampModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | File>('');
  const [data, setData] = useState<any>(null);
  const [myCamps, setMyCamps] = useState<any[]>([]);
  const { id } = useParams();

  const openCreateCampModal = () => setIsCreateCampModalOpen(true);
  const closeCreateCampModal = () => setIsCreateCampModalOpen(false);
  const openEditProfileModal = () => setIsEditProfileModalOpen(true);
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await getProfile(id as string);
        const profileData = profileResponse?.data.data;
        setData(profileData);
        setName(profileData.name);
        setPhone(profileData.phone);
        setProfileImage(profileData.image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchMyCamps = async () => {
      try {
        const response = await getMyCamps(id as string);
        console.log('MYCAMPS', response);
        setMyCamps(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMyCamps();
  }, [id]);

  const handleEditProfileSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id as string);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('image', e.target?.image?.files[0]); 


      const response = await editProfile(formData);
      if (response) {
        console.log('Profile updated successfully:', response);
        closeEditProfileModal();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-32 mb-8">
        {data?.name}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mb-10 space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex justify-center">
          <img
            src={typeof profileImage === 'string' ? profileImage : data?.image}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col items-center text-center md:text-left">
          <p className="text-lg md:text-xl font-medium mb-4">Name: {data?.name}</p>
          <p className="text-lg md:text-xl font-medium mb-4">Email: {data?.email}</p>
          <p className="text-lg md:text-xl font-medium mb-4">Phone: {data?.phone}</p>

          <div className="flex space-x-4">
            <button
              onClick={openCreateCampModal}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 px-4 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300"
            >
              Create a Camp
            </button>
            <button
              onClick={openEditProfileModal}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 px-4 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mt-10 mb-14">My Camps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myCamps.map((camp: any) => (
            <CampCard key={camp._id} camp={camp} />
          ))}
        </div>
      </div>
      <CreateCampModal isOpen={isCreateCampModalOpen} onClose={closeCreateCampModal} uid={id as string} />

      {isEditProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEditProfileSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeEditProfileModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
