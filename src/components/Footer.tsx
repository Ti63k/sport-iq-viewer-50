
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="text-lg font-bold mb-4">IQ SPORT</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              منصة لمشاهدة القنوات الرياضية والترفيهية المباشرة بجودة عالية
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">التصنيفات</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/sports" className="text-gray-600 dark:text-gray-300 hover:text-iqpurple">الرياضة</Link></li>
              <li><Link to="/category/news" className="text-gray-600 dark:text-gray-300 hover:text-iqpurple">الإخبارية</Link></li>
              <li><Link to="/category/documentary" className="text-gray-600 dark:text-gray-300 hover:text-iqpurple">الوثائقية</Link></li>
              <li><Link to="/category/entertainment" className="text-gray-600 dark:text-gray-300 hover:text-iqpurple">الترفيه</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              للاستفسارات والدعم الفني، يرجى التواصل معنا عبر البريد الإلكتروني
            </p>
            <a href="mailto:support@iqsport.com" className="text-iqpurple hover:text-iqred mt-2 inline-block">
              support@iqsport.com
            </a>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            &copy; {currentYear} IQ SPORT - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
