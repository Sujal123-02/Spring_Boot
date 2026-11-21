export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Activities',
    photo: null,
    conversionScore: '100%',
    conversionRank: 0
  },
  {
    id: 'boardgames',
    name: 'Board Games & Socials',
    photo: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=160&q=80',
    conversionScore: '96% Repeat',
    conversionRank: 1
  },
  {
    id: 'sports',
    name: 'Pickleball & Sports',
    photo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=160&q=80',
    conversionScore: '92% Demand',
    conversionRank: 2
  },
  {
    id: 'coffee',
    name: 'Coffee & Walks',
    photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=160&q=80',
    conversionScore: '89% Weekend',
    conversionRank: 3
  },
  {
    id: 'crafts',
    name: 'Pottery & Crafts',
    photo: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=160&q=80',
    conversionScore: '87% Creative',
    conversionRank: 4
  },
  {
    id: 'outdoors',
    name: 'Hiking & Treks',
    photo: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=160&q=80',
    conversionScore: '84% Adventure',
    conversionRank: 5
  },
  {
    id: 'food',
    name: 'Tasting & Bakes',
    photo: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=160&q=80',
    conversionScore: '82% Heritage',
    conversionRank: 6
  },
  {
    id: 'photography',
    name: 'Photo Walks',
    photo: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=160&q=80',
    conversionScore: '78% Hobby',
    conversionRank: 7
  },
  {
    id: 'wellness',
    name: 'Yoga & Breathwork',
    photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=160&q=80',
    conversionScore: '76% Wellness',
    conversionRank: 8
  }
];

