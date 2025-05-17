
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebarElement = document.getElementById('sidebar');
      if (sidebarElement && !sidebarElement.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const categories = [
    { id: 'sports', name: 'الرياضة', href: '#sports' },
    { id: 'news', name: 'الإخبارية', href: '#news' },
    { id: 'documentary', name: 'الوثائقية', href: '#documentary' },
    { id: 'entertainment', name: 'الترفيه', href: '#entertainment' },
    { id: 'religious', name: 'دينية', href: '#religious' },
    { id: 'vodu', name: 'VODU', href: '#vodu' },
  ];
  
  const sidebarClasses = `fixed inset-y-0 right-0 w-64 bg-white dark:bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`;
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div id="sidebar" className={sidebarClasses}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">القائمة</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-6 text-right">
            {categories.map((category) => (
              <li key={category.id}>
                <a 
                  href={category.href}
                  className="text-xl font-medium hover:text-iqpurple transition-colors duration-200"
                  onClick={onClose}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-end items-center gap-4">
              <span>الوضع الليلي</span>
              <ThemeToggle />
            </div>
            
            <a 
              href="#contact" 
              className="block text-right text-iqpurple mt-4 hover:underline"
              onClick={onClose}
            >
              تواصل معنا
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
