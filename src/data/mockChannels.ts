
// Mock data for channels
export type Channel = {
  id: string;
  name: string;
  logo: string;
  m3u8Url: string;
  isLive: boolean;
  category: string[];
};

export const channels: Channel[] = [
  // Sports Channels
  {
    id: 'dubai-racing-2',
    name: 'دبي ريسنج 2',
    logo: 'https://via.placeholder.com/150/0077cc/FFFFFF?text=DubaiRacing',
    m3u8Url: 'https://example.com/stream/dubai-racing-2.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-racing-3',
    name: 'دبي ريسنج 3',
    logo: 'https://via.placeholder.com/150/0077cc/FFFFFF?text=DubaiRacing',
    m3u8Url: 'https://example.com/stream/dubai-racing-3.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'sharjah-sports',
    name: 'الشارقة الرياضية',
    logo: 'https://via.placeholder.com/150/cc0000/FFFFFF?text=Sharjah',
    m3u8Url: 'https://example.com/stream/sharjah-sports.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'ssc-1',
    name: 'SSC 1',
    logo: 'https://via.placeholder.com/150/000044/FFFFFF?text=SSC1',
    m3u8Url: 'https://example.com/stream/ssc-1.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-sports-1',
    name: 'دبي الرياضية 1',
    logo: 'https://via.placeholder.com/150/cc0000/FFFFFF?text=DubaiSports',
    m3u8Url: 'https://example.com/stream/dubai-sports-1.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-sports-2',
    name: 'دبي الرياضية 2',
    logo: 'https://via.placeholder.com/150/cc0000/FFFFFF?text=DubaiSports',
    m3u8Url: 'https://example.com/stream/dubai-sports-2.m3u8',
    isLive: true,
    category: ['sports'],
  },
  
  // Documentary Channels
  {
    id: 'national-geo',
    name: 'ناشيونال جيوغرافيك أبو ظبي',
    logo: 'https://via.placeholder.com/150/ffcc00/000000?text=NatGeo',
    m3u8Url: 'https://example.com/stream/national-geo.m3u8',
    isLive: true,
    category: ['documentary'],
  },
  {
    id: 'al-thaqafiya',
    name: 'الثقافية',
    logo: 'https://via.placeholder.com/150/88cc00/FFFFFF?text=Culture',
    m3u8Url: 'https://example.com/stream/al-thaqafiya.m3u8',
    isLive: true,
    category: ['documentary'],
  },
  {
    id: 'oman-cultural',
    name: 'عمان الثقافية',
    logo: 'https://via.placeholder.com/150/88cc00/FFFFFF?text=Oman',
    m3u8Url: 'https://example.com/stream/oman-cultural.m3u8',
    isLive: true,
    category: ['documentary'],
  },
  
  // Entertainment Channels
  {
    id: 'roya-comedy',
    name: 'Roya Comedy',
    logo: 'https://via.placeholder.com/150/ff6600/FFFFFF?text=RC',
    m3u8Url: 'https://example.com/stream/roya-comedy.m3u8',
    isLive: true,
    category: ['entertainment'],
  },
  {
    id: 'roya-drama',
    name: 'Roya Drama',
    logo: 'https://via.placeholder.com/150/6600cc/FFFFFF?text=RD',
    m3u8Url: 'https://example.com/stream/roya-drama.m3u8',
    isLive: true,
    category: ['entertainment'],
  },
  {
    id: 'roya-news',
    name: 'Roya News',
    logo: 'https://via.placeholder.com/150/0066cc/FFFFFF?text=RN',
    m3u8Url: 'https://example.com/stream/roya-news.m3u8',
    isLive: true,
    category: ['entertainment'],
  },
  
  // Religious Channels
  {
    id: 'quran-karim-1',
    name: 'القرآن الكريم',
    logo: 'https://via.placeholder.com/150/006600/FFFFFF?text=Quran',
    m3u8Url: 'https://example.com/stream/quran-karim.m3u8',
    isLive: true,
    category: ['religious'],
  },
  {
    id: 'sunnah-nabawiyah',
    name: 'السنة النبوية',
    logo: 'https://via.placeholder.com/150/006600/FFFFFF?text=Sunnah',
    m3u8Url: 'https://example.com/stream/sunnah-nabawiyah.m3u8',
    isLive: true,
    category: ['religious'],
  },
  
  // VODU Channels
  {
    id: 'mbc-1',
    name: 'MBC1',
    logo: 'https://via.placeholder.com/150/222222/FFFFFF?text=M',
    m3u8Url: 'https://example.com/stream/mbc-1.m3u8',
    isLive: true,
    category: ['vodu'],
  },
  {
    id: 'mbc-masr',
    name: 'MBC Masr',
    logo: 'https://via.placeholder.com/150/222222/FFFFFF?text=MM',
    m3u8Url: 'https://example.com/stream/mbc-masr.m3u8',
    isLive: true,
    category: ['vodu'],
  },
  {
    id: 'mbc-shahid',
    name: 'MBC Shahid',
    logo: 'https://via.placeholder.com/150/222222/FFFFFF?text=MS',
    m3u8Url: 'https://example.com/stream/mbc-shahid.m3u8',
    isLive: true,
    category: ['vodu'],
  },
];

// Helper function to get channels by category
export const getChannelsByCategory = (categoryId: string): Channel[] => {
  return channels.filter(channel => 
    channel.category.includes(categoryId)
  );
};

// Helper function to get all channels
export const getAllChannels = (): Channel[] => {
  return channels;
};

// Helper function to get a channel by ID
export const getChannelById = (id: string): Channel | undefined => {
  return channels.find(channel => channel.id === id);
};

// Helper function to search channels
export const searchChannels = (query: string): Channel[] => {
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  return channels.filter(channel => 
    channel.name.toLowerCase().includes(lowerCaseQuery)
  );
};
