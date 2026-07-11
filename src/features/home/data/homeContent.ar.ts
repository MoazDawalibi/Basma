import { homeContent, type HomeContent } from './homeContent'

const projectTranslations = [
  {
    description: 'منصة لتحليل الاتجاهات وتقديم رؤى السوق.',
    imageAlt: 'لقطة شاشة للصفحة الرئيسية لمنصة Qtrend',
    features: ['تصوّر البيانات لحظيًا', 'واجهة سهلة لمتابعة السوق', 'تنبيهات وإشعارات قابلة للتخصيص'],
  },
  {
    description: 'صفحة هبوط لعرض المشاريع الإبداعية.',
    imageAlt: 'لقطة شاشة للصفحة الرئيسية لمنصة مسبار',
    features: ['تصميم عصري وأنيق', 'تجاوب كامل مع الهاتف', 'ربط بمنصات التواصل الاجتماعي'],
  },
  {
    description: 'موقع لعيادة أسنان تقدم خدمات متقدمة.',
    imageAlt: 'لقطة شاشة لموقع Bright Dent',
    features: ['نظام حجز المواعيد', 'تفاصيل شاملة للخدمات', 'خريطة موقع تفاعلية'],
  },
  {
    description: 'منصة تجارة إلكترونية لطلب الطعام عبر الإنترنت.',
    imageAlt: 'لقطة شاشة لموقع Talabee',
    features: ['طلب طعام بسهولة', 'دفع إلكتروني آمن', 'تتبع الطلب لحظيًا'],
  },
  {
    description: 'صفحة هبوط طبية احترافية.',
    imageAlt: 'لقطة شاشة لموقع AhlDubai',
    features: ['الخدمات الصحية', 'مدونة طبية', 'التواصل والموقع'],
  },
  {
    description: 'موقع لمنظمة متخصصة في التوعية البيئية.',
    imageAlt: 'لقطة شاشة لموقع Reco',
    features: ['التثقيف البيئي', 'نصائح صديقة للبيئة', 'مشاركة المجتمع'],
  },
  {
    description: 'صفحة هبوط لمزود خدمات سيارات الأجرة.',
    imageAlt: 'لقطة شاشة لموقع Etaxi',
    features: ['عرض مناطق الخدمة', 'حجز دون تلامس', 'عروض ترويجية'],
  },
  {
    description: 'مساعد دراسي مدعوم بالذكاء الاصطناعي.',
    imageAlt: 'لقطة شاشة لموقع Zaker',
    features: ['توصيات ذكية', 'اختبارات تفاعلية', 'مصادر دراسية'],
  },
  {
    description: 'صفحة هبوط لعلامة أزياء.',
    imageAlt: 'لقطة شاشة لموقع 4Leaf',
    features: ['عرض المجموعات', 'فيديوهات ترويجية', 'نموذج آراء العملاء'],
  },
  {
    description: 'منصة بيئية تفاعلية.',
    imageAlt: 'لقطة شاشة لموقع Reco V2',
    features: ['مصادر تعليمية', 'أدوات لتقليل الانبعاثات', 'مبادرات مجتمعية'],
  },
  {
    description: 'منصة متقدمة للعملات الرقمية.',
    imageAlt: 'لقطة شاشة لمنصة KarmaCoin V2',
    features: ['خوارزميات تداول', 'لوحة تحكم حديثة', 'دعم عدة عملات'],
  },
  {
    description: 'موقع معرض أعمال احترافي.',
    imageAlt: 'لقطة شاشة لموقع SDNone',
    features: ['عرض الأعمال', 'معرض صور', 'نموذج تواصل'],
  },
  {
    description: 'موقع مؤسسي لمجموعة صناعية.',
    imageAlt: 'لقطة شاشة لموقع Optimum',
    features: ['الخدمات المؤسسية', 'أخبار الشركة', 'قسم الفريق'],
  },
  {
    description: 'منصة لتداول العملات الرقمية.',
    imageAlt: 'لقطة شاشة لمنصة KarmaCoin',
    features: ['أسعار السوق', 'ربط المحافظ', 'سجل المعاملات'],
  },
  {
    description: 'منصة تجارة إلكترونية حديثة.',
    imageAlt: 'لقطة شاشة لمنصة Kareem Ecommerce',
    features: ['سلة المشتريات', 'دفع آمن', 'تتبع الطلبات'],
  },
  {
    description: 'منصة للتعاون وإدارة الأعمال.',
    imageAlt: 'لقطة شاشة لموقع DM',
    features: ['إدارة الفريق', 'المحادثات', 'مشاركة الملفات'],
  },
  {
    description: 'صفحة هبوط لشركة تقنية ناشئة.',
    imageAlt: 'لقطة شاشة لموقع MNS',
    features: ['عرض الشركة الناشئة', 'قسم المستثمرين', 'مدونة الأخبار'],
  },
  {
    description: 'منصة إقليمية للتواصل بين رواد الأعمال.',
    imageAlt: 'لقطة شاشة لمنصة Nokhbeh Arabia',
    features: ['ملفات المستخدمين', 'منتديات النقاش', 'الفعاليات'],
  },
  {
    description: 'منصة مزادات إلكترونية متميزة.',
    imageAlt: 'لقطة شاشة لمنصة Elite Auction',
    features: ['مزايدة لحظية', 'دفع آمن', 'تحليلات متقدمة'],
  },
] as const

