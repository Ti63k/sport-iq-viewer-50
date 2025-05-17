
import { useEffect, useState } from 'react';
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
    <div className="channel-card" onClick={handleClick}>
      <div className="p-2">
        {isLive && <span className="live-badge">مباشر</span>}
        <div className="bg-iqlightgray dark:bg-background/20 rounded-lg overflow-hidden">
          {!imageError ? (
            <img 
              src={logo} 
              alt={name} 
              className="channel-logo" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-gray-200 dark:bg-gray-800">
              <span className="text-lg font-bold">{name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">m3u8</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
