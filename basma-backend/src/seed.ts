import type { BasmaContent, LocalizedText, Project } from './types.js'

const text = (en: string, ar: string): LocalizedText => ({ en, ar })

type ProjectSeed = [
  id: string,
  title: string,
  descriptionEn: string,
  descriptionAr: string,
  image: string,
  altEn: string,
  altAr: string,
  projectUrl: string,
  category: string,
  featuresEn: string[],
  featuresAr: string[],
]

const projectSeeds: ProjectSeed[] = [
  ['qtrend', 'Qtrend', 'A platform for trend analysis and market insights.', 'منصة لتحليل الاتجاهات وتقديم رؤى السوق.', 'Qtrend.png', 'Qtrend landing page screenshot', 'لقطة شاشة للصفحة الرئيسية لمنصة Qtrend', 'https://qtrend.vercel.app/', 'dashboards', ['Real-time data visualization', 'User-friendly interface for market tracking', 'Customizable alerts and notifications'], ['تصوّر البيانات لحظيًا', 'واجهة سهلة لمتابعة السوق', 'تنبيهات وإشعارات قابلة للتخصيص']],
  ['misbar', 'Misbar', 'Landing page for showcasing creative projects.', 'صفحة تعريفية لعرض المشاريع الإبداعية.', 'Misbar.png', 'Misbar landing page screenshot', 'لقطة شاشة للصفحة الرئيسية لمنصة مسبار', 'https://misbar-landingpage.vercel.app/', 'landing-pages', ['Sleek and modern design', 'Mobile-friendly responsiveness', 'Integrated social media links'], ['تصميم عصري وأنيق', 'تجاوب كامل مع الهاتف', 'ربط بمنصات التواصل الاجتماعي']],
  ['bright-dent', 'Bright Dent', 'Website for a dental clinic offering advanced services.', 'موقع لعيادة أسنان تقدم خدمات متقدمة.', 'Bright.png', 'Bright Dent website screenshot', 'لقطة شاشة لموقع Bright Dent', 'https://bright-dent-website.vercel.app/', 'websites', ['Appointment booking system', 'Detailed service descriptions', 'Interactive location map'], ['نظام حجز المواعيد', 'تفاصيل شاملة للخدمات', 'خريطة موقع تفاعلية']],
  ['talabee', 'Talabee', 'An e-commerce platform for ordering food online.', 'منصة تجارة إلكترونية لطلب الطعام عبر الإنترنت.', 'talabee.png', 'Talabee website screenshot', 'لقطة شاشة لموقع Talabee', 'https://talabee.vercel.app/', 'mobile-apps', ['Seamless online food ordering', 'Secure payment integration', 'Real-time order tracking'], ['طلب طعام بسهولة', 'دفع إلكتروني آمن', 'تتبع الطلب لحظيًا']],
  ['ahldubai', 'AhlDubai', 'Professional medical landing page.', 'صفحة تعريفية طبية احترافية.', 'aheldubai.png', 'AhlDubai website screenshot', 'لقطة شاشة لموقع AhlDubai', 'https://medical-landing-page-iota.vercel.app/', 'landing-pages', ['Healthcare services', 'Health blog', 'Contact & location'], ['الخدمات الصحية', 'مدونة طبية', 'التواصل والموقع']],
  ['reco', 'Reco', 'Environmental awareness organization website.', 'موقع لمنظمة متخصصة في التوعية البيئية.', 'reco.png', 'Reco website screenshot', 'لقطة شاشة لموقع Reco', 'https://recoproject.org/', 'websites', ['Environmental education', 'Eco-friendly tips', 'Community participation'], ['التثقيف البيئي', 'نصائح صديقة للبيئة', 'مشاركة المجتمع']],
  ['etaxi', 'Etaxi', 'Landing page for a taxi service provider.', 'صفحة تعريفية لمزود خدمات سيارات الأجرة.', 'Etaxi.png', 'Etaxi website screenshot', 'لقطة شاشة لموقع Etaxi', 'https://taxi-app-landing-page.vercel.app/', 'landing-pages', ['Service area overview', 'Contactless booking', 'Promotional offers'], ['عرض مناطق الخدمة', 'حجز دون تلامس', 'عروض ترويجية']],
  ['zaker', 'Zaker', 'AI-powered study companion.', 'مساعد دراسي مدعوم بالذكاء الاصطناعي.', 'zaker.png', 'Zaker website screenshot', 'لقطة شاشة لموقع Zaker', 'https://zaker.vercel.app/', 'dashboards', ['AI recommendations', 'Interactive quizzes', 'Study resources'], ['توصيات ذكية', 'اختبارات تفاعلية', 'مصادر دراسية']],
  ['4leaf', '4Leaf', 'Fashion brand landing page.', 'صفحة تعريفية لعلامة أزياء.', 'Fshein.png', '4Leaf landing page screenshot', 'لقطة شاشة لموقع 4Leaf', 'https://4-leaf.vercel.app/', 'landing-pages', ['Collection showcase', 'Promotional videos', 'Feedback form'], ['عرض المجموعات', 'فيديوهات ترويجية', 'نموذج آراء العملاء']],
  ['reco-v2', 'Reco V2', 'Interactive environmental platform.', 'منصة بيئية تفاعلية.', 'recov2.png', 'Reco V2 website screenshot', 'لقطة شاشة لموقع Reco V2', 'https://reco-website.vercel.app/', 'websites', ['Educational resources', 'Carbon reduction tools', 'Community initiatives'], ['مصادر تعليمية', 'أدوات لتقليل الانبعاثات', 'مبادرات مجتمعية']],
  ['karmacoin-v2', 'KarmaCoin V2', 'Advanced cryptocurrency platform.', 'منصة متقدمة للعملات الرقمية.', 'Karmav2.png', 'KarmaCoin V2 screenshot', 'لقطة شاشة لمنصة KarmaCoin V2', 'https://new-karma-coin.vercel.app/', 'dashboards', ['Trading algorithms', 'Modern dashboard', 'Multi-coin support'], ['خوارزميات تداول', 'لوحة تحكم حديثة', 'دعم عدة عملات']],
  ['sdnone', 'SDNone', 'Professional portfolio website.', 'موقع معرض أعمال احترافي.', 'Sdnone.png', 'SDNone website screenshot', 'لقطة شاشة لموقع SDNone', 'https://sdnone.vercel.app/', 'websites', ['Portfolio showcase', 'Image gallery', 'Contact form'], ['عرض الأعمال', 'معرض صور', 'نموذج تواصل']],
  ['optimum', 'Optimum', 'Corporate website for an industrial group.', 'موقع مؤسسي لمجموعة صناعية.', 'Optimum.png', 'Optimum website screenshot', 'لقطة شاشة لموقع Optimum', '', 'websites', ['Corporate services', 'Company updates', 'Team section'], ['الخدمات المؤسسية', 'أخبار الشركة', 'قسم الفريق']],
  ['karmacoin', 'KarmaCoin', 'Cryptocurrency trading platform.', 'منصة لتداول العملات الرقمية.', 'Karma.png', 'KarmaCoin screenshot', 'لقطة شاشة لمنصة KarmaCoin', '', 'dashboards', ['Market rates', 'Wallet integration', 'Transaction history'], ['أسعار السوق', 'ربط المحافظ', 'سجل المعاملات']],
  ['kareem-ecommerce', 'Kareem Ecommerce', 'Modern e-commerce platform.', 'منصة تجارة إلكترونية حديثة.', 'Karim.png', 'Kareem Ecommerce screenshot', 'لقطة شاشة لمنصة Kareem Ecommerce', 'https://ecommerce-structure-six.vercel.app/', 'websites', ['Shopping cart', 'Secure payments', 'Order tracking'], ['سلة المشتريات', 'دفع آمن', 'تتبع الطلبات']],
  ['dm', 'DM', 'Business collaboration platform.', 'منصة للتعاون وإدارة الأعمال.', 'Dm.png', 'DM website screenshot', 'لقطة شاشة لموقع DM', 'https://dm-f9z6.vercel.app/', 'dashboards', ['Team management', 'Chat', 'File sharing'], ['إدارة الفريق', 'المحادثات', 'مشاركة الملفات']],
  ['mns', 'MNS', 'Technology startup landing page.', 'صفحة تعريفية لشركة تقنية ناشئة.', 'Mns.png', 'MNS website screenshot', 'لقطة شاشة لموقع MNS', 'https://mns-ecommerce.vercel.app/', 'landing-pages', ['Startup showcase', 'Investor section', 'News blog'], ['عرض الشركة الناشئة', 'قسم المستثمرين', 'مدونة الأخبار']],
  ['nokhbeh-arabia', 'Nokhbeh Arabia', 'Regional business networking platform.', 'منصة إقليمية للتواصل بين رواد الأعمال.', 'NArabia.png', 'Nokhbeh Arabia screenshot', 'لقطة شاشة لمنصة Nokhbeh Arabia', '', 'websites', ['User profiles', 'Discussion forums', 'Events'], ['ملفات المستخدمين', 'منتديات النقاش', 'الفعاليات']],
  ['elite-auction', 'Elite Auction', 'Premium online auction platform.', 'منصة مزادات إلكترونية متميزة.', 'Nokhbeh.png', 'Elite Auction screenshot', 'لقطة شاشة لمنصة Elite Auction', '', 'dashboards', ['Real-time bidding', 'Secure payments', 'Analytics'], ['مزايدة لحظية', 'دفع آمن', 'تحليلات متقدمة']],
]