export const EXPERIENCES = [
  {
    id: 'exp-bg',
    title: 'Koregaon Park Saturday Twilight Board Game Cafe & Gelato Social',
    tagline: 'Join curated strategy & party tables (Catan, Wingspan, Secret Hitler) with game sommeliers, craft cold brew & artisanal gelato.',
    category: 'boardgames',
    categoryLabel: 'Board Games & Socials',
    rating: 4.98,
    reviewCount: 52,
    price: 399,
    duration: '3.0 Hours',
    groupSize: 'Max 16 people',
    difficulty: 'All Levels (Beginners Welcomed)',
    location: {
      venueName: 'Dice & Drip Board Game Lounge',
      address: 'Lane 6, Koregaon Park (Near South Main Road)',
      city: 'Pune',
      coordinates: { lat: 18.5362, lng: 73.8940 },
      amenities: ['500+ Curated Game Vault', 'Dedicated Table Coaches', 'Craft Beverage Included', 'AC Lounge Seating']
    },
    host: {
      id: 'host-bg',
      name: 'Rishi & Tanya',
      title: 'Board Game Sommeliers & Community Hosts',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Lifelong tabletop enthusiasts who built Pune’s warmest social gaming circle. We teach rules in 5 minutes so you never have to read a rulebook. 70% of guests join solo!',
      isVerified: true,
      experiencesHosted: 114,
      totalAttendees: 1820,
      badge: 'Superhost'
    },
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Only 3 spots left',
    sessions: [
      {
        id: 'sess-bg-1',
        date: 'Saturday, 22 Nov 2026',
        startTime: '06:00 PM',
        endTime: '09:00 PM',
        availableSpots: 3,
        totalCapacity: 16,
        registeredCount: 13,
        status: 'OPEN'
      },
      {
        id: 'sess-bg-2',
        date: 'Sunday, 23 Nov 2026',
        startTime: '05:00 PM',
        endTime: '08:00 PM',
        availableSpots: 6,
        totalCapacity: 16,
        registeredCount: 10,
        status: 'OPEN'
      }
    ],
    description: `Skip crowded pubs and awkward mixers. Spend Saturday twilight at our cozy Koregaon Park tabletop lounge with over 500 hand-picked modern board games.

Whether you're excited for social deduction games like Secret Hitler and Avalon, or cozy Euro strategy games like Wingspan, Cascadia, and Ticket to Ride—Rishi & Tanya personally match you with like-minded players and explain all rules in under 5 minutes.

Enjoy handcrafted pour-overs, artisanal Italian gelato cups, and meet fellow Pune creators and professionals in a relaxed, laughter-filled setting.`,
    itinerary: [
      { time: '06:00 PM', title: 'Welcome Beverage & Table Matchmaking', desc: 'Settle in with artisan cold brew or hot cocoa; quick icebreaker round to find your table vibe.' },
      { time: '06:30 PM', title: 'Curated Strategy Table Sessions', desc: 'Hosts coach tables through Wingspan, Catan, or Cascadia with guided setup.' },
      { time: '07:45 PM', title: 'Artisanal Gelato Tasting & Social Mingle', desc: 'Sample small-batch hazelnut and dark chocolate gelato cups.' },
      { time: '08:15 PM', title: 'High-Energy Social Deduction Finale', desc: 'All tables merge for a lively game of Secret Hitler and Codenames.' }
    ],
    requirements: [
      'Zero board game experience needed — hosts teach everything step-by-step',
      'Solo attendees enthusiastically welcomed (70% join solo)',
      'Comfortable cafe seating attire'
    ],
    ratingBreakdown: {
      stars: { 5: 96, 4: 4, 3: 0, 2: 0, 1: 0 },
      categories: [
        { label: 'Host Table Coaching', score: '5.0' },
        { label: 'Solo-Friendly Atmosphere', score: '5.0' },
        { label: 'Game Selection & Condition', score: '4.9' },
        { label: 'Gelato & Beverage Quality', score: '4.9' }
      ]
    },
    reviews: [
      {
        id: 'rev-bg-1',
        author: 'Aditi Varma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        date: 'Nov 14, 2026',
        rating: 5,
        cohort: 'Saturday Twilight Cohort',
        verified: true,
        comment: 'I came solo after a long exhausting work week and was slightly nervous. Within ten minutes Rishi had us laughing hysterically over Secret Hitler. Met the nicest people!',
        hostReply: {
          name: 'Rishi & Tanya',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          text: 'You were the sharpest Chancellor we have had all month, Aditi! See you next Saturday for Wingspan.'
        }
      },
      {
        id: 'rev-bg-2',
        author: 'Kunal Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        date: 'Nov 7, 2026',
        rating: 5,
        cohort: 'Saturday Twilight Cohort',
        verified: true,
        comment: 'The gelato is genuinely top tier and the game vault is incredible. They had games I have been wanting to play for years like Dune Imperium. Highly recommended.'
      }
    ]
  },
  {
    id: 'exp-1',
    title: 'Sunrise Bouldering & Artisan Chemex Pour-Over Lab',
    tagline: 'Scale volcanic rock formations at golden hour, then brew single-origin coffee overlooking the city.',
    category: 'outdoors',
    categoryLabel: 'Outdoor Adventure',
    rating: 4.96,
    reviewCount: 42,
    price: 799,
    duration: '3.5 Hours',
    groupSize: 'Max 12 people',
    difficulty: 'Moderate',
    location: {
      venueName: 'ARAI Hills Nature Reserve',
      address: 'Vetal Tekdi Main Trailhead, Off Senapati Bapat Road',
      city: 'Pune',
      coordinates: { lat: 18.5284, lng: 73.8188 },
      amenities: ['Free Trailside Parking', 'Drinking Water Refills', 'Bouldering Chalk Provided', 'First-Aid Kit']
    },
    host: {
      id: 'host-1',
      name: 'Anand Kulkarni',
      title: 'Certified Mountaineer & Q-Grader Barista',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Lifelong Pune rock climber with 9 years leading alpine expeditions. Weekends are reserved for coaching beginners on our iconic hills and brewing exceptional local beans.',
      isVerified: true,
      experiencesHosted: 84,
      totalAttendees: 920,
      badge: 'Superhost'
    },
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Only 2 spots left',
    sessions: [
      {
        id: 'sess-1',
        date: 'Saturday, 22 Nov 2026',
        startTime: '06:30 AM',
        endTime: '10:00 AM',
        availableSpots: 2,
        totalCapacity: 12,
        registeredCount: 10,
        status: 'OPEN'
      },
      {
        id: 'sess-2',
        date: 'Sunday, 23 Nov 2026',
        startTime: '06:30 AM',
        endTime: '10:00 AM',
        availableSpots: 5,
        totalCapacity: 12,
        registeredCount: 7,
        status: 'OPEN'
      },
      {
        id: 'sess-3',
        date: 'Saturday, 29 Nov 2026',
        startTime: '06:30 AM',
        endTime: '10:00 AM',
        availableSpots: 0,
        totalCapacity: 12,
        registeredCount: 12,
        status: 'SOLD_OUT'
      }
    ],
    description: `We kick off at first light at the base of ARAI Hills. We’ll hike a quiet 15-minute trail up to the secluded basalt boulder garden away from typical city noise.

Whether you're taking your first vertical grip or looking to hone boulder footwork, Anand guides you through safe friction moves, balance techniques, and spotting.

Once our arms are pumped, we transition to our portable brew setup under the banyan grove. You will hand-grind freshly roasted Araku Valley beans and learn proper pour-over bloom techniques while enjoying warm local sourdough toasts.`,
    itinerary: [
      { time: '06:30 AM', title: 'Gear Fitting & Trailhead Briefing', desc: 'Meet at ARAI Gate, adjust harness/chalk, dynamic warm-up.' },
      { time: '07:00 AM', title: 'Basalt Bouldering Workshop', desc: 'Guided bouldering problems (V0 to V3) tailored to individual skill.' },
      { time: '08:45 AM', title: 'Artisan Chemex Brew Session', desc: 'Tasting notes, water temp control, and pour-over demonstration.' },
      { time: '09:45 AM', title: 'Summit Wind-Down & Group Reflection', desc: 'Gentle mobility stretches overlooking the Pune skyline.' }
    ],
    requirements: [
      'Sturdy closed-toe shoes or trail runners (strictly required)',
      '1 Litre reusable water bottle',
      'Comfortable athletic clothes you don’t mind dusting with chalk',
      'No prior rock climbing experience required'
    ],
    ratingBreakdown: {
      stars: { 5: 94, 4: 6, 3: 0, 2: 0, 1: 0 },
      categories: [
        { label: 'Host Guidance & Technique', score: '5.0' },
        { label: 'Safety Protocols & Equipment', score: '5.0' },
        { label: 'Trailhead Venue & Vibes', score: '4.9' },
        { label: 'Value for Investment', score: '4.8' }
      ]
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Rhea Sen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        date: 'Nov 15, 2026',
        rating: 5,
        cohort: 'Saturday Sunrise Cohort',
        verified: true,
        comment: 'Hands down the best Saturday morning I’ve spent in months. Anand is remarkably calm and patient. Even with zero climbing background, I felt completely safe!',
        hostReply: {
          name: 'Anand Kulkarni',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          text: 'So happy you enjoyed the bouldering and the Araku pour-over, Rhea! Great footwork on that vertical pitch.'
        }
      },
      {
        id: 'rev-2',
        author: 'Siddharth Menon',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        date: 'Nov 8, 2026',
        rating: 5,
        cohort: 'Saturday Sunrise Cohort',
        verified: true,
        comment: 'The Chemex coffee at the summit was extraordinary. The gear was top notch and the group vibe was super friendly and welcoming.'
      },
      {
        id: 'rev-3',
        author: 'Kavya Raman',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        date: 'Oct 25, 2026',
        rating: 5,
        cohort: 'Sunday Morning Cohort',
        verified: true,
        comment: 'Waking up early was so worth it. The fresh air, warm sourdough toast, and learning the science of coffee bloom made this unforgettable.'
      }
    ]
  },
  {
    id: 'exp-2',
    title: 'Pashan Lake Dawn Birding & Wildlife Lens Craft',
    tagline: 'Capture migratory flamingos and kingfishers with prime telephoto glass under gentle dawn light.',
    category: 'photography',
    categoryLabel: 'Photo Walk',
    rating: 4.92,
    reviewCount: 31,
    price: 549,
    duration: '2.5 Hours',
    groupSize: 'Max 10 people',
    difficulty: 'Easy',
    location: {
      venueName: 'Pashan Bird Sanctuary Trail',
      address: 'Pashan Lake Walkway, Ram Nadi Basin',
      city: 'Pune',
      coordinates: { lat: 18.5362, lng: 73.7824 },
      amenities: ['Binoculars on Loan', 'Field Guide Booklets', 'Restroom at Trailhead']
    },
    host: {
      id: 'host-2',
      name: 'Tanvi Deshpande',
      title: 'Wildlife Biologist & National Geographic Contributor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Studying wetland ecology around the Western Ghats for over 7 years. I help nature enthusiasts spot hidden avian behavior without disturbing delicate bird habitats.',
      isVerified: true,
      experiencesHosted: 52,
      totalAttendees: 510,
      badge: 'Superhost'
    },
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Filling Fast',
    sessions: [
      {
        id: 'sess-4',
        date: 'Saturday, 22 Nov 2026',
        startTime: '06:15 AM',
        endTime: '08:45 AM',
        availableSpots: 3,
        totalCapacity: 10,
        registeredCount: 7,
        status: 'OPEN'
      }
    ],
    description: `Pashan Lake transforms into an astonishing avian theatre at dawn. From migratory Northern Shovelers to resident white-throated kingfishers, we track birds across the reeds while learning essential exposure and framing techniques. Bring either your DSLR or just your smartphone—Tanvi provides high-power spotter scopes and binocular mounts so everyone gets stunning close-up views.`,
    requirements: [
      'Muted earth-toned clothing (avoid neon jackets)',
      'Mosquito repellant spray',
      'Camera or smartphone'
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Arjun Nambiar',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Tanvi spotted birds I would have walked right past. Her passion for the lake ecosystem is contagious.'
      }
    ]
  },
  {
    id: 'exp-3',
    title: 'Terracotta Wheel Throwing & Wood-Fired Chai Social',
    tagline: 'Get your hands muddy on studio kick-wheels, shape your own tea cups, and sip spiced Kulhad chai.',
    category: 'crafts',
    categoryLabel: 'Artisan Workshop',
    rating: 4.98,
    reviewCount: 64,
    price: 899,
    duration: '3.0 Hours',
    groupSize: 'Max 8 people',
    difficulty: 'Beginner Friendly',
    location: {
      venueName: 'Mati Studio & Clay Kiln',
      address: 'Lane 7, Kothrud Heritage Compound',
      city: 'Pune',
      coordinates: { lat: 18.5074, lng: 73.8077 },
      amenities: ['All Clay & Tools Included', 'Aprons Provided', 'Glazing & Kiln Firing', 'Chai & Snacks']
    },
    host: {
      id: 'host-3',
      name: 'Devika Chitale',
      title: 'Ceramicist & Sculptor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Formally trained at Shantiniketan, I run a sunlit studio dedicated to slow, soulful pottery. You keep every piece you throw!',
      isVerified: true,
      experiencesHosted: 112,
      totalAttendees: 890,
      badge: 'Master Host'
    },
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: '1 Spot Left',
    sessions: [
      {
        id: 'sess-5',
        date: 'Sunday, 23 Nov 2026',
        startTime: '03:30 PM',
        endTime: '06:30 PM',
        availableSpots: 1,
        totalCapacity: 8,
        registeredCount: 7,
        status: 'OPEN'
      }
    ],
    description: `There is something deeply restorative about feeling raw earth center between your palms on a spinning wheel. In this intimate afternoon session, Devika takes you through centering, opening, pulling walls, and rim finishing. After shaping your cups and planters, we gather in the brick courtyard for freshly brewed lemongrass chai. Your pieces are fired in our kiln and ready for pick-up in 10 days!`,
    requirements: [
      'Trim your fingernails beforehand for easier clay manipulation',
      'Wear clothes you don’t mind getting clay on (aprons provided)'
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Kavya Raman',
        date: 'Nov 12',
        rating: 5,
        comment: 'Pure therapy. I made three little espresso cups that now sit on my desk. Devika is an incredible instructor.'
      }
    ]
  },
  {
    id: 'exp-4',
    title: 'Mulshi Lake Golden-Hour Kayak & Campfire Acoustic Jam',
    tagline: 'Glide over glass-calm backwaters at sunset, then pull kayaks ashore for wood-smoked corn and campfire music.',
    category: 'outdoors',
    categoryLabel: 'Watersports & Music',
    rating: 4.88,
    reviewCount: 28,
    price: 1199,
    duration: '4.0 Hours',
    groupSize: 'Max 14 people',
    difficulty: 'Moderate',
    location: {
      venueName: 'Mulshi Backwater Cove',
      address: 'Gharwali Point, Tamhini Ghat Road',
      city: 'Mulshi',
      coordinates: { lat: 18.5028, lng: 73.4982 },
      amenities: ['Lifejackets & Paddles', 'Safety Escort Boat', 'Campfire & Snacks', 'Changing Tents']
    },
    host: {
      id: 'host-4',
      name: 'Rohan & Kabir',
      title: 'Adventure Guides & Indie Folk Duo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Outdoor addicts who believe the best weekends end around a campfire with an acoustic guitar.',
      isVerified: true,
      experiencesHosted: 36,
      totalAttendees: 440,
      badge: 'Superhost'
    },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Weekend Favorite',
    sessions: [
      {
        id: 'sess-6',
        date: 'Saturday, 22 Nov 2026',
        startTime: '04:00 PM',
        endTime: '08:00 PM',
        availableSpots: 4,
        totalCapacity: 14,
        registeredCount: 10,
        status: 'OPEN'
      }
    ],
    description: `Paddle through tranquil secluded inlets of Mulshi lake as the sun sinks behind the Sahyadri mountains. We provide premium sit-on-top tandem and solo kayaks with certified life vests. Once grounded, we light a driftwood fire, roast buttery spiced corn, and pass around acoustic guitars and percussion.`,
    requirements: [
      'A change of dry clothes',
      'Water shoes or flip-flops',
      'Non-swimmers welcome (certified safety vests mandatory)'
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Meera Iyer',
        date: 'Last month',
        rating: 5,
        comment: 'Unbelievable sunset views. Singing by the campfire made all my stress from the corporate week melt away.'
      }
    ]
  },
  {
    id: 'exp-5',
    title: 'Baner Saturday Sunset Pickleball & Craft Tonic Social',
    tagline: 'High-energy doubles rallies on pro outdoor courts, followed by handcrafted kombucha and local craft tonics.',
    category: 'sports',
    categoryLabel: 'Sports & Social',
    rating: 4.95,
    reviewCount: 39,
    price: 499,
    duration: '2.0 Hours',
    groupSize: 'Max 16 people',
    difficulty: 'All Levels',
    location: {
      venueName: 'The Court Club Baner',
      address: 'Survey No. 42, Off Pan Card Club Road, Baner',
      city: 'Pune',
      coordinates: { lat: 18.5590, lng: 73.7868 },
      amenities: ['Pro Carbon Paddles', 'Court Floodlights', 'Chilled Craft Tonics', 'Locker Rooms']
    },
    host: {
      id: 'host-5',
      name: 'Nikhil Merchant',
      title: 'State Level Racket Athlete & Community Builder',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'I run friendly weekend pickleball socials designed to get people off their couches and onto the courts with zero intimidation.',
      isVerified: true,
      experiencesHosted: 70,
      totalAttendees: 840,
      badge: 'Superhost'
    },
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Only 3 spots left',
    sessions: [
      {
        id: 'sess-7',
        date: 'Saturday, 22 Nov 2026',
        startTime: '05:00 PM',
        endTime: '07:00 PM',
        availableSpots: 3,
        totalCapacity: 16,
        registeredCount: 13,
        status: 'OPEN'
      }
    ],
    description: `Pickleball is the fastest-growing social sport for a reason—it’s easy to pick up in 10 minutes, wildly engaging, and full of laughter. We rotate players every 15 minutes so you meet everyone in the group. We supply premium carbon fiber paddles and balls.`,
    requirements: [
      'Non-marking sport shoes or sneakers',
      'Breathable athletic wear'
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Varun K.',
        date: '1 week ago',
        rating: 5,
        comment: 'Never played pickleball before and ended up winning two games with my partner! Fantastic crowd.'
      }
    ]
  },
  {
    id: 'exp-6',
    title: 'Old Pune Heritage Walk, Secret Wada Courtyards & Misal Crawl',
    tagline: 'Step through 300-year-old carved teakwood wadas, listen to Maratha history tales, and taste iconic wood-fire misal.',
    category: 'food',
    categoryLabel: 'Heritage & Food',
    rating: 4.97,
    reviewCount: 88,
    price: 599,
    duration: '3.0 Hours',
    groupSize: 'Max 12 people',
    difficulty: 'Easy Walk',
    location: {
      venueName: 'Shaniwar Wada Northern Gate',
      address: 'Shaniwar Peth, Old City Historic Quarter',
      city: 'Pune',
      coordinates: { lat: 18.5196, lng: 73.8553 },
      amenities: ['Heritage Permit Passes', 'All Food & Tea Tastings Included', 'Audio Guide Headsets']
    },
    host: {
      id: 'host-6',
      name: 'Aditi Joshi',
      title: 'Architectural Historian & Pune Heritage Custodian',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bio: 'Born and raised in the heart of the Peths. I share the untold architecture, courtyard gardens, and culinary secrets of our city.',
      isVerified: true,
      experiencesHosted: 140,
      totalAttendees: 1520,
      badge: 'Master Host'
    },
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80'
    ],
    urgencyBadge: 'Cultural Pick',
    sessions: [
      {
        id: 'sess-8',
        date: 'Sunday, 23 Nov 2026',
        startTime: '07:30 AM',
        endTime: '10:30 AM',
        availableSpots: 4,
        totalCapacity: 12,
        registeredCount: 8,
        status: 'OPEN'
      }
    ],
    description: `Beyond the modern city lies a labyrinth of historic alleys, private timber wadas, and centuries-old spice merchants. Aditi unlocks private wooden courtyard gates closed to typical tourists, explains traditional rain-harvesting cisterns, and caps the morning at a historic brass-pot Misal eatery for piping hot sample plates and jaggery chai.`,
    requirements: [
      'Comfortable walking shoes',
      'Appetite for authentic spicy Maharashtrian breakfast!'
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Nisha Patil',
        date: 'Nov 8',
        rating: 5,
        comment: 'I lived in Pune for 15 years and learned more in these 3 hours than my entire life here. Aditi is a treasure.'
      }
    ]
  }
];

