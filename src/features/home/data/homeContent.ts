import brandMark from '@/assets/images/basma-mark.png'
import basmaAbout from '@/assets/images/basma-about.png'
import brandWordmark from '@/assets/images/basma-wordmark.png'
import contactHandshake from '@/assets/Contact-Image.png'
import footerTentacle from '@/assets/Footer-Image.png'
import heroArtwork from '@/assets/images/hero-brain.png'
import brightDentProject from '@/assets/images/projects/Bright.png'
import etaxiProject from '@/assets/images/projects/Etaxi.png'
import misbarProject from '@/assets/images/projects/Misbar.png'
import optimumProject from '@/assets/images/projects/Optimum.png'
import qtrendProject from '@/assets/images/projects/Qtrend.png'
import aheldubaiProject from '@/assets/images/projects/aheldubai.png'
import talabeeProject from '@/assets/images/projects/talabee.png'
import recoProject from '@/assets/images/projects/reco.png'
import recoV2Project from '@/assets/images/projects/recov2.png'
import zakerProject from '@/assets/images/projects/zaker.png'
import fsheinProject from '@/assets/images/projects/Fshein.png'
import karmaProject from '@/assets/images/projects/Karma.png'
import karmaV2Project from '@/assets/images/projects/Karmav2.png'
import kareemProject from '@/assets/images/projects/Karim.png'
import dmProject from '@/assets/images/projects/Dm.png'
import mnsProject from '@/assets/images/projects/Mns.png'
import narabiaProject from '@/assets/images/projects/NArabia.png'
import nokhbehProject from '@/assets/images/projects/Nokhbeh.png'
import sdnoneProject from '@/assets/images/projects/Sdnone.png'

