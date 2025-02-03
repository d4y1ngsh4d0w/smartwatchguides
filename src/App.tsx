import React, { useEffect, useState, useRef } from 'react';
import { Watch, Heart, Battery, Smartphone, DollarSign, Award, Star, Clock, Tag, Search, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { smartwatches, articles } from './data';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function SmartWatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const watch = smartwatches.find(w => w.id === id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  if (!watch) {
    return <div>Smartwatch not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={watch.image} 
            alt={watch.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{watch.name}</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-600 mb-6">{watch.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Heart className="h-5 w-5 mr-3" />
                    <span className="font-medium">Health Features:</span>
                    <span className="ml-2">{watch.healthFeatures}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Battery className="h-5 w-5 mr-3" />
                    <span className="font-medium">Battery Life:</span>
                    <span className="ml-2">{watch.batteryLife}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3" />
                    <span className="font-medium">Price:</span>
                    <span className="ml-2">{watch.price}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {watch.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(watch.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-medium">{key}:</span>
                    <span className="ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Smartwatches</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {smartwatches
              .filter(w => w.id !== watch.id)
              .slice(0, 3)
              .map((similarWatch) => (
                <Link
                  key={similarWatch.id}
                  to={`/smartwatch/${similarWatch.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <img 
                    src={similarWatch.image} 
                    alt={similarWatch.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{similarWatch.name}</h3>
                    <p className="text-gray-600">{similarWatch.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-4xl font-bold mb-6">{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={index} className="ml-4">{line.replace('- ', '')}</li>;
            }
            if (line.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index} className="mb-4">{line}</p>;
          })}
        </div>

        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-bold mb-6">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {articles
              .filter(a => a.id !== id)
              .slice(0, 2)
              .map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWatches, setFilteredWatches] = useState(smartwatches);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('reviews');

  const navigationLinks = [
    { href: "#reviews", text: "Reviews", icon: Star },
    { href: "#comparison", text: "Compare", icon: DollarSign },
    { href: "#guide", text: "Guide", icon: Smartphone },
    { href: "#faq", text: "FAQ", icon: Heart },
    { href: "#articles", text: "Articles", icon: Award }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = 400;
      setIsScrolled(scrollPosition > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = smartwatches.filter(watch => 
      watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.healthFeatures.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWatches(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navigationLinks.forEach(link => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getNavLinkClass = (href: string) => {
    const isActive = activeSection === href.replace('#', '');
    return `flex items-center space-x-2 transition-all duration-300 font-medium px-3 py-2 rounded-lg relative
      ${isActive 
        ? 'text-blue-600 bg-blue-50' 
        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white relative">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Watch className="h-8 w-8" />
              <span className="text-2xl font-bold">SmartWatchGuides</span>
            </div>

            <div className="w-full lg:w-auto lg:max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 flex items-center">
                <Search className="text-white/70 w-5 h-5 ml-2" />
                <input 
                  type="search"
                  placeholder="Search smartwatches..."
                  className="w-full px-4 py-1.5 bg-transparent focus:outline-none text-white placeholder-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && filteredWatches.length === 0 && (
                <p className="text-white/80 mt-2 text-sm">No smartwatches found matching your search.</p>
              )}
            </div>

            <button
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <div className={`
          lg:hidden fixed inset-0 z-50 bg-blue-800/95 backdrop-blur-sm transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-2">
                <Watch className="h-8 w-8" />
                <span className="text-2xl font-bold">Menu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-2 p-6">
              {navigationLinks.map((link, index) => (
                <a
                  key={`mobile-nav-${index}`}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-lg">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Best Smartwatches of 2025
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
            Discover the perfect smartwatch for your lifestyle with our expert reviews and comparisons.
          </p>

          <div className="hidden lg:block max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg py-2 px-4">
            <div className="flex justify-center items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <a
                  key={`nav-${index}`}
                  href={link.href}
                  className={getNavLinkClass(link.href)}
                >
                  <link.icon className={`w-4 h-4 ${activeSection === link.href.replace('#', '') ? 'text-blue-600' : 'text-blue-600'}`} />
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-[-100%] pointer-events-none'
      }`}>
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto py-3">
              <div className="flex justify-center items-center space-x-8">
                {navigationLinks.map((link, index) => (
                  <a
                    key={`nav-float-${index}`}
                    href={link.href}
                    className={getNavLinkClass(link.href)}
                  >
                    <link.icon className={`w-4 h-4 ${activeSection === link.href.replace('#', '') ? 'text-blue-600' : 'text-blue-600'}`} />
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <p className="text-sm">Updated: March 2025</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="w-6 h-6 text-blue-600" />
              <p className="text-sm">Based on 1000+ user reviews</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Tag className="w-6 h-6 text-blue-600" />
              <p className="text-sm">Price range: $199-$699</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Top Smartwatches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <Link
              key={watch.id}
              to={`/smartwatch/${watch.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img 
                src={watch.image} 
                alt={watch.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{watch.name}</h3>
                <p className="text-gray-600 mb-4">{watch.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Heart className="h-5 w-5 mr-2" />
                    <span>{watch.healthFeatures}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Battery className="h-5 w-5 mr-2" />
                    <span>{watch.batteryLife}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>{watch.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="comparison" className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Comparison - Which Smartwatch Should You Choose?</h2>
        
        <div className="hidden md:block overflow-x-auto -mx-4 px-4">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Smartwatch
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Best For
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Battery Life
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWatches.map((watch) => (
                    <tr key={`comparison-${watch.id}`} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {watch.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {watch.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {watch.batteryLife}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {watch.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-6">
          {filteredWatches.map((watch) => (
            <div 
              key={`comparison-mobile-${watch.id}`} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium text-gray-900">{watch.name}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Best For</div>
                  <div className="text-gray-900">{watch.description}</div>
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Battery Life</div>
                  <div className="text-gray-900">{watch.batteryLife}</div>
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Price</div>
                  <div className="text-gray-900">{watch.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="guide" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Buying Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone />,
                title: "Consider Your Phone",
                description: "Choose a smartwatch that's compatible with your smartphone's operating system for the best experience."
              },
              {
                icon: <Heart />,
                title: "Health Features",
                description: "Determine which health tracking features are most important for your lifestyle and fitness goals."
              },
              {
                icon: <Battery />,
                title: "Battery Life",
                description: "Consider how long you need your smartwatch to last between charges based on your usage."
              }
            ].map((guide, index) => (
              <GuideCard
                key={`guide-${index}`}
                icon={guide.icon}
                title={guide.title}
                description={guide.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advertise Section */}
      <section className="py-14">
        <div>
          <AdSection />
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <details key={`faq-${index}`} className="bg-white rounded-lg shadow-sm p-6">
              <summary className="text-lg font-semibold cursor-pointer">{faq.question}</summary>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="articles" className="bg-gray-50 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
              >
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600">{article.excerpt}</p>
                  <div className="mt-4 flex items-center text-blue-600">
                    <span className="text-sm font-medium">Read more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advertise Section */}
      <section className="py-14">
        <div>
          <AdSection />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 SmartWatch Guide | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function GuideCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

const faqs = [
  {
    question: "What's the difference between a smartwatch and a fitness tracker?",
    answer: "Smartwatches typically offer more features like message notifications, apps, and phone calls, while fitness trackers focus primarily on health and activity monitoring. Smartwatches generally have larger screens and more sophisticated interfaces."
  },
  {
    question: "Do all smartwatches work with both iPhone and Android?",
    answer: "No, not all smartwatches are compatible with both platforms. Apple Watches only work with iPhones, while most Wear OS and other Android watches work best with Android phones. Some brands like Fitbit and Garmin work well with both platforms."
  },
  {
    question: "How long do smartwatch batteries typically last?",
    answer: "Battery life varies significantly between models. Basic smartwatches can last 5-7 days, while feature-rich models like the Apple Watch typically need daily charging. Some fitness-focused watches can last up to 2 weeks."
  },
  {
    question: "Are smartwatches water-resistant?",
    answer: "Most modern smartwatches offer some level of water resistance, but the degree varies. Many can handle swimming and showering, but it's important to check the specific water resistance rating (ATM or IP rating) for your model."
  }
];

const AdSection = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 text-center mx-auto max-w-lg">
      <p className="text-gray-600 text-sm uppercase font-semibold mb-2">
        Sponsored Ad
      </p>
      <a href="#" className="block">
        <img
          src="https://via.placeholder.com/300x150?text=Your+Ad+Here"
          alt="Advertisement"
          className="w-full h-auto rounded-md mb-3"
        />
      </a>
      <p className="text-gray-700 text-sm">
        Looking for the best smartwatches? Check out our top picks!
      </p>
      <a
        href="#"
        className="mt-3 inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
      >
        Learn More
      </a>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/smartwatch/:id" element={<SmartWatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;