const projects = homeContent.work.projects.map((project, index) => ({
  ...project,
  ...projectTranslations[index],
})) as unknown as HomeContent['work']['projects']

export const arabicHomeContent: HomeContent = {
  ...homeContent,
  ui: {
    skipToContent: 'تخطَّ إلى المحتوى',
    primaryNavigation: 'التنقل الرئيسي',
    projectActions: 'إجراءات المشروع',
    statistics: 'إحصائيات بسمة',
    projectSlider: 'معرض المشاريع',
    projectSliderControls: 'أزرار معرض المشاريع',
    previousProject: 'المشروع السابق',
    nextProject: 'المشروع التالي',
    viewProject: 'عرض المشروع',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    message: 'الرسالة',
    socialLinks: 'روابط التواصل الاجتماعي',
    footerNavigation: 'روابط التذييل',
    home: 'الرئيسية',
    languageSelection: 'اختيار اللغة',
    lightMode: 'فاتح',
    darkMode: 'داكن',
    switchToLightMode: 'التبديل إلى الوضع الفاتح',
    switchToDarkMode: 'التبديل إلى الوضع الداكن',
    keyFeatures: 'أهم المميزات:',
    pageTitle: 'بسمة — حيث تتحول الأفكار إلى واقع',
    pageDescription: 'تحوّل بسمة الأفكار الطموحة إلى منتجات رقمية مدروسة وفعّالة.',
  },
  brand: { ...homeContent.brand, name: 'بسمة' },
  navigation: [
    { label: 'من نحن', href: '#about' },
    { label: 'خدماتنا', href: '#services' },
  ],
  hero: {
    ...homeContent.hero,
    title: 'حيث تتحول الأفكار إلى واقع',
    subtitle: 'خبرة عميقة، وقرارات تصنع الفرق',
    primaryAction: { label: 'ابدأ مشروعك', href: '#contact' },
    secondaryAction: { label: 'شاهد أعمالنا', href: '#work' },
  },
  about: {
    title: 'من نحن وماذا نقدم',
    body: 'في بسمة، نحوّل الأفكار إلى منتجات رقمية واضحة وعملية وقابلة للنمو. نساعد الأفراد والشركات الناشئة والمؤسسات على تحويل رؤيتهم إلى واقع من خلال تصميم ذكي وتطوير متين.',
    action: { label: 'ابدأ مشروعك', href: '#contact' },
  },
  founders: {
    title: 'تعرّف على مؤسسي بسمة',
    people: [
      {
        ...homeContent.founders.people[0],
        name: 'معاذ دواليبي',
        role: 'القائد التقني ومدير المشاريع',
        bio: 'بخبرة قوية في البرمجة والتطوير، يقود معاذ كل مشروع بدقة ورؤية استراتيجية.',
        imageAlt: 'معاذ دواليبي جالسًا على كرسي أزرق',
      },
      {
        ...homeContent.founders.people[1],
        name: 'ماريا السمان',
        role: 'مصممة جرافيك وواجهات وتجربة مستخدم ومديرة مشاريع',
        bio: 'بخبرة واسعة في التصميم وتجربة المستخدم، تدير ماريا التوجه الإبداعي والتنفيذي في بسمة.',
        imageAlt: 'ماريا السمان جالسة على كرسي أزرق',
      },
    ],
  },
  basma: {
    ...homeContent.basma,
    title: 'بسمة',
    body: 'تصنع بسمة خطوة جديدة لمشروعك وتترك أثرًا يدوم. نحوّل فكرتك إلى مشروع واقعي يصل إلى الناس ويساعد على نمو دخلك وأرباحك.',
    imageAlt: 'الهوية البصرية لبسمة',
  },
  stats: [
    { value: 6, suffix: '+', label: 'سنوات من الخبرة' },
    { value: 98, suffix: '%', label: 'معدل رضا العملاء' },
    { value: 35, suffix: '+', label: 'مشروعًا تم تسليمه' },
  ],
  services: {
    title: 'خدماتنا',
    body: 'نصمم ونطوّر منتجات رقمية واضحة وعملية وسهلة الاستخدام. نجمع بين تصميم واجهات وتجربة مستخدم نظيفة وتطوير متين لنقدم حلولًا متكاملة.',
    items: [
      { title: 'تصميم واجهات وتجربة المستخدم', description: 'واجهات تتمحور حول المستخدم، بسيطة وسلسة ومتناسقة بصريًا.' },
      { title: 'تطوير المواقع', description: 'مواقع سريعة ومتجاوبة ببنية واضحة وتقنيات حديثة.' },
      { title: 'تطوير تطبيقات الهاتف', description: 'تطبيقات عملية وسهلة الاستخدام لنظامي iOS وAndroid.' },
      { title: 'النماذج الأولية والمخططات', description: 'تحويل الأفكار إلى شاشات منظمة وقابلة للاختبار.' },
      { title: 'أنظمة التصميم وأساسيات الهوية', description: 'ألوان ومكونات وإرشادات تحافظ على اتساق منتجك.' },
      { title: 'تخطيط المشاريع وتنفيذها', description: 'تنظيم الفكرة وتحديد مسار العمل وتسليم منتج متكامل.' },
    ],
  },
  work: {
    titleStart: 'من',
    titleAccent: 'أعمالنا',
    subtitle: 'نظرة على المشاريع التي بنيناها والأفكار التي حولناها إلى واقع.',
    projects,
  },
  contact: {
    ...homeContent.contact,
    titleStart: 'لنبنِ شيئًا رائعًا معًا',
    subtitle: 'نؤمن أن كل مشروع يبدأ بفكرة بسيطة وينمو بالتعاون. إذا كنت مستعدًا لتحويل فكرتك إلى تصميم واضح وعملي، فنحن هنا لنجعلها واقعًا. تواصل معنا لنبدأ مشروعك القادم.',
    formTitle: 'لنصل الأفكار ببعضها',
    formBody: 'شاركنا فكرتك، ولنبدأ معًا رحلة تعاون تحولها إلى تجربة رقمية مؤثرة.',
    imageAlt: 'مصافحة عمل أمام دائرة صفراء مضيئة',
    submitLabel: 'لنتحدث!',
  },
  footer: {
    ...homeContent.footer,
    brandName: 'بسمة',
    description: 'نحوّل الأفكار الطموحة إلى منتجات رقمية واضحة ومؤثرة.',
    columns: [
      {
        title: 'المميزات',
        links: [
          { label: 'المميزات الأساسية', href: '#services' },
          { label: 'تجربة احترافية', href: '#services' },
          { label: 'التكاملات', href: '#services' },
        ],
      },
      {
        title: 'اعرف المزيد',
        links: [
          { label: 'المدونة', href: '#work' },
          { label: 'دراسات الحالة', href: '#work' },
          { label: 'قصص العملاء', href: '#work' },
          { label: 'أفضل الممارسات', href: '#about' },
        ],
      },
      {
        title: 'الدعم',
        links: [
          { label: 'تواصل معنا', href: '#contact' },
          { label: 'الدعم', href: '#contact' },
          { label: 'الشروط القانونية', href: '#top' },
        ],
      },
    ],
  },
}
