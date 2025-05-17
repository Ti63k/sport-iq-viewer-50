
import { Menu, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useToast } from '@/hooks/use-toast';

type HeaderProps = {
  onOpenSidebar: () => void;
};

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { toast } = useToast();
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IQ SPORT',
          text: 'Check out this sports streaming platform!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste and share the link",
      });
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-background border-b py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onOpenSidebar}
            className="md:hidden"
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-1">
            <span className="logo-colored">
              <span className="iq">IQ</span>
              <span className="sport">SPORT</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleShare}
            className="text-foreground"
          >
            <Share2 size={20} />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
