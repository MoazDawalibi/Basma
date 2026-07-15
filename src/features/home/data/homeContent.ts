import  mariaFounder  from '@/assets/images/maria-founder.png';
import brandMark from '@/assets/images/basma-mark.png'
import basmaAbout from '@/assets/images/basma-about.png'
import brandWordmark from '@/assets/images/basma-wordmark.png'
import contactHandshake from '@/assets/Contact-Image.png'
import footerTentacle from '@/assets/Footer-Image.png'
import heroArtwork from '@/assets/images/hero-brain.png'
import moazFounder from '@/assets/images/moaz-founder.png'
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
    title: 'Who We Are & What We Offer',
    body: 'At Basma, We turn ideas into digital products that are clear, functionl, and built to grow. We help individuals, startups, and businesses bring their vision to life with smart design and solid development.',
    action: { label: 'Start Your Project', href: '#contact' },
  },
  founders: {
    title: 'Meet The Founders Of Basma',
    people: [
      {
        name: 'Moaz Dawalibi',
        role: 'Technical Lead & Project Manager',
        bio: 'With a strong experience in programming and development, Moaz leads each project with precision and strategy.',
        image: moazFounder,
        imageAlt: 'Moaz Dawalibi seated in a blue chair',
      },
      {
        name: 'Maria Al-Samman',
        role: 'Graphic Designer, UI/UX Designer & Project Manager',
        bio: 'With strong experience in graphic design and user experience, Maria manages the creative and operational direction at Basma.',
        image: mariaFounder,
        imageAlt: 'Maria Al-Samman seated in a blue chair',
      },
    ],
  },
  basma: {
    title: 'Basma',
    body: 'Basma creates a new step for your project and leaves a lifelong impact. We turn your idea into a realistic project that reaches people and increases your income and profit.',
    artwork: basmaAbout,
    imageAlt: 'Basma visual identity',
  },
  stats: [
    { value: 6, suffix: '+', label: 'years of experience' },
    { value: 98, suffix: '%', label: 'Client satisfaction rate' },
    { value: 35, suffix: '+', label: 'Projects delivered' },
  ],
  services: {
    title: 'Our Services',
    body: 'We design and build digital products that are clear, functional, and easy to use. Our work combines clean UI/UX design with solid development to deliver complete solutions.',
    items: [
      {
        title: 'UI/UX Design',
        description: 'User-centered interfaces that are simple, intuitive, and visually consistent.',
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
  titleStart: 'What We’ve',
  titleAccent: 'Worked On',
  subtitle: 'A look at the projects we’ve built and the ideas we brought to life.',

  projects: [
  {
    title: 'Qtrend',
    description: 'A platform for trend analysis and market insights.',
    image: qtrendProject,
    imageAlt: 'Qtrend landing page screenshot',
    projectUrl: 'https://qtrend.vercel.app/',
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
    features: [
      'Real-time bidding',
      'Secure payments',
      'Analytics',
    ],
  },
]
  },
  contact: {
    titleStart: 'Let’s Build Something Together',
    // titleAccent: 'Together',
    subtitle:
      'Have an idea for a website, mobile app, dashboard, or digital product? Tell us what you want to build and we’ll help shape it into a clear product plan.',
    formTitle: 'Start your digital project',
    formBody:
      'Share the essentials: your business, project type, timeline, budget range, and the main goal. We’ll reply with the next practical step.',
    image: contactHandshake,
    imageAlt: 'Business handshake over a bright yellow circle',
    submitLabel: 'Let’s Talk!!',
  },
  footer: {
    brandName: 'Basma',
    description: 'Descriptive line about what your company does.',
    artwork: footerTentacle,
    socialLinks: [
      { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
      { label: 'X', href: 'https://x.com/', icon: 'x' },
    ],
    columns: [
      {
        title: 'Features',
        links: [
          { label: 'Core features', href: '#services' },
          { label: 'Pro experience', href: '#services' },
          { label: 'Integrations', href: '#services' },
        ],
      },
      {
        title: 'Learn more',
        links: [
          { label: 'Blog', href: '#work' },
          { label: 'Case studies', href: '#work' },
          { label: 'Customer stories', href: '#work' },
          { label: 'Best practices', href: '#about' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact', href: '#contact' },
          { label: 'Support', href: '#contact' },
          { label: 'Legal', href: '#top' },
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
