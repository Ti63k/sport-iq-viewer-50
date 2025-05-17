
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChannelCard from './ChannelCard';

type Channel = {
  id: string;
  name: string;
  logo: string;
  m3u8Url: string;
  isLive?: boolean;
};

type CategorySectionProps = {
  id: string;
  title: string;
  channels: Channel[];
  viewType?: 'grid' | 'scroll';
  showAll?: boolean;
};

const CategorySection = ({ 
  id, 
  title, 
  channels,
  viewType = 'scroll',
  showAll = false
}: CategorySectionProps) => {
  if (channels.length === 0) return null;
  
  const displayChannels = showAll ? channels : (viewType === 'grid' ? channels.slice(0, 10) : channels);
  
  return (
    <section id={id} className="category-section">
      <div className="category-header">
        <h2 className="section-title">{title}</h2>
        <Link to={`/category/${id}`} className="more-link">
          <span>المزيد</span>
          <ChevronLeft size={16} />
        </Link>
      </div>
      
      {viewType === 'grid' ? (
        <div className="channels-grid">
          {displayChannels.map((channel) => (
            <ChannelCard 
              key={channel.id}
              id={channel.id}
              name={channel.name}
              logo={channel.logo}
              m3u8Url={channel.m3u8Url}
              isLive={channel.isLive}
            />
          ))}
        </div>
      ) : (
        <div className="channels-scroll">
          {displayChannels.map((channel) => (
            <div key={channel.id} className="channel-scroll-item">
              <ChannelCard 
                id={channel.id}
                name={channel.name}
                logo={channel.logo}
                m3u8Url={channel.m3u8Url}
                isLive={channel.isLive}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
