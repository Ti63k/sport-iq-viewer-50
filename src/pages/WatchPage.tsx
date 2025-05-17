
import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChannelCard from '@/components/ChannelCard';
import { getChannelById, getChannelsByCategory } from '@/data/mockChannels';
import { ChevronLeft, Play, Pause, Volume, VolumeOff, Maximize, Minimize } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Hls from 'hls.js';

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [channel, setChannel] = useState<any>(null);
  const [relatedChannels, setRelatedChannels] = useState<any[]>([]);
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  
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
  
  // Setup HLS player when channel changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel?.m3u8Url) return;

    // Clean up any existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Initialize HLS if supported
    if (Hls.isSupported()) {
      console.log('HLS is supported, initializing player for URL:', channel.m3u8Url);
      const hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        startLevel: -1, // Auto level selection
        debug: false
      });
      
      hlsRef.current = hls;
      hls.loadSource(channel.m3u8Url);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed, starting playback');
        video.play()
          .then(() => {
            setIsPlaying(true);
            console.log('Playback started successfully');
          })
          .catch(error => {
            console.error('Error starting playback:', error);
            toast({
              title: "خطأ في التشغيل",
              description: "يرجى النقر على زر التشغيل للبدء.",
              variant: "destructive",
            });
          });
      });
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Fatal network error, trying to recover');
              hls.startLoad(); // Try to recover on network error
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Fatal media error, trying to recover');
              hls.recoverMediaError(); // Try to recover on media error
              break;
            default:
              // Cannot recover
              console.error('Fatal error, cannot recover', data);
              toast({
                title: "خطأ في التشغيل",
                description: "تعذر تشغيل البث المباشر. يرجى المحاولة مرة أخرى لاحقًا.",
                variant: "destructive",
              });
              break;
          }
        }
      });
      
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari and iOS devices which have native HLS support
      console.log('Using native HLS support for URL:', channel.m3u8Url);
      video.src = channel.m3u8Url;
      video.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Playback started successfully with native support');
        })
        .catch(error => {
          console.error('Error starting playback with native support:', error);
          toast({
            title: "خطأ في التشغيل",
            description: "يرجى النقر على زر التشغيل للبدء.",
            variant: "destructive",
          });
        });
    }

    return () => {
      // Clean up HLS instance on unmount
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel, toast]);
  
  // Video control handlers
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing video:', error);
          toast({
            title: "خطأ في التشغيل",
            description: "تعذر تشغيل البث المباشر. يرجى المحاولة مرة أخرى لاحقًا.",
            variant: "destructive",
          });
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  
  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Failed to enter fullscreen mode:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Failed to exit fullscreen mode:', err);
      });
    }
  };
  
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
        
        <div ref={videoContainerRef} className="aspect-video bg-black rounded-xl overflow-hidden mb-6 relative">
          <video 
            ref={videoRef}
            className="w-full h-full"
            playsInline
            poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Loading..."
          />
          
          {/* Custom video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-iqpurple transition"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-iqpurple transition"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeOff size={24} /> : <Volume size={24} />}
              </button>
            </div>
            
            <div>
              <button 
                onClick={toggleFullscreen} 
                className="text-white hover:text-iqpurple transition"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
            </div>
          </div>
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