export const homeContent = {
  ui: {
    skipToContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    projectActions: 'Project actions',
    statistics: 'Basma statistics',
    projectSlider: 'Project slider',
    projectSliderControls: 'Project slider controls',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    viewProject: 'View Project',
    firstName: 'Your Name',
    lastName: 'Company / Brand',
    email: 'Email',
    phoneNumber: 'Project Type, Budget, Timeline',
    message: 'Tell us about the website, app, or digital product you want to build',
    socialLinks: 'Social links',
    footerNavigation: 'Footer navigation',
    home: 'home',
    languageSelection: 'Language selection',
    lightMode: 'Light',
    darkMode: 'Dark',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
    keyFeatures: 'Key Features:',
    pageTitle: 'Basma — Where Ideas Become Real',
    pageDescription: 'Basma turns ambitious ideas into thoughtful, effective digital products.',
    contactSending: 'Sending...',
    contactSuccess: 'Thank you. Your message was sent successfully.',
    contactError: 'Something went wrong. Please try again.',
  },
  brand: {
    name: 'Basma',
    mark: brandMark,
    wordmark: brandWordmark,
  },
  navigation: [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
  ],
  hero: {
    title: 'Where Ideas Become Real',
    subtitle: 'Deep expertise, decisive courtroom presence',
    artwork: heroArtwork,
    primaryAction: { label: 'Start Project', href: '#contact' },
    secondaryAction: { label: 'View Our Work', href: '#work' },
  },
  about: {
    title: 'Digital Products With A Clear Business Purpose',
    body: 'Basma helps ambitious teams turn complex ideas into useful digital products. We connect business thinking, thoughtful design, and dependable development so every decision moves the product and the business forward.',
    action: { label: 'Start Your Project', href: '#contact' },
  },
  collaboration: {
    eyebrow: 'Our Partnership',
    titleLead: 'Two Minds.',
    titleAccent: 'One Vision.',
    subtitle: 'Basma brings technology and creativity together to transform ideas into clear, functional, and memorable digital experiences.',
    areas: [
      {
        kind: 'technology',
        title: 'Technology & Strategy',
        description: 'We build reliable digital foundations and manage every stage from planning to launch.',
        items: ['Website Development', 'Mobile Applications', 'Technical Architecture', 'Project Planning', 'Performance & Security'],
      },
      {
        kind: 'design',
        title: 'Design & Experience',
        description: 'We create thoughtful experiences that are visually distinctive and easy to use.',
        items: ['UI/UX Design', 'Branding', 'Visual Identity', 'User Experience', 'Creative Direction'],
      },
    ],
    statementLead: 'Strategy + Creativity =',
    statementAccent: 'Digital Products Built to Grow',
  },
  process: {
    eyebrow: 'How We Work',
    title: 'Clarity Before Complexity',
    subtitle: 'A focused process that connects every decision to your business goals and keeps momentum from first conversation to launch.',
    steps: [
      { title: 'Discovery', description: 'Understand your business, goals, audience, and the challenge worth solving.' },
      { title: 'Strategy', description: 'Create a focused product roadmap before writing a single line of code.' },
      { title: 'Design', description: 'Shape intuitive experiences that make complex ideas feel clear and useful.' },
      { title: 'Development', description: 'Build a scalable, fast, and maintainable product with care.' },
      { title: 'Launch', description: 'Test, deploy, measure, and support the product beyond release.' },
    ],
  },
  whyBasma: {
    eyebrow: 'Why Basma',
    title: 'Built Around What Moves You Forward',
    subtitle: 'Small enough to stay close. Experienced enough to see the whole product.',
    items: [
      { kind: 'speed', title: 'Fast Delivery', description: 'Focused scopes and direct communication keep work moving without sacrificing quality.' },
      { kind: 'business', title: 'Business First', description: 'Every product decision starts with the result it needs to create for your business.' },
      { kind: 'experience', title: 'Modern User Experience', description: 'Clear, accessible interfaces help people understand your product and act with confidence.' },
      { kind: 'partnership', title: 'Long-Term Partnership', description: 'We stay accountable after launch, helping the product adapt, improve, and grow.' },
    ],
  },
  basma: {
    title: 'Basma',
    body: 'Basma means a lasting mark. We create products people understand, trust, and remember built to make a measurable difference after launch.',
    artwork: basmaAbout,
    imageAlt: 'Basma visual identity',
  },
  stats: [
    { value: 6, suffix: '+', label: 'years of experience' },
    { value: 98, suffix: '%', label: 'Client satisfaction rate' },
    { value: 35, suffix: '+', label: 'Projects delivered' },
  ],
  services: {
    title: 'From First Decision to Final Detail',
    body: 'Strategy, experience, and engineering work as one system giving you fewer handoffs, clearer decisions, and a stronger product.',
    items: [
      {
        title: 'UI/UX Design',
        description: 'User centered interfaces that are simple, intuitive, and visually consistent.',
      },
      {
        title: 'Website Development',
        description: 'Fast, responsive websites built with clean structure and modern code.',
      },
      {
        title: 'Mobile App Development',
        description: 'Practical, user-friendly apps for iOS and Android.',
      },
      {
        title: 'Prototyping & Wireframing',
        description: 'Turning ideas into structured, testable screens.',
      },
      {
        title: 'Design System & Branding Basics',
        description: 'Colors, components, and guidelines that keep your product consistent.',
      },
      {
        title: 'Project Planning & Execution',
        description: 'Organizing the idea, defining the flow, and delivering a complete product.',
      },
    ],
  },
 work: {
  titleStart: 'Selected',
  titleAccent: 'Projects',
  subtitle: 'Products shaped around real goals from focused launches to platforms built for daily use.',
  filtersLabel: 'Filter projects by category',
  filters: [
    { value: 'all', label: 'All' },
    { value: 'landing-pages', label: 'Landing Pages' },
    { value: 'websites', label: 'Websites' },
    { value: 'dashboards', label: 'Dashboards' },
    { value: 'mobile-apps', label: 'Mobile Apps' },
  ],

  projects: [
  {
    title: 'Qtrend',
    description: 'A platform for trend analysis and market insights.',
    image: qtrendProject,
    imageAlt: 'Qtrend landing page screenshot',
    projectUrl: 'https://qtrend.vercel.app/',
    category: 'dashboards',
    features: [
      'Real-time data visualization',
      'User-friendly interface for market tracking',
      'Customizable alerts and notifications',
    ],
  },
  {
    title: 'Misbar',
    description: 'Landing page for showcasing creative projects.',
    image: misbarProject,
    imageAlt: 'Misbar landing page screenshot',
    projectUrl: 'https://misbar-landingpage.vercel.app/',
    category: 'landing-pages',
    features: [
      'Sleek and modern design',
      'Mobile-friendly responsiveness',
      'Integrated social media links',
    ],
  },
  {
    title: 'Bright Dent',
    description: 'Website for a dental clinic offering advanced services.',
    image: brightDentProject,
    imageAlt: 'Bright Dent website screenshot',
    projectUrl: 'https://bright-dent-website.vercel.app/',
    category: 'websites',
    features: [
      'Appointment booking system',
      'Detailed service descriptions',
      'Interactive location map',
    ],
  },
  {
    title: 'Talabee',
    description: 'An e-commerce platform for ordering food online.',
    image: talabeeProject,
    imageAlt: 'Talabee website screenshot',
    projectUrl: 'https://talabee.vercel.app/',
    category: 'mobile-apps',
    features: [
      'Seamless online food ordering',
      'Secure payment integration',
      'Real-time order tracking',
    ],
  },
  {
    title: 'AhlDubai',
    description: 'Professional medical landing page.',
    image: aheldubaiProject,
    imageAlt: 'AhlDubai website screenshot',
    projectUrl: 'https://medical-landing-page-iota.vercel.app/',
    category: 'landing-pages',
    features: [
      'Healthcare services',
      'Health blog',
      'Contact & location',
    ],
  },
  {
    title: 'Reco',
    description: 'Environmental awareness organization website.',
    image: recoProject,
    imageAlt: 'Reco website screenshot',
    projectUrl: 'https://recoproject.org/',
    category: 'websites',
    features: [
      'Environmental education',
      'Eco-friendly tips',
      'Community participation',
    ],
  },
  {
    title: 'Etaxi',
    description: 'Landing page for a taxi service provider.',
    image: etaxiProject,
    imageAlt: 'Etaxi landing page screenshot',
    projectUrl: 'https://taxi-app-landing-page.vercel.app/',
    category: 'landing-pages',
    features: [
      'Service area overview',
      'Contactless booking',
      'Promotional offers',
    ],
  },
  {
    title: 'Zaker',
    description: 'AI-powered study companion.',
    image: zakerProject,
    imageAlt: 'Zaker website screenshot',
    projectUrl: 'https://zaker.vercel.app/',
    category: 'dashboards',
    features: [
      'AI recommendations',
      'Interactive quizzes',
      'Study resources',
    ],
  },
  {
    title: '4Leaf',
    description: 'Fashion brand landing page.',
    image: fsheinProject,
    imageAlt: '4Leaf landing page screenshot',
    projectUrl: 'https://4-leaf.vercel.app/',
    category: 'landing-pages',
    features: [
      'Collection showcase',
      'Promotional videos',
      'Feedback form',
    ],
  },
  {
    title: 'Reco V2',
    description: 'Interactive environmental platform.',
    image: recoV2Project,
    imageAlt: 'Reco V2 website screenshot',
    projectUrl: 'https://reco-website.vercel.app/',
    category: 'websites',
    features: [
      'Educational resources',
      'Carbon reduction tools',
      'Community initiatives',
    ],
  },
  {
    title: 'KarmaCoin V2',
    description: 'Advanced cryptocurrency platform.',
    image: karmaV2Project,
    imageAlt: 'KarmaCoin V2 screenshot',
    projectUrl: 'https://new-karma-coin.vercel.app/',
    category: 'dashboards',
    features: [
      'Trading algorithms',
      'Modern dashboard',
      'Multi-coin support',
    ],
  },
  {
    title: 'SDNone',
    description: 'Professional portfolio website.',
    image: sdnoneProject,
    imageAlt: 'SDNone website screenshot',
    projectUrl: 'https://sdnone.vercel.app/',
    category: 'websites',
    features: [
      'Portfolio showcase',
      'Image gallery',
      'Contact form',
    ],
  },
  {
    title: 'Optimum',
    description: 'Corporate website for an industrial group.',
    image: optimumProject,
    imageAlt: 'Optimum website screenshot',
    category: 'websites',
    features: [
      'Corporate services',
      'Company updates',
      'Team section',
    ],
  },
  {
    title: 'KarmaCoin',
    description: 'Cryptocurrency trading platform.',
    image: karmaProject,
    imageAlt: 'KarmaCoin screenshot',
    category: 'dashboards',
    features: [
      'Market rates',
      'Wallet integration',
      'Transaction history',
    ],
  },
  {
    title: 'Kareem Ecommerce',
    description: 'Modern e-commerce platform.',
    image: kareemProject,
    imageAlt: 'Kareem Ecommerce screenshot',
    projectUrl: 'https://ecommerce-structure-six.vercel.app/',
    category: 'websites',
    features: [
      'Shopping cart',
      'Secure payments',
      'Order tracking',
    ],
  },
  {
    title: 'DM',
    description: 'Business collaboration platform.',
    image: dmProject,
    imageAlt: 'DM website screenshot',
    projectUrl: 'https://dm-f9z6.vercel.app/',
    category: 'dashboards',
    features: [
      'Team management',
      'Chat',
      'File sharing',
    ],
  },
  {
    title: 'MNS',
    description: 'Technology startup landing page.',
    image: mnsProject,
    imageAlt: 'MNS website screenshot',
    projectUrl: 'https://mns-ecommerce.vercel.app/',
    category: 'landing-pages',
    features: [
      'Startup showcase',
      'Investor section',
      'News blog',
    ],
  },
  {
    title: 'Nokhbeh Arabia',
    description: 'Regional business networking platform.',
    image: narabiaProject,
    imageAlt: 'Nokhbeh Arabia screenshot',
    category: 'websites',
    features: [
      'User profiles',
      'Discussion forums',
      'Events',
    ],
  },
  {
    title: 'Elite Auction',
    description: 'Premium online auction platform.',
    image: nokhbehProject,
    imageAlt: 'Elite Auction screenshot',
    category: 'dashboards',
    features: [
      'Real-time bidding',
      'Secure payments',
      'Analytics',
    ],
  },
]
  },
  contact: {
    titleStart: 'Ready To Build Something Bigger?',
    subtitle: 'Your next successful digital product starts with one conversation.',
    formTitle: 'Tell us what you’re building',
    formBody: 'Share the goal, the challenge, and where you are today. We’ll help define the clearest next step.',
    image: contactHandshake,
    imageAlt: 'Business handshake over a bright yellow circle',
    submitLabel: 'Start Your Project',
    responseTime: 'Usually we reply within 24 hours.',
  },
  footer: {
    brandName: 'Basma',
    description: 'Business thinking, thoughtful design, and dependable technology working together.',
    artwork: footerTentacle,
    socialLinks: [
      { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
      { label: 'X', href: 'https://x.com/', icon: 'x' },
    ],
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Product strategy', href: '#services' },
          { label: 'UI/UX design', href: '#services' },
          { label: 'Development', href: '#services' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'Selected work', href: '#work' },
          { label: 'Our process', href: '#process' },
          { label: 'Why Basma', href: '#why-basma' },
        ],
      },
      {
        title: 'Start',
        links: [
          { label: 'Start a project', href: '#contact' },
          { label: 'About Basma', href: '#about' },
        ],
      },
    ],
  },
} as const

type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer Item)[]
      ? ReadonlyArray<DeepWiden<Item>>
      : T extends object
        ? { [Key in keyof T]: DeepWiden<T[Key]> }
        : T

export type HomeContent = DeepWiden<typeof homeContent>
