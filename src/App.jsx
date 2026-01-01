import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaInstagram, FaTimes, FaEnvelope, FaGraduationCap, FaBriefcase, FaCode, FaDatabase, FaTools, FaCheckCircle } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { projectsData, navLinks, educationData, experienceData } from './constants'; 

// --- COMPONENTS ---

// 1. Navbar (Fixed & Mobile Optimized)
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [navOpen]);

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-[999] transition-all duration-300 ${scrolled ? 'py-3 bg-slate-900/90 backdrop-blur-lg shadow-xl border-b border-white/10' : 'py-5 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="z-[1000]">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-sans">
              Munavvar
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium text-slate-300 hover:text-white transition hover:underline decoration-violet-500 decoration-2 underline-offset-4">
                {item.name}
              </a>
            ))}
            <a href="/resume.pdf" download className="bg-white text-slate-900 px-5 py-2 rounded-full hover:bg-slate-200 transition text-sm font-bold shadow-lg">
              Resume
            </a>
          </div>
          <div className="md:hidden z-[1000]">
            <button onClick={() => setNavOpen(!navOpen)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition focus:outline-none">
              {navOpen ? <FaTimes size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {navOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed inset-0 z-[998] bg-slate-950 flex flex-col items-center justify-center gap-8 md:hidden"
          >
             <div className="flex flex-col items-center gap-8 relative z-10">
               {navLinks.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setNavOpen(false)} className="text-3xl font-bold text-slate-300 hover:text-white hover:scale-110 transition duration-300">
                  {item.name}
                </a>
              ))}
             </div>
            <a href="/resume.pdf" download className="relative z-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-bold text-lg mt-8 shadow-lg">
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-700/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-[120px]"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
            Available for Hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Crafting Digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400">Experiences</span>
          </h1>
          <div className="text-2xl font-light text-slate-400 mb-8 h-[40px]">
             I am a <TypeAnimation sequence={['React Developer', 2000, 'Frontend Specialist', 2000]} wrapper="span" speed={50} className="text-white font-medium" repeat={Infinity} />
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
             <a href="#contact-footer" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition duration-300">Let's Talk</a>
             <a href="#projects" className="px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white font-semibold hover:bg-slate-800 transition">View Work</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex justify-center">
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-[2rem] rotate-6 opacity-50 blur-lg"></div>
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/10 bg-slate-900 shadow-2xl">
              <img src="/myimage3.png" alt="Munavvar" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 3. About Section
