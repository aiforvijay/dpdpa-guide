import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faInfoCircle, 
  faArrowLeft, 
  faChevronRight,
  faLightbulb,
  faFileAlt,
  faShieldAlt,
  faUserShield,
  faExchangeAlt,
  faGavel,
  faExclamationTriangle,
  faClipboardList,
  faMobileAlt
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assistant.css';
import { contentData } from './data/contentData';
import { illustrationsData } from './data/illustrationsData';
import { Section, SubSection, SubSubSection } from './types';
import AssistantButton from './AssistantButton';

// Create a context to share the tab switching functionality
export const TabContext = React.createContext({
  switchToTab: (tabKey: string) => {},
  scrollToIllustration: (illustrationId: string) => {}
});

// Helper function to get icon for section
const getSectionIcon = (sectionId: string) => {
  const icons: {[key: string]: any} = {
    'section1': faBook,
    'section2': faShieldAlt,
    'section3': faClipboardList,
    'section4': faUserShield,
    'section5': faLightbulb,
    'section6': faMobileAlt,
    'section7': faInfoCircle,
    'illustrations': faInfoCircle
  };
  
  return icons[sectionId] || faFileAlt;
};

// Helper function to get short title
const getShortTitle = (title: string): string => {
  // Extract the first part of the title (before the first period)
  const match = title.match(/^(\d+\.\s*[^.]+)/);
  if (match) {
    return match[1];
  }
  
  // If no period found or for other cases, limit to first 25 chars
  if (title.length > 25) {
    return title.substring(0, 25) + '...';
  }
  
  return title;
};

