import coffeeImg from '@/assets/gallery-coffee.jpg';
import dentalImg from '@/assets/gallery-dental.jpg';
import lawImg from '@/assets/gallery-law.jpg';
import fitnessImg from '@/assets/gallery-fitness.jpg';
import realEstateImg from '@/assets/gallery-realestate.jpg';
import consultingImg from '@/assets/gallery-consulting.jpg';
import salonImg from '@/assets/gallery-salon.jpg';
import photographyImg from '@/assets/gallery-photography.jpg';
import architectureImg from '@/assets/gallery-architecture.jpg';
import restaurantImg from '@/assets/gallery-restaurant.jpg';

export interface TeamMember { name: string; role: string; bio: string; }
export interface Service { name: string; description: string; price?: string; }
export interface Testimonial { name: string; role: string; text: string; }

export interface Business {
  name: string;
  slug: string;
  industry: string;
  tagline: string;
  shortDescription: string;
  layout: 'immersive' | 'classic' | 'minimal';
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  fonts: { heading: string; body: string; };
  hero: { headline: string; subheadline: string; cta: string; };
  about: { story: string[]; mission: string; founded: string; team: TeamMember[]; };
  services: Service[];
  testimonials: Testimonial[];
  contact: { address: string; city: string; country: string; phone: string; email: string; hours: string[]; };
  image: string;
}

