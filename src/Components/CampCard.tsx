import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CampCardProps {
  camp: any;
}

const CampCard: React.FC<CampCardProps> = ({ camp }) => {
  const navigate = useNavigate();

  return (
    <div className="card glass w-72 md:w-80">
      <figure>
        <img src={camp.image} alt={camp.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{camp.name}</h2>
        <p>{camp.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/camp/${camp._id}`)}
          >
            Learn more!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
