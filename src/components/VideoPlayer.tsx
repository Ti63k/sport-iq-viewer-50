
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VideoPlayerProps {
  m3u8Url: string;
  title: string;
}

export function VideoPlayer({ m3u8Url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [qualities, setQualities] = useState<{ height: number; index: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const { toast } = useToast();
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Initialize the player and HLS
  useEffect(() => {
    let hls: Hls | null = null;
    
    // Reset state on URL change
    setIsLoading(true);
    setHasError(false);
    retryCountRef.current = 0;

    const initPlayer = async () => {
      if (!videoRef.current) return;
      
      // Destroy existing instances if they exist
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      try {
        // Create Plyr instance with custom controls
        const player = new Plyr(videoRef.current, {
          controls: [
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
          ],
          settings: ['quality', 'speed'], 
          ratio: '16:9',
          fullscreen: { enabled: true, iosNative: true },
          hideControls: true,
          autoplay: true,
          storage: { enabled: true, key: 'iqsport-player-settings' }
        });

        playerRef.current = player;
        
        // Setup event listeners for Plyr
        player.on('ready', () => {
          // Player is ready to use
          const container = player.elements.container;
          // Add custom button for quality selection (for manual implementation)
          const qualityButton = document.createElement('button');
          qualityButton.className = 'plyr__control plyr__custom-quality';
          qualityButton.innerHTML = 'HD';
          qualityButton.onclick = () => setShowQualityDialog(true);
          
          const controlBar = container?.querySelector('.plyr__controls');
          if (controlBar) {
            // Add before the fullscreen button
            const fullscreenButton = controlBar.querySelector('[data-plyr="fullscreen"]');
            if (fullscreenButton && fullscreenButton.parentNode) {
              fullscreenButton.parentNode.insertBefore(qualityButton, fullscreenButton);
            }
          }
        });
        
        player.on('playing', () => {
          setIsLoading(false);
        });
        
        player.on('error', () => {
          handlePlaybackError();
        });
        
        // Setup HLS if supported
        if (Hls.isSupported()) {
          hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            fragLoadingRetryDelay: 2000,
            manifestLoadingTimeOut: 10000,
            manifestLoadingMaxRetry: 3,
            debug: false
          });
          
          hls.attachMedia(videoRef.current);
          
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls?.loadSource(m3u8Url);
            
            hls?.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
              // Extract available qualities
              const availableLevels = data.levels;
              if (availableLevels.length > 1) {
                const qualityOptions = availableLevels
                  .map((level, index) => ({
                    height: level.height,
                    index
                  }))
                  .sort((a, b) => b.height - a.height); // Sort from highest to lowest
                
                setQualities(qualityOptions);
                
                // Set to auto by default
                hls?.currentLevel = -1;
                setCurrentQuality(-1);
              }
              
              // Auto play
              videoRef.current?.play().catch((e) => {
                console.log("Auto-play was prevented:", e);
                // Some browsers require user interaction, show play button prominently
              });
            });
            
            hls?.on(Hls.Events.ERROR, (event, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    // Try to recover network error
                    console.log('Network error, trying to recover...');
                    hls?.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log('Media error, trying to recover...');
                    hls?.recoverMediaError();
                    break;
                  default:
                    handlePlaybackError();
                    break;
                }
              }
            });
          });
          
          hlsRef.current = hls;
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          // For Safari where HLS is natively supported
          videoRef.current.src = m3u8Url;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play().catch((e) => {
              console.log("Auto-play was prevented:", e);
            });
          });
        } else {
          // Fallback for browsers that don't support HLS
          toast({
            title: "تنبيه",
            description: "متصفحك لا يدعم البث المباشر بتقنية HLS",
            variant: "destructive",
          });
          setHasError(true);
        }
        
      } catch (error) {
        console.error("Player initialization error:", error);
        handlePlaybackError();
      }
    };
    
    initPlayer();
    
    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [m3u8Url, toast]);
  
  const handlePlaybackError = () => {
    if (retryCountRef.current < maxRetries) {
      // Auto-retry a few times before showing error
      retryCountRef.current += 1;
      console.log(`Auto-retrying (${retryCountRef.current}/${maxRetries})...`);
      
      // Short timeout before retry
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {
            // Silent catch
          });
        }
      }, 1000);
    } else {
      setIsLoading(false);
      setHasError(true);
      
      toast({
        title: "خطأ في التشغيل",
        description: "تعذر تشغيل البث المباشر. يرجى المحاولة مرة أخرى لاحقًا.",
        variant: "destructive",
      });
    }
  };
  
  // Handle retry when there's an error
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    retryCountRef.current = 0;
    
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    // Short timeout to ensure DOM has updated
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        
        // Reinitialize the player
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(m3u8Url);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              videoRef.current?.play().catch(() => {
                // Silent catch
              });
            });
          });
          hlsRef.current = hls;
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = m3u8Url;
          videoRef.current.play().catch(() => {
            // Silent catch
          });
        }
      }
    }, 100);
  };
  
  // Change video quality
  const changeQuality = (index: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = index;
      setCurrentQuality(index);
      setShowQualityDialog(false);
      
      const qualityName = index === -1 
        ? 'تلقائي' 
        : qualities.find(q => q.index === index)?.height + 'p';
        
      toast({
        title: "تم تغيير الجودة",
        description: `تم تعيين الجودة إلى ${qualityName}`,
      });
    }
  };
  
  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-iqpurple mb-4" />
          <p className="text-white text-lg">جاري تحميل البث المباشر...</p>
        </div>
      )}
      
      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
          <div className="text-center text-white w-full px-6 max-w-md">
            <p className="text-lg mb-4">حدث خطأ أثناء تحميل البث المباشر</p>
            <Button 
              onClick={handleRetry}
              variant="default"
              className="bg-iqpurple hover:bg-iqpurple/90 flex items-center gap-2"
            >
              <RefreshCw size={16} /> إعادة المحاولة
            </Button>
          </div>
        </div>
      )}
      
      {/* Video element */}
      <video 
        ref={videoRef}
        className="w-full h-full plyr-iqsport"
        crossOrigin="anonymous"
        playsInline
        controls
        poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=IQ+Sport"
        title={title}
      >
        <source src={m3u8Url} type="application/x-mpegURL" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      
      {/* Quality Selection Dialog */}
      <Dialog open={showQualityDialog} onOpenChange={setShowQualityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>اختيار جودة البث</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Button 
                onClick={() => changeQuality(-1)} 
                variant={currentQuality === -1 ? "default" : "outline"}
                className={currentQuality === -1 ? "bg-iqpurple" : ""}
              >
                تلقائي
              </Button>
              
              {qualities.map((quality) => (
                <Button
                  key={quality.index}
                  onClick={() => changeQuality(quality.index)}
                  variant={currentQuality === quality.index ? "default" : "outline"}
                  className={currentQuality === quality.index ? "bg-iqpurple" : ""}
                >
                  {quality.height}p
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Custom CSS for Plyr */}
      <style jsx global>{`
        /* Custom Plyr Styling for IQ Sport */
        .plyr--full-ui {
          --plyr-color-main: #5B3CC4;
          --plyr-range-thumb-background: #5B3CC4;
          --plyr-range-fill-background: #5B3CC4;
          --plyr-video-control-background-hover: rgba(91, 60, 196, 0.8);
        }
        
        .plyr__controls {
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.8) !important;
        }
        
        .plyr__control--overlaid {
          background: #5B3CC4 !important;
        }
        
        .plyr__menu__container {
          background: #1F1F1F !important;
          border-radius: 0.5rem !important;
        }
        
        .plyr__menu__container .plyr__control {
          color: white !important;
        }
        
        .plyr__menu__container .plyr__control--forward {
          border-color: #333 !important;
        }
        
        .plyr__menu__container .plyr__control--back {
          border-color: #333 !important;
        }
        
        .plyr--video .plyr__controls {
          padding: 12px 10px 10px 10px !important;
        }
        
        .plyr__custom-quality {
          font-weight: bold;
          font-size: 14px;
          color: white;
        }
      `}</style>
      
      {/* Fallback for unsupported browsers */}
      <noscript>
        <p className="absolute inset-0 flex items-center justify-center text-white bg-black">
          يرجى تمكين JavaScript لمشاهدة البث المباشر
        </p>
      </noscript>
    </div>
  );
}