export const MOCK_ORGANIZER_DATA = {
  hostName: 'Anand Kulkarni',
  hostTitle: 'Mountain Guide & Workshop Host',
  metrics: {
    monthlyRevenue: 38400,
    totalBookings: 48,
    occupancyRate: 92,
    activeSessionsCount: 4
  },
  activeSessions: [
    {
      id: 'sess-1',
      title: 'Sunrise Bouldering & Chemex Lab',
      date: 'Saturday, 22 Nov 2026',
      time: '06:30 AM – 10:00 AM',
      venue: 'ARAI Hills Trailhead, Pune',
      registeredCount: 10,
      capacity: 12,
      price: 799,
      status: 'OPEN'
    },
    {
      id: 'sess-2',
      title: 'Sunrise Bouldering & Chemex Lab',
      date: 'Sunday, 23 Nov 2026',
      time: '06:30 AM – 10:00 AM',
      venue: 'ARAI Hills Trailhead, Pune',
      registeredCount: 7,
      capacity: 12,
      price: 799,
      status: 'OPEN'
    },
    {
      id: 'sess-3',
      title: 'Sunrise Bouldering & Chemex Lab',
      date: 'Saturday, 29 Nov 2026',
      time: '06:30 AM – 10:00 AM',
      venue: 'ARAI Hills Trailhead, Pune',
      registeredCount: 12,
      capacity: 12,
      price: 799,
      status: 'SOLD_OUT'
    }
  ],
  attendeesList: [
    { id: 'att-1', bookingId: 'WKD-84910', name: 'Parth Deshmukh', email: 'deshmukhparth080@gmail.com', phone: '+91 98221 44021', seatNumber: 1, status: 'CONFIRMED', checkedIn: true, checkInTime: '06:22 AM' },
    { id: 'att-2', bookingId: 'WKD-84911', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+91 97654 32109', seatNumber: 2, status: 'CONFIRMED', checkedIn: true, checkInTime: '06:28 AM' },
    { id: 'att-3', bookingId: 'WKD-84912', name: 'Rohan Mehta', email: 'rohan.m@outlook.com', phone: '+91 99887 65432', seatNumber: 3, status: 'CONFIRMED', checkedIn: false, checkInTime: null },
    { id: 'att-4', bookingId: 'WKD-84913', name: 'Kavita Iyer', email: 'kavita.i@gmail.com', phone: '+91 98234 11223', seatNumber: 4, status: 'CONFIRMED', checkedIn: false, checkInTime: null },
    { id: 'att-5', bookingId: 'WKD-84914', name: 'Aditya Verma', email: 'aditya.v@gmail.com', phone: '+91 91234 56789', seatNumber: 5, status: 'CONFIRMED', checkedIn: true, checkInTime: '06:30 AM' }
  ],
  waitlist: [
    { id: 'wt-1', position: 1, name: 'Sneha Joshi', phone: '+91 94220 18820', notifiedAt: '20 mins ago' },
    { id: 'wt-2', position: 2, name: 'Vikram Patil', phone: '+91 98900 12345', notifiedAt: 'Pending spot' }
  ]
};
