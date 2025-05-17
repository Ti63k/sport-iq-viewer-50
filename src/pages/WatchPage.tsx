
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChannelCard from '@/components/ChannelCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import { getChannelById, getChannelsByCategory } from '@/data/mockChannels';
import { ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const [channel, setChannel] = useState<any>(null);
  const [relatedChannels, setRelatedChannels] = useState<any[]>([]);
  
  // Get channel info either from location state or by ID
  useEffect(() => {
    if (channelId) {
      const channelData = getChannelById(channelId);
      
      if (channelData) {
        setChannel(channelData);
        
        // Get related channels from the same category
        if (channelData.category.length > 0) {
          const category = channelData.category[0];
          const related = getChannelsByCategory(category)
            .filter(c => c.id !== channelId)
            .slice(0, 6);
          
          setRelatedChannels(related);
        }
      }
    } else if (location.state?.channelName && location.state?.m3u8Url) {
      setChannel({
        id: 'custom',
        name: location.state.channelName,
        logo: '',
        m3u8Url: location.state.m3u8Url,
        isLive: true,
      });
    }
  }, [channelId, location.state]);
  
  if (!channel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">القناة غير موجودة</h1>
            <Link to="/" className="text-iqpurple hover:text-iqred">
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-iqpurple hover:text-iqred mr-2">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">{channel.name}</h1>
        </div>
        
        {/* Using our VideoPlayer component */}
        <VideoPlayer 
          m3u8Url={channel.m3u8Url} 
          title={channel.name}
        />
        
        <div className="mb-6 mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            قناة رياضية متخصصة في بث الأحداث الرياضية المباشرة
          </p>
        </div>
        
        {relatedChannels.length > 0 && (
          <div className="mt-10">
            <h2 className="section-title mb-6">قنوات مشابهة</h2>
            <div className="channels-grid">
              {relatedChannels.map((relatedChannel) => (
                <ChannelCard
                  key={relatedChannel.id}
                  id={relatedChannel.id}
                  name={relatedChannel.name}
                  logo={relatedChannel.logo}
                  m3u8Url={relatedChannel.m3u8Url}
                  isLive={relatedChannel.isLive}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <BackToTop />
      <Footer />
    </div>
  );
};

export default WatchPage;
