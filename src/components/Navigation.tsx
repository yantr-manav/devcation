
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cyberDark-darker/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold text-white glow-text">
            <span className="text-cyberPurple">DEV</span>CATION <span className="text-cyberOrange">2025</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-cyberPurple transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          <Button className="bg-cyberPurple hover:bg-cyberPurple-dark text-white">
            Register Now
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-cyberDark-darker/95 backdrop-blur-lg border-t border-cyberPurple/30 p-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <NavLinks isMobile={true} />
              <Button className="bg-cyberPurple hover:bg-cyberPurple-dark text-white w-full">
                Register Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const links = [
    { name: 'About', path: '#about' },
    { name: 'Speakers', path: '#speakers' },
    { name: 'Schedule', path: '#schedule' },
    { name: 'Venue', path: '#venue' },
    { name: 'FAQ', path: '#faq' },
  ];

  const className = isMobile
    ? "text-white hover:text-cyberPurple transition-colors py-2 block"
    : "text-white hover:text-cyberPurple transition-colors";

  return (
    <>
      {links.map((link) => (
        <a key={link.name} href={link.path} className={className}>
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Navigation;
