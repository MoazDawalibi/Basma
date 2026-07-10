import brandMark from '@/assets/images/basma-mark.png'
import basmaAbout from '@/assets/images/basma-about.png'
import brandWordmark from '@/assets/images/basma-wordmark.png'
import contactHandshake from '@/assets/Contact-Image.png'
import footerTentacle from '@/assets/Footer-Image.png'
import heroArtwork from '@/assets/images/hero-brain.png'
import moazFounder from '@/assets/images/moaz-founder.png'
import brightDentProject from '@/assets/images/projects/bright-dent.png'
import etaxiProject from '@/assets/images/projects/etaxi.png'
import misbarProject from '@/assets/images/projects/misbar.png'
import optimumProject from '@/assets/images/projects/optimum.png'
import qtrendProject from '@/assets/images/projects/qtrend.png'

export const homeContent = {
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
        name: 'Moaz Dawalibi',
        role: 'Graphic Designer, UI/UX Designer & Project Manager',
        bio: 'With strong experience in graphic design and user experience, Moaz manages the creative and operational direction at Basma.',
        image: moazFounder,
        imageAlt: 'Moaz Dawalibi seated in a blue chair',
      },
    ],
  },
  basma: {
    title: 'Basma',
    body: 'Basma creates a new step for your project and leaves a lifelong impact. We turn your idea into a realistic project that reaches people and increases your income and profit.',
    artwork: basmaAbout,
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
        features: [
          'Sleek and modern design',
          'Mobile-friendly responsiveness',
          'Integrated social media links',
        ],
      },
      {
        title: 'Etaxi',
        description: 'Landing page for a taxi service provider.',
        image: etaxiProject,
        imageAlt: 'Etaxi landing page screenshot',
        features: [
          'Service area overview',
          'Contactless booking features',
          'Promotional offers display',
        ],
      },
      {
        title: 'Bright Dent',
        description: 'Website for a dental clinic offering advanced services.',
        image: brightDentProject,
        imageAlt: 'Bright Dent website screenshot',
        features: [
          'Appointment booking system',
          'Detailed service descriptions',
          'Interactive location map',
        ],
      },
      {
        title: 'Optimum',
        description: 'Corporate website for presenting business services.',
        image: optimumProject,
        imageAlt: 'Optimum corporate website screenshot',
        features: [
          'Comprehensive service overview',
          'Corporate identity presentation',
          'Team and contact sections',
        ],
      },
    ],
  },
  contact: {
    titleStart: 'Let’s Build Something',
    titleAccent: 'Together',
    subtitle:
      'We believe that every project starts with a simple idea and grows through collaboration. If you’re ready to turn your concept into a clear, functional design, we’re here to make it real. Contact us to start shaping your next project.',
    formTitle: 'Let’s connect constellations',
    formBody:
      "Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.",
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
