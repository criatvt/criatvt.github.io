import React from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Github,
  ArrowRight, 
  BookOpen, 
  PenTool, 
  Star, 
  Camera,
  Calendar, 
  MapPin,
  ExternalLink, 
  Mic2, 
  Globe,
  FileText,
  Quote
} from "lucide-react";

const Nav = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-stone/80 backdrop-blur-md border-b border-prussian/5">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
      <a href="#" className="font-serif text-2xl tracking-tighter text-prussian">Aasif Iqbal J.</a>
      <div className="hidden md:flex gap-12 font-serif text-[10px] uppercase tracking-[0.3em] text-prussian/60">
        <a href="#projects" className="hover:text-umber transition-colors">Projects</a>
        <a href="#writing" className="hover:text-umber transition-colors">Writing</a>
        <a href="#speaking" className="hover:text-umber transition-colors">Speaking</a>
        <a href="#contact" className="hover:text-umber transition-colors">Contact</a>
      </div>
    </div>
  </nav>
);

export default function App() {
  return (
    <div className="min-h-screen bg-stone selection:bg-umber/20 selection:text-prussian overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-[4.5rem] md:text-[11.5rem] leading-[0.85] tracking-tighter text-prussian mb-12">
              In a world of <br />
              distraction, <br />
              <span className="italic text-umber underline decoration-1 underline-offset-[16px] decoration-umber/30">I read and write</span> <br />
              to think.
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-8 mt-16">
              <a 
                href="#projects"
                className="bg-prussian text-stone px-12 py-6 rounded-full font-serif text-xl hover:bg-umber transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                Explore my work
              </a>
              <div className="hidden sm:block h-[1px] w-24 bg-prussian/10"></div>
              <p className="text-xl text-prussian/40 font-serif italic">
                Founder, Author & Educator.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Story - Evolution */}
      <section id="story" className="section-full bg-stone border-y border-prussian/5 py-32 md:py-48">
        <div className="content-container">
          <div className="max-w-5xl">
            <h2 className="font-serif text-sm uppercase tracking-[0.4em] text-umber mb-16">The Evolution</h2>
            <div className="space-y-16">
              <p className="text-3xl md:text-6xl font-serif text-prussian leading-[1.1] tracking-tighter">
                Quit a stable IT career in 2017 to ride solo across East India. Returned with a clarity that redirected my life toward education.
              </p>
              <p className="text-2xl md:text-4xl font-serif text-prussian/60 leading-tight italic">
                Co-founded iamneo.ai—scaling the vision until its acquisition by NIIT in 2025.
              </p>
              <div className="pt-8 border-t border-prussian/5">
                <p className="text-2xl md:text-4xl font-serif text-prussian/90 leading-relaxed max-w-4xl">
                  Now translating that journey into books, focus environments, and policy advisory for a more intentional future. 
                  Currently building <a href="#projects" className="text-umber underline decoration-1 underline-offset-8 decoration-umber/30 hover:text-prussian hover:decoration-prussian transition-all">sollu.io</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority 01: Sollu */}
      <section id="projects" className="section-full bg-prussian text-stone overflow-hidden relative py-32 md:py-64">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-10">
              <h3 className="text-[5rem] md:text-[10rem] font-serif leading-none tracking-tighter mb-8 lowercase">sollu</h3>
              <p className="text-3xl md:text-6xl italic font-serif text-stone mb-12 leading-tight">
                Write at the speed of thought, privately.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
                 <div>
                    <h4 className="text-stone font-serif text-lg mb-4 uppercase tracking-widest border-b border-stone/10 pb-2">Local-First</h4>
                    <p className="text-stone/40 text-sm">Everything happens on-device. Audio lives in memory only while you hold the key.</p>
                 </div>
                 <div>
                    <h4 className="text-stone font-serif text-lg mb-4 uppercase tracking-widest border-b border-stone/10 pb-2">Multilingual</h4>
                    <p className="text-stone/40 text-sm">Switch between English, Tamil, or Hindi mid-sentence. Sollu keeps up.</p>
                 </div>
              </div>

              <a 
                href="https://sollu.io" 
                target="_blank"
                className="inline-flex items-center gap-6 bg-umber text-stone px-12 py-6 rounded-full text-xl hover:bg-stone hover:text-prussian transition-all group"
              >
                Join the Beta <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Experiments: Next Read & Reading Run */}
      <section className="section-full bg-stone py-32 md:py-48 border-b border-prussian/5">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-24">
             <h3 className="text-4xl md:text-6xl font-serif text-prussian tracking-tighter italic">Digital Experiments.</h3>
             <p className="text-prussian/40 font-serif italic text-xl">Tools built to solve my own curiosity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group border border-prussian/10 p-12 hover:bg-stone transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-prussian/5 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-umber/50" />
                </div>
                <a href="https://nextread.aasifj.com" target="_blank" className="text-prussian/20 group-hover:text-umber transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
              <h4 className="text-3xl font-serif text-prussian mb-6 group-hover:text-umber transition-colors">Next Read</h4>
              <p className="text-lg text-prussian/60 font-serif italic mb-8 leading-relaxed">
                A simple tool to help you decide what to read next, based on your current mood and interest. No algorithms, just intention.
              </p>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-prussian flex items-center gap-3">
                Visit Site <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group border border-prussian/10 p-12 hover:bg-stone transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-prussian/5 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-umber/50" />
                </div>
                <a href="https://readingrun.aasifj.com" target="_blank" className="text-prussian/20 group-hover:text-umber transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
              <h4 className="text-3xl font-serif text-prussian mb-6 group-hover:text-umber transition-colors">Reading Run</h4>
              <p className="text-lg text-prussian/60 font-serif italic mb-8 leading-relaxed">
                Tracking the literature that moves us. A minimal digital shelf designed for deep readers who care about the journey.
              </p>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-prussian flex items-center gap-3">
                Visit Site <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Priority 02: Doomscroller to Reader */}
      <section id="book" className="section-full bg-stone relative overflow-hidden py-32 md:py-64 border-y border-prussian/5">
        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1 mb-24 lg:mb-0">
              <motion.div
                initial={{ rotate: 10, y: 40 }}
                whileInView={{ rotate: -2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute -inset-24 bg-umber/10 blur-[120px] rounded-full"></div>
                <img 
                  src="https://m.media-amazon.com/images/P/B0GH73Z8RP.01.LZZZZZZZ.jpg" 
                  alt="Doomscroller to Reader" 
                  className="relative w-80 md:w-[500px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-r-4 border-black/10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-7 order-2 lg:order-2">
              <h2 className="text-7xl md:text-[9.5rem] font-serif text-prussian leading-[0.8] tracking-tighter mb-12">
                Doomscroller <br />
                <span className="italic text-umber underline decoration-1 underline-offset-[16px] decoration-umber/20">to Reader.</span>
              </h2>
              
              <div className="flex items-center gap-6 mb-16 border-l-4 border-umber pl-8 py-4 bg-prussian/5">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-umber text-umber" />
                  ))}
                   <div className="relative w-5 h-5">
                    <Star className="absolute inset-0 w-5 h-5 text-prussian/10" />
                    <div className="absolute inset-0 overflow-hidden w-[80%]">
                      <Star className="w-5 h-5 text-umber fill-umber" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-black text-prussian">4.8/5</span>
                  <span className="text-[10px] uppercase tracking-widest text-prussian/40 font-bold">Reader Reviews</span>
                </div>
              </div>

              <p className="text-3xl md:text-5xl font-serif text-prussian/80 mb-16 leading-tight max-w-2xl">
                Build a reading habit without giving up your phone.
              </p>

              <div className="space-y-16 mb-16 border-l border-prussian/10 pl-12 font-serif italic text-prussian/60">
                <blockquote className="text-xl md:text-2xl relative">
                  "Aasif shows you how to turn the same instinct that makes you reach for your phone into a lifelong reading habit that actually sticks."
                  <footer className="mt-6 text-xs uppercase tracking-widest font-bold not-italic text-prussian">&mdash; Ankur Warikoo, Entrepreneur</footer>
                </blockquote>
                <blockquote className="text-xl md:text-2xl relative">
                  "Doomscroller to Reader is simple, straightforward and surprisingly hopeful."
                  <footer className="mt-6 text-xs uppercase tracking-widest font-bold not-italic text-prussian">&mdash; Meetha Raghunath, Actor</footer>
                </blockquote>
              </div>

              <a 
                href="https://www.amazon.in/dp/B0GH73Z8RP/"
                target="_blank"
                className="bg-prussian text-stone px-12 py-6 rounded-full text-xl hover:bg-umber transition-all shadow-2xl inline-block"
              >
                Order on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Priority 03: Writing */}
      <section id="writing" className="section-full py-32 md:py-64">
        <div className="content-container">
          <div className="mb-32">
             <div className="flex flex-col md:flex-row justify-between items-baseline gap-12">
               <h2 className="text-7xl md:text-[11rem] font-serif italic text-prussian leading-none tracking-tighter">Writing.</h2>
               <div className="h-[1px] flex-1 bg-prussian/10 hidden md:block"></div>
               <a href="https://aasifj.substack.com" target="_blank" className="font-serif text-2xl text-umber border-b border-umber pb-1 italic hover:text-prussian hover:border-prussian transition-all">
                 Selected Essays
               </a>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-48">
             <div className="space-y-24">
                <div className="flex items-center gap-6">
                  <span className="font-serif text-2xl md:text-4xl uppercase font-black text-prussian tracking-tighter">THE HINDU</span>
                  <div className="h-[2px] w-24 bg-umber/30"></div>
                </div>
                
                <div className="group space-y-8">
                  <a href="https://www.thehindu.com/education/indias-tech-education-crisis-when-computer-engineers-cant-code/article69243098.ece" target="_blank" className="block">
                    <h3 className="text-4xl md:text-5xl font-serif group-hover:text-umber transition-colors leading-tight mb-6">
                      India’s tech education crisis: When engineers can’t code.
                    </h3>
                  </a>
                  <p className="text-xl text-prussian/60 font-serif italic leading-relaxed">
                    A deep dive into why Indian engineering graduates face a skills gap in the age of global competition.
                  </p>
                </div>

                <div className="h-[1px] w-full bg-prussian/5"></div>

                <div className="group space-y-8">
                  <a href="https://www.thehindu.com/education/cbses-future-ready-ai-curriculum-but-are-students-ready/article70823388.ece" target="_blank" className="block">
                    <h3 className="text-4xl md:text-5xl font-serif group-hover:text-umber transition-colors leading-tight mb-6">
                      CBSE’s future-ready AI curriculum, but are students ready?
                    </h3>
                  </a>
                  <p className="text-xl text-prussian/60 font-serif italic leading-relaxed">
                    Examining the gap between policy ambitions and the practical readiness of students for an AI-infused future.
                  </p>
                </div>
             </div>
             
             <div className="group space-y-12">
                <div className="flex items-center gap-6">
                  <span className="font-serif text-2xl md:text-4xl uppercase font-black text-prussian tracking-tighter">DECCAN HERALD</span>
                  <div className="h-[2px] w-24 bg-umber/30"></div>
                </div>
                <a href="https://www.deccanherald.com/education/lessons-about-social-media-usage-from-the-idiot-box-era-2-3958121" target="_blank" className="block">
                  <h3 className="text-4xl md:text-6xl font-serif group-hover:text-umber transition-colors leading-tight mb-8">
                    Lessons about social media usage from the idiot-box era.
                  </h3>
                </a>
                <p className="text-xl text-prussian/60 font-serif italic leading-relaxed">
                  Rediscovering wisdom from a previous generation of screens to navigate the complexities of today's social landscape.
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                title: "In defence of bad handwriting", 
                url: "https://aasifj.substack.com/p/in-defence-of-bad-handwriting",
                snippet: "Why the slowness of the hand is essential for the depth of the thought."
              },
              { 
                title: "An unhurried childhood", 
                url: "https://aasifj.substack.com/p/an-unhurried-childhood",
                snippet: "A meditation on growth, time, and why we shouldn't rush the process."
              },
              { 
                title: "Books, Gates and a Scientist", 
                url: "https://aasifj.substack.com/p/books-gates-and-a-scientist",
                snippet: "A meditation on the intersections of literature, technology, and the enduring quest for knowledge."
              }
            ].map((essay, i) => (
              <motion.div 
                key={i}
                className="group border-t border-prussian/10 pt-12 flex flex-col h-full"
              >
                <a href={essay.url} target="_blank" className="flex flex-col h-full">
                  <h4 className="text-3xl font-serif group-hover:text-umber transition-colors leading-tight mb-8">
                    {essay.title}
                  </h4>
                  <p className="text-prussian/60 font-body text-base leading-relaxed mb-12 flex-grow">{essay.snippet}</p>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-prussian group-hover:text-umber transition-colors flex items-center gap-3">
                    Substack <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority 04: Speaking */}
      <section id="speaking" className="section-full bg-prussian text-stone overflow-hidden relative py-32 md:py-64">
         <div className="content-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
               <div className="lg:col-span-7">
                  <h2 className="text-6xl md:text-[7.5rem] font-serif leading-none tracking-tighter mb-16">
                    Speaking at <br />
                    <span className="italic text-umber">Vidyavanam.</span>
                  </h2>
                  <div className="space-y-12 font-serif text-2xl text-stone/70 mb-20">
                     <div className="flex items-center gap-8">
                        <MapPin className="w-8 h-8 text-umber/50" />
                        <div>
                           <p className="text-stone font-bold">Anaikatti, Coimbatore</p>
                           <p className="text-sm opacity-50 uppercase tracking-widest mt-1">6th National Conference on Education</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <Calendar className="w-8 h-8 text-umber/50" />
                        <p className="text-stone font-bold">29th & 30th May, 2026</p>
                     </div>
                  </div>
                  <a 
                    href="https://vidyavanam.org/events/" 
                    target="_blank"
                    className="inline-flex items-center gap-6 bg-stone text-prussian px-12 py-6 rounded-full text-xl hover:bg-umber hover:text-stone transition-all shadow-xl"
                  >
                    Conference Details <ExternalLink className="w-5 h-5" />
                  </a>
               </div>
               
               <div className="lg:col-span-5">
                  <div className="p-12 bg-stone/5 border border-stone/10 font-serif">
                     <h3 className="text-4xl italic mb-10 border-b border-stone/10 pb-8 text-stone">Webinar: Policy in the Machine Age</h3>

                     <div className="aspect-video bg-black shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden relative">
                        {/* Featured Presentation Embed */}
                        <iframe 
                          src="https://www.youtube.com/embed/dC6O7ysyudU" 
                          className="w-full h-full opacity-70 hover:opacity-100 transition-opacity"
                          title="Navigating the Machine Age"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Priority 05: Photography */}
      <section id="photography" className="section-full bg-stone overflow-hidden py-32 md:py-64 border-y border-prussian/5">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div>
              <h3 className="text-7xl md:text-[10rem] font-serif italic leading-none tracking-tighter text-prussian">Photography.</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12 font-serif italic text-2xl md:text-4xl text-prussian/70 leading-snug">
                <p className="border-l-4 border-umber/30 pl-10">
                  A body of work observing the silent transitions of the natural world.
                </p>
                <p className="border-l-4 border-umber/30 pl-10">
                  Exploring biophilic rhythms as a means to reconnect with the unhurried life.
                </p>
              </div>
              <a 
                href="https://www.flickr.com/photos/criatvt/albums/72157687588601032/" 
                target="_blank"
                className="inline-flex items-center gap-8 text-umber font-serif text-3xl hover:text-prussian transition-colors group"
              >
                Flickr Album <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
              </a>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[4/5] md:aspect-video bg-card shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-prussian/5">
                <iframe 
                  src="https://www.flickr.com/photos/criatvt/albums/72157687588601032/player/" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Photography Archive"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-full bg-stone pt-64 pb-32">
        <div className="content-container">
          <div className="text-center mb-48">
            <h2 className="font-serif text-sm uppercase tracking-[0.5em] text-umber mb-16">Connect</h2>
            <a href="mailto:aasif@aasifj.com" className="text-5xl md:text-[11.5rem] font-serif text-prussian hover:text-umber transition-colors tracking-tighter leading-none block border-b-4 border-prussian/5 pb-16">
              aasif@aasifj.com
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-16 mt-24">
             <a href="https://linkedin.com/in/aasifiqbalj" target="_blank" className="text-prussian/40 hover:text-prussian transition-all transform hover:-translate-y-1" title="LinkedIn">
                <Linkedin className="w-8 h-8" />
             </a>
             <a href="https://aasifj.substack.com" target="_blank" className="text-prussian/40 hover:text-prussian transition-all transform hover:-translate-y-1" title="Substack">
                <PenTool className="w-8 h-8" />
             </a>
             <a href="https://github.com/criatvt/" target="_blank" className="text-prussian/40 hover:text-prussian transition-all transform hover:-translate-y-1" title="GitHub">
                <Github className="w-8 h-8" />
             </a>
             <a href="https://instagram.com/theaasifj" target="_blank" className="text-prussian/40 hover:text-prussian transition-all transform hover:-translate-y-1" title="Instagram">
                <Instagram className="w-8 h-8" />
             </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-[10px] uppercase tracking-[0.8em] text-prussian/20 font-medium font-serif border-t border-prussian/5 bg-stone">
        &copy; {new Date().getFullYear()} Aasif Iqbal J.
      </footer>
    </div>
  );
}
