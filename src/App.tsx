import { useState, useEffect, useRef } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechnologyStrip } from './components/TechnologyStrip';
import { Services } from './components/Services';
import { WhySwitchToCloud } from './components/WhySwitchToCloud';
import { CostCalculator } from './components/CostCalculator';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { ClientProof } from './components/ClientProof';
import { ArchitectureDesigner } from './components/ArchitectureDesigner';
import { ConsultingPage } from './components/ConsultingPage';
import { MigrationPage } from './components/MigrationPage';
import { Solutions } from './components/Solutions';
import { WhyChooseUs } from './components/WhyChooseUs';

import { Contact } from './components/Contact';
import { AuditModal } from './components/AuditModal';
import { Footer } from './components/Footer';
import { AwsFloatingAssistant } from './components/AwsFloatingAssistant';

export function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'solutions' | 'projects' | 'pricing' | 'about' | 'designer' | 'consulting' | 'migration' | 'contact'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledNotes, setPrefilledNotes] = useState('');

  const isNavigatingRef = useRef(false);
  const currentTabRef = useRef(currentTab);
  currentTabRef.current = currentTab;

  // Scroll Spy: Automatically moves the active navbar tab to the respective section as user scrolls
  useEffect(() => {
    const handleScrollSpy = () => {
      // Do not override tab while a smooth scroll animation is executing
      if (isNavigatingRef.current) return;

      // Don't override if on dedicated subpages
      if (currentTabRef.current === 'consulting' || currentTabRef.current === 'migration' || currentTabRef.current === 'designer') return;

      // Bottom of page detection -> highlight contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setCurrentTab('contact');
        return;
      }

      // Top of page detection -> highlight home
      if (window.scrollY < 240) {
        setCurrentTab('home');
        return;
      }

      // Sections to spy on (in priority order)
      const sections: { id: string; tab: 'services' | 'solutions' | 'projects' | 'pricing' | 'about' | 'contact' }[] = [
        { id: 'contact', tab: 'contact' },
        { id: 'why-choose-us', tab: 'about' },
        { id: 'projects', tab: 'projects' },
        { id: 'client-proof', tab: 'projects' },
        { id: 'solutions', tab: 'solutions' },
        { id: 'designer-section', tab: 'solutions' },
        { id: 'calculator', tab: 'pricing' },
        { id: 'services', tab: 'services' }
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 140) {
            setCurrentTab(sec.tab);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Scroll-linked movement: Section content fades in slowly and in controlled fashion
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-scrolled-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-fade-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentTab]);

  const handleOpenConsultation = (service: string = '', notes: string = '') => {
    setPrefilledService(service);
    setPrefilledNotes(notes);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPrefilledService('');
    setPrefilledNotes('');
  };

  const handleSelectTab = (tab: string) => {
    isNavigatingRef.current = true;
    setCurrentTab(tab as any);
    if (tab === 'home' || tab === 'consulting' || tab === 'migration') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: 'transparent' }}>
      {/* SoftServe-Style Atmospheric Animated Glow & Mesh */}
      <AmbientBackground />

      {/* Sticky Header with Navigation & Lead Button */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      <main style={{ flex: 1, paddingTop: '92px', position: 'relative', zIndex: 1 }}>
        {/* Dedicated Page View: Consulting & Mentoring */}
        {currentTab === 'consulting' ? (
          <div>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px 0 24px' }}>
              <button
                onClick={() => handleSelectTab('home')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#01A88D',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ← Back to Overview
              </button>
            </div>
            <ConsultingPage
              onRequestConsulting={() => handleOpenConsultation('Consulting & Mentoring', 'Request from Consulting & Mentoring dedicated page')}
            />
            <Contact prefilledService="Consulting & Mentoring" />
          </div>
        ) : currentTab === 'migration' ? (
          /* Dedicated Page View: Cloud Services & Migration */
          <div>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px 0 24px' }}>
              <button
                onClick={() => handleSelectTab('home')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--aws-orange)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ← Back to Overview
              </button>
            </div>
            <MigrationPage
              onDiscussMigration={() => handleOpenConsultation('Cloud Migration', 'Inquiry from Cloud Services & Migration dedicated page')}
            />
            <Contact prefilledService="Cloud Migration" />
          </div>
        ) : (
          /* Default Comprehensive Homepage Flow */
          <>
            <Hero
              onOpenConsultation={() => handleOpenConsultation()}
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenDesigner={() => {
                const el = document.getElementById('designer-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToConsulting={() => handleSelectTab('consulting')}
              onNavigateToMigration={() => handleSelectTab('migration')}
            />

            {/* Minimal Animated Technology Strip */}
            <TechnologyStrip />

            {/* 4 Core Services with Popups */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#F8FAFC', borderTop: '1.5px solid #E2E8F0', borderBottom: '1.5px solid #E2E8F0' }}>
              <Services
                onOpenConsultationWithService={(svc) => handleOpenConsultation(svc)}
              />
            </div>

            {/* Why Move to the Cloud: Tabbed comparison */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#FFFFFF' }}>
              <WhySwitchToCloud
                onOpenConsultation={() => handleOpenConsultation('Cloud Migration & Architecture', 'Inquiry from Why Move to Cloud comparison')}
              />
            </div>

            {/* Transparent AWS ROI & TCO Estimator */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#F8FAFC', borderTop: '1.5px solid #E2E8F0', borderBottom: '1.5px solid #E2E8F0' }}>
              <CostCalculator
                onOpenAuditWithDetails={(details) => handleOpenConsultation('Institutional Cloud Audit', details)}
              />
            </div>

            {/* 4-Step Delivery Process & Technical Architecture Blueprints */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#FFFFFF' }}>
              <ArchitectureViewer />
            </div>

            {/* Interactive Architecture Designer Section */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#F8FAFC', borderTop: '1.5px solid #E2E8F0', borderBottom: '1.5px solid #E2E8F0', overflow: 'hidden' }}>
              <ArchitectureDesigner />
            </div>

            {/* Campus & Sector Solutions */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#F8FAFC', borderTop: '1.5px solid #E2E8F0', borderBottom: '1.5px solid #E2E8F0' }}>
              <Solutions
                onOpenConsultationWithTopic={(topic) => handleOpenConsultation(topic)}
              />
            </div>

            {/* Operational Excellence & Delivery Principles (About) */}
            <div className="scroll-fade-section" style={{ backgroundColor: '#FFFFFF' }}>
              <WhyChooseUs />
            </div>

            {/* Verified Client Success */}
            <div className="scroll-fade-section">
              <ClientProof
                onOpenConsultation={() => handleOpenConsultation('Institutional Cloud Audit', 'Inquiry from Client Reviews & Architecture')}
              />
            </div>

            {/* Contact Section with Working Lead Submission */}
            <div className="scroll-fade-section">
              <Contact
                prefilledService={prefilledService}
                prefilledNotes={prefilledNotes}
              />
            </div>

            {/* Evolve Together CTA Banner removed per request */}
          </>
        )}
      </main>

      {/* Global Consultation Modal */}
      <AuditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        prefilledService={prefilledService}
        prefilledNotes={prefilledNotes}
      />

      {/* Floating AI Help Assistant (Navigator) */}
      <AwsFloatingAssistant
        onOpenAudit={() => handleOpenConsultation('General Inquiry', 'Inquiry from Cloud Assistant')}
      />

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    </div>
  );
}

export default App;
