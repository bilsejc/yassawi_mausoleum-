'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'kk' | 'ru' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('kk')

  // Загружаем сохраненный язык из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['kk', 'ru', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Сохраняем язык в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Функция для получения перевода
  const t = (key: string): string => {
    const translations = {
      // Navigation
      'nav.home': {
        kk: 'Басты бет',
        ru: 'Главная',
        en: 'Home'
      },
      'nav.about': {
        kk: 'Кесене туралы',
        ru: 'О мавзолее',
        en: 'About'
      },
      'nav.legend': {
        kk: 'Тарих',
        ru: 'История',
        en: 'History'
      },
      'nav.mountain-info': {
        kk: 'Кешен картасы',
        ru: 'Карта комплекса',
        en: 'Site map'
      },
      'nav.gallery': {
        kk: 'Галерея',
        ru: 'Галерея',
        en: 'Gallery'
      },
      'nav.contact': {
        kk: 'Байланыс',
        ru: 'Контакты',
        en: 'Contact'
      },
      
      // About Section
      'about.title': {
        kk: 'Қожа Ахмет Яссауи кесенесі туралы',
        ru: 'О мавзолее Ходжи Ахмеда Ясави',
        en: 'About the Khoja Ahmed Yasawi Mausoleum'
      },
      'about.subtitle': {
        kk: 'Түркістандағы бұл кесене — Орта Азиядағы ең ірі ортағасырлық сәулет ескерткіштерінің бірі, Қожа Ахмет Яссауидың рухани мұрасын сақтайды және бүкіл әлемнен зияратшылар мен туристерді қабылдайды',
        ru: 'Этот мавзолей в Туркестане — один из крупнейших средневековых памятников архитектуры Центральной Азии, хранящий духовное наследие Ходжи Ахмеда Ясави и принимающий паломников и туристов со всего мира',
        en: 'This mausoleum in Turkestan is one of Central Asia’s greatest medieval monuments, preserving the spiritual legacy of Khoja Ahmed Yasawi and welcoming pilgrims and visitors from around the world'
      },
      'about.height': {
        kk: 'Негізгі күмбез',
        ru: 'Главный купол',
        en: 'Main dome'
      },
      'about.height.value': {
        kk: '~39 м',
        ru: '~39 м',
        en: '~39 m'
      },
      'about.height.desc': {
        kk: 'Биіктігі шамамен',
        ru: 'Высота около',
        en: 'Approximate height'
      },
      'about.location': {
        kk: 'Орналасуы',
        ru: 'Расположение',
        en: 'Location'
      },
      'about.location.value': {
        kk: 'Түркістан',
        ru: 'Туркестан',
        en: 'Turkestan'
      },
      'about.location.desc': {
        kk: 'Түркістан облысы',
        ru: 'Туркестанская область',
        en: 'Turkistan Region'
      },
      'about.age': {
        kk: 'Салынған',
        ru: 'Постройка',
        en: 'Built'
      },
      'about.age.value': {
        kk: 'XIV ғасыр',
        ru: 'XIV век',
        en: '14th century'
      },
      'about.age.desc': {
        kk: 'Негізгі кешеннің салынысы',
        ru: 'Сооружение основного комплекса',
        en: 'Main complex construction era'
      },
      'about.visitors': {
        kk: 'Қонақтар',
        ru: 'Посетители',
        en: 'Visitors'
      },
      'about.visitors.value': {
        kk: '10,000+',
        ru: '10,000+',
        en: '10,000+'
      },
      'about.visitors.desc': {
        kk: 'Жылына туристер',
        ru: 'Туристов в год',
        en: 'Tourists per year'
      },
      'about.features.title': {
        kk: 'Кешенді ерекше ететін нәрсе не?',
        ru: 'Что делает комплекс особенным?',
        en: 'What makes the complex special?'
      },
      'about.features.geology': {
        kk: 'Сәулет ескерткіші',
        ru: 'Архитектурный памятник',
        en: 'Architectural monument'
      },
      'about.features.geology.desc': {
        kk: 'Күмбезді залдар мен кірпіш өнері Темір дәуірінің сәулет стилін көрсетеді; бұл Қазақстандағы ең ірі ортағасырлық құрылыстардың бірі.',
        ru: 'Купольные залы и кирпичное искусство отражают архитектурный стиль эпохи Тимура; это одно из крупнейших средневековых сооружений Казахстана.',
        en: 'Domed halls and brickwork reflect Timurid-era style; it is one of Kazakhstan’s largest medieval structures.'
      },
      'about.features.biodiversity': {
        kk: 'Рухани мұра',
        ru: 'Духовное наследие',
        en: 'Spiritual legacy'
      },
      'about.features.biodiversity.desc': {
        kk: 'Қожа Ахмет Яссауи — тәрбиеші, ақын және «Диуани хикмет» жинағының авторы; кесене оның ілімін ұрпақтан ұрпаққа жеткізудің орталығы болып қалуда.',
        ru: 'Ходжа Ахмед Ясави — учитель, поэт и автор «Дивани хикмет»; мавзолей остаётся центром передачи его учения из поколения в поколение.',
        en: 'Khoja Ahmed Yasawi was a teacher, poet, and author of the Divan-i Hikmet; the mausoleum remains a center for passing on his teachings.'
      },
      'about.features.culture': {
        kk: 'ЮНЕСКО мұрасы',
        ru: 'Наследие ЮНЕСКО',
        en: 'UNESCO heritage'
      },
      'about.features.culture.desc': {
        kk: '2003 жылы кешен Әлемдік мұра тізіміне енгізілді — бұл Қазақстан мен Орта Азия мәдениетінің халықаралық мойындалуы.',
        ru: 'В 2003 году комплекс внесён в Список всемирного наследия — признание культуры Казахстана и Центральной Азии на мировом уровне.',
        en: 'In 2003 the complex was inscribed on the World Heritage List—a global recognition of Kazakhstan and Central Asian culture.'
      },
      'about.features.tourism': {
        kk: 'Зиярат және туризм',
        ru: 'Паломничество и туризм',
        en: 'Pilgrimage and tourism'
      },
      'about.features.tourism.desc': {
        kk: 'Түркістан Қазақстанның рухани астанасы болып саналады; жыл сайын мыңдаған зияратшылар мен саяхатшылар кесенені көруге келеді.',
        ru: 'Туркестан считается духовной столицей Казахстана; ежегодно тысячи паломников и туристов приезжают, чтобы увидеть мавзолей.',
        en: 'Turkestan is regarded as Kazakhstan’s spiritual capital; every year thousands of pilgrims and tourists visit the mausoleum.'
      },
      'about.cta.title': {
        kk: 'Бұл кесененің тарихын өзіңіз үшін білгіңіз келе ме?',
        ru: 'Хотите узнать историю этого мавзолея?',
        en: 'Would you like to explore the history of this mausoleum?'
      },
      'about.cta.subtitle': {
        kk: 'Қожа Ахмет Яссауи кесенесінің сиқырын өздері үшін сезінген мыңдаған адамдарға қосылыңыз',
        ru: 'Присоединяйтесь к тысячам людей, которые почувствовали дух мавзолея Ходжи Ахмеда Ясави',
        en: 'Join thousands who have experienced the spirit of the Khoja Ahmed Yasawi Mausoleum'
      },
      'about.cta.button': {
        kk: 'Көбірек білу',
        ru: 'Узнать больше',
        en: 'Learn more'
      },
      'about.model.title': {
        kk: 'Кешеннің 360° көрінісі',
        ru: '360° вид комплекса',
        en: '360° view of the complex'
      },
      'about.model.desc': {
        kk: 'Қожа Ахмет Яссауи кесенесінің толық панорамалық көрінісі',
        ru: 'Полная панорама мавзолея Ходжи Ахмеда Ясави',
        en: 'Full panoramic view of the Khoja Ahmed Yasawi Mausoleum'
      },

      // Hero Section
      'hero.title': {
        kk: 'Қожа Ахмет Яссауи кесенесі',
        ru: 'Мавзолей Ходжи Ахмеда Ясави',
        en: 'Khoja Ahmed Yasawi Mausoleum'
      },
      'hero.subtitle': {
        kk: 'Түркістандағы рухани мұра мен сәулет кереметі',
        ru: 'Духовное наследие и архитектурное чудо в Туркестане',
        en: 'Spiritual heritage and architectural wonder in Turkestan'
      },
      'hero.description': {
        kk: 'Орта Азиядағы ең ірі ортағасырлық кесенелердің бірі, Қожа Ахмет Яссауидың ілімі мен ЮНЕСКО Әлемдік мұра тізіміндегі ескерткіш туралы біліңіз',
        ru: 'Узнайте об одном из крупнейших средневековых мавзолеев Центральной Азии, учении Ходжи Ахмеда Ясави и памятнике из списка ЮНЕСКО',
        en: 'Learn about one of Central Asia’s greatest medieval mausoleums, the teachings of Khoja Ahmed Yasawi, and a UNESCO World Heritage monument'
      },
      'hero.explore': {
        kk: 'Зерттеу',
        ru: 'Исследовать',
        en: 'Explore'
      },
      'hero.watch': {
        kk: 'Видео көру',
        ru: 'Смотреть видео',
        en: 'Watch Video'
      },

      // Legend Section
      'legend.title': {
        kk: 'Қожа Ахмет Яссауи және кесене тарихы',
        ru: 'Ходжа Ахмед Ясави и история мавзолея',
        en: 'Khoja Ahmed Yasawi and the mausoleum’s history'
      },
      'legend.subtitle': {
        kk: 'XII ғасырда өмір сүрген тәрбиеші мен ақынның ілімі бүгінгі күнге дейін мыңдаған жанға жол көрсетеді; кесене оның рухани мұрасының орталығы',
        ru: 'Учение учителя и поэта XII века ведёт тысячи людей и сегодня; мавзолей — центр его духовного наследия',
        en: 'The teachings of a 12th-century teacher and poet still guide countless people; the mausoleum is the heart of his spiritual legacy'
      },
      'legend.chapter1.title': {
        kk: 'Өмірі мен ілімі',
        ru: 'Жизнь и учение',
        en: 'Life and teachings'
      },
      'legend.chapter1.content': {
        kk: 'Қожа Ахмет Яссауи (1093–1166) — түркі әлемінің ұлы тәрбиешісі, ақын және Яссауи тариқатының негізін қалаушы. «Диуани хикмет» жинағы оның даналығын сақтайды.',
        ru: 'Ходжа Ахмед Ясави (1093–1166) — великий учитель тюркского мира, поэт и основатель тариката Ясавия. «Дивани хикмет» хранит его мудрость.',
        en: 'Khoja Ahmed Yasawi (1093–1166) was a great spiritual teacher of the Turkic world, a poet, and founder of the Yasawi order. The Divan-i Hikmet preserves his wisdom.'
      },
      'legend.chapter2.title': {
        kk: 'Кесененің құрылысы',
        ru: 'Создание мавзолея',
        en: 'Building the mausoleum'
      },
      'legend.chapter2.content': {
        kk: 'Қожа Ахмет қайтыс болғаннан кейін оның қабірі маңында кіші кесене тұрғызылды. XIV ғасырда Әмір Темір үлкен кешенді салып, күмбезді залдар мен кірпіш өнерінің көркін көрсетті.',
        ru: 'После смерти Ходжи Ахмеда у его могилы возник небольшой мавзолей. В XIV веке Эмир Тимур возвёл грандиозный комплекс с купольными залами и выдающимся кирпичным декором.',
        en: 'After Yasawi’s death a small mausoleum stood at his grave. In the 14th century, Timur ordered a grand complex with domed halls and remarkable brick decoration.'
      },
      'legend.chapter3.title': {
        kk: 'Сәулет және ЮНЕСКО',
        ru: 'Архитектура и ЮНЕСКО',
        en: 'Architecture and UNESCO'
      },
      'legend.chapter3.content': {
        kk: 'Кешеннің негізгі күмбезі биіктігі жағынан Орта Азиядағы ең ірі кірпіш құрылыстардың бірі. 2003 жылы ЮНЕСКО бұл ескерткішті Әлемдік мұра тізіміне енгізді.',
        ru: 'Главный купол комплекса — одно из крупнейших кирпичных сооружений Центральной Азии по высоте. В 2003 году ЮНЕСКО внесло памятник в Список всемирного наследия.',
        en: 'The main dome is among Central Asia’s largest brick structures. In 2003 UNESCO inscribed the monument on the World Heritage List.'
      },
      'legend.chapter4.title': {
        kk: 'Қазіргі Түркістан',
        ru: 'Современный Туркестан',
        en: 'Turkestan today'
      },
      'legend.chapter4.content': {
        kk: 'Бүгінгі күні кесене Қазақстанның рухани орталығы болып саналады. Зияратшылар мен туристер Түркістанға келіп, тарих пен мәдениетпен байланысты сезінеді.',
        ru: 'Сегодня мавзолей считается духовным центром Казахстана. Паломники и туристы приезжают в Туркестан, чтобы прикоснуться к истории и культуре.',
        en: 'Today the mausoleum is regarded as Kazakhstan’s spiritual heart. Pilgrims and tourists come to Turkestan to connect with history and culture.'
      },

      // Mountain Info Section
      'mountain.title': {
        kk: 'Интерактивті кешен картасы',
        ru: 'Интерактивная карта комплекса',
        en: 'Interactive site map'
      },
      'mountain.subtitle': {
        kk: 'Қожа Ахмет Яссауи кешеніндегі қызықты нүктелерді зерттеңіз. Толық ақпарат алу үшін нүктелерге басыңыз',
        ru: 'Исследуйте интересные точки на комплексе Ходжи Ахмеда Ясави. Нажмите на точки для полной информации',
        en: 'Explore points of interest across the Khoja Ahmed Yasawi complex. Click the markers for details'
      },
      'mountain.point1.title': {
        kk: 'Негізгі күмбез',
        ru: 'Главный купол',
        en: 'Main dome'
      },
      'mountain.point1.desc': {
        kk: 'Кешеннің орталық күмбезі — Орта Азиядағы ең ірі кірпіш күмбездердің бірі, биіктігі шамамен 39 метр',
        ru: 'Центральный купол комплекса — один из крупнейших кирпичных куполов Центральной Азии, высота около 39 метров',
        en: 'The central dome is one of Central Asia’s largest brick domes, about 39 metres high'
      },
      'mountain.point2.title': {
        kk: 'Қожа Ахмет қабірі',
        ru: 'Могила Ходжи Ахмеда',
        en: 'Tomb of Khoja Ahmed Yasawi'
      },
      'mountain.point2.desc': {
        kk: 'Күмбез астындағы қасиетті бөлме — зияратшылардың басты мақсаты',
        ru: 'Священное помещение под куполом — главная цель паломников',
        en: 'The sacred chamber beneath the dome is the heart of pilgrimage'
      },
      'mountain.point3.title': {
        kk: 'Кірпіш өнері',
        ru: 'Кирпичный декор',
        en: 'Brick ornament'
      },
      'mountain.point3.desc': {
        kk: 'Қабырғалар мен күмбездердегі ою-өрнектер темір дәуірінің сәулет стилін көрсетеді',
        ru: 'Узоры на стенах и куполах отражают архитектурный стиль эпохи Тимура',
        en: 'Patterns on walls and domes reflect Timurid architectural style'
      },
      'mountain.point4.title': {
        kk: 'Алаң және кіреберіс',
        ru: 'Площадь и вход',
        en: 'Courtyard and entrance'
      },
      'mountain.point4.desc': {
        kk: 'Кешенге кіретін жол және сыртқы алаң — сәулет ансамблінің бөлігі',
        ru: 'Подъезд к комплексу и внешняя площадь — часть архитектурного ансамбля',
        en: 'Approach and outer courtyard are part of the architectural ensemble'
      },

      // Contact Section
      'contact.title': {
        kk: 'Байланыс',
        ru: 'Контакты',
        en: 'Contact'
      },
      'contact.subtitle': {
        kk: 'Қожа Ахмет Яссауи кесенесі туралы көбірек білгіңіз келе ме? Бізбен байланысыңыз!',
        ru: 'Хотите узнать больше о мавзолее Ходжи Ахмеда Ясави? Свяжитесь с нами!',
        en: 'Want to learn more about the Khoja Ahmed Yasawi Mausoleum? Contact us!'
      },
      'contact.name': {
        kk: 'Атыңыз',
        ru: 'Ваше имя',
        en: 'Your name'
      },
      'contact.email': {
        kk: 'Электрондық пошта',
        ru: 'Электронная почта',
        en: 'Email'
      },
      'contact.message': {
        kk: 'Хабарлама',
        ru: 'Сообщение',
        en: 'Message'
      },
      'contact.send': {
        kk: 'Жіберу',
        ru: 'Отправить',
        en: 'Send'
      },

      // Footer
      'footer.description': {
        kk: 'Қожа Ахмет Яссауи кесенесі — Қазақстанның ЮНЕСКО Әлемдік мұрасына енгізілген басты тарихи ескерткіштерінің бірі',
        ru: 'Мавзолей Ходжи Ахмеда Ясави — один из главных исторических памятников Казахстана в списке всемирного наследия ЮНЕСКО',
        en: 'The Khoja Ahmed Yasawi Mausoleum is one of Kazakhstan’s principal monuments on the UNESCO World Heritage List'
      },
      'footer.rights': {
        kk: 'Все права будут защищены скоро',
        ru: 'Все права будут защищены скоро',
        en: 'Все права будут защищены скоро'
      },

      // Gallery Section
      'gallery.title': {
        kk: 'Кесене галереясы',
        ru: 'Галерея мавзолея',
        en: 'Mausoleum gallery'
      },
      'gallery.subtitle': {
        kk: 'Қожа Ахмет Яссауи кесенесінің сәулеті мен атмосферасын біздің фотосуреттер жинағы арқылы тамашалаңыз',
        ru: 'Познакомьтесь с архитектурой и атмосферой мавзолея Ходжи Ахмеда Ясави через нашу подборку фотографий',
        en: 'Explore the architecture and atmosphere of the Khoja Ahmed Yasawi Mausoleum through our photo collection'
      },
      'gallery.all': {
        kk: 'Барлығы',
        ru: 'Все',
        en: 'All'
      },
      'gallery.landscapes': {
        kk: 'Пейзаждар',
        ru: 'Пейзажи',
        en: 'Landscapes'
      },
      'gallery.peak': {
        kk: 'Күмбез',
        ru: 'Купол',
        en: 'Dome'
      },
      'gallery.nature': {
        kk: 'Табиғат',
        ru: 'Природа',
        en: 'Nature'
      },
      'gallery.caves': {
        kk: 'Ішкі бөлмелер',
        ru: 'Интерьеры',
        en: 'Interiors'
      },
      'gallery.previous': {
        kk: 'Алдыңғы',
        ru: 'Предыдущая',
        en: 'Previous'
      },
      'gallery.next': {
        kk: 'Келесі',
        ru: 'Следующая',
        en: 'Next'
      },
      'gallery.close': {
        kk: 'Жабу',
        ru: 'Закрыть',
        en: 'Close'
      },

      // Contact Section - Additional translations
      'contact.location.title': {
        kk: 'Мекенжай және қалай жету керек',
        ru: 'Адрес и как добраться',
        en: 'Location and how to get there'
      },
      'contact.location.subtitle': {
        kk: 'Түркістандағы Қожа Ахмет Яссауи кесенесінің мекенжайы және қалай жету керектігі туралы ақпарат',
        ru: 'Адрес мавзолея Ходжи Ахмеда Ясави в Туркестане и как до него добраться',
        en: 'Address of the Khoja Ahmed Yasawi Mausoleum in Turkestan and how to get there'
      },
      'contact.address': {
        kk: 'Мекенжай',
        ru: 'Адрес',
        en: 'Address'
      },
      'contact.address.details': {
        kk: 'Қожа Ахмет Яссауи кешені, Түркістан қ., Түркістан облысы, Қазақстан',
        ru: 'Комплекс Ходжи Ахмеда Ясави, г. Туркестан, Туркестанская область, Казахстан',
        en: 'Khoja Ahmed Yasawi complex, Turkestan city, Turkistan Region, Kazakhstan'
      },
      'contact.coordinates': {
        kk: 'Координаттар: шамамен 43.30°N, 68.27°E',
        ru: 'Координаты: примерно 43.30°N, 68.27°E',
        en: 'Coordinates: approx. 43.30°N, 68.27°E'
      },
      'contact.distance.almaty': {
        kk: 'Алматыдан арақашықтығы: шамамен 600 км (автожол)',
        ru: 'Расстояние от Алматы: около 600 км (автодорога)',
        en: 'Distance from Almaty: about 600 km by road'
      },
      'contact.distance.shymkent': {
        kk: 'Шымкенттен арақашықтығы: шамамен 170 км',
        ru: 'Расстояние от Шымкента: около 170 км',
        en: 'Distance from Shymkent: about 170 km'
      },
      'contact.transport.car': {
        kk: 'Автокөлікпен',
        ru: 'На автомобиле',
        en: 'By car'
      },
      'contact.transport.car.almaty': {
        kk: 'Алматыдан: автожол бойынша шамамен 7–9 сағат',
        ru: 'Из Алматы: по автодороге около 7–9 часов',
        en: 'From Almaty: about 7–9 hours by road'
      },
      'contact.transport.car.shymkent': {
        kk: 'Шымкенттен: автожол бойынша шамамен 2–3 сағат',
        ru: 'Из Шымкента: по автодороге около 2–3 часов',
        en: 'From Shymkent: about 2–3 hours by road'
      },
      'contact.transport.car.tip': {
        kk: '💡 Түркістанға жақын тұрақ бар',
        ru: '💡 Рядом с комплексом есть парковка',
        en: '💡 Parking is available near the complex'
      },
      'contact.transport.bus': {
        kk: 'Автобуспен',
        ru: 'На автобусе',
        en: 'By bus'
      },
      'contact.transport.bus.routes': {
        kk: 'Алматы мен Шымкенттен тұрақты рейстер',
        ru: 'Регулярные рейсы из Алматы и Шымкента',
        en: 'Regular routes from Almaty and Shymkent'
      },
      'contact.transport.bus.stop': {
        kk: 'Аялдама: Түркістан қаласының орталығы',
        ru: 'Остановка: центр города Туркестан',
        en: 'Stop: central Turkestan'
      },
      'contact.transport.bus.tip': {
        kk: '💡 Кешен қала орталығында орналасқан',
        ru: '💡 Комплекс находится в центре города',
        en: '💡 The complex is in the city centre'
      },
      'contact.transport.plane': {
        kk: 'Ұшақпен',
        ru: 'На самолете',
        en: 'By plane'
      },
      'contact.transport.plane.airport': {
        kk: 'Ең жақын әуежай: Түркістан халықаралық әуежайы (HSA)',
        ru: 'Ближайший аэропорт: Международный аэропорт Туркестан (HSA)',
        en: 'Nearest airport: Turkestan International Airport (HSA)'
      },
      'contact.transport.plane.transfer': {
        kk: 'Әуежайдан кесенеге дейін таксимен/трансфермен шамамен 20–40 минут',
        ru: 'От аэропорта до мавзолея на такси/трансфере примерно 20–40 минут',
        en: 'From the airport to the mausoleum by taxi/transfer takes about 20–40 minutes'
      },
      'contact.transport.plane.tip': {
        kk: '💡 Трансферді алдын ала брондаңыз',
        ru: '💡 Забронируйте трансфер заранее',
        en: '💡 Book transfer in advance'
      },

      // Mountain Info - Additional translations
      'mountain.controls': {
        kk: 'Басқару',
        ru: 'Управление',
        en: 'Controls'
      },
      'mountain.controls.tip': {
        kk: 'Негізгі орындар туралы ақпарат алу үшін түсті нүктелерге басыңыз',
        ru: 'Нажмите на цветные точки для получения информации об основных местах',
        en: 'Click on colored points for information about main locations'
      },
      'mountain.point.info': {
        kk: 'Нүкте туралы ақпарат',
        ru: 'Информация о точке',
        en: 'Point information'
      },
      'mountain.interactive.points': {
        kk: 'Интерактивті нүктелер',
        ru: 'Интерактивные точки',
        en: 'Interactive points'
      },
      'mountain.full.info': {
        kk: 'Толық ақпарат',
        ru: 'Полная информация',
        en: 'Full information'
      },
      'mountain.full.info.desc': {
        kk: 'Кешендегі әрбір қызықты орын туралы көбірек біліңіз',
        ru: 'Узнайте больше о каждом интересном месте комплекса',
        en: 'Learn more about each point of interest on the complex'
      },
      'mountain.visual.view': {
        kk: 'Көрнекі көрініс',
        ru: 'Визуальный вид',
        en: 'Visual view'
      },
      'mountain.visual.view.desc': {
        kk: 'Анимирленген элементтері бар кешеннің әдемі көрінісі',
        ru: 'Красивый вид комплекса с анимированными элементами',
        en: 'Beautiful view of the complex with animated elements'
      },

      // Legend - Additional translations
      'legend.modern.significance': {
        kk: 'Бүгінгі заман үшін маңызы',
        ru: 'Значение для современности',
        en: 'Significance today'
      },
      'legend.cultural.heritage': {
        kk: 'Мәдени мұра',
        ru: 'Культурное наследие',
        en: 'Cultural heritage'
      },
      'legend.cultural.heritage.desc': {
        kk: 'Кешен Түркістан мен Қазақстанның мәдени мұрасының символы',
        ru: 'Комплекс — символ культурного наследия Туркестана и Казахстана',
        en: 'The complex is a symbol of cultural heritage for Turkestan and Kazakhstan'
      },
      'legend.spiritual.significance': {
        kk: 'Рухани маңыз',
        ru: 'Духовное значение',
        en: 'Spiritual significance'
      },
      'legend.spiritual.significance.desc': {
        kk: 'Орын имандылар үшін ерекше рухани маңызға ие',
        ru: 'Место имеет особое духовное значение для верующих',
        en: 'The place has special spiritual significance for believers'
      },
      'legend.tourism.appeal': {
        kk: 'Туризмдік тартымдылық',
        ru: 'Туристическая привлекательность',
        en: 'Tourist appeal'
      },
      'legend.tourism.appeal.desc': {
        kk: 'Тарихымен әлемнің барлық бұрыштарынан туристерді тартады',
        ru: 'Привлекает туристов со всех уголков мира своей историей',
        en: 'Attracts tourists from all corners of the world with its history'
      },

      // Footer - Additional translations
      'footer.about.links': {
        kk: 'Кесене туралы',
        ru: 'О мавзолее',
        en: 'About the mausoleum'
      },
      'footer.services.tours': {
        kk: 'Туризмдік турлар',
        ru: 'Туристические туры',
        en: 'Tourist tours'
      },
      'footer.services.excursions': {
        kk: 'Экскурсиялар',
        ru: 'Экскурсии',
        en: 'Excursions'
      },
      'footer.services.hiking': {
        kk: 'Экскурсиялар',
        ru: 'Экскурсии',
        en: 'Guided tours'
      },
      'footer.services.photos': {
        kk: 'Фотосессиялар',
        ru: 'Фотосессии',
        en: 'Photo sessions'
      },
      'footer.info.how_to_get': {
        kk: 'Қалай жету керек',
        ru: 'Как добраться',
        en: 'How to get there'
      },
      'footer.info.accommodation': {
        kk: 'Тұру',
        ru: 'Проживание',
        en: 'Accommodation'
      },
      'footer.info.weather': {
        kk: 'Ауа райы',
        ru: 'Погода',
        en: 'Weather'
      },
      'footer.info.safety': {
        kk: 'Қауіпсіздік',
        ru: 'Безопасность',
        en: 'Safety'
      },
      'footer.newsletter.title': {
        kk: 'Жаңалықтарға жазылыңыз',
        ru: 'Подпишитесь на новости',
        en: 'Subscribe to news'
      },
      'footer.newsletter.desc': {
        kk: 'Жаңа турлар мен арнайы ұсыныстар туралы ақпарат алыңыз',
        ru: 'Получайте информацию о новых турах и специальных предложениях',
        en: 'Get information about new tours and special offers'
      },
      'footer.newsletter.email': {
        kk: 'Сіздің email',
        ru: 'Ваш email',
        en: 'Your email'
      },
      'footer.newsletter.subscribe': {
        kk: 'Жазылу',
        ru: 'Подписаться',
        en: 'Subscribe'
      },
      'footer.privacy': {
        kk: 'Құпиялылық саясаты',
        ru: 'Политика конфиденциальности',
        en: 'Privacy policy'
      },
      'footer.terms': {
        kk: 'Пайдалану шарттары',
        ru: 'Условия использования',
        en: 'Terms of use'
      },
      'footer.authors': {
        kk: 'Авторлар',
        ru: 'Авторы',
        en: 'Authors'
      },

      // Gallery images
      'gallery.image1.title': {
        kk: 'Қасиетті кешен',
        ru: 'Священный комплекс',
        en: 'Sacred complex'
      },
      'gallery.image1.desc': {
        kk: 'Таңғы жарықта кесенің сәулеті',
        ru: 'Архитектура мавзолея в утреннем свете',
        en: 'The mausoleum architecture in morning light'
      },
      'gallery.image2.title': {
        kk: 'Негізгі күмбез',
        ru: 'Главный купол',
        en: 'Main dome'
      },
      'gallery.image2.desc': {
        kk: 'Күмбездің керемет силуэті',
        ru: 'Величественный силуэт купола',
        en: 'The majestic silhouette of the dome'
      },
      'gallery.image3.title': {
        kk: 'Кірпіш оюлары',
        ru: 'Кирпичные узоры',
        en: 'Brick patterns'
      },
      'gallery.image3.desc': {
        kk: 'Қабырғалар мен күмбездердегі нақыштар',
        ru: 'Узоры на стенах и куполах',
        en: 'Ornament on walls and domes'
      },
      'gallery.image4.title': {
        kk: 'Ішкі бөлме',
        ru: 'Внутреннее помещение',
        en: 'Interior chamber'
      },
      'gallery.image4.desc': {
        kk: 'Нұр мен көлеңке кешенінің рухани атмосферасын күшейтеді',
        ru: 'Свет и тень подчёркивают духовную атмосферу комплекса',
        en: 'Light and shadow enhance the spiritual atmosphere'
      },
      'gallery.image5.title': {
        kk: 'Кешендегі күн бату',
        ru: 'Закат над комплексом',
        en: 'Sunset over the complex'
      },
      'gallery.image5.desc': {
        kk: 'Күн батуы кешенді алтын түске бояйды',
        ru: 'Закат окрашивает комплекс в золотые тона',
        en: 'Sunset paints the complex in golden tones'
      },
      'gallery.image6.title': {
        kk: 'Алаң',
        ru: 'Площадь',
        en: 'Courtyard'
      },
      'gallery.image6.desc': {
        kk: 'Сыртқы алаң — сәулет ансамблінің бөлігі',
        ru: 'Внешняя площадь — часть архитектурного ансамбля',
        en: 'The outer courtyard is part of the ensemble'
      },
      'gallery.image7.title': {
        kk: 'Түркістан түні',
        ru: 'Ночь в Туркестане',
        en: 'Turkestan at night'
      },
      'gallery.image7.desc': {
        kk: 'Жұлдызды аспан астындағы кешен',
        ru: 'Комплекс под звёздным небом',
        en: 'The complex under a starry sky'
      },

      // Mountain map
      'mountain.name': {
        kk: 'Қожа Ахмет Яссауи кесенесі',
        ru: 'Мавзолей Ходжи Ахмеда Ясави',
        en: 'Khoja Ahmed Yasawi Mausoleum'
      },
      'mountain.region': {
        kk: 'Түркістан облысы',
        ru: 'Туркестанская область',
        en: 'Turkistan Region'
      }
    }

    const translation = translations[key as keyof typeof translations]
    if (translation && typeof translation === 'object') {
      return translation[language] || key
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
