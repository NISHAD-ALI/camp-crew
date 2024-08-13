import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createCamp } from '../Api/apis';

interface CreateCampModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid:string
}

const CreateCampModal: React.FC<CreateCampModalProps> = ({ isOpen, onClose,uid }) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) {
      console.error('Photo is required');
      return;
    }

    const formData = new FormData();
    formData.append('image', photo);
    formData.append('location', location);
    formData.append('details', details);
    formData.append('name', name);
    formData.append('date', date);
    formData.append('userId', uid);
    try {
      const response = await createCamp(formData);
      if (response) {
        console.log('Camp created successfully');
        onClose();
      } else {
        console.error('Failed to create camp');
      }
    } catch (error) {
      console.error('Error creating camp:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create a Camp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Photo</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name of Camp</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter camp details"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampModal;
