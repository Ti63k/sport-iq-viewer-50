
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ChannelCardProps = {
  id: string;
  name: string;
  logo: string;
  m3u8Url: string;
  isLive?: boolean;
};

const ChannelCard = ({ id, name, logo, m3u8Url, isLive = true }: ChannelCardProps) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/watch/${id}`, { state: { channelName: name, m3u8Url } });
  };
  
  return (
    <div className="channel-card cursor-pointer transform transition-transform hover:scale-105" onClick={handleClick}>
      <div className="p-2 relative">
        {isLive && (
          <span className="live-badge absolute top-3 right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full z-10">
            مباشر
          </span>
        )}
        <div className="bg-iqlightgray dark:bg-background/20 rounded-lg overflow-hidden shadow-md">
          {!imageError ? (
            <div className="h-24 flex items-center justify-center p-2">
              <img 
                src={logo} 
                alt={name} 
                className="channel-logo max-h-full max-w-full object-contain" 
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-2">
              <span className="text-lg font-bold">{name.substring(0, 2)}</span>
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
          <h3 className="font-bold text-sm truncate" title={name}>{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">m3u8</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
