
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChannelCard from '@/components/ChannelCard';
import { getChannelsByCategory } from '@/data/mockChannels';
import { ChevronLeft } from 'lucide-react';

const CategoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>();
  const [channels, setChannels] = useState<any[]>([]);
  
  useEffect(() => {
    if (categoryId) {
      const categoryChannels = getChannelsByCategory(categoryId);
      setChannels(categoryChannels);
    }
  }, [categoryId]);
  
  // Map category IDs to Arabic titles
  const categoryTitles: Record<string, string> = {
    'sports': 'الرياضة',
    'news': 'الإخبارية',
    'documentary': 'الوثائقية',
    'entertainment': 'الترفيه',
    'religious': 'دينية',
    'vodu': 'VODU',
  };
  
  const categoryTitle = categoryId ? categoryTitles[categoryId] || categoryId : '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-iqpurple hover:text-iqred mr-2">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        </div>
        
        {channels.length > 0 ? (
          <div className="channels-grid">
            {channels.map((channel) => (
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
          <p className="text-center text-gray-500 dark:text-gray-400">
            لا توجد قنوات في هذا التصنيف
          </p>
        )}
      </main>
      
      <footer className="bg-white dark:bg-background border-t py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">IQ SPORT © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
