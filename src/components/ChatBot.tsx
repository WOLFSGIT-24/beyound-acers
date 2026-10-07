import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';

/* ─── Knowledge Base (intent-based with regex patterns) ──────────────────── */
interface Intent {
  patterns: RegExp[];
  priority: number;
  answer: string;
}

const INTENTS: Intent[] = [
  {
    priority: 10,
    patterns: [/^(hi|hello|hey|good (morning|afternoon|evening)|namaste|hii+|helo)\b/],
    answer: "Hello! 👋 Welcome to Beyond Acres. I'm here to help you with everything about CODENAME UNSTOPPABLE 2.0, pricing, plots, amenities, location, and more. What would you like to know?",
  },
  {
    priority: 8,
    patterns: [
      /what is (this|the) project/,
      /tell me about (the )?project/,
      /about (codename|unstoppable|beyond acres|this project)/,
      /^(overview|project overview|project details|project info)$/,
      /what (is|are) (codename|unstoppable 2)/,
      /introduce (the )?project/,
    ],
    answer: "CODENAME UNSTOPPABLE 2.0 is a 21-acre biodiversity-led premium plotted development by Beyond Acres, located near River Kaveri in Srirangapatna, Mysuru.\n\nKarnataka's first biodiversity-led riverfront plotted community:\n• 330+ exclusive plots\n• 60+ amenities\n• 35% open green spaces\n• 100% underground utilities\n• RERA approved",
  },
  {
    priority: 9,
    patterns: [
      /price|pricing|cost|how much|psf|per sq|₹|rupee/,
      /starting price|launch price|pre.?launch|base price/,
      /what (does|will) it cost/,
      /how (expensive|affordable)/,
    ],
    answer: "💰 Pricing:\n\n• Pre-launch: ₹3,099/sq ft (base price)\n• Additional charges apply for PLC, clubhouse, infrastructure & possession\n\nFor the latest pricing call: 📞 98869 26767",
  },
  {
    priority: 9,
    patterns: [
      /how (do i|to|can i) (book|buy|purchase|reserve)/,
      /booking (process|amount|procedure|steps)/,
      /pre.?book|token amount|booking amount/,
      /steps to (buy|book|purchase)/,
      /50[,\s]?000|50k/,
    ],
    answer: "📋 Booking steps:\n\n1️⃣ Schedule an online tour\n2️⃣ Product walkthrough + pricing + legal docs\n3️⃣ Pre-book with ₹50,000\n4️⃣ Visit site & confirm within 15 days\n\nCall to get started: 📞 98869 26767",
  },
  {
    priority: 9,
    patterns: [
      /plot (size|sizes|dimension|type|types|configuration|options|available)/,
      /available plots|types of plots|what plots/,
      /how (big|large) (are|is) (the )?plot/,
      /9.?x.?12|9.?x.?15|12.?x.?18/,
      /size of (the )?plot/,
    ],
    answer: "📐 Plot configurations:\n\n• 9×12m: 1,163 sq ft\n• 9×15m: 1,454 sq ft\n• 12×18m: 2,325 sq ft\n• River Facing: 2,325 sq ft\n• Site-L: 2,002–2,939 sq ft\n• Site-S: 1,051–1,435 sq ft",
  },
  {
    priority: 8,
    patterns: [
      /river (facing|view|front|side|plot)/,
      /kaveri|cauvery/,
      /riverfront (plot|terrace|living)/,
      /plot.*(near|beside|facing|along).*(river)/,
      /is (there|it) (a )?river/,
    ],
    answer: "🌊 Yes! Premium river-facing plots are available overlooking the Kaveri.\n\nRiverfront Terrace zone features:\n• Promenade walk\n• Sunrise decks\n• River jogging track\n• Birding & viewing points\n• Family pods along the river",
  },
  {
    priority: 9,
    patterns: [
      /amenities|amenity|facilities|facility/,
      /what (is|are) included|what (do|does) (it|the project) (offer|include|have)/,
      /clubhouse|gym|sports|yoga|wellness/,
      /how many amenities|list.*amenities/,
    ],
    answer: "🏡 60+ amenities across 6 zones:\n\n🌿 Biodiversity Park: Rashi Vana, treehouse, zen gardens\n🌊 Riverfront Terraces: promenade, sunrise decks, birding\n🧘 Wellness Grove: yoga pods, meditation, herb gardens\n🎉 Community Realm: clubhouse, café, event lawns\n⚽ Sports Arena: pickleball, cricket, gym, tennis\n🚴 Green Corridors: tree-lined avenues, cycle paths",
  },
  {
    priority: 9,
    patterns: [
      /rera|legal(ly)?|approved|approval|registered|registration/,
      /is (it|the project) (rera|legal|approved|registered)/,
      /bank.?approved|documents|documentation/,
      /trust(worthy)?|legitimate|genuine/,
    ],
    answer: "✅ Fully RERA approved.\n\nRERA No: PRM/KA/RERA/1267/374/PR/230626/008745\n\n• Bank-approved documentation\n• Transparent buying process\n• Clear title land",
  },
  {
    priority: 8,
    patterns: [
      /who (is the )?(developer|builder|company|promoter)/,
      /about (beyond acres|the developer|the builder)/,
      /rohit tandon|purple brick/,
      /who (built|made|developed|created) (it|this|the project)/,
    ],
    answer: "🏢 Developer: Beyond Acres\n\nFounded by Rohit Tandon:\n• Chartered Accountant\n• Former Senior Partner at a Big Four firm\n• Co-founder of Purple Brick Estates LLP\n\nFocus: transparent buying, legally approved docs, sustainable development.",
  },
  {
    priority: 8,
    patterns: [
      /invest(ment|ing)?|appreciation|returns?|growth potential/,
      /why (should i |to )?(buy|invest|purchase)/,
      /good (investment|buy)|worth (buying|investing)/,
      /future (value|growth|appreciation)|roi/,
      /is (it|this) (a good|worth)/,
    ],
    answer: "📈 Investment case:\n\n• ~50–70% lower entry than Bengaluru\n  (₹8,000–18,000+ psf vs ₹3,099 psf)\n• Bengaluru–Mysuru Expressway growth\n• Mysuru emerging as AI & tech hub\n• Airport expansion underway\n• Early-stage appreciation opportunity",
  },
  {
    priority: 8,
    patterns: [
      /where (is (it|the project)|located|situated)/,
      /location|address|situated/,
      /srirangapatna|srirangapatnam/,
      /which (city|area|place|district)/,
    ],
    answer: "📍 Location: Srirangapatna, Mysuru\n\n• Beside River Kaveri\n• Along Bengaluru–Mysuru Expressway\n• ~90 mins from Bengaluru\n• Near Mysuru Ring Road",
  },
  {
    priority: 9,
    patterns: [
      /how far.*(bengaluru|bangalore)/,
      /distance.*(bengaluru|bangalore)/,
      /(bengaluru|bangalore).*(far|distance|km|hour|min|time)/,
      /how (long|far).*(reach|travel|drive)/,
      /from (bengaluru|bangalore)/,
    ],
    answer: "🚗 Approximately 90 minutes from Bengaluru via the Bengaluru–Mysuru Expressway.\n\nIdeal for weekend visits, second homes, or investment.",
  },
  {
    priority: 7,
    patterns: [
      /infrastructure|underground (utilities|cables|wires)/,
      /sustainable|sustainability|eco.?(friendly|engineered)/,
      /solar (light|lighting)|rainwater|grey water/,
      /permeable|floodline|100.?year flood/,
    ],
    answer: "⚡ Eco-engineered infrastructure:\n\n• 100% underground utilities\n• 12m & 9m wide roads\n• Rainwater harvesting\n• Grey water management\n• Solar lighting\n• Permeable paving\n• 100-year floodline safety",
  },
  {
    priority: 8,
    patterns: [
      /school|college|university|education|dps|jss/,
      /nearby (school|college|education)/,
    ],
    answer: "🎓 Nearby schools & colleges:\n\n• Delhi Public School: 30 mins\n• St Joseph Central School: 25 mins\n• JSS Science College: 30 mins\n• Maharaja Institute of Technology: 28 mins\n• Polar International School: 25 mins",
  },
  {
    priority: 8,
    patterns: [
      /hospital|healthcare|medical|clinic|doctor/,
      /nearby (hospital|clinic|medical)/,
      /manipal hospital/,
    ],
    answer: "🏥 Healthcare nearby:\n\n• Manipal Hospital: 9 mins\n• Multi-speciality centres nearby\n• Pharmacies & emergency care accessible",
  },
  {
    priority: 7,
    patterns: [
      /mall|shopping|entertainment|multiplex/,
      /restaurant|food|cafe|dining/,
    ],
    answer: "🛍️ Nearby:\n\n• Mall of Mysuru: 30 mins\n• Forum Centre City Mall: 25 mins\n• Mysore Zoo: 25 mins\n• Karanji Lake: 28 mins\n• Poojari Fish Land: 5 mins\n• Payana Car Museum: 3 mins",
  },
  {
    priority: 7,
    patterns: [
      /infosys|it (park|hub)|tech (park|hub)|software park/,
      /employment|job|work hub/,
    ],
    answer: "💼 Employment nearby:\n\n• Infosys: ~25 mins\n\nMysuru is emerging as an AI, software & research hub with strong employment and investment potential.",
  },
  {
    priority: 8,
    patterns: [
      /how many plots|total (number of )?plots|number of plots/,
      /how (big|large) is (the )?project|project (size|scale|area)/,
      /21 acres|330 plots/,
    ],
    answer: "📊 Project scale:\n\n• 21 Acres\n• 330+ exclusive plots\n• 60+ amenities\n• 35% open green spaces\n• 100% clear title",
  },
  {
    priority: 8,
    patterns: [
      /site visit|visit (the )?(site|project|property)/,
      /schedule (a )?(tour|visit|appointment)/,
      /can i (visit|come|see)/,
      /show (me|us) (the )?project/,
    ],
    answer: "📅 To schedule a visit:\n\n📞 Call: 98869 26767\n🌐 www.beyondacres.in\n\nWe'll arrange an online tour first, then a site visit with full walkthrough.",
  },
  {
    priority: 8,
    patterns: [
      /contact|phone (number)?|call (you|us)|reach (you|us)/,
      /email|website|how (do i|to) (contact|reach|connect)/,
      /get in touch|speak (to|with) (someone|an agent)/,
    ],
    answer: "📞 Contact us:\n\n• Phone: 98869 26767\n• Website: www.beyondacres.in\n• Email: info@beyondacres.com",
  },
  {
    priority: 8,
    patterns: [
      /possession|handover|when (will|is) (it|the project) (ready|complete)/,
      /completion (date|timeline)|project (timeline|delivery)/,
    ],
    answer: "🗓️ For possession timeline details, contact our sales team:\n\n📞 98869 26767\n\nPossession charges apply as per the payment plan.",
  },
  {
    priority: 8,
    patterns: [
      /flood|floodline|flood (risk|safe|zone)/,
      /is (it|the project) (safe|flood.?safe)/,
      /water (logging|flooding|risk)/,
    ],
    answer: "🛡️ 100-year floodline safety. Your investment is fully protected.\n\nAlso includes:\n• Permeable paving\n• Rainwater harvesting\n• Advanced stormwater management",
  },
  {
    priority: 8,
    patterns: [
      /brochure|pdf|catalogue|download/,
      /send (me|us) (the )?(brochure|details)/,
      /more (details|information|info)/,
    ],
    answer: "📄 Click the 'Download Brochure' button on this page to get the full project brochure.\n\nOr we'll send it to you:\n📞 98869 26767\n📧 info@beyondacres.com",
  },
  {
    priority: 7,
    patterns: [
      /nearby|near (the )?project|close (to|by)/,
      /connectivity|expressway|highway|ring road/,
      /mysuru palace|mysore zoo|karanji/,
    ],
    answer: "🗺️ Nearby landmarks:\n\n• Payana Car Museum — 3 mins\n• Poojari Fish Land — 5 mins\n• Manipal Hospital — 9 mins\n• Mysuru Ring Road — 15 mins\n• Mysuru Palace — 20 mins\n• Infosys — 25 mins\n• Mysore Zoo — 25 mins\n• Mall of Mysuru — 30 mins",
  },
];

