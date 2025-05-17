
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChannelCard from './ChannelCard';

type Channel = {
  id: string;
  name: string;
  logo: string;
  m3u8Url: string;
  isLive?: boolean;
  category?: string[];
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
  
  const displayChannels = showAll ? channels : (viewType === 'grid' ? channels.slice(0, 10) : channels.slice(0, 10));
  
  return (
    <section id={id} className="category-section mb-3">
      <div className="category-header flex justify-between items-center mb-2">
        <h2 className="section-title text-xl font-bold">{title}</h2>
        <Link to={`/category/${id}`} className="more-link flex items-center text-iqpurple hover:text-iqred transition-colors">
          <span>المزيد</span>
          <ChevronLeft size={16} />
        </Link>
      </div>
      
      {viewType === 'grid' ? (
        <div className="channels-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayChannels.map((channel) => (
            <ChannelCard 
              key={channel.id}
              id={channel.id}
              name={channel.name}
              logo={channel.logo}
              m3u8Url={channel.m3u8Url}
              isLive={channel.isLive}
              category={channel.category || []}
            />
          ))}
        </div>
      ) : (
        <div className="channels-scroll flex overflow-x-auto pb-2 gap-4 snap-x">
          {displayChannels.map((channel) => (
            <div key={channel.id} className="channel-scroll-item flex-shrink-0 w-40 snap-start">
              <ChannelCard 
                id={channel.id}
                name={channel.name}
                logo={channel.logo}
                m3u8Url={channel.m3u8Url}
                isLive={channel.isLive}
                category={channel.category || []}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