const projects: Project[] = projectSeeds.map((project, sortOrder) => {
  const [id, title, descriptionEn, descriptionAr, image, altEn, altAr, projectUrl, category, featuresEn, featuresAr] = project
  return {
    id,
    title: text(title, title),
    body: text(descriptionEn, descriptionAr),
    image: { url: `/media/images/projects/${image}`, alt: text(altEn, altAr) },
    projectUrl,
    category,
    features: { en: featuresEn, ar: featuresAr },
    featured: sortOrder < 4,
    sortOrder,
    status: 'published',
  }
})

export const seedContent: BasmaContent = {
  hero: {
    title: text('Where Ideas Become Real', 'حيث تتحول الأفكار إلى واقع'),
    subtitle: text('We design and build digital products that help businesses grow.', 'نصمم ونبني منتجات رقمية تساعد الأعمال على النمو.'),
    artwork: { url: '/media/images/hero-brain.png', alt: text('Basma hero artwork', 'الرسم الرئيسي لبصمة') },
    primaryAction: { label: text('Start Project', 'ابدأ مشروعك'), href: '#contact' },
    secondaryAction: { label: text('View Our Work', 'شاهد أعمالنا'), href: '#work' },
  },
  about: {
    title: text('Digital Products With A Clear Business Purpose', 'منتجات رقمية ذات هدف تجاري واضح'),
    body: text('Basma helps ambitious teams turn complex ideas into useful digital products. We connect business thinking, thoughtful design, and dependable development so every decision moves the product and the business forward.', 'تساعد بصمة الفرق الطموحة على تحويل الأفكار المعقدة إلى منتجات رقمية مفيدة. نجمع بين فهم الأعمال والتصميم المدروس والتطوير الموثوق ليدفع كل قرار المنتج والعمل إلى الأمام.'),
    action: { label: text('Start Your Project', 'ابدأ مشروعك'), href: '#contact' },
  },
  aboutBasma: {
    title: text('Basma', 'بصمة'),
    body: text('Basma means a lasting mark. We create products people understand, trust, and remember—built to make a measurable difference after launch.', 'بصمة تعني أثرًا يدوم. نصنع منتجات يفهمها الناس ويثقون بها ويتذكرونها، ومصممة لتصنع فرقًا ملموسًا بعد الإطلاق.'),
    image: { url: '/media/images/basma-about.png', alt: text('Basma visual identity', 'الهوية البصرية لبصمة') },
  },
  statistics: {
    items: [
      { id: 'experience', value: 6, suffix: '+', label: text('years of experience', 'سنوات من الخبرة'), sortOrder: 0, status: 'published' },
      { id: 'satisfaction', value: 98, suffix: '%', label: text('Client satisfaction rate', 'معدل رضا العملاء'), sortOrder: 1, status: 'published' },
      { id: 'projects', value: 35, suffix: '+', label: text('Projects delivered', 'مشروعًا تم تسليمه'), sortOrder: 2, status: 'published' },
    ],
  },
  services: {
    title: text('From First Decision to Final Detail', 'من أول قرار إلى أدق تفصيل'),
    body: text('Strategy, experience, and engineering work as one system giving you fewer handoffs, clearer decisions, and a stronger product.', 'تعمل الاستراتيجية والتجربة والهندسة كنظام واحد، لتقليل التسليم بين الفرق وتوضيح القرارات وبناء منتج أقوى.'),
    items: [
      ['ui-ux-design', 'UI/UX Design', 'تصميم واجهات وتجربة المستخدم', 'User centered interfaces that are simple, intuitive, and visually consistent.', 'واجهات تتمحور حول المستخدم، بسيطة وسلسة ومتناسقة بصريًا.'],
      ['website-development', 'Website Development', 'تطوير المواقع', 'Fast, responsive websites built with clean structure and modern code.', 'مواقع سريعة ومتجاوبة ببنية واضحة وتقنيات حديثة.'],
      ['mobile-app-development', 'Mobile App Development', 'تطوير تطبيقات الهاتف', 'Practical, user-friendly apps for iOS and Android.', 'تطبيقات عملية وسهلة الاستخدام لنظامي iOS وAndroid.'],
      ['prototyping-wireframing', 'Prototyping & Wireframing', 'النماذج الأولية والمخططات', 'Turning ideas into structured, testable screens.', 'تحويل الأفكار إلى شاشات منظمة وقابلة للاختبار.'],
      ['design-system-branding', 'Design System & Branding Basics', 'أنظمة التصميم وأساسيات الهوية', 'Colors, components, and guidelines that keep your product consistent.', 'ألوان ومكونات وإرشادات تحافظ على اتساق منتجك.'],
      ['project-planning-execution', 'Project Planning & Execution', 'تخطيط المشاريع وتنفيذها', 'Organizing the idea, defining the flow, and delivering a complete product.', 'تنظيم الفكرة وتحديد مسار العمل وتسليم منتج متكامل.'],
    ].map(([id, titleEn, titleAr, bodyEn, bodyAr], sortOrder) => ({ id, title: text(titleEn, titleAr), body: text(bodyEn, bodyAr), icon: '', sortOrder, status: 'published' })),
  },
  projects: {
    titleStart: text('Selected', 'مشاريع'),
    titleAccent: text('Projects', 'مختارة'),
    body: text('Products shaped around real goals from focused launches to platforms built for daily use.', 'منتجات صُممت حول أهداف حقيقية، من عمليات الإطلاق المركزة إلى منصات للاستخدام اليومي.'),
    cards: projects,
  },
  contact: {
    title: text('Ready To Build Something Bigger?', 'هل أنت مستعد لبناء شيء أكبر؟'),
    subtitle: text('Your next successful digital product starts with one conversation.', 'يبدأ منتجك الرقمي الناجح القادم بمحادثة واحدة.'),
    formTitle: text('Tell us what you’re building', 'أخبرنا ماذا تريد أن تبني'),
    formBody: text('Share the goal, the challenge, and where you are today. We’ll help define the clearest next step.', 'شاركنا الهدف والتحدي ومرحلتك الحالية، وسنساعدك على تحديد أوضح خطوة تالية.'),
    image: { url: '/media/Contact-Image.png', alt: text('Business handshake over a bright yellow circle', 'مصافحة عمل أمام دائرة صفراء مضيئة') },
    submitLabel: text('Start Your Project', 'ابدأ مشروعك'),
    responseTime: text('Usually we reply within 24 hours.', 'نرد عادةً خلال 24 ساعة.'),
  },
  socialLinks: [
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram', enabled: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin', enabled: true },
    { id: 'x', label: 'X', href: 'https://x.com/', icon: 'x', enabled: true },
  ],
  marketing: {
    collaboration: {
      eyebrow: text('Our Partnership', 'شراكتنا'),
      titleLead: text('Two Minds.', 'عقلان.'),
      titleAccent: text('One Vision.', 'رؤية واحدة.'),
      subtitle: text('Basma brings technology and creativity together to transform ideas into clear, functional, and memorable digital experiences.', 'تجمع بصمة بين التقنية والإبداع لتحويل الأفكار إلى تجارب رقمية واضحة وعملية ولا تُنسى.'),
      areas: [
        { id: 'technology', kind: 'technology', title: text('Technology & Strategy', 'التقنية والاستراتيجية'), body: text('We build reliable digital foundations and manage every stage from planning to launch.', 'نبني أسسًا رقمية موثوقة وندير كل مرحلة من التخطيط حتى الإطلاق.'), items: { en: ['Website Development', 'Mobile Applications', 'Technical Architecture', 'Project Planning', 'Performance & Security'], ar: ['تطوير المواقع', 'تطبيقات الهاتف', 'البنية التقنية', 'تخطيط المشاريع', 'الأداء والأمان'] } },
        { id: 'design', kind: 'design', title: text('Design & Experience', 'التصميم والتجربة'), body: text('We create thoughtful experiences that are visually distinctive and easy to use.', 'نصمم تجارب مدروسة ومميزة بصريًا وسهلة الاستخدام.'), items: { en: ['UI/UX Design', 'Branding', 'Visual Identity', 'User Experience', 'Creative Direction'], ar: ['تصميم UI/UX', 'بناء العلامات التجارية', 'الهوية البصرية', 'تجربة المستخدم', 'التوجيه الإبداعي'] } },
      ],
      statementLead: text('Strategy + Creativity =', 'الاستراتيجية + الإبداع ='),
      statementAccent: text('Digital Products Built to Grow', 'منتجات رقمية مصممة للنمو'),
    },
    process: {
      eyebrow: text('How We Work', 'كيف نعمل'),
      title: text('Clarity Before Complexity', 'الوضوح قبل التعقيد'),
      subtitle: text('A focused process that connects every decision to your business goals and keeps momentum from first conversation to launch.', 'منهجية مركزة تربط كل قرار بأهداف عملك وتحافظ على الزخم من أول محادثة حتى الإطلاق.'),
      steps: [
        ['discovery', 'Discovery', 'الاكتشاف', 'Understand your business, goals, audience, and the challenge worth solving.', 'نفهم عملك وأهدافك وجمهورك والتحدي الحقيقي الذي يستحق الحل.'],
        ['strategy', 'Strategy', 'الاستراتيجية', 'Create a focused product roadmap before writing a single line of code.', 'نضع خارطة طريق مركزة للمنتج قبل كتابة أول سطر برمجي.'],
        ['design', 'Design', 'التصميم', 'Shape intuitive experiences that make complex ideas feel clear and useful.', 'نصمم تجارب سلسة تجعل الأفكار المعقدة واضحة ومفيدة.'],
        ['development', 'Development', 'التطوير', 'Build a scalable, fast, and maintainable product with care.', 'نبني منتجًا سريعًا وقابلًا للتوسع والصيانة بعناية.'],
        ['launch', 'Launch', 'الإطلاق', 'Test, deploy, measure, and support the product beyond release.', 'نختبر وننشر ونقيس وندعم المنتج بعد إطلاقه.'],
      ].map(([id, titleEn, titleAr, bodyEn, bodyAr]) => ({ id, kind: id, title: text(titleEn, titleAr), body: text(bodyEn, bodyAr) })),
    },
    whyBasma: {
      eyebrow: text('Why Basma', 'لماذا بصمة'),
      title: text('Built Around What Moves You Forward', 'نبني حول ما يدفعك إلى الأمام'),
      subtitle: text('Small enough to stay close. Experienced enough to see the whole product.', 'قريبون بما يكفي لفهمك، وخبراء بما يكفي لرؤية المنتج كاملًا.'),
      items: [
        ['speed', 'Fast Delivery', 'تسليم سريع', 'Focused scopes and direct communication keep work moving without sacrificing quality.', 'نطاق عمل واضح وتواصل مباشر يحافظان على سرعة التنفيذ دون التنازل عن الجودة.'],
        ['business', 'Business First', 'الأعمال أولًا', 'Every product decision starts with the result it needs to create for your business.', 'يبدأ كل قرار في المنتج من النتيجة التي يجب أن يحققها لعملك.'],
        ['experience', 'Modern User Experience', 'تجربة مستخدم حديثة', 'Clear, accessible interfaces help people understand your product and act with confidence.', 'واجهات واضحة وسهلة الوصول تساعد الناس على فهم منتجك والتفاعل معه بثقة.'],
        ['partnership', 'Long-Term Partnership', 'شراكة طويلة الأمد', 'We stay accountable after launch, helping the product adapt, improve, and grow.', 'نبقى مسؤولين بعد الإطلاق لنساعد المنتج على التطور والتحسن والنمو.'],
      ].map(([id, titleEn, titleAr, bodyEn, bodyAr]) => ({ id, kind: id, title: text(titleEn, titleAr), body: text(bodyEn, bodyAr) })),
    },
  },
}
