import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const GraphicDesignPortfolio = () => {
  const [backgroundImage, setBackgroundImage] = useState(getBackgroundImage());
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const portfolioItems = [
    { id: 1, alt: "Logo design for a tech startup", title: "Tech Startup Logo" },
    { id: 2, alt: "Branding package for a coffee shop", title: "Coffee Shop Branding" },
    { id: 3, alt: "Magazine layout design", title: "Magazine Layout" },
    { id: 4, alt: "Mobile app UI design", title: "Mobile App UI" },
  ];

  const skills = [
    "Graphic Design", "Branding", "Typography", "UI/UX Design",
    "Print Design", "Illustration", "Photo Editing", "Logo Design"
  ];

  function getBackgroundImage() {
    if (window.innerWidth >= 2560) return "/api/placeholder/3840/2160";
    if (window.innerWidth >= 1920) return "/api/placeholder/2560/1440";
    if (window.innerWidth >= 1280) return "/api/placeholder/1920/1080";
    return "/api/placeholder/1280/720";
  }

  useEffect(() => {
    const handleResize = () => setBackgroundImage(getBackgroundImage());
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { contactName, contactEmail, contactMessage });
    alert('Thank you for your message! I will get back to you soon.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark' : ''}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-500 text-white p-2">
        Skip to main content
      </a>

      <header 
        className="h-screen bg-cover bg-fixed bg-center flex items-center justify-center text-white text-center relative"
        style={{backgroundImage: `url(${backgroundImage})`}}
        role="banner"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shadow-lg px-4">
          Your Name<br/>Graphic Designer
        </h1>
        <button 
          onClick={toggleDarkMode} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
        </button>
      </header>

      <main id="main-content" className="p-6 sm:p-8 lg:p-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="mb-8 text-lg">Write a brief introduction about yourself and your design philosophy here.</p>
        </section>
        
        <section className="mb-12" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-4">Skills</h2>
          <ul className="flex flex-wrap gap-2" aria-label="List of skills">
            {skills.map((skill, index) => (
              <li key={index} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl font-bold mb-4">Portfolio</h2>
          <div className="overflow-x-auto whitespace-nowrap pb-4" role="region" aria-label="Portfolio items">
            {portfolioItems.map((item) => (
              <img 
                key={item.id}
                src={`/api/placeholder/600/400`} 
                alt={item.alt}
                title={item.title}
                className="inline-block w-[270px] h-[180px] sm:w-[450px] sm:h-[300px] lg:w-[600px] lg:h-[400px] mr-4 sm:mr-6 object-cover"
              />
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold mb-4">Testimonials</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Happy client giving a testimonial" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <blockquote>
                  <p className="text-lg italic mb-4">
                    "Your Name's design work transformed our brand. Their creativity and attention to detail exceeded our expectations."
                  </p>
                  <footer className="font-semibold">- Jane Doe, CEO of XYZ Company</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-4">Contact Me</h2>
          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name:</label>
              <input 
                type="text" 
                id="name" 
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
              <input 
                type="email" 
                id="email" 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
                aria-required="true"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Message:</label>
              <textarea 
                id="message" 
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required 
                aria-required="true"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default GraphicDesignPortfolio;