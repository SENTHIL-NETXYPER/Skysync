import React, { useState, useEffect, useRef } from 'react';
import {
  Cloud,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  Search,
  Zap,
  Shield,
  Cpu,
  Calculator,
  Compass,
  FileText
} from 'lucide-react';
import { SkySyncLogo } from './SkySyncLogo';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Monitor scroll for elevation and subtle background density
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    const handleResize = () => {
      if (window.innerWidth > 990) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesMenuOpen(false);
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(target)) {
        setSolutionsMenuOpen(false);
      }
    };
    if (servicesMenuOpen || solutionsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesMenuOpen, solutionsMenuOpen]);

  // Focus search input when search modal opens & handle Escape key
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsSearchOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen]);

  // Exact nav items matching the classy dark glassmorphism theme
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'solutions', label: 'Solutions', hasDropdown: true },
    { id: 'projects', label: 'Case Studies' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const servicesList = [
    {
      id: 'migration',
      label: 'Cloud Architecture & Migration',
      desc: 'Zero-downtime database & student portal cutovers',
      icon: Cloud,
      color: '#FF9900'
    },
    {
      id: 'devops',
      label: 'DevOps & CI/CD Automation',
      desc: 'Terraform, Docker & automated test pipelines',
      icon: Zap,
      color: '#38BDF8'
    },
    {
      id: 'ai',
      label: 'Cloud AI & Amazon Bedrock',
      desc: 'Campus admissions bots & RAG semantic search',
      icon: Cpu,
      color: '#A855F7'
    },
    {
      id: 'consulting',
      label: 'FinOps & Architecture Consulting',
      desc: 'Cost optimization & faculty mentoring runbooks',
      icon: Shield,
      color: '#10B981'
    }
  ];

  const solutionsList = [
    {
      id: 'solutions',
      label: 'Overview & Campus Solutions',
      desc: 'Higher education & institutional cloud frameworks',
      icon: LayoutGrid,
      color: '#FF9900'
    },
    {
      id: 'designer',
      label: 'Architecture Designer',
      desc: 'Interactive visual tool for custom AWS stacks',
      icon: Sparkles,
      color: '#A855F7'
    }
  ];

  const searchEntries = [
    { title: 'AWS Cloud Architecture & Migration', category: 'Service', tabId: 'services', sectionId: 'services', icon: Cloud },
    { title: 'DevOps & CI/CD Automation (Terraform & ECS)', category: 'Service', tabId: 'services', sectionId: 'services', icon: Zap },
    { title: 'Cloud AI & Amazon Bedrock Admissions Bot', category: 'Service', tabId: 'services', sectionId: 'services', icon: Cpu },
    { title: 'Cloud Cost & ROI Calculator (TCO Estimator)', category: 'Pricing', tabId: 'pricing', sectionId: 'calculator', icon: Calculator },
    { title: 'Interactive Architecture Designer Tool', category: 'Solutions', tabId: 'designer', sectionId: 'designer-section', icon: Sparkles },
    { title: 'Why Move to Cloud (On-Premises vs AWS)', category: 'Comparison', tabId: 'home', sectionId: 'why-cloud', icon: Compass },
    { title: '4-Step Cloud Delivery Blueprints', category: 'Architecture', tabId: 'home', sectionId: 'architecture', icon: LayoutGrid },
    { title: 'Case Studies & Client Reviews', category: 'Client Proof', tabId: 'projects', sectionId: 'projects', icon: FileText },
    { title: 'Operational Excellence & Delivery Principles', category: 'About', tabId: 'about', sectionId: 'why-choose-us', icon: Shield },
    { title: 'Book an AWS Architecture Consultation', category: 'Action', tabId: 'contact', sectionId: 'contact', icon: ArrowRight }
  ];

  const filteredSearch = searchEntries.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setSolutionsMenuOpen(false);
    setIsSearchOpen(false);

    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTarget = () => {
      const targetId =
        tabId === 'designer'
          ? 'designer-section'
          : tabId === 'projects'
          ? 'projects'
          : tabId === 'pricing'
          ? 'calculator'
          : tabId === 'about'
          ? 'why-choose-us'
          : tabId;

      const el = document.getElementById(targetId) || document.getElementById('client-proof');
      if (el) {
        const navOffset = 84;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    };

    scrollToTarget();
    setTimeout(scrollToTarget, 80);
    setTimeout(scrollToTarget, 220);
  };

  const handleServiceClick = (serviceId: string) => {
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    if (serviceId === 'consulting' || serviceId === 'migration') {
      onSelectTab(serviceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavClick('services');
    }
  };

  const handleSolutionClick = (solutionId: string) => {
    setSolutionsMenuOpen(false);
    setMobileMenuOpen(false);
    if (solutionId === 'designer') {
      const el = document.getElementById('designer-section');
      if (el) {
        const navOffset = 84;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    } else {
      handleNavClick('solutions');
    }
  };

  return (
    <>
      <header className="floating-nav-header" role="banner">
        <div className={`floating-nav-pill-wrapper ${isScrolled ? 'scrolled' : ''}`}>
          {/* Brand / Official Logo */}
          <button
            onClick={() => handleNavClick('home')}
            aria-label="SkySyncLab Home"
            className="nav-brand-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 8px',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <SkySyncLogo variant="dark" height={30} />
          </button>

          {/* Center Pill Track (Matching the User's Image Aesthetic) */}
          <nav
            className="nav-capsule-rail nav-desktop-rail"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const isService = item.id === 'services';
              const isSolution = item.id === 'solutions';

              return (
                <div
                  key={item.id}
                  ref={isService ? servicesDropdownRef : isSolution ? solutionsDropdownRef : undefined}
                  style={{ position: 'relative' }}
                >
                  <button
                    className={`nav-capsule-tab ${isActive ? 'active' : ''}`}
                    aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    aria-expanded={
                      isService ? servicesMenuOpen : isSolution ? solutionsMenuOpen : undefined
                    }
                    onClick={() => {
                      if (isService) {
                        setServicesMenuOpen(!servicesMenuOpen);
                        setSolutionsMenuOpen(false);
                      } else if (isSolution) {
                        setSolutionsMenuOpen(!solutionsMenuOpen);
                        setServicesMenuOpen(false);
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={13}
                        strokeWidth={2.4}
                        style={{
                          transform:
                            (isService && servicesMenuOpen) || (isSolution && solutionsMenuOpen)
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)'
                        }}
                      />
                    )}
                  </button>

                  {/* Services Dropdown Menu */}
                  {isService && servicesMenuOpen && (
                    <div className="nav-capsule-dropdown">
                      {servicesList.map((svc) => {
                        const Icon = svc.icon;
                        return (
                          <button
                            key={svc.id}
                            className="nav-capsule-dropdown-item"
                            onClick={() => handleServiceClick(svc.id)}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: svc.color,
                                flexShrink: 0
                              }}
                            >
                              <Icon size={15} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 650, color: '#FFFFFF', fontSize: '0.88rem' }}>{svc.label}</span>
                              <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{svc.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Solutions Dropdown Menu */}
                  {isSolution && solutionsMenuOpen && (
                    <div className="nav-capsule-dropdown">
                      {solutionsList.map((sol) => {
                        const Icon = sol.icon;
                        return (
                          <button
                            key={sol.id}
                            className="nav-capsule-dropdown-item"
                            onClick={() => handleSolutionClick(sol.id)}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: sol.color,
                                flexShrink: 0
                              }}
                            >
                              <Icon size={15} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 650, color: '#FFFFFF', fontSize: '0.88rem' }}>{sol.label}</span>
                              <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{sol.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Glowing "Get Started →" Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Classy Circular Search Button (matching reference image) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="nav-search-btn"
              aria-label="Search SkySyncLab Architectures & Documentation"
              title="Search SkySyncLab (Quick Navigation)"
            >
              <Search size={16} strokeWidth={2.4} />
            </button>

            {/* Dark Orange CTA: "Book a Consultation →" */}
            <button
              onClick={onOpenConsultation}
              className="nav-cta-pill nav-desktop-cta"
            >
              <span>Book a Consultation</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="nav-mobile-trigger"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                color: '#FFFFFF',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.18s ease'
              }}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2.4} /> : <Menu size={20} strokeWidth={2.4} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown-card">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '8px'
              }}
            >
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                const isService = item.id === 'services';
                const isSolution = item.id === 'solutions';

                return (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div
                      className={`nav-capsule-tab ${isActive ? 'active' : ''}`}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 18px',
                        fontSize: '0.96rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        if (isService) {
                          setServicesMenuOpen(!servicesMenuOpen);
                        } else if (isSolution) {
                          setSolutionsMenuOpen(!solutionsMenuOpen);
                        } else {
                          handleNavClick(item.id);
                        }
                      }}
                    >
                      <span style={{ fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                      {item.hasDropdown && (
                        <div
                          style={{
                            padding: '2px 6px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <ChevronDown
                            size={16}
                            style={{
                              transform:
                                (isService && servicesMenuOpen) || (isSolution && solutionsMenuOpen)
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                              transition: 'transform 0.2s ease',
                              color: '#CBD5E1'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isService && servicesMenuOpen && (
                      <div
                        style={{
                          paddingLeft: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          marginTop: '4px',
                          marginBottom: '4px'
                        }}
                      >
                        <button
                          className="nav-capsule-dropdown-item"
                          onClick={() => handleNavClick('services')}
                          style={{ borderLeft: '2px solid #ED7100', paddingLeft: '10px' }}
                        >
                          <span style={{ color: '#ED7100', fontWeight: 700, fontSize: '0.88rem' }}>
                            • View All Cloud Services
                          </span>
                        </button>
                        {servicesList.map((svc) => (
                          <button
                            key={svc.id}
                            className="nav-capsule-dropdown-item"
                            onClick={() => handleServiceClick(svc.id)}
                          >
                            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{svc.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {isSolution && solutionsMenuOpen && (
                      <div
                        style={{
                          paddingLeft: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          marginTop: '4px',
                          marginBottom: '4px'
                        }}
                      >
                        <button
                          className="nav-capsule-dropdown-item"
                          onClick={() => handleNavClick('solutions')}
                          style={{ borderLeft: '2px solid #ED7100', paddingLeft: '10px' }}
                        >
                          <span style={{ color: '#ED7100', fontWeight: 700, fontSize: '0.88rem' }}>
                            • View All Solutions
                          </span>
                        </button>
                        {solutionsList.map((sol) => (
                          <button
                            key={sol.id}
                            className="nav-capsule-dropdown-item"
                            onClick={() => handleSolutionClick(sol.id)}
                          >
                            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{sol.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="nav-cta-pill"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px' }}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        )}
      </header>

      {/* Spotlight Quick Search Modal */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(3, 7, 18, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '80px 16px 24px 16px',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSearchOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '620px',
              backgroundColor: 'rgba(15, 23, 42, 0.94)',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '22px',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <Search size={20} color="#FF9900" strokeWidth={2.4} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search architectures, services, calculator, blueprints..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#94A3B8',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ESC
              </button>
            </div>

            {/* Quick Results List */}
            <div
              style={{
                maxHeight: '360px',
                overflowY: 'auto',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              {filteredSearch.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94A3B8', fontSize: '0.92rem' }}>
                  No matching services or blueprints found for "{searchQuery}".
                </div>
              ) : (
                filteredSearch.map((entry, idx) => {
                  const Icon = entry.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(entry.tabId)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(237, 113, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FF9900',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.94rem' }}>
                          {entry.title}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: '#FF9900',
                          background: 'rgba(237, 113, 0, 0.12)',
                          padding: '3px 8px',
                          borderRadius: '9999px'
                        }}
                      >
                        {entry.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