/* ─── Suggested quick questions ─────────────────────────────────────────── */
const QUICK_QUESTIONS = [
  'What is the starting price?',
  'What plot sizes are available?',
  'Is the project RERA approved?',
  'How far from Bengaluru?',
  'What amenities are included?',
  'How do I book a plot?',
];

/* ─── Matcher ────────────────────────────────────────────────────────────── */
function getAnswer(input: string): string {
  const q = input.toLowerCase().trim();

  let bestScore = 0;
  let bestAnswer = '';

  for (const intent of INTENTS) {
    let matchCount = 0;
    for (const pattern of intent.patterns) {
      if (pattern.test(q)) matchCount++;
    }
    if (matchCount === 0) continue;

    // More pattern matches = better; use priority as tiebreaker
    const score = matchCount * 100 + intent.priority;
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = intent.answer;
    }
  }

  if (bestAnswer) return bestAnswer;

  return "I'm not sure about that. Here's what I can help with:\n\n• Pricing & plot sizes\n• Amenities & features\n• Location & connectivity\n• RERA & legal details\n• Booking process\n\nOr call us: 📞 98869 26767";
}

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const WELCOME: Message = {
  id: 0,
  role: 'bot',
  text: "Hi there! 👋 I'm the Beyond Acres assistant. I can answer your questions about CODENAME UNSTOPPABLE 2.0 — pricing, plots, amenities, location, and more. How can I help you today?",
  time: nowTime(),
};

