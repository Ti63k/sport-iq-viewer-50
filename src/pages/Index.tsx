
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';
import { getAllChannels, getChannelsByCategory } from '@/data/mockChannels';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const allChannels = getAllChannels();
  const sportsChannels = getChannelsByCategory('sports');
  const newsChannels = getChannelsByCategory('news');
  const documentaryChannels = getChannelsByCategory('documentary');
  const entertainmentChannels = getChannelsByCategory('entertainment');
  const religiousChannels = getChannelsByCategory('religious');
  const voduChannels = getChannelsByCategory('vodu');
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    const results = allChannels.filter(channel => 
      channel.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-2"> {/* Changed from py-4 to py-2 */}
        <div className="mb-3"> {/* Changed from mb-4 to mb-3 */}
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isSearching ? (
          <div className="mt-2"> {/* Changed from mt-4 to mt-2 */}
            <h2 className="section-title mb-3">نتائج البحث</h2> {/* Changed from mb-4 to mb-3 */}
            {searchResults.length > 0 ? (
              <div className="channels-grid">
                {searchResults.map((channel) => (
                  <div key={channel.id} className="channel-card">
                    {/* Channel card content */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">لم يتم العثور على نتائج</p>
            )}
          </div>
        ) : (
          <>
            <CategorySection 
              id="all-channels"
              title="جميع القنوات"
              channels={allChannels}
              viewType="scroll"
              showAll={true}
            />
            
            <CategorySection 
              id="sports"
              title="الرياضة"
              channels={sportsChannels}
              viewType="scroll"
              showAll={true}
            />
            
            <CategorySection 
              id="news"
              title="الإخبارية"
              channels={newsChannels}
              viewType="scroll"
              showAll={true}
            />
            
            <CategorySection 
              id="documentary"
              title="الوثائقية"
              channels={documentaryChannels}
              viewType="scroll"
            />
            
            <CategorySection 
              id="entertainment"
              title="الترفيه"
              channels={entertainmentChannels}
              viewType="scroll"
            />
            
            <CategorySection 
              id="religious"
              title="دينية"
              channels={religiousChannels}
              viewType="scroll"
            />
            
            <CategorySection 
              id="vodu"
              title="VODU"
              channels={voduChannels}
              viewType="scroll"
              showAll={true}
            />
          </>
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

export default Index;
