
import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChannelCard from '@/components/ChannelCard';
import { getChannelById, getChannelsByCategory } from '@/data/mockChannels';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [channel, setChannel] = useState<any>(null);
  const [relatedChannels, setRelatedChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Simulate progress loading when starting to load the stream
  useEffect(() => {
    if (isLoading && channel) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        if (progress > 90) {
          clearInterval(interval);
        }
        setLoadingProgress(progress);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, channel]);
  
  // Handle video events with more efficient event handling
  useEffect(() => {
    const video = videoRef.current;
    
    const handleError = () => {
      setIsLoading(false);
      setLoadingProgress(0);
      
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      toast({
        title: "خطأ في التشغيل",
        description: "تعذر تشغيل البث المباشر. يرجى المحاولة مرة أخرى لاحقًا.",
        variant: "destructive",
      });
    };
    
    const handlePlay = () => {
      setLoadingProgress(100);
      // Use setTimeout to create a smoother transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    
    const handleWaiting = () => {
      setIsLoading(true);
    };
    
    const handleCanPlay = () => {
      setLoadingProgress(95);
      // Give a little bit of time for buffering, shorter than before
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      loadingTimeoutRef.current = setTimeout(() => {
        if (videoRef.current?.paused) {
          videoRef.current.play()
            .catch(e => console.log("Auto-play was prevented:", e));
        }
        setLoadingProgress(100);
        setIsLoading(false);
      }, 300);
    };
    
    const handleProgress = () => {
      if (video && video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        // Only for non-live streams with a finite duration
        if (duration && duration !== Infinity && !isNaN(duration)) {
          const loadedPercentage = (bufferedEnd / duration) * 100;
          setLoadingProgress(Math.min(loadedPercentage, 100));
        } else {
          // For live streams or when duration is not available
          if (bufferedEnd > 0) {
            setLoadingProgress(100);
            setIsLoading(false);
          }
        }
      }
    };
    
    if (video) {
      video.addEventListener('error', handleError);
      video.addEventListener('play', handlePlay);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('progress', handleProgress);
      
      // Set a timeout to clear loading state if stuck for too long
      loadingTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          // Try to play anyway after a timeout
          if (video.readyState >= 3) {
            video.play()
              .then(() => setIsLoading(false))
              .catch(() => {}); // Silent catch
          } else {
            setIsLoading(false);
          }
        }
      }, 8000); // Reduced from 10s to 8s
      
      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('progress', handleProgress);
        
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      };
    }
  }, [toast, isLoading]);
  
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
        
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 relative">
          {/* Loading overlay with progress bar */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
              <div className="text-center text-white w-full px-6 max-w-md">
                <Loader2 className="h-12 w-12 mx-auto animate-spin mb-2" />
                <p className="text-sm mb-2">جاري تحميل البث المباشر...</p>
                {/* Progress bar */}
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-iqpurple h-full transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Video player with optimized attributes */}
          <video 
            ref={videoRef}
            className="w-full h-full"
            controls
            autoPlay
            playsInline
            preload="auto"
            poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Loading..."
          >
            <source src={channel.m3u8Url} type="application/x-mpegURL" />
            Your browser does not support video playback.
          </video>
        </div>
        
        <div className="mb-6">
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