function App() {
  const [view, setView] = useState<'home' | 'section' | 'illustrations'>('home');
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [activeSubsection, setActiveSubsection] = useState<SubSection | null>(null);
  const [activeSubsubsection, setActiveSubsubsection] = useState<SubSubSection | null>(null);
  const [activeIllustration, setActiveIllustration] = useState<string | null>(null);

  // Function to switch to a specific tab
  const switchToTab = (tabKey: string) => {
    if (tabKey === 'illustrations') {
      setView('illustrations');
      setActiveSection(null);
      setActiveSubsection(null);
      setActiveSubsubsection(null);
    } else {
      const section = contentData.find(s => s.id === tabKey);
      if (section) {
        setView('section');
        setActiveSection(section);
        setActiveSubsection(null);
        setActiveSubsubsection(null);
      } else {
        setView('home');
      }
    }
  };

  // Function to scroll to a specific illustration
  const scrollToIllustration = (illustrationId: string) => {
    setActiveIllustration(illustrationId);
    setView('illustrations');
    setActiveSection(null);
    setActiveSubsection(null);
    setActiveSubsubsection(null);
  };

  // Scroll to the active illustration when it changes or when we switch to the illustrations tab
  useEffect(() => {
    if (view === 'illustrations' && activeIllustration) {
      setTimeout(() => {
        const element = document.getElementById(`illustration-${activeIllustration}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.parentElement?.classList.add('highlight-illustration');
          setTimeout(() => {
            element.parentElement?.classList.remove('highlight-illustration');
          }, 2000);
        }
      }, 300); // Small delay to ensure the tab has rendered
    }
  }, [view, activeIllustration]);

  // Replace the onClick handler in the content with a call to this function
  const processContent = (content: string) => {
    // First, handle the main illustrations tab link
    let processedContent = content.replace(
      /onClick=".*?document\.querySelector\('\[aria-controls=illustrations\]'\)\.click\(\).*?"/g,
      'onClick="window.tabSwitcher(\'illustrations\'); return false;"'
    );
    
    // Then, handle the specific illustration links
    processedContent = processedContent.replace(
      /<a href="#illustration-(illustration\d+)".*?>(.*?)<\/a>/g,
      '<a href="#" onClick="window.illustrationNavigator(\'$1\'); return false;">$2</a>'
    );
    
    return processedContent;
  };

  // Add the tab switcher and illustration navigator functions to the window object
  useEffect(() => {
    (window as any).tabSwitcher = switchToTab;
    (window as any).illustrationNavigator = scrollToIllustration;
  }, []);

  // Render the home view with section buttons
  const renderHomeView = () => (
    <>
      <h2 className="content-title">Select a Section</h2>
      <div className="button-grid">
        {contentData.map((section) => (
          <button
            key={section.id}
            className="section-button"
            onClick={() => switchToTab(section.id)}
          >
            <FontAwesomeIcon icon={getSectionIcon(section.id)} className="section-button-icon" />
            {getShortTitle(section.title)}
          </button>
        ))}
        <button
          className="section-button"
          onClick={() => switchToTab('illustrations')}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="section-button-icon" />
          Illustrations
        </button>
      </div>
    </>
  );

  // Render the section view with subsection buttons
  const renderSectionView = () => {
    if (!activeSection) return null;

    return (
      <>
        <button className="back-button" onClick={() => setView('home')}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-button-icon" />
          Back to Sections
        </button>
        
        <div className="content-area">
          <h2 className="content-title">{activeSection.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: processContent(activeSection.content) }} />
          
          {activeSection.subsections && activeSection.subsections.length > 0 && (
            <>
              <h3>Subsections</h3>
              <div className="subsection-buttons">
                {activeSection.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    className={`subsection-button ${activeSubsection?.id === subsection.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSubsection(subsection);
                      setActiveSubsubsection(null);
                    }}
                  >
                    {getShortTitle(subsection.title)}
                  </button>
                ))}
              </div>
            </>
          )}
          
          {activeSubsection && (
            <div className="content-display">
              <h3>{activeSubsection.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: processContent(activeSubsection.content) }} />
              
              {activeSubsection.subsubsections && activeSubsection.subsubsections.length > 0 && (
                <>
                  <h4>Detailed Topics</h4>
                  <div className="subsubsection-buttons">
                    {activeSubsection.subsubsections.map((subsubsection) => (
                      <button
                        key={subsubsection.id}
                        className={`subsubsection-button ${activeSubsubsection?.id === subsubsection.id ? 'active' : ''}`}
                        onClick={() => setActiveSubsubsection(subsubsection)}
                      >
                        {getShortTitle(subsubsection.title)}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {activeSubsubsection && (
                <div className="content-display">
                  <h4>{activeSubsubsection.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: processContent(activeSubsubsection.content) }} />
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  // Render the illustrations view
  const renderIllustrationsView = () => (
    <>
      <button className="back-button" onClick={() => setView('home')}>
        <FontAwesomeIcon icon={faArrowLeft} className="back-button-icon" />
        Back to Sections
      </button>
      
      <div className="content-area">
        <h2 className="content-title">Illustrations of Key Clauses for Easy Understanding</h2>
        
        <Row>
          {illustrationsData.map((illustration) => (
            <Col key={illustration.id} xs={12} className="mb-4">
              <div className="illustration-card">
                <h3 className="illustration-title" id={`illustration-${illustration.id}`}>
                  {illustration.title}
                </h3>
                <div className="illustration-content">
                  <div dangerouslySetInnerHTML={{ __html: illustration.content }} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );

  return (
    <Router>
      <TabContext.Provider value={{ switchToTab, scrollToIllustration }}>
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">Navigating the Digital Personal Data Protection Act, 2023 and Draft Rules</h1>
            <p className="app-subtitle">(A Comprehensive Guide for Chartered Accountants in India)</p>
            <p className="app-subtitle">CA Vijay Srinivas Kothapalli, Hyderabad</p>
            <p className="app-subtitle">C Ramachandram & Co., Chartered Accountants</p>
          </header>

          {view === 'home' && renderHomeView()}
          {view === 'section' && renderSectionView()}
          {view === 'illustrations' && renderIllustrationsView()}
          
          <footer className="app-footer">
            <p>© 2025 Vijay Srinivas Kothapalli</p>
            <div className="accessibility-controls">
              <button 
                className="accessibility-button"
                onClick={() => document.body.classList.toggle('high-contrast-mode')}
              >
                Toggle High Contrast
              </button>
              <button 
                className="accessibility-button"
                onClick={() => {
                  const currentSize = parseInt(window.getComputedStyle(document.body).fontSize);
                  document.body.style.fontSize = (currentSize + 1) + 'px';
                }}
              >
                Increase Text Size
              </button>
            </div>
          </footer>
          
          {/* Add the Assistant Button */}
          <AssistantButton />
        </div>
      </TabContext.Provider>
    </Router>
  );
}

export default App;
