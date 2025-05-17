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
    id: 'ssc-1',
    name: 'SSC 1',
    logo: 'https://i.imgur.com/dM7GQXG.png',
    m3u8Url: 'https://af.ayassport.ir/hls2/ssc1.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'sharjah-sports',
    name: 'الشارقة الرياضية',
    logo: 'https://sbauae.faulio.com/storage/mediagallery/f5/3e/small_d83f05132cd8c44b47acc7062711d27c20a5ddc4.png',
    m3u8Url: 'https://svs.itworkscdn.net/smc4sportslive/smc4.smil/playlist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-racing-2',
    name: 'دبي رايسينغ 2',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/71/5fa3d7d101.jpg',
    m3u8Url: 'https://dmithrvllta.cdn.mgmlcdn.com/dubairacing/smil:dubairacing.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-racing-3',
    name: 'دبي رايسينغ 3',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/71/5fa3d7d101.jpg',
    m3u8Url: 'https://dmithrvllta.cdn.mgmlcdn.com/dubaimubasher/smil:dubaimubasher.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-sports-1',
    name: 'دبي الرياضية 1',
    logo: 'https://www.dmi.gov.ae/content/dam/corporate/icons/DubaiSports-Logo-DMI.png',
    m3u8Url: 'https://dmidspta.cdn.mgmlcdn.com/dubaisports/smil:dubaisports.stream.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-sports-2',
    name: 'دبي الرياضية 2',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/71/616cb1ed64.png',
    m3u8Url: 'https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd/smil:dubaisportshd.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'dubai-sports-3',
    name: 'دبي الرياضية 3',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/71/616cb297c7.png',
    m3u8Url: 'https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd5/smil:dubaisportshd5.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'yas',
    name: 'ياس',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/164/5e4c03ef4b.png',
    m3u8Url: 'https://vo-live-media.cdb.cdn.orange.com/Content/Channel/YASSportsChannel/HLS/index.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'abu-dhabi-sports-2',
    name: 'أبو ظبي الرياضية 2',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/164/5e3ad6b210.png',
    m3u8Url: 'https://vo-live-media.cdb.cdn.orange.com/Content/Channel/AbuDhabiSportsChannel2/HLS/index.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'abu-dhabi-sports-1',
    name: 'أبو ظبي الرياضية 1',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/164/5e3ad6a88b.png',
    m3u8Url: 'https://vo-live-media.cdb.cdn.orange.com/Content/Channel/AbuDhabiSportsChannel1/HLS/index.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'bahrain-sports-2',
    name: 'البحرين الرياضية 2',
    logo: 'https://s3.eu-west-1.amazonaws.com//bahrainlive/Channel/63685424000079685751979f5d-e86c-4a27-a41e-935f13852840.png',
    m3u8Url: 'https://5c7b683162943.streamlock.net/live/ngrp:bahrainsportstwo_all/playlist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'bahrain-sports-1',
    name: 'البحرين الرياضية 1',
    logo: 'https://s3.eu-west-1.amazonaws.com//bahrainlive/Channel/6368542425885481476ef9db5b-f4c3-4844-be16-8129266e3a8e.png',
    m3u8Url: 'https://5c7b683162943.streamlock.net/live/ngrp:sportsone_all/playlist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'kuwait-sport-1',
    name: 'Kuwait Sport 1',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/195/669d095fe8.png',
    m3u8Url: 'https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'kuwait-sport-2',
    name: 'Kuwait Sport 2',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/195/669d08c859.png',
    m3u8Url: 'https://kwtsplta.cdn.mangomolo.com/spl/smil:spl.stream.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },
  {
    id: 'oman-sports',
    name: 'عُمان الرياضية',
    logo: 'https://raw.githubusercontent.com/fraudiay79/logos/master/om/omansports.png',
    m3u8Url: 'https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8',
    isLive: true,
    category: ['sports'],
  },

  // News Channels
  {
    id: 'al24news',
    name: 'AL24NEWS قناة الجزائر الدّولية',
    logo: 'https://raw.githubusercontent.com/hemzaberkane/AlgeriaPicons/main/al24.png',
    m3u8Url: 'https://cdn.live.easybroadcast.io/abr_corp/66_al24_u4yga6h/corp/66_al24_u4yga6h_1080p/chunks.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'al-ekhbaria',
    name: 'الإخبارية',
    logo: 'https://aloula.faulio.com/storage/mediagallery/11/78/small_3b55efbef523c3a6d6e45d8c5a2d28b86bdf4117.png',
    m3u8Url: 'https://al-ekhbaria-prod-dub.shahid.net/out/v1/d443f3203b444032896e3233cb6eaa84/index.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'aliraqiya-news',
    name: 'العراقية الإخبارية',
    logo: 'https://imn.iq/wp-content/uploads/2022/04/1-9.jpg',
    m3u8Url: 'https://cdn.catiacast.video/abr/78054972db7708422595bc96c6e024ac/playlist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'kuwait-news',
    name: 'الكويت أخبار',
    logo: 'https://admango.cdn.mangomolo.com/analytics/uploads/195/669d088c70.png',
    m3u8Url: 'https://kwtsplta.cdn.mangomolo.com/kb/smil:kb.stream.smil/chunklist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'i-news',
    name: 'i news',
    logo: 'http://www.i-news.tv/wp-content/uploads/2020/11/new-white-logo-1.png',
    m3u8Url: 'https://live.i-news.tv/hls/2/stream.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'alsharqiya-news',
    name: 'الشرقية الإخبارية',
    logo: 'https://www.alsharqiya.com/Content/web-assets/img/logo.png',
    m3u8Url: 'https://5d94523502c2d.streamlock.net/alsharqiyalive/mystream/chunklist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'aljazeera',
    name: 'الجزيرة الإخبارية',
    logo: 'https://i.ibb.co/884RcMF/aljazera.png',
    m3u8Url: 'https://live-hls-web-aja.getaj.net/AJA/index.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'alqahera-news',
    name: 'القاهرة الإخبارية',
    logo: 'https://alqaheranews.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6a2665e0.png&w=1200&q=75',
    m3u8Url: 'https://bcovlive-a.akamaihd.net/d30cbb3350af4cb7a6e05b9eb1bfd850/eu-west-1/6057955906001/profile_0/chunklist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'fox-news',
    name: 'FOX NEWS NOW',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/LiveNOW_from_FOX.png',
    m3u8Url: 'https://fox-foxnewsnow-samsungus.amagi.tv/playlist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'abc-news',
    name: 'ABC NEWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABC_News_logo_2021.svg/2560px-ABC_News_logo_2021.svg.png',
    m3u8Url: 'https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'bbc-news',
    name: 'BBC NEWS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png',
    m3u8Url: 'https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news_channel_hd/t=3840/v=pv14/b=5070016/main.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'alarabiya',
    name: 'العربية',
    logo: 'https://i.ibb.co/w7wk4p0/alarabiya.png',
    m3u8Url: 'https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'sky-news-arabia',
    name: 'سكاي نيوز عربية',
    logo: 'https://i.ibb.co/fFyvbrC/skynewsar.png',
    m3u8Url: 'https://stream.skynewsarabia.com/hls/sna.m3u8',
    isLive: true,
    category: ['news'],
  },
  {
    id: 'france24-ar',
    name: 'فرنسا 24',
    logo: 'https://i.ibb.co/5KW5f2K/france24ar.png',
    m3u8Url: 'https://live.france24.com/hls/live/2037222/F24_AR_HI_HLS/master_5000.m3u8',
    isLive: true,
    category: ['news'],
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
