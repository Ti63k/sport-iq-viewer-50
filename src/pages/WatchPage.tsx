
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChannelCard from '@/components/ChannelCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import { getChannelById, getChannelsByCategory } from '@/data/mockChannels';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const [channel, setChannel] = useState<any>(null);
  const [relatedChannels, setRelatedChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Get channel info either from location state or by ID
  useEffect(() => {
    setIsLoading(true);
    
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast({
          title: "خطأ",
          description: "القناة غير موجودة",
          variant: "destructive",
        });
      }
    } else if (location.state?.channelName && location.state?.m3u8Url) {
      setChannel({
        id: 'custom',
        name: location.state.channelName,
        logo: '',
        m3u8Url: location.state.m3u8Url,
        isLive: true,
        useBrowserPlayer: location.state.useBrowserPlayer,
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [channelId, location.state, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-[300px] w-full max-w-3xl bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
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
        
        {channel.useBrowserPlayer ? (
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe 
              src={channel.m3u8Url}
              title={channel.name}
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          <VideoPlayer 
            m3u8Url={channel.m3u8Url} 
            title={channel.name}
          />
        )}
        
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
      
      <footer className="bg-white dark:bg-background border-t py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">IQ SPORT © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default WatchPage;