const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">My Journey</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8"><FaGraduationCap className="text-violet-500"/> Education</h3>
            <div className="space-y-8 pl-4 border-l-2 border-slate-800">
              {educationData.map((edu, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-violet-500 border-4 border-slate-900"></div>
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">{edu.year}</span>
                  <h4 className="text-xl font-bold mt-1">{edu.degree}</h4>
                  <p className="text-slate-400 text-sm mt-1">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8"><FaBriefcase className="text-fuchsia-500"/> Experience</h3>
            <div className="space-y-8 pl-4 border-l-2 border-slate-800">
              {experienceData.map((exp, i) => (
                <div key={i} className="relative pl-8">
                   <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-fuchsia-500 border-4 border-slate-900"></div>
                   <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">{exp.duration}</span>
                   <h4 className="text-xl font-bold mt-1">{exp.role}</h4>
                   <p className="text-slate-400 text-sm mt-1">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Skills Section
const SkillBadge = ({ name, icon }) => (
  <motion.div whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.2)" }} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-xl cursor-default hover:border-violet-500 transition-colors duration-300">
    <span className="text-violet-400 text-lg">{icon}</span>
    <span className="text-slate-200 font-medium">{name}</span>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-slate-400">Tools and technologies that fuel my development.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-violet-500/30 transition duration-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-violet-300"><FaCode /> Frontend</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Tailwind', 'Redux', 'HTML5', 'CSS3', 'Framer Motion'].map(s => <SkillBadge key={s} name={s} icon={<FaCheckCircle size={14} />} />)}
            </div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-fuchsia-500/30 transition duration-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-fuchsia-300"><FaDatabase /> Backend</h3>
            <div className="flex flex-wrap gap-3">
              {['Node.js', 'Express', 'MongoDB', 'Firebase', 'REST API'].map(s => <SkillBadge key={s} name={s} icon={<FaCheckCircle size={14} />} />)}
            </div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition duration-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-300"><FaTools /> Tools</h3>
            <div className="flex flex-wrap gap-3">
               {['Git', 'GitHub', 'VS Code', 'Postman', 'Vite'].map(s => <SkillBadge key={s} name={s} icon={<FaCheckCircle size={14} />} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Projects Section
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to track View All/View Less

  // Logic: If showAll is true, show everything. If false, show only first 3.
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <motion.div 
              key={project.id} 
              whileHover={{ y: -10 }} 
              onClick={() => setSelectedProject(project)} 
              className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 cursor-pointer shadow-lg hover:shadow-violet-500/10 transition duration-300"
            >
              <div className="h-52 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60"/>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20">View Details</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-violet-400 transition">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All / View Less Button */}
        {projectsData.length > 3 && (
          <div className="text-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-violet-500 text-violet-400 hover:bg-violet-600 hover:text-white transition duration-300 font-semibold shadow-lg hover:shadow-violet-500/20"
            >
              {showAll ? 'View Less' : 'View All Projects'}
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 rounded-3xl w-full max-w-3xl overflow-hidden border border-slate-700 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-red-500/80 transition z-10"><FaTimes className="text-white"/></button>
               <div className="h-64 w-full relative">
                 <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
               </div>
               <div className="p-8 -mt-12 relative">
                 <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                 <div className="flex gap-2 mb-6">
                    {selectedProject.tech.map((t, i) => <span key={i} className="text-xs font-bold px-2 py-1 bg-violet-500/20 text-violet-300 rounded">{t}</span>)}
                 </div>
                 <p className="text-slate-300 mb-8 leading-relaxed text-lg">{selectedProject.desc}</p>
                 <div className="flex gap-4">
                   <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex-1 bg-slate-800 text-white py-3.5 rounded-xl text-center font-bold hover:bg-slate-700 transition flex items-center justify-center gap-2"><FaGithub/> GitHub</a>
                   <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex-1 bg-violet-600 text-white py-3.5 rounded-xl text-center font-bold hover:bg-violet-700 transition shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2"><FaCheckCircle/> Live Demo</a>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// 6. Footer (With YOUR EmailJS Credentials)
const Footer = () => {
  const [showForm, setShowForm] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // --- emailjs id's and key---
    emailjs.sendForm(
      'service_s211qwg',    //Service ID
      'template_44469nh',    //  Template ID
      form.current,
      'Scpsbf-iNT-dYrSnz'   //  Public Key
    )
    .then((result) => {
        alert("Message Sent Successfully! Munavvar will contact you soon.");
        setShowForm(false);
    }, (error) => {
        alert("Failed to send message: " + error.text);
    });
  };

  return (
    <footer id="contact-footer" className="bg-slate-950 text-white py-12 border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Munavvar</h2>
          <p className="text-slate-500 text-sm mt-1">Built with React & Tailwind © 2025.
            </p>
            <p className="text-slate-500 text-sm mt-1">
            All Rights Reserved.</p>
        </div>
        <div className="flex gap-6">
           <a href="https://github.com/dashboard" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition transform hover:scale-110"><FaGithub size={22} /></a>
           <a href="https://www.linkedin.com/in/munavvar-khan-245651377/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition transform hover:scale-110"><FaLinkedin size={22} /></a>
           <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition transform hover:scale-110"><FaInstagram size={22} /></a>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-violet-100 hover:scale-105 transition shadow-lg">
          <FaEnvelope /> Get In Touch
        </button>
      </div>
      <AnimatePresence>
        {showForm && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 relative shadow-2xl">
                <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition"><FaTimes size={20}/></button>
                <h3 className="text-xl font-bold mb-2 text-white">Send Message</h3>
                <p className="text-slate-500 text-sm mb-6">Fill out the form and I'll receive an email instantly.</p>
                
                {/* IMPORTANT: ref={form} is attached here */}
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <input type="text" name="user_name" placeholder="Your Name" className="w-full p-3.5 bg-slate-950 rounded-xl text-white border border-slate-800 focus:border-violet-500 focus:outline-none transition" required />
                  <input type="email" name="user_email" placeholder="Your Email" className="w-full p-3.5 bg-slate-950 rounded-xl text-white border border-slate-800 focus:border-violet-500 focus:outline-none transition" required />
                  <textarea name="message" rows="4" placeholder="Your Message..." className="w-full p-3.5 bg-slate-950 rounded-xl text-white border border-slate-800 focus:border-violet-500 focus:outline-none transition" required></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-violet-600/20 transition active:scale-95">Send Message</button>
                </form>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

function App() {
  return (
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-white selection:bg-violet-500 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;