export const businesses: Business[] = [
  {
    name: 'Ember & Oak',
    slug: 'ember-oak',
    industry: 'Coffee',
    tagline: 'Roasted with intention',
    shortDescription: 'Single-origin coffee roasted in Portland\'s Pearl District',
    layout: 'immersive',
    colors: { primary: '#6B3A2A', primaryForeground: '#FFF8F0', secondary: '#D4A574', accent: '#8B5E3C', background: '#FFF8F0', foreground: '#2A1810', muted: '#8B7D6B' },
    fonts: { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Coffee Worth Waking Up For', subheadline: 'Small-batch roasted beans from farms we visit every year. Three locations across Portland.', cta: 'Explore Our Roasts' },
    about: {
      story: [
        'Ember & Oak started in 2016 as a weekend pop-up at the Portland Saturday Market. Marcus and Elena Webb hauled a single hand-roaster and a handful of green beans from a direct-trade farm in Huila, Colombia. Word spread fast — people kept coming back for the roast depth and the conversations that came with it.',
        'Today we operate three cafés across Portland and roast over 400 kilograms of specialty coffee each week. We visit every partner farm at least once a year. Every bag we sell can be traced to the people who grew it, and we pay well above Fair Trade minimums.'
      ],
      mission: 'To serve coffee that honors its origins — from soil to cup — while building a gathering place worth returning to.',
      founded: '2016',
      team: [
        { name: 'Marcus Webb', role: 'Co-Founder & Head Roaster', bio: 'Fifteen years in specialty coffee. Former Q-grader with a background in agronomy.' },
        { name: 'Elena Webb', role: 'Co-Founder & Operations', bio: 'Supply chain background. Manages farm relationships and café operations across all three locations.' }
      ]
    },
    services: [
      { name: 'Pour-Over Bar', description: 'Single-cup brewing with a rotating selection of seasonal lots. Hario V60, Chemex, and Kalita Wave available.' },
      { name: 'Espresso Menu', description: 'Classic and signature espresso drinks made with our house blend or any single-origin on the board.' },
      { name: 'Whole Bean Retail', description: 'Take home freshly roasted bags in 250g or 1kg sizes. Subscription options available for weekly or biweekly delivery.' },
      { name: 'Private Tastings', description: 'Book a guided cupping session for groups of 4–12. We walk through origin stories, processing methods, and flavor profiles.' },
      { name: 'Event Catering', description: 'Full coffee bar setup for corporate events, weddings, and private gatherings in the Portland metro area.' }
    ],
    testimonials: [
      { name: 'Rachel Nguyen', role: 'Regular since 2018', text: 'I drive past six coffee shops to get to Ember & Oak. The Ethiopian natural they roasted last fall was the best cup I\'ve had in years.' },
      { name: 'James Kowalski', role: 'Restaurant owner, NW Portland', text: 'We switched our house coffee to Ember & Oak two years ago. Guests notice. The quality is consistent every single week.' },
      { name: 'Dana Hartfield', role: 'Subscriber', text: 'The monthly subscription is the highlight of my week. Every bag comes with a card about the farm — it makes the whole experience personal.' }
    ],
    contact: { address: '742 NW Everett St', city: 'Portland, OR 97209', country: 'United States', phone: '+1 (503) 555-0147', email: 'hello@emberandoak.com', hours: ['Monday – Friday: 6:30 AM – 6:00 PM', 'Saturday – Sunday: 7:30 AM – 5:00 PM'] },
    image: coffeeImg
  },
  {
    name: 'Clearview Dental',
    slug: 'clearview-dental',
    industry: 'Dental',
    tagline: 'Gentle care, lasting results',
    shortDescription: 'Comprehensive family dentistry in South Austin',
    layout: 'classic',
    colors: { primary: '#2B7A9B', primaryForeground: '#FFFFFF', secondary: '#5BC0BE', accent: '#E8F4F8', background: '#FFFFFF', foreground: '#1A2B3C', muted: '#6B8299' },
    fonts: { heading: "'DM Sans', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Dentistry That Puts You First', subheadline: 'Modern techniques, a calm environment, and a team that actually listens to what matters to you.', cta: 'Book an Appointment' },
    about: {
      story: [
        'Dr. Priya Chandran opened Clearview Dental in 2012 with a simple belief: dental visits shouldn\'t feel like something you dread. After a decade of practicing in large clinics where patients were rushed through 15-minute slots, she built a practice designed around conversation and comfort.',
        'Our South Austin office was designed with natural light, noise-reducing materials, and private treatment rooms. We invest in continuing education every year so our patients benefit from the latest in restorative and cosmetic dentistry without needing referrals across town.'
      ],
      mission: 'To provide thorough, unhurried dental care in an environment where every patient feels heard and respected.',
      founded: '2012',
      team: [
        { name: 'Dr. Priya Chandran', role: 'Founder & Lead Dentist', bio: 'DDS from UT Health San Antonio. Board-certified with a focus on restorative and cosmetic dentistry.' },
        { name: 'Dr. Kevin Marsh', role: 'Associate Dentist', bio: 'Specializes in pediatric dentistry and orthodontics. Known for putting anxious patients at ease.' }
      ]
    },
    services: [
      { name: 'General Checkups & Cleanings', description: 'Comprehensive oral exams, professional cleanings, and digital X-rays with same-day results.' },
      { name: 'Cosmetic Dentistry', description: 'Teeth whitening, porcelain veneers, and smile design consultations tailored to your goals.' },
      { name: 'Restorative Work', description: 'Crowns, bridges, implants, and fillings using durable, natural-looking materials.' },
      { name: 'Orthodontics', description: 'Clear aligner therapy and traditional braces for teens and adults.' },
      { name: 'Emergency Care', description: 'Same-day appointments for dental emergencies including fractures, infections, and severe pain.' }
    ],
    testimonials: [
      { name: 'Michelle Torres', role: 'Patient since 2015', text: 'I used to cancel dental appointments out of anxiety. Clearview changed that completely. Dr. Chandran explains everything and never rushes.' },
      { name: 'Robert Adeyemi', role: 'Parent of two patients', text: 'Both my kids actually ask to go to the dentist. The team makes it fun without being patronizing. Couldn\'t recommend them more.' },
      { name: 'Sarah Lin', role: 'Cosmetic patient', text: 'I got veneers done last spring and the results are incredible. Natural-looking and the whole process was way less intimidating than I expected.' }
    ],
    contact: { address: '3200 S Lamar Blvd, Suite 105', city: 'Austin, TX 78704', country: 'United States', phone: '+1 (512) 555-0283', email: 'info@clearviewdental.com', hours: ['Monday – Thursday: 8:00 AM – 5:00 PM', 'Friday: 8:00 AM – 2:00 PM'] },
    image: dentalImg
  },
  {
    name: 'Prescott & Hartley',
    slug: 'prescott-hartley',
    industry: 'Law',
    tagline: 'Counsel you can count on',
    shortDescription: 'Business and estate law serving Greater Boston since 1998',
    layout: 'classic',
    colors: { primary: '#1B2A4A', primaryForeground: '#F8F6F0', secondary: '#C5963B', accent: '#E8E0D0', background: '#F8F6F0', foreground: '#1B2A4A', muted: '#6B7280' },
    fonts: { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Protecting What You\'ve Built', subheadline: 'Practical legal guidance for business owners, families, and individuals across Massachusetts.', cta: 'Schedule a Consultation' },
    about: {
      story: [
        'Prescott & Hartley was founded in 1998 by Catherine Prescott and Daniel Hartley, two attorneys who met while clerking at the Massachusetts Supreme Judicial Court. They shared a conviction that excellent legal work didn\'t require a downtown tower or hourly rates that shut out the people who needed help most.',
        'Twenty-six years later, the firm has grown to twelve attorneys working from our Back Bay office. We handle everything from business formation and contract disputes to estate planning and probate. Our clients range from first-generation entrepreneurs to families managing generational wealth.'
      ],
      mission: 'To deliver clear, principled legal counsel that helps our clients make confident decisions in business and in life.',
      founded: '1998',
      team: [
        { name: 'Catherine Prescott', role: 'Founding Partner', bio: 'Harvard Law graduate. Thirty years of experience in corporate governance and business litigation.' },
        { name: 'Daniel Hartley', role: 'Founding Partner', bio: 'Focuses on estate planning and trust administration. Known for his meticulous attention to detail and client advocacy.' }
      ]
    },
    services: [
      { name: 'Business Formation & Governance', description: 'Entity selection, operating agreements, bylaws, and ongoing compliance for LLCs, corporations, and partnerships.' },
      { name: 'Commercial Litigation', description: 'Contract disputes, partnership disagreements, employment claims, and intellectual property matters.' },
      { name: 'Estate Planning', description: 'Wills, revocable trusts, powers of attorney, healthcare directives, and tax-efficient wealth transfer strategies.' },
      { name: 'Real Estate Transactions', description: 'Commercial and residential closings, title review, lease negotiations, and zoning matters.' },
      { name: 'Mergers & Acquisitions', description: 'Due diligence, deal structuring, negotiation support, and post-closing integration for mid-market transactions.' }
    ],
    testimonials: [
      { name: 'David Flanagan', role: 'CEO, Flanagan Manufacturing', text: 'We\'ve worked with Prescott & Hartley for over a decade. They understand our business as well as we do, and they don\'t bill for conversations that could be emails.' },
      { name: 'Amara Osei', role: 'Entrepreneur', text: 'Catherine guided me through setting up my first LLC and made sure I understood every document I signed. That kind of patience is rare.' },
      { name: 'Thomas Brennan', role: 'Estate planning client', text: 'Daniel handled my parents\' estate with professionalism and genuine compassion during a very difficult time. We\'re grateful.' }
    ],
    contact: { address: '280 Dartmouth St, Suite 400', city: 'Boston, MA 02116', country: 'United States', phone: '+1 (617) 555-0391', email: 'inquiries@prescotthartley.com', hours: ['Monday – Friday: 9:00 AM – 5:30 PM', 'Evening appointments available by arrangement'] },
    image: lawImg
  },
  {
    name: 'Forge Athletics',
    slug: 'forge-athletics',
    industry: 'Fitness',
    tagline: 'Built through discipline',
    shortDescription: 'Strength and conditioning gym in downtown Denver',
    layout: 'minimal',
    colors: { primary: '#E85D04', primaryForeground: '#FFFFFF', secondary: '#1A1A1A', accent: '#2A2A2A', background: '#FFFFFF', foreground: '#1A1A1A', muted: '#6B6B6B' },
    fonts: { heading: "'Archivo', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Strength Has No Shortcut', subheadline: 'Barbell training, conditioning, and coaching for people who want to do the work.', cta: 'Start Your Trial' },
    about: {
      story: [
        'Forge Athletics opened in 2019 in a converted warehouse off Blake Street. Coach Dario Reeves spent ten years training competitive powerlifters before realizing that most people don\'t need a competition coach — they need a place that takes training seriously without the ego.',
        'We built Forge around barbell fundamentals: squat, bench, deadlift, press. Our programming is structured in 8-week cycles, and every member gets a movement assessment before touching a loaded bar. We keep the music loud and the coaching direct.'
      ],
      mission: 'To build a gym where consistent effort is respected more than natural talent, and every member leaves stronger than they arrived.',
      founded: '2019',
      team: [
        { name: 'Dario Reeves', role: 'Owner & Head Coach', bio: 'CSCS-certified. Former competitive powerlifter with ten years of coaching experience at the collegiate and club level.' },
        { name: 'Nina Okafor', role: 'Strength Coach', bio: 'Background in Olympic weightlifting. Specializes in technique correction and mobility programming.' }
      ]
    },
    services: [
      { name: 'Group Strength Classes', description: 'Coach-led barbell sessions following periodized programming. Capped at 12 athletes per class.', price: '$159/month' },
      { name: 'Personal Training', description: 'One-on-one coaching sessions focused on your specific goals, movement limitations, and competition prep.', price: '$95/session' },
      { name: 'Open Gym Access', description: 'Full facility access during all operating hours. Includes squat racks, platforms, and cardio equipment.', price: '$99/month' },
      { name: 'Movement Assessment', description: 'A 60-minute evaluation of your squat, hinge, press, and pull patterns with a corrective exercise plan.', price: '$75' },
      { name: 'Nutrition Coaching', description: 'Macro-based nutrition guidance with weekly check-ins, meal templates, and habit tracking support.', price: '$120/month' }
    ],
    testimonials: [
      { name: 'Chris Balducci', role: 'Member since 2020', text: 'I\'ve been to a dozen gyms in Denver. Forge is the only one where coaches actually watch your form and give honest feedback. My deadlift went from 315 to 425 in a year.' },
      { name: 'Aimee Park', role: 'New member', text: 'I was intimidated to walk in, but the assessment made me feel like I belonged. The coaches meet you where you are.' },
      { name: 'Marcus Delaney', role: 'Competitive lifter', text: 'The programming is smart and the community is real. Nobody here is posing — everyone is putting in work.' }
    ],
    contact: { address: '1847 Blake St, Unit B', city: 'Denver, CO 80202', country: 'United States', phone: '+1 (720) 555-0462', email: 'info@forgeathletics.com', hours: ['Monday – Friday: 5:30 AM – 8:00 PM', 'Saturday: 7:00 AM – 2:00 PM', 'Sunday: Closed'] },
    image: fitnessImg
  },
  {
    name: 'Meridian Properties',
    slug: 'meridian-properties',
    industry: 'Real Estate',
    tagline: 'Find where you belong',
    shortDescription: 'Residential and luxury real estate across South Florida',
    layout: 'classic',
    colors: { primary: '#0D4F4F', primaryForeground: '#FFFFFF', secondary: '#D4A843', accent: '#E8F0EE', background: '#FFFFFF', foreground: '#1A2A2A', muted: '#6B8080' },
    fonts: { heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Your Next Chapter Starts Here', subheadline: 'Residential sales, waterfront estates, and investment properties across Miami-Dade, Broward, and Palm Beach counties.', cta: 'View Listings' },
    about: {
      story: [
        'Meridian Properties was founded in 2008 by Alejandro and Camille Vega during one of the most challenging real estate markets in recent memory. While other agencies contracted, Alejandro and Camille saw an opportunity to build a firm focused on trust and long-term relationships over quick commissions.',
        'Fifteen years later, Meridian has facilitated over $2.3 billion in residential transactions. We represent buyers and sellers across every price point, from starter condos in Wynwood to waterfront estates on Key Biscayne. Our agents live in the neighborhoods they serve.'
      ],
      mission: 'To guide every client through real estate decisions with honest advice, deep market knowledge, and genuine care for the outcome.',
      founded: '2008',
      team: [
        { name: 'Alejandro Vega', role: 'Co-Founder & Principal Broker', bio: 'Licensed broker with 20 years of experience in South Florida luxury and residential markets.' },
        { name: 'Camille Vega', role: 'Co-Founder & Director of Sales', bio: 'Specializes in waterfront properties and relocation services. Fluent in English, Spanish, and French.' }
      ]
    },
    services: [
      { name: 'Residential Sales', description: 'Full-service representation for buyers and sellers, from market analysis and staging to negotiation and closing.' },
      { name: 'Luxury & Waterfront', description: 'Dedicated team for properties above $2M, including private showings, off-market opportunities, and international buyer outreach.' },
      { name: 'Investment Advisory', description: 'Portfolio analysis, cap rate evaluation, and acquisition support for multi-family and rental properties.' },
      { name: 'Relocation Services', description: 'Personalized neighborhood tours, school district guidance, and move-in coordination for families relocating to South Florida.' },
      { name: 'Property Valuation', description: 'Complimentary comparative market analysis for homeowners considering a sale or refinance.' }
    ],
    testimonials: [
      { name: 'Jonathan Reyes', role: 'First-time buyer', text: 'Camille walked us through every step. We were nervous about buying in this market, but she found us a place we love at a price we could handle.' },
      { name: 'Patricia Donovan', role: 'Seller, Coral Gables', text: 'Our home sold in 11 days, above asking. Alejandro\'s pricing strategy and marketing were sharp. He earned every cent of his commission.' },
      { name: 'Henrik Lund', role: 'International investor', text: 'I purchased two rental properties through Meridian from overseas. Their process was organized and transparent from the first call to closing.' }
    ],
    contact: { address: '1200 Brickell Ave, Suite 1820', city: 'Miami, FL 33131', country: 'United States', phone: '+1 (305) 555-0718', email: 'hello@meridianproperties.com', hours: ['Monday – Friday: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 4:00 PM', 'Sunday: By appointment'] },
    image: realEstateImg
  },
  {
    name: 'Northpoint Advisory',
    slug: 'northpoint-advisory',
    industry: 'Consulting',
    tagline: 'Clarity in complexity',
    shortDescription: 'Strategy and operations consulting for mid-market companies',
    layout: 'classic',
    colors: { primary: '#2C3E6B', primaryForeground: '#FFFFFF', secondary: '#4A6FA5', accent: '#EEF1F6', background: '#F5F7FA', foreground: '#1A1F2E', muted: '#6B7894' },
    fonts: { heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Better Decisions, Faster', subheadline: 'We help mid-market companies solve operational problems and prepare for their next stage of growth.', cta: 'Talk to Our Team' },
    about: {
      story: [
        'Northpoint Advisory was established in 2014 by Katherine Byrne after fifteen years at a Big Four firm. She left because she believed mid-market companies — the ones doing $20M to $500M in revenue — deserved the same caliber of strategic advice as Fortune 500 clients, without the six-month timelines and seven-figure retainers.',
        'Our team of twelve consultants works in focused engagements typically lasting 8 to 16 weeks. We embed with your leadership team, diagnose root causes, and deliver recommendations you can act on within the quarter. We don\'t produce reports that sit on shelves.'
      ],
      mission: 'To give growing companies access to strategic thinking that actually gets implemented — not just presented.',
      founded: '2014',
      team: [
        { name: 'Katherine Byrne', role: 'Founder & Managing Director', bio: 'Former Deloitte principal. MBA from Kellogg. Focuses on organizational design and growth strategy.' },
        { name: 'Michael Oduya', role: 'Director of Operations Practice', bio: 'Supply chain and operations specialist with experience across manufacturing, logistics, and healthcare.' }
      ]
    },
    services: [
      { name: 'Growth Strategy', description: 'Market assessment, competitive positioning, pricing strategy, and go-to-market planning for companies approaching inflection points.' },
      { name: 'Operational Improvement', description: 'Process mapping, bottleneck analysis, and workflow redesign to reduce costs and increase throughput.' },
      { name: 'Organizational Design', description: 'Structure evaluation, role definition, reporting lines, and change management for scaling teams.' },
      { name: 'M&A Integration', description: 'Post-acquisition integration planning, cultural alignment, and synergy realization tracking.' },
      { name: 'Executive Workshops', description: 'Half-day and full-day facilitated sessions for leadership alignment, strategic planning, and scenario analysis.' }
    ],
    testimonials: [
      { name: 'Sandra Ibanez', role: 'COO, Apex Distribution', text: 'Northpoint helped us cut order fulfillment time by 40% in three months. Their recommendations were specific and actionable from day one.' },
      { name: 'Peter Lindstrom', role: 'CEO, Lindstrom Fabrication', text: 'Katherine and her team understood our business within the first week. The strategic plan they built with us has guided every major decision since.' },
      { name: 'Grace Namara', role: 'VP People, Helix Health', text: 'The organizational redesign was uncomfortable but necessary. Northpoint managed the process with both rigor and empathy.' }
    ],
    contact: { address: '233 S Wacker Dr, Suite 4400', city: 'Chicago, IL 60606', country: 'United States', phone: '+1 (312) 555-0529', email: 'contact@northpointadvisory.com', hours: ['Monday – Friday: 8:30 AM – 6:00 PM'] },
    image: consultingImg
  },
  {
    name: 'Maison Belle',
    slug: 'maison-belle',
    industry: 'Salon',
    tagline: 'Your beauty, refined',
    shortDescription: 'Full-service hair and beauty salon in Pacific Heights',
    layout: 'minimal',
    colors: { primary: '#9B6B7B', primaryForeground: '#FFFFFF', secondary: '#D4A883', accent: '#F5EBE7', background: '#FDF6F4', foreground: '#2A1F22', muted: '#8B7D80' },
    fonts: { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Where Beauty Feels Personal', subheadline: 'Color, cuts, and treatments guided by experienced stylists who take time to understand your style.', cta: 'Book Your Visit' },
    about: {
      story: [
        'Maison Belle was opened in 2017 by Isabelle Tran, a colorist with two decades of experience in San Francisco\'s salon scene. After working in high-volume salons where appointments were stacked back-to-back, Isabelle wanted to create a space where stylists could spend real time with each client.',
        'Our Pacific Heights studio accommodates six stylists and a treatment room. We use exclusively low-toxicity, cruelty-free product lines and source our tools from artisan suppliers in Japan and Italy. Appointments are spaced to allow for unhurried consultations and thorough service.'
      ],
      mission: 'To create a salon experience rooted in craftsmanship, personal attention, and products that respect both your hair and the environment.',
      founded: '2017',
      team: [
        { name: 'Isabelle Tran', role: 'Founder & Lead Colorist', bio: 'Twenty years of salon experience. Trained in balayage and color correction at the Vidal Sassoon Academy.' },
        { name: 'Jordan McKee', role: 'Senior Stylist', bio: 'Precision cutting specialist with editorial credits in local and national publications.' }
      ]
    },
    services: [
      { name: 'Haircut & Styling', description: 'Consultation, shampoo, precision cut, and style. Includes a complimentary scalp treatment.', price: 'From $95' },
      { name: 'Color Services', description: 'Full color, highlights, balayage, ombré, and color correction. Ammonia-free options available.', price: 'From $150' },
      { name: 'Blowout & Finish', description: 'Professional wash, blow-dry, and heat styling for any occasion.', price: '$65' },
      { name: 'Keratin Treatment', description: 'Smoothing and frizz reduction using formaldehyde-free keratin systems. Results last 8–12 weeks.', price: '$300' },
      { name: 'Bridal & Event Styling', description: 'On-site or in-salon styling for weddings, galas, and special occasions. Trial sessions included.', price: 'From $200' }
    ],
    testimonials: [
      { name: 'Lena Goldstein', role: 'Client since 2018', text: 'Isabelle is the only person I trust with my color. She listens, she\'s honest, and the results are always exactly what I wanted — or better.' },
      { name: 'Monica Alvarez', role: 'Bridal client', text: 'My wedding hair was flawless and lasted all night. The trial session made me feel completely confident walking down the aisle.' },
      { name: 'Diane Chiu', role: 'New client', text: 'I walked in nervous about going short for the first time. Jordan made the consultation feel safe and the result was stunning. I\'ve never gotten so many compliments.' }
    ],
    contact: { address: '2847 Sacramento St', city: 'San Francisco, CA 94115', country: 'United States', phone: '+1 (415) 555-0634', email: 'hello@maisonbelle.com', hours: ['Tuesday – Saturday: 9:00 AM – 7:00 PM', 'Sunday – Monday: Closed'] },
    image: salonImg
  },
  {
    name: 'Lumen Studio',
    slug: 'lumen-studio',
    industry: 'Photography',
    tagline: 'Light tells the story',
    shortDescription: 'Commercial and portrait photography in Brooklyn',
    layout: 'minimal',
    colors: { primary: '#0A0A0A', primaryForeground: '#FFFFFF', secondary: '#C9A84C', accent: '#F5F5F0', background: '#FFFFFF', foreground: '#0A0A0A', muted: '#6B6B6B' },
    fonts: { heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Photographs That Work', subheadline: 'Commercial, editorial, and portrait photography for brands and individuals who care about how they\'re seen.', cta: 'View Our Work' },
    about: {
      story: [
        'Lumen Studio was founded in 2015 by Tomás Herrera in a shared workspace in Bushwick. Tomás started shooting product photography for small D2C brands launching on Kickstarter and Shopify. As those brands grew, so did the scope of work — lifestyle campaigns, team headshots, event documentation.',
        'Today the studio operates from a 2,400-square-foot space in DUMBO with a full cyclorama wall, daylight shooting area, and post-production suite. We work with brands, agencies, and individuals on projects ranging from single-day product shoots to multi-week campaign productions.'
      ],
      mission: 'To create photographs that are honest, purposeful, and worth using — not just worth posting.',
      founded: '2015',
      team: [
        { name: 'Tomás Herrera', role: 'Founder & Lead Photographer', bio: 'Ten years of commercial photography. Clients include Warby Parker, Brooklinen, and The Wing.' },
        { name: 'Suki Yamamoto', role: 'Studio Manager & Photographer', bio: 'Handles studio operations and second-camera work. Background in documentary photography and photojournalism.' }
      ]
    },
    services: [
      { name: 'Product Photography', description: 'Clean, e-commerce-ready images and styled lifestyle shots for physical products across all categories.' },
      { name: 'Brand Campaigns', description: 'Full creative direction, model casting, location scouting, and multi-day shoots for seasonal and launch campaigns.' },
      { name: 'Portraits & Headshots', description: 'Professional headshots for teams, executives, and individuals. Studio or on-location options available.' },
      { name: 'Event Documentation', description: 'Unobtrusive, editorial-style coverage of corporate events, launches, panels, and private gatherings.' },
      { name: 'Post-Production', description: 'Color grading, retouching, compositing, and file delivery optimized for web, print, and social media.' }
    ],
    testimonials: [
      { name: 'Aria Fontaine', role: 'Brand Manager, Loom & Thread', text: 'Tomás understood our aesthetic before we could even articulate it. The campaign images drove a 30% increase in engagement that quarter.' },
      { name: 'Derek Owusu', role: 'Startup founder', text: 'We needed headshots for the whole team plus product shots for our launch. Lumen handled both in one day, and every image was usable.' },
      { name: 'Claire Beaumont', role: 'Art director', text: 'Working with Lumen feels collaborative. They bring ideas to the table but never override the creative brief. That balance is hard to find.' }
    ],
    contact: { address: '68 Jay St, Suite 310', city: 'Brooklyn, NY 11201', country: 'United States', phone: '+1 (718) 555-0842', email: 'studio@lumenstudio.com', hours: ['Monday – Friday: 9:00 AM – 6:00 PM', 'Weekend shoots by arrangement'] },
    image: photographyImg
  },
  {
    name: 'Whitestone & Co',
    slug: 'whitestone-co',
    industry: 'Architecture',
    tagline: 'Form follows meaning',
    shortDescription: 'Residential and commercial architecture in the Pacific Northwest',
    layout: 'minimal',
    colors: { primary: '#3A3A3A', primaryForeground: '#FFFFFF', secondary: '#1A1A1A', accent: '#F0F0EC', background: '#FFFFFF', foreground: '#1A1A1A', muted: '#7A7A7A' },
    fonts: { heading: "'Archivo', sans-serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Architecture for the Way You Live', subheadline: 'Residential homes, commercial spaces, and public projects designed for the climate and culture of the Pacific Northwest.', cta: 'See Our Projects' },
    about: {
      story: [
        'Whitestone & Co was established in 2010 by architects Nora Whitestone and Ben Calloway. Both had spent years at large firms in Seattle working on institutional projects — hospitals, universities, civic buildings — and wanted to bring that rigor to residential and small-scale commercial work.',
        'Our studio of eight works on 15 to 20 projects at any given time, from ground-up custom homes on Puget Sound to adaptive reuse of industrial buildings in the city. We\'re known for material honesty, passive sustainability strategies, and buildings that age well in the Northwest rain.'
      ],
      mission: 'To design buildings that respond to their place, serve the people who use them, and stand the test of weather and time.',
      founded: '2010',
      team: [
        { name: 'Nora Whitestone', role: 'Co-Founder & Principal', bio: 'Licensed architect with a focus on residential design and sustainable building systems. M.Arch from the University of Washington.' },
        { name: 'Ben Calloway', role: 'Co-Founder & Principal', bio: 'Specializes in commercial and mixed-use projects. LEED AP certified with a background in structural engineering.' }
      ]
    },
    services: [
      { name: 'Custom Residential Design', description: 'Full architectural services for new homes, from site analysis and schematic design through construction documents and site visits.' },
      { name: 'Renovations & Additions', description: 'Sensitive updates to existing homes that preserve character while improving function, light, and energy performance.' },
      { name: 'Commercial & Mixed-Use', description: 'Office buildings, retail spaces, restaurants, and multi-use developments designed for urban and suburban contexts.' },
      { name: 'Interior Architecture', description: 'Space planning, material specification, millwork design, and lighting layouts for residential and commercial interiors.' },
      { name: 'Feasibility Studies', description: 'Site evaluation, zoning analysis, and preliminary massing studies to help owners assess a project\'s potential before committing.' }
    ],
    testimonials: [
      { name: 'Laura Bergström', role: 'Homeowner, Bainbridge Island', text: 'Nora and Ben designed a house that works with the landscape rather than against it. Two years in, it still surprises us with how the light moves through the rooms.' },
      { name: 'Alan Mukherjee', role: 'Restaurant owner, Capitol Hill', text: 'They turned a former print shop into our restaurant. The design honors the building\'s history and every guest comments on the space.' },
      { name: 'Risa Tanaka', role: 'Developer', text: 'Whitestone delivered our mixed-use project on budget and ahead of schedule. Their construction documents were precise and the contractors appreciated it.' }
    ],
    contact: { address: '1424 11th Ave, Suite 200', city: 'Seattle, WA 98122', country: 'United States', phone: '+1 (206) 555-0193', email: 'studio@whitestoneco.com', hours: ['Monday – Friday: 8:30 AM – 5:30 PM'] },
    image: architectureImg
  },
  {
    name: 'Saffron & Vine',
    slug: 'saffron-vine',
    industry: 'Restaurant',
    tagline: 'Rooted in flavor',
    shortDescription: 'Southern-meets-Mediterranean dining in the French Quarter',
    layout: 'immersive',
    colors: { primary: '#6B1D2A', primaryForeground: '#FFF8F0', secondary: '#C5963B', accent: '#F5E6D8', background: '#FFF8F0', foreground: '#2A1210', muted: '#8B6B60' },
    fonts: { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif" },
    hero: { headline: 'Where Tradition Meets the Table', subheadline: 'Southern ingredients, Mediterranean technique, and a wine list worth lingering over.', cta: 'Reserve a Table' },
    about: {
      story: [
        'Saffron & Vine opened its doors in 2019 in a restored 1870s Creole townhouse on Chartres Street. Chef-owner Margaux Delacroix spent years cooking in kitchens across Lyon, Barcelona, and her hometown of New Orleans before deciding to build a restaurant that honored all three traditions.',
        'The menu changes with the seasons and draws from Gulf Coast seafood, Louisiana produce, and the pantry staples of Southern France and coastal Spain. We cure our own charcuterie, bake bread daily, and maintain relationships with over a dozen regional farms and fisheries.'
      ],
      mission: 'To cook food that feels both familiar and surprising — grounded in tradition but never afraid to wander.',
      founded: '2019',
      team: [
        { name: 'Margaux Delacroix', role: 'Chef-Owner', bio: 'Trained at Institut Paul Bocuse in Lyon. Ten years of kitchen experience across France, Spain, and Louisiana.' },
        { name: 'Antoine Broussard', role: 'General Manager & Sommelier', bio: 'Certified sommelier with a passion for natural wines. Manages the dining room and curates the 200-label wine program.' }
      ]
    },
    services: [
      { name: 'Dinner Service', description: 'Five-course tasting menu and à la carte dining available Wednesday through Sunday. Reservations recommended.' },
      { name: 'Wine Program', description: 'Over 200 labels with a focus on small-production wines from southern France, Spain, and emerging domestic regions.' },
      { name: 'Private Dining', description: 'Our upstairs salon seats up to 24 guests for private events, rehearsal dinners, and corporate gatherings. Custom menus available.' },
      { name: 'Weekend Brunch', description: 'Saturday and Sunday brunch featuring Gulf shrimp and grits, house-cured gravlax, and seasonal egg dishes.' },
      { name: 'Catering & Events', description: 'Off-site catering for events of 30 to 150 guests. Full bar service and staffing included.' }
    ],
    testimonials: [
      { name: 'Eloise Marchand', role: 'Local regular', text: 'The duck confit with pepper jelly glaze is the best thing I\'ve eaten in this city — and I don\'t say that lightly. Margaux\'s cooking is deeply personal.' },
      { name: 'William Sato', role: 'Visiting from New York', text: 'A friend insisted we eat here on our trip to New Orleans. We booked a second dinner before the first one was over. The wine pairings were outstanding.' },
      { name: 'Christine Mouton', role: 'Private dining client', text: 'We held our anniversary dinner in the upstairs room. The menu was thoughtful, the service was warm, and every guest asked for the restaurant\'s name.' }
    ],
    contact: { address: '819 Chartres St', city: 'New Orleans, LA 70116', country: 'United States', phone: '+1 (504) 555-0276', email: 'reservations@saffronandvine.com', hours: ['Wednesday – Sunday: 5:30 PM – 10:00 PM', 'Saturday – Sunday Brunch: 10:00 AM – 2:00 PM', 'Monday – Tuesday: Closed'] },
    image: restaurantImg
  }
];
