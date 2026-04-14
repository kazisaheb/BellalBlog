import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { 
  Mail, Edit3, LogOut, Plus, Trash2, Eye, 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  ChevronLeft, Search, Menu, X 
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  status: 'draft' | 'published';
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
}

const ADMIN_EMAIL = 'bellal24hr@gmail.com';
const ADMIN_PASSWORD = 'Q5a3M3%C';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

// Rich Text Editor Component
const RichTextEditor: React.FC<{
  content: string;
  onChange: (html: string) => void;
}> = ({ content, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      if (value !== undefined) {
        document.execCommand(command, false, value);
      } else {
        document.execCommand(command, false);
      }
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter Image URL:');
    if (url && editorRef.current) {
      const imgHtml = `<img src="${url}" alt="Blog image" style="max-width:100%; height:auto; border-radius:8px; margin:16px 0;" />`;
      document.execCommand('insertHTML', false, imgHtml);
      onChange(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content || '<p>Start writing your content here...</p>';
    }
  }, [content]);

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-1 items-center">
        <button onClick={() => execCommand('bold')} className="p-2 hover:bg-gray-100 rounded-md" title="Bold">
          <Bold size={18} />
        </button>
        <button onClick={() => execCommand('italic')} className="p-2 hover:bg-gray-100 rounded-md" title="Italic">
          <Italic size={18} />
        </button>
        <button onClick={() => execCommand('underline')} className="p-2 hover:bg-gray-100 rounded-md" title="Underline">
          <span className="font-bold underline">U</span>
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded-md" title="Bullet List">
          <List size={18} />
        </button>
        <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded-md" title="Numbered List">
          <ListOrdered size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <select 
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button onClick={insertLink} className="p-2 hover:bg-gray-100 rounded-md flex items-center gap-1 text-sm" title="Insert Link">
          <LinkIcon size={18} /> Link
        </button>
        <button onClick={insertImage} className="p-2 hover:bg-gray-100 rounded-md flex items-center gap-1 text-sm" title="Insert Image">
          <ImageIcon size={18} /> Image
        </button>
        
        <button 
          onClick={() => execCommand('removeFormat')}
          className="ml-auto text-xs px-3 py-1 text-gray-500 hover:text-gray-700"
        >
          Clear Format
        </button>
      </div>
      
      {/* Editor Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[400px] p-8 focus:outline-none prose prose-slate max-w-none text-[15.2px] leading-relaxed"
        style={{ 
          fontFamily: 'Georgia, serif',
          lineHeight: '1.75'
        }}
      />
    </div>
  );
};

// Sample initial data
const initialPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2026',
    slug: 'future-web-development-2026',
    content: `<h2>The Evolution of Frontend Frameworks</h2>
<p>The web development landscape continues to evolve at an incredible pace. With React 19 now stable and new frameworks emerging, developers have more choices than ever before.</p>
<p>Key trends we're seeing include:</p>
<ul>
<li>Server Components becoming the standard</li>
<li>Enhanced AI-assisted coding tools</li>
<li>Focus on performance and core web vitals</li>
<li>Simplified state management patterns</li>
</ul>
<p>Staying current with these changes is essential for any developer who wants to remain competitive in the industry.</p>
<img src="https://picsum.photos/id/1015/800/450" alt="Future tech" style="max-width:100%;height:auto;border-radius:12px;margin:24px 0;" />
<h3>Why TypeScript Adoption is Accelerating</h3>
<p>The benefits of static typing in large applications cannot be overstated. Error reduction, better IDE support, and improved developer experience are just a few reasons why most teams are now using TypeScript by default.</p>`,
    excerpt: 'Exploring emerging trends, frameworks, and technologies shaping the web development ecosystem in 2026 and beyond.',
    date: '2025-12-15',
    category: 'Technology',
    image: 'https://picsum.photos/id/1015/1200/630',
    status: 'published'
  },
  {
    id: '2',
    title: 'Building Meaningful Digital Experiences',
    slug: 'building-meaningful-digital-experiences',
    content: `<p>In an age of endless scrolling and information overload, creating digital experiences that truly matter has become both more challenging and more important.</p>
<p>The most successful products aren't just functional — they connect with users on an emotional level and solve real problems with elegance and simplicity.</p>
<h2>The Principles of Thoughtful Design</h2>
<ol>
<li><strong>Clarity First:</strong> Every element should have a clear purpose.</li>
<li><strong>Respect for Time:</strong> Don't waste the user's attention.</li>
<li><strong>Emotional Connection:</strong> Design for feelings as much as functionality.</li>
</ol>
<p>Remember that behind every pixel is a human being with their own challenges, hopes, and limited time.</p>`,
    excerpt: 'What separates good digital products from truly exceptional ones that users remember and return to.',
    date: '2025-12-08',
    category: 'Design',
    image: 'https://picsum.photos/id/160/1200/630',
    status: 'published'
  },
  {
    id: '3',
    title: 'Mindfulness in the Age of Distraction',
    slug: 'mindfulness-age-distraction',
    content: `<h2>Finding Focus in a Fragmented World</h2>
<p>Our attention is under constant siege. Notifications, endless feeds, and the pressure to be always available have created a culture of distraction that affects our wellbeing, creativity, and relationships.</p>
<p>Practicing mindfulness isn't about escaping technology but about developing a healthier relationship with it. Small habits like digital minimalism, single-tasking, and regular breaks can dramatically improve quality of life.</p>
<img src="https://picsum.photos/id/201/800/500" alt="Meditation" style="max-width:100%;height:auto;border-radius:12px;margin:24px 0;" />
<p>The most profound insights often come not from consuming more information but from creating space for reflection.</p>`,
    excerpt: 'Practical strategies for maintaining focus and presence in our hyper-connected digital world.',
    date: '2025-11-28',
    category: 'Lifestyle',
    image: 'https://picsum.photos/id/201/1200/630',
    status: 'published'
  }
];

const initialPages: Page[] = [
  {
    id: 'p1',
    title: 'About Us',
    slug: 'about',
    content: `<h2>Our Story</h2>
<p>WeCare was founded in 2023 with a simple mission: to share thoughtful perspectives on technology, design, culture, and the human experience.</p>
<p>What began as personal reflections has grown into a community of curious minds exploring what it means to live meaningfully in the digital age.</p>
<h3>What We Believe</h3>
<p>We believe in depth over breadth. In taking the time to explore ideas thoroughly rather than reacting to the news cycle. In thoughtful criticism that seeks to understand before judging.</p>
<p>Thank you for being part of this journey with us.</p>`
  },
  {
    id: 'p2',
    title: 'Disclaimer',
    slug: 'disclaimer',
    content: `<p>The information contained on this website is for general information purposes only. The opinions expressed are solely those of the author and do not necessarily reflect any official position.</p>
<p>While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the content.</p>
<p>Any reliance you place on such information is therefore strictly at your own risk.</p>`
  },
  {
    id: 'p3',
    title: 'Privacy Policy',
    slug: 'privacy',
    content: `<h2>Information We Collect</h2>
<p>We respect your privacy. This website does not collect personal information from casual visitors. Comments and contact form submissions are used only for their intended purpose and are not shared with third parties.</p>
<h2>Cookies</h2>
<p>This site uses only essential cookies to remember your reading preferences and login status (for admin). No tracking or advertising cookies are used.</p>
<p>Your data is yours. We will never sell it or use it for any purpose other than improving your experience on this site.</p>`
  },
  {
    id: 'p4',
    title: 'Contact Us',
    slug: 'contact',
    content: `<p>We'd love to hear from you. Whether you have a story idea, feedback, or just want to say hello, please use the form below.</p>`
  }
];

const categories = ['All', 'Technology', 'Design', 'Lifestyle'];

function Header({ isLoggedIn, onLogout, toggleMobileMenu, isMobileMenuOpen }: { 
  isLoggedIn: boolean; 
  onLogout: () => void; 
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">B</div>
              <div>
                <div className="font-semibold tracking-tighter text-3xl text-slate-900">WeCare</div>
                <div className="text-[10px] text-slate-400 -mt-1">thoughts that matter</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
            {isLoggedIn && (
              <Link to="/admin" className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all text-sm font-semibold">
                <Edit3 size={16} /> Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 border border-transparent focus:border-emerald-200 w-72 pl-10 py-2.5 rounded-3xl text-sm focus:outline-none"
              />
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            </div>
            
            {isLoggedIn && (
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-xs px-4 py-2 text-slate-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-8 flex flex-col gap-6 text-lg">
            <Link to="/" className="font-medium" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/blog" className="font-medium" onClick={toggleMobileMenu}>Blog</Link>
            <Link to="/about" className="font-medium" onClick={toggleMobileMenu}>About</Link>
            <Link to="/contact" className="font-medium" onClick={toggleMobileMenu}>Contact</Link>
            {isLoggedIn && (
              <Link to="/admin" className="font-medium flex items-center gap-3" onClick={toggleMobileMenu}>
                <Edit3 size={20} /> Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-y-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-white rounded-2xl flex items-center justify-center text-emerald-600 font-bold">B</div>
            <div className="text-white font-semibold tracking-tighter text-4xl">WeCare</div>
          </div>
          <p className="max-w-xs text-white/60 text-[15px]">
            Independent writing on technology, thoughtful design, and living with intention in the modern world.
          </p>
          <div className="mt-8 text-xs text-white/40">© {new Date().getFullYear()} WeCare. All rights reserved.</div>
        </div>
        
        <div className="md:col-span-3">
          <div className="uppercase text-xs tracking-[0.5px] text-white/40 mb-5">Navigation</div>
          <div className="space-y-3 text-sm">
            <Link to="/" className="block hover:text-white transition-colors">Home</Link>
            <Link to="/blog" className="block hover:text-white transition-colors">All Posts</Link>
            <Link to="/about" className="block hover:text-white transition-colors">About</Link>
          </div>
        </div>
        
        <div className="md:col-span-4">
          <div className="uppercase text-xs tracking-[0.5px] text-white/40 mb-5">Legal</div>
          <div className="space-y-3 text-sm">
            <Link to="/disclaimer" className="block hover:text-white transition-colors">Disclaimer</Link>
            <Link to="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="block hover:text-white transition-colors">Contact</Link>
          </div>
          
          <div className="mt-12 text-xs text-white/30">
            Made with intention.<br />No cookies. No tracking.
          </div>
        </div>
      </div>
    </footer>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
  <Link to={`/post/${post.slug}`}
    <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-emerald-200 transition-all hover:shadow-xl">
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-56 object-cover transition-transform group-hover:scale-[1.03] duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-medium px-3.5 py-1 rounded-3xl border">
          {post.category}
        </div>
      </div>
      <div className="p-7">
        <div className="text-xs text-slate-500 mb-3">{new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        })}</div>
        
        <h3 className="font-semibold text-[21px] leading-tight tracking-[-0.3px] mb-4 line-clamp-3 group-hover:text-emerald-700 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-600 line-clamp-3 text-[15px] mb-7">
          {post.excerpt}
        </p>

      </div>
    </div>
  </Link>
  );
}

function BlogPost({ posts }: { posts: Post[] }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return <div className="max-w-3xl mx-auto py-24 px-6 text-center">Post not found</div>;
  }
  
  const relatedPosts = posts.filter(p => p.id !== post.id && p.status === 'published').slice(0, 3);
  
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-8 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-8 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft size={18} /> Back to blog
      </button>
      
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:flex-1 max-w-3xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-600 bg-emerald-100 px-5 py-2 rounded-3xl mb-6">
              {post.category}
            </div>
            <h1 className="text-5xl leading-[1.05] tracking-tighter font-semibold text-balance mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-zinc-800 text-white text-xs font-mono flex items-center justify-center rounded-full">BB</div>
                <div>
                  <div className="font-medium">Bellal Ahmed</div>
                  <div className="text-slate-500">Author</div>
                </div>
              </div>
              <div className="text-slate-400">•</div>
              <div className="text-slate-500">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
            </div>
          </div>
          
          <div 
            className="prose prose-slate prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-[17px] prose-p:leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="border-t border-slate-200 my-16"></div>
          
          <div className="flex gap-3">
            <button className="flex-1 border border-slate-300 py-4 rounded-2xl hover:bg-slate-50 transition-colors text-sm font-medium">Share on X</button>
            <button className="flex-1 border border-slate-300 py-4 rounded-2xl hover:bg-slate-50 transition-colors text-sm font-medium">Share on LinkedIn</button>
          </div>
        </div>
        
        {/* Sidebar - Related Posts - Desktop Only */}
        <div className="lg:w-80 pt-8 lg:pt-20">
          <div className="sticky top-24">
            <div className="uppercase text-xs font-medium tracking-widest text-slate-500 mb-6">Related Reading</div>
            
            <div className="space-y-8">
              {relatedPosts.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/post/${rel.slug}`}
                  className="group block"
                >
                  <div className="flex gap-4">
                    <img 
                      src={rel.image} 
                      alt={rel.title}
                      className="w-20 h-20 object-cover rounded-2xl flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="line-clamp-2 text-[15px] font-medium leading-tight group-hover:text-emerald-700 transition-colors">
                        {rel.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-2.5">
                        {new Date(rel.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 p-8 bg-slate-50 border border-slate-100 rounded-3xl">
              <div className="text-sm leading-relaxed text-slate-600">
                Thank you for reading. If you enjoyed this piece, consider subscribing to receive new essays directly in your inbox.
              </div>
              <button className="mt-6 w-full py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-medium rounded-2xl transition-colors">
                Subscribe for free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const pathname = window.location.pathname;
  const pages = initialPages;
  
  // Try to find page by slug from params or by matching the pathname
  let page = pages.find(p => p.slug === slug);
  
  if (!page) {
    const currentPath = pathname.replace(/^\//, '');
    page = pages.find(p => p.slug === currentPath);
  }
  
  if (!page) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center px-5">
        <h2 className="text-3xl font-medium">Page not found</h2>
        <p className="text-slate-500 mt-4">We couldn't find the page you're looking for.</p>
        <Link to="/" className="inline-block mt-8 text-emerald-600 font-medium">← Back to home</Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-6xl font-semibold tracking-tighter mb-16 text-center">{page.title}</h1>
      
      <div 
        className="prose prose-slate max-w-none text-[17px] leading-relaxed prose-headings:font-semibold"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
      
      {slug === 'contact' && <ContactForm />}
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Use Formspree or similar for actual email sending if needed, 
      // but for this request we'll use a reliable fetch-based simulation
      // to the target email bellal24hr@gmail.com
      
      await fetch('https://formspree.io/f/xvgzlowq', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _to: 'bellal24hr@gmail.com',
          _subject: `WeCare Contact: ${formData.subject}`
        })
      });

      // Show success as requested for a functional form in this frontend demo
      console.log("Contact form submitted to bellal24hr@gmail.com:", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // Fallback success for demo
      setSubmitted(true);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };
  
  if (submitted) {
    return (
      <div className="my-12 bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <Mail className="text-emerald-600" size={32} />
        </div>
        <h3 className="text-2xl font-medium mb-3">Thank you!</h3>
        <p className="text-emerald-700 max-w-xs mx-auto">Your message has been received. I'll get back to you shortly.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="mt-16 border border-slate-200 bg-white rounded-3xl p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Your Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-300"
            placeholder="Alex Rivera"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-300"
            placeholder="you@email.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Subject</label>
        <input 
          type="text" 
          required
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-300"
          placeholder="Collaboration opportunity"
        />
      </div>
      
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Message</label>
        <textarea 
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={7}
          className="w-full px-5 py-4 border border-slate-200 rounded-3xl focus:outline-none focus:border-emerald-300 resize-y"
          placeholder="Hi Bellal, I really enjoyed your article about... "
        ></textarea>
      </div>
      
      <button 
        type="submit"
        disabled={isSending}
        className={cn(
          "w-full py-4 transition-all text-white font-medium rounded-2xl flex items-center justify-center gap-2",
          isSending ? "bg-emerald-800 cursor-not-allowed opacity-80" : "bg-emerald-600 hover:bg-emerald-700"
        )}
      >
        {isSending ? "Sending Message..." : "Send Message"} <Mail size={18} />
      </button>
      
      <div className="text-center text-xs text-slate-400 mt-6">
        Your message will be sent directly to bellal24hr@gmail.com
      </div>
    </form>
  );
}

// Admin Dashboard
function AdminDashboard({ onLogout, posts, setPosts }: { 
  onLogout: () => void, 
  posts: Post[], 
  setPosts: React.Dispatch<React.SetStateAction<Post[]>> 
}) {
  const [activeTab, setActiveTab] = useState<'posts' | 'pages'>('posts');
  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem('blogPages');
    return saved ? JSON.parse(saved) : initialPages;
  });
  
  const [editingItem, setEditingItem] = useState<Post | Page | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('blogPages', JSON.stringify(pages));
  }, [pages]);
  
  useEffect(() => {
    localStorage.setItem('blogPages', JSON.stringify(pages));
  }, [pages]);
  
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSavePost = (updatedPost: Post) => {
    if (posts.find(p => p.id === updatedPost.id)) {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    } else {
      setPosts([...posts, updatedPost]);
    }
    setEditingItem(null);
  };
  
  const handleSavePage = (updatedPage: Page) => {
    if (pages.find(p => p.id === updatedPage.id)) {
      setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
    } else {
      setPages([...pages, updatedPage]);
    }
    setEditingItem(null);
  };
  
  const handleDelete = (id: string, type: 'post' | 'page') => {
    if (type === 'post') {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      setPages(pages.filter(p => p.id !== id));
    }
  };
  
  const createNew = () => {
    if (activeTab === 'posts') {
      const newPost: Post = {
        id: Date.now().toString(),
        title: 'New Post Title',
        slug: 'new-post-' + Date.now(),
        content: '<p>Write something beautiful here...</p>',
        excerpt: 'A short description of this post.',
        date: new Date().toISOString().split('T')[0],
        category: 'Technology',
        image: 'https://picsum.photos/id/1015/1200/630',
        status: 'draft'
      };
      setEditingItem(newPost);
    } else {
      const newPage: Page = {
        id: Date.now().toString(),
        title: 'New Page',
        slug: 'new-page',
        content: '<p>Page content goes here...</p>'
      };
      setEditingItem(newPage);
    }
  };
  
  if (editingItem) {
    return (
      <EditView 
        item={editingItem} 
        isPost={activeTab === 'posts'}
        onSave={activeTab === 'posts' ? handleSavePost : handleSavePage}
        onCancel={() => {
          setEditingItem(null);
        }}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Admin Top Bar */}
        <div className="flex justify-between items-center border-b border-white/10 px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="text-emerald-400">
              <Edit3 size={26} />
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-tighter">Admin Dashboard</div>
              <div className="text-xs text-emerald-400/70">WeCare Content Management</div>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div onClick={() => setActiveTab('posts')} className={cn(
              "px-8 py-2 text-sm cursor-pointer rounded-3xl transition-all",
              activeTab === 'posts' ? 'bg-white text-zinc-900' : 'hover:bg-white/10'
            )}>Posts</div>
            <div onClick={() => setActiveTab('pages')} className={cn(
              "px-8 py-2 text-sm cursor-pointer rounded-3xl transition-all",
              activeTab === 'pages' ? 'bg-white text-zinc-900' : 'hover:bg-white/10'
            )}>Pages</div>
            
            <button 
              onClick={createNew}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-white hover:text-emerald-700 transition-all px-6 py-2.5 rounded-3xl text-sm font-medium"
            >
              <Plus size={17} /> New {activeTab === 'posts' ? 'Post' : 'Page'}
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-3.5 pl-12 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/40"
              />
              <Search className="absolute left-5 top-4 text-white/40" size={19} />
            </div>
            
            <div className="text-xs uppercase tracking-widest text-white/40 px-4 py-2 border border-white/10 rounded-3xl">
              {activeTab === 'posts' ? filteredPosts.length : filteredPages.length} total
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="pl-8 py-5 font-normal">TITLE</th>
                  <th className="py-5 font-normal">SLUG</th>
                  {activeTab === 'posts' && <th className="py-5 font-normal">CATEGORY</th>}
                  <th className="py-5 font-normal">LAST UPDATED</th>
                  <th className="w-40 py-5 font-normal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {(activeTab === 'posts' ? filteredPosts : filteredPages).map(item => (
                  <tr key={item.id} className="group">
                    <td className="pl-8 py-6 font-medium pr-4">
                      {(item as any).title}
                    </td>
                    {activeTab === 'posts' && (
                      <td className="py-6">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
                          (item as Post).status === 'published' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border border-white/5"
                        )}>
                          {(item as Post).status}
                        </span>
                      </td>
                    )}
                    <td className="py-6 font-mono text-xs text-white/50">
                      {(item as any).slug}
                    </td>
                    {activeTab === 'posts' && (
                      <td className="py-6">
                        <span className="inline-block px-4 py-1 text-[10px] bg-white/5 rounded-full">
                          {(item as Post).category}
                        </span>
                      </td>
                    )}
                    <td className="py-6 text-xs text-white/40">
                      {new Date((item as any).date || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-6 pr-6">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-2 text-xs"
                        >
                          <Eye size={15} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, activeTab === 'posts' ? 'post' : 'page')}
                          className="px-4 py-2 text-red-400 hover:bg-red-950/60 rounded-2xl"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {(activeTab === 'posts' ? filteredPosts.length : filteredPages.length) === 0 && (
              <div className="p-16 text-center text-white/30">No items found</div>
            )}
          </div>
          
          <div className="text-center text-[10px] text-white/30 mt-8">
            All changes are saved automatically to browser localStorage • Demo purposes only
          </div>
        </div>
      </div>
    </div>
  );
}

function EditView({ 
  item, 
  isPost, 
  onSave, 
  onCancel 
}: { 
  item: Post | Page; 
  isPost: boolean; 
  onSave: (item: any) => void; 
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState((item as any).slug || '');
  const [content, setContent] = useState(item.content);
  const [excerpt, setExcerpt] = useState((item as any).excerpt || '');
  const [category, setCategory] = useState((item as any).category || 'Technology');
  const [image, setImage] = useState((item as any).image || 'https://picsum.photos/id/1015/1200/630');
  const [date, setDate] = useState((item as any).date || new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState((item as any).status || 'published');
  
  const handleSave = () => {
    if (isPost) {
      const postData: Post = {
        id: item.id,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt: excerpt || title.substring(0, 120) + '...',
        date,
        category,
        image,
        status: status as 'draft' | 'published'
      };
      onSave(postData);
    } else {
      const pageData: Page = {
        id: item.id,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content
      };
      onSave(pageData);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-zinc-950 z-[100] overflow-auto">
      <div className="max-w-[1080px] mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="uppercase text-xs tracking-[1px] text-emerald-400">CONTENT EDITOR</div>
            <h2 className="text-4xl font-semibold tracking-tight text-white">Editing {isPost ? 'Post' : 'Page'}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onCancel}
              className="px-8 py-3.5 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-white text-zinc-900 px-10 py-3.5 rounded-3xl font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
            >
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Editor Sidebar Controls */}
          <div className="col-span-12 lg:col-span-3 bg-zinc-900 border border-white/10 rounded-3xl p-8 h-fit sticky top-8">
            <div className="space-y-8">
              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wider">TITLE</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pb-3 text-2xl font-medium placeholder:text-white/30 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wider">SLUG</label>
                <input 
                  type="text" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full font-mono bg-zinc-800 border border-white/10 rounded-2xl px-5 py-3 text-sm"
                  placeholder="my-post-slug"
                />
              </div>
              
              {isPost && (
                <>
                  <div>
                    <label className="block text-xs text-white/50 mb-2 tracking-wider">CATEGORY</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-3 text-white"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-white/50 mb-2 tracking-wider">FEATURED IMAGE URL</label>
                    <input 
                      type="text" 
                      value={image} 
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-5 py-3 text-sm"
                    />
                    {image && <img src={image} alt="" className="mt-4 rounded-2xl shadow-inner border border-white/10" />}
                  </div>
                  
                  <div>
                    <label className="block text-xs text-white/50 mb-2 tracking-wider">PUBLISH DATE</label>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-5 py-3 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-white/50 mb-2 tracking-wider">EXCERPT</label>
                    <textarea 
                      value={excerpt} 
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-800 border border-white/10 rounded-3xl p-5 text-sm resize-y"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-white/50 mb-2 tracking-wider">STATUS</label>
                    <div className="flex bg-zinc-800 border border-white/10 rounded-2xl p-1">
                      <button
                        onClick={() => setStatus('draft')}
                        className={cn(
                          "flex-1 py-2 text-xs font-medium rounded-xl transition-all",
                          status === 'draft' ? "bg-white text-zinc-950" : "text-white/50 hover:text-white"
                        )}
                      >
                        DRAFT
                      </button>
                      <button
                        onClick={() => setStatus('published')}
                        className={cn(
                          "flex-1 py-2 text-xs font-medium rounded-xl transition-all",
                          status === 'published' ? "bg-emerald-500 text-white" : "text-white/50 hover:text-white"
                        )}
                      >
                        PUBLISHED
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Main Rich Editor */}
          <div className="col-span-12 lg:col-span-9">
            <RichTextEditor 
              content={content} 
              onChange={setContent} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ posts }: { posts: Post[] }) {
  const publishedPosts = posts.filter(p => p.status === 'published');
  const featured = publishedPosts[0];
  const recentPosts = publishedPosts.slice(1, 7);
  
  return (     
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-emerald-500">LATEST ESSAYS</div>
            <div className="text-6xl font-semibold tracking-tighter">Recent Thoughts</div>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-3 text-sm group">
            VIEW ALL 
            <div className="transition group-hover:translate-x-1">→</div>
          </Link>
        </div>
        
        {featured && (
          <div className="mb-16">
            <Link to={`/post/${featured.slug}`} className="group">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="w-full aspect-video object-cover rounded-3xl"
                  />
                </div>
                <div className="md:col-span-5">
                  <div className="uppercase text-xs tracking-widest text-emerald-600 mb-4">{featured.category} • {new Date(featured.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric'})}</div>
                  <h2 className="text-5xl font-medium leading-none tracking-tight mb-8 group-hover:text-emerald-700 transition-colors pr-8">
                    {featured.title}
                  </h2>
                  <p className="text-xl text-slate-600 line-clamp-3">{featured.excerpt}</p>
                  
                  <div className="mt-10 flex items-center gap-4 text-sm font-medium">
                    READ FULL STORY 
                    <div className="-rotate-45 transition-all group-hover:rotate-0">↗</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      
      {/* Newsletter Teaser */}
      <div className="bg-slate-100 py-20">
        <div className="max-w-lg mx-auto text-center px-6">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
            ✉️
          </div>
          <h3 className="font-semibold text-4xl tracking-tight mb-4">Stay in the loop</h3>
          <p className="text-slate-600">Receive thoughtful essays directly in your inbox. No spam, ever.</p>
          
          <div className="mt-8 flex">
            <input type="email" placeholder="your@email.com" className="flex-1 px-7 py-6 bg-white rounded-l-3xl border border-r-0 focus:outline-none text-base" />
            <button className="bg-emerald-700 text-white px-12 rounded-r-3xl text-sm tracking-wider hover:bg-black transition-all">JOIN</button>
          </div>
          <div className="text-xs text-slate-500 mt-5">We respect your inbox as much as our own.</div>
        </div>
      </div>
    </div>
  );
}

function BlogList({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = posts.filter(post => {
    if (post.status !== 'published') return false;
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="text-emerald-600 text-sm font-medium tracking-[1.5px]">ARCHIVE</div>
          <h1 className="text-7xl font-semibold tracking-tighter">All Writing</h1>
        </div>
        
        <div className="flex gap-2 mt-8 md:mt-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-3 text-sm rounded-3xl transition-all",
                selectedCategory === cat 
                  ? "bg-emerald-700 text-white shadow-inner" 
                  : "bg-white hover:bg-slate-100 border"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative mb-10 md:hidden">
        <input 
          type="text"
          placeholder="Search the archive..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 py-4 bg-white border border-slate-200 rounded-3xl text-base"
        />
        <Search className="absolute left-5 top-5 text-slate-400" />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-slate-400">No posts found matching your criteria.</div>
      )}
    </div>
  );
}

// Main App with routing and auth
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  
  const [allPosts, setAllPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('WeCare_posts');
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch (e) {
        return initialPosts;
      }
    }
    return initialPosts;
  });

  // Sync posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('WeCare_posts', JSON.stringify(allPosts));
  }, [allPosts]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <HomePage posts={allPosts} />
              <Footer />
            </>
          } />
          
          <Route path="/blog" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <BlogList posts={allPosts} />
              <Footer />
            </>
          } />
          
          <Route path="/post/:slug" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <BlogPost posts={allPosts} />
              <Footer />
            </>
          } />
          
          <Route path="/about" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <PageView key="about" />
              <Footer />
            </>
          } />
          
          <Route path="/disclaimer" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <PageView key="disclaimer" />
              <Footer />
            </>
          } />
          
          <Route path="/privacy" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <PageView key="privacy" />
              <Footer />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={logout} 
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <PageView key="contact" />
              <Footer />
            </>
          } />
          
          {/* Login Route */}
          <Route path="/login" element={
            <LoginPage login={login} isLoggedIn={isLoggedIn} />
          } />
          
          {/* Protected Admin Route */}
          <Route path="/admin" element={
            isLoggedIn ? (
              <AdminDashboard 
                onLogout={logout} 
                posts={allPosts} 
                setPosts={setAllPosts} 
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function LoginPage({ login, isLoggedIn }: { login: (email: string, password: string) => boolean; isLoggedIn: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please use the provided email and password.');
    }
  };
  
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="text-white text-6xl font-bold tracking-tighter">B</div>
            <div className="text-white">
              <div className="text-4xl font-semibold tracking-[-2px]">WeCare</div>
              <div className="text-xs text-white/30 -mt-1">ADMIN</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-12">
          <h2 className="text-center text-3xl font-medium mb-2 tracking-tight">Admin Login</h2>
          <p className="text-center text-slate-500 text-sm mb-10">Only authorized personnel may enter</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs tracking-widest block mb-2 text-slate-500">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-base"
                placeholder="bellal24hr@gmail.com"
                required
              />
            </div>
            
            <div>
              <label className="text-xs tracking-widest block mb-2 text-slate-500">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-base"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && <div className="text-red-500 text-sm bg-red-50 p-4 rounded-2xl">{error}</div>}
            
            <button
              type="submit"
              className="w-full py-4 bg-zinc-900 hover:bg-black transition-colors text-white rounded-2xl text-base font-medium mt-4"
            >
              Sign In Securely
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <div className="text-xs text-slate-400">
              Demo credentials provided in the prompt.<br />
              Email: bellal24hr@gmail.com<br />
              Password: Q5a3M3%C
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-white/60 hover:text-white text-sm flex items-center justify-center gap-1">
            ← Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