/* ─── Message bubble ─────────────────────────────────────────────────────── */
const Bubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const isBot = msg.role === 'bot';
  return (
    <div className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      {isBot && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: '#003539' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[82%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className="px-3.5 py-2.5 font-paragraph font-light leading-relaxed whitespace-pre-line"
          style={{
            fontSize: '13px',
            background: isBot ? '#f0f4f3' : '#003539',
            color: isBot ? '#1a2e2c' : '#fff',
            borderRadius: isBot ? '2px 12px 12px 12px' : '12px 2px 12px 12px',
          }}
        >
          {msg.text}
        </div>
        <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>{msg.time}</span>
      </div>
    </div>
  );
};

/* ─── Typing indicator ───────────────────────────────────────────────────── */
const TypingIndicator: React.FC = () => (
  <div className="flex gap-2.5 items-start">
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ background: '#003539' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
    <div
      className="px-4 py-3 flex items-center gap-1"
      style={{ background: '#f0f4f3', borderRadius: '2px 12px 12px 12px' }}
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: '#003539',
            opacity: 0.5,
            animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

/* ─── Main ChatBot component ─────────────────────────────────────────────── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [unread, setUnread] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  /* Scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [open]);

  /* Auto-open nudge after 12s (only once) */
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasOpened) setUnread(1);
    }, 12000);
    return () => clearTimeout(t);
  }, [hasOpened]);

  const handleOpen = () => {
    setOpen(true);
    setHasOpened(true);
    setUnread(0);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowQuick(false);

    const userMsg: Message = { id: nextId.current++, role: 'user', text: text.trim(), time: nowTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate thinking delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const answer = getAnswer(text);
      const botMsg: Message = { id: nextId.current++, role: 'bot', text: answer, time: nowTime() };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuick = (q: string) => {
    sendMessage(q);
  };

  return (
    <>
      {/* ── CSS animations ── */}
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,53,57,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,53,57,0); }
        }
        .chat-window { animation: chatSlideUp 0.25s ease-out; }
        .chat-fab-pulse { animation: chatPulse 2s ease-in-out infinite; }
      `}</style>

      {/* ── FAB button ── */}
      <button
        onClick={handleOpen}
        aria-label="Open chat"
        className={`fixed z-[90] bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center
          shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
          ${!open ? 'chat-fab-pulse' : ''}`}
        style={{
          background: '#003539',
          display: open ? 'none' : 'flex',
        }}
      >
        <MessageCircle size={24} color="white" />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
              font-paragraph font-bold text-white"
            style={{ background: '#e05c2a', fontSize: '11px' }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div
          className="chat-window fixed z-[90] bottom-6 right-6 flex flex-col overflow-hidden shadow-2xl"
          style={{
            width: 'min(92vw, 360px)',
            height: 'min(85vh, 560px)',
            background: '#fff',
            border: '1px solid rgba(0,53,57,0.12)',
            borderRadius: '16px',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{ background: '#003539' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                <Image src="https://static.wixstatic.com/media/cef78c_64476df861ac42b88f59f863ae9befa6~mv2.png" alt="Beyond Acres" className="w-full h-full object-contain" style={{ background: '#fff', padding: '4px' }} />
              </div>
              <div>
                <p className="font-paragraph font-semibold text-white" style={{ fontSize: '13px' }}>
                  Beyond Acres
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-paragraph font-light text-white/60" style={{ fontSize: '11px' }}>
                    Online · Typically replies instantly
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full
                text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Close chat"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,53,57,0.15) transparent' }}
          >
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {showQuick && (
            <div className="px-4 pb-3 flex-shrink-0">
              <p className="font-paragraph font-medium text-foreground/40 mb-2 tracking-wide uppercase"
                style={{ fontSize: '10px' }}>
                Quick questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuick(q)}
                    className="font-paragraph font-light transition-all duration-200
                      hover:bg-primary hover:text-white active:scale-95"
                    style={{
                      fontSize: '11px',
                      padding: '5px 10px',
                      background: 'rgba(0,53,57,0.06)',
                      color: '#003539',
                      border: '1px solid rgba(0,53,57,0.15)',
                      borderRadius: '20px',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', flexShrink: 0 }} />

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
            style={{ background: '#fafafa' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about plots, pricing, amenities…"
              className="flex-1 bg-transparent outline-none font-paragraph font-light text-foreground
                placeholder-foreground/35"
              style={{ fontSize: '13px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40"
              style={{ background: '#003539' }}
              aria-label="Send"
            >
              <Send size={14} color="white" />
            </button>
          </form>

          {/* Footer */}
          <div
            className="text-center py-2 flex-shrink-0 font-paragraph font-light text-foreground/30"
            style={{ fontSize: '10px', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}
          >
            Powered by Beyond Acres · <a href="tel:9886926767" style={{ color: '#003539' }}>98869 26767</a>
          </div>

        </div>
      )}
    </>
  );
}
