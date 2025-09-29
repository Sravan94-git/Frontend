import React, { useState, useEffect } from "react";
import {
  ChevronsDown,
  Send,
  Download,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import "./App.css";
import profileImage from "./assets/profile.jpg";

// Fallback data
const topProjectsData = [
  {
    id: 1,
    title: "AutoSight - Real-Time Indian Vehicle Classification and Detection",
    description: "Developed a real-time vehicle detection and classification system using YOLO and a Deep learning model",
    technologies: ["Yolo", "Mobilevit", "OpenCV", "Flask", "TensorFlow"],
    features: [
      "Two-stage deep learning pipeline boosting efficiency of model",
      "Lightweight YOLOv8n detector",
      "Fine-grained classification across 12 distinct vehicle classes",
      "Real-time multi-vehicle predictions in a single frame"
    ],
    github: "https://github.com/Sravan94-git/Indian-Vehicle-Detection-and-Classification",
  },
  {
    id: 2,
    title: "FinanceShield – Loan Defaulter System",
    description: "Architected a pipeline for credit risk analysis that analyzes a dataset of 1,000,000 individuals to predict defaults and minimize institutional loss.",
    technologies: ["Scikit-learn", "PySpark", "Hadoop", "Python"],
    features: [
      "Predictive risk modeling",
      "Large dataset processing",
      "Institutional loss minimization"
    ],
    github: "https://github.com/Sravan94-git/Credit-Risk-Analysis",
  },
];

const otherProjectsData = [
  {
    id: 1,
    title: "CineSense",
    description: "An intelligent movie recommendation system that analyzes the sentiment of user reviews to generate more meaningful and accurate movie suggestions.",
    technologies: ["Python", "Flask", "Scikit-learn", "BeautifulSoup", "TMDB API"],
    github: "https://github.com/Sravan94-git/Movie-Recommendation-System"
  },
  {
    id: 2,
    title: "Early Alzheimers Stage Classification using Deep Learning",
    description: "A deep learning project to identify and categorize the early stages of Alzheimer's disease using medical imaging data.",
    technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas"],
    github: "https://github.com/Sravan94-git/Alzheimers-disease-detection"
  },
  {
    id: 3,
    title: "Domain Classification of Legal Documents",
    description: "A machine learning project to automatically classify legal documents into their respective domains using NLP techniques.",
    technologies: ["Python", "Scikit-learn", "NLTK", "Pandas"],
    github: "https://github.com/Sravan94-git/Domain-classification-of-legal-documents"
  },
  {
    id: 4,
    title: "Real-Time Language Translator",
    description: "A web application that translates spoken or written language in real-time using web APIs.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web Speech API", "Translation API"],
    github: "https://github.com/Sravan94-git/Real-Time-Language-Translator"
  },
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [topProjects, setTopProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Use fallback data directly for now
    setTopProjects(topProjectsData);
    setOtherProjects(otherProjectsData);
    setIsLoading(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmissionStatus("");
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Sravan's Portfolio
          </a>
          <div className="nav-links">
            {["home", "about", "projects", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={activeSection === section ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Home Section */}
        <section id="home" className="section home-section">
          <div className="home-content">
            <h1 className="home-title">
              Hello, I'm <span className="gradient-text">Sravan</span>.
            </h1>
            <p className="home-subtitle">
              I build intelligent systems that solve real-world data challenges.
            </p>
            <div className="button-group">
              <a
                href="/Sravan_Resume.pdf"
                download="Sravan_Resume.pdf"
                className="button primary"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="button secondary"
              >
                View My Work
              </button>
            </div>
          </div>
          <div className={`scroll-indicator ${isScrolled ? 'hidden' : ''}`}>
            <ChevronsDown size={28} className="scroll-icon" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-content">
                <p className="about-text">
                  As a Java Developer specialized in AI/ML with expertise in building
                  end-to-end solutions for computer vision, NLP, and recommendation
                  engines. I'm passionate about solving real-world problems using
                  emerging technologies and creating impactful digital experiences.
                </p>
                <div className="skills">
                  <h3>Technologies I Work With:</h3>
                  <div className="skills-grid">
                    {['Java', 'Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'Spring Boot', 'MySQL'].map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-image">
                <img src={profileImage} alt="Sravan" />
                <div className="profile-placeholder">

                </div>
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <h2 className="section-title">Latest Projects</h2>

            {isLoading ? (
              <div className="loading">Loading projects...</div>
            ) : (
              <>
                <div className="featured-projects">
                  {topProjects.map((project) => (
                    <div key={project.id} className="project-card featured">
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                      </div>

                      <p className="project-description">{project.description}</p>

                      <div className="tech-stack small">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-pill small">{tech}</span>
                        ))}
                      </div>

                      {/* --- RE-ADDED BULLET POINTS --- */}
                      <ul className="features-list">
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>

                      <div className="project-links">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <span>View on GitHub</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title">Other Projects</h3>
                <div className="other-projects">
                  {otherProjects.map((project) => (
                    <a
                      key={project.id}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card other"
                    >
                      <div className="project-content">
                        <h4>{project.title}</h4>
                        <p className="project-desc">{project.description}</p>
                        <div className="tech-stack small">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-pill small">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <ExternalLink size={18} className="project-arrow" />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Ready to Collaborate?</h2>

            <div className="contact-grid">
              <div className="contact-info">
                <h3>Get In Touch</h3>
                <p>
                  Let's discuss how we can work together to bring your ideas to life.
                  I'm always open to new challenges and interesting collaborations.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <Mail size={20} />
                    <div>
                      <strong>Email</strong>
                      <span>sravansunkara04@gmail.com</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Phone size={20} />
                    <div>
                      <strong>Phone</strong>
                      <span>+91 6281682082</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin size={20} />
                    <div>
                      <strong>Location</strong>
                      <span>Ongole, Andhra Pradesh, India</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h3>Send a Message</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Tell me about your project or just say hello..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="button primary full-width">
                    <span>Send Message</span>
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 Success!</h3>
            <p>{submissionStatus}</p>
            <button onClick={closeModal} className="button primary">
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>© 2025 Sravan. All rights reserved.</p>
          <p>Built with React & Spring Boot</p>
        </div>
      </footer>
    </div>
  );
};

export default App;