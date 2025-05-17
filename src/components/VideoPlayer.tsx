
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface VideoPlayerProps {
  m3u8Url: string;
  title: string;
}

export function VideoPlayer({ m3u8Url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state on URL change
    setIsLoading(true);
    setLoadingProgress(0);
    setHasError(false);
    
    return () => {
      // Clean up all timers when component unmounts or URL changes
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [m3u8Url]);

  // Simulate loading progress and set timeout for stuck loading
  useEffect(() => {
    if (!isLoading) return;

    // Start loading progress animation
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += Math.random() * 3 + 1; // More randomized progress to appear more natural
      progress = Math.min(progress, 90); // Cap at 90% until actually loaded
      setLoadingProgress(progress);
    }, 200);

    // Set a timeout to prevent infinite loading
    loadingTimeoutRef.current = setTimeout(() => {
      if (videoRef.current?.readyState >= 3) {
        videoRef.current.play()
          .then(() => {
            setLoadingProgress(100);
            setIsLoading(false);
          })
          .catch(() => {
            // Silent catch, don't show error here
          });
      } else {
        // If taking too long, try to play anyway
        videoRef.current?.play().catch(() => {});
        // But also set loading to false after maximum wait time
        setLoadingProgress(100);
        setIsLoading(false);
      }
    }, 6000); // Reduced from 8s to 6s for better UX

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, [isLoading]);

  // Set up video event listeners with more efficient handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setIsLoading(false);
      setLoadingProgress(0);
      setHasError(true);
      
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      
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
      // Only set loading to true if we were previously playing
      if (!isLoading) {
        setIsLoading(true);
        setLoadingProgress(30); // Start at a higher value since we already loaded once
      }
    };
    
    const handleCanPlay = () => {
      setLoadingProgress(95);
      // Quick timeout to ensure smooth transition
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = setTimeout(() => {
        if (videoRef.current?.paused) {
          videoRef.current.play()
            .then(() => {
              setLoadingProgress(100);
              setIsLoading(false);
            })
            .catch(e => console.log("Auto-play was prevented:", e));
        } else {
          setLoadingProgress(100);
          setIsLoading(false);
        }
      }, 200); // Reduced from 300ms to 200ms for faster response
    };
    
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        if (duration && isFinite(duration) && !isNaN(duration)) {
          const loadedPercentage = (bufferedEnd / duration) * 100;
          setLoadingProgress(Math.min(loadedPercentage, 100));
        } else {
          // For live streams
          if (bufferedEnd > 3) { // If we have at least 3 seconds buffered
            setLoadingProgress(100);
            setIsLoading(false);
          }
        }
      }
    };
    
    // Add event listeners
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlay); // Added for more robust detection
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);
    
    // More aggressive auto-play strategy
    if (video.paused) {
      video.play().catch(() => {
        console.log("Auto-play on mount was prevented, will try again on user interaction");
      });
    }
    
    return () => {
      // Clean up event listeners
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
    };
  }, [isLoading, toast]);

  // Handle retry when there's an error
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Short timeout to ensure DOM has updated
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {
          // Silent catch
        });
      }
    }, 100);
  };

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
      {/* Loading overlay with improved progress bar */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
          <div className="text-center text-white w-full px-6 max-w-md">
            <Loader2 className="h-12 w-12 mx-auto animate-spin mb-4" />
            <p className="text-lg mb-4">جاري تحميل البث المباشر...</p>
            {/* Updated progress bar component */}
            <Progress 
              value={loadingProgress} 
              className="h-2 mb-1"
            />
            <p className="text-xs text-gray-400 text-left rtl:text-right">{Math.round(loadingProgress)}%</p>
          </div>
        </div>
      )}
      
      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
          <div className="text-center text-white w-full px-6 max-w-md">
            <p className="text-lg mb-4">حدث خطأ أثناء تحميل البث المباشر</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-iqpurple hover:bg-iqpurple/90 rounded-md text-white transition-colors"
            >
              إعادة المحاولة
            </button>
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
        title={title}
      >
        <source src={m3u8Url} type="application/x-mpegURL" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      
      {/* Fallback for unsupported browsers */}
      <noscript>
        <p className="absolute inset-0 flex items-center justify-center text-white bg-black">
          يرجى تمكين JavaScript لمشاهدة البث المباشر
        </p>
      </noscript>
    </div>
  );
}
