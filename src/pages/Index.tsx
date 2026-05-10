import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/76a8b25f-788d-4a21-82cf-ef3c46d4a16d/bucket/1cc593c9-01a3-4a84-831f-f81bb661c1b7.jpg";
const HERO_BG = "https://cdn.poehali.dev/projects/76a8b25f-788d-4a21-82cf-ef3c46d4a16d/files/48c3edb1-df56-4c5d-9553-086a29c5b184.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О сервисе" },
  { id: "services", label: "Услуги" },
  { id: "parts", label: "Запчасти" },
  { id: "gallery", label: "Галерея" },
  { id: "price", label: "Прайс" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Wrench", title: "Диагностика", desc: "Компьютерная диагностика всех систем Audi. Оборудование VAG-COM и ODIS." },
  { icon: "Settings", title: "ТО и обслуживание", desc: "Замена масла, фильтров, тормозных колодок. Сервисная книга в порядке." },
  { icon: "Zap", title: "Электрика и электроника", desc: "Ремонт блоков управления, перекодировка, адаптация модулей MMI." },
  { icon: "Car", title: "Кузовной ремонт", desc: "Рихтовка, покраска, сварочные работы. Цвет в цвет Audi." },
  { icon: "Gauge", title: "Двигатель и КПП", desc: "Капитальный ремонт двигателей TFSI, TDI. DSG, Tiptronic." },
  { icon: "Shield", title: "Разборка Audi", desc: "Авторазборка оригинальных автомобилей Audi с гарантией на запчасти." },
];

const PARTS_CATALOG = [
  { category: "Двигатель", items: [
    { name: "Блок цилиндров 2.0 TFSI", art: "06K103011", price: "45 000 ₽", stock: true },
    { name: "Головка блока цилиндров", art: "06K103064", price: "32 000 ₽", stock: true },
    { name: "Турбокомпрессор TFSI", art: "06K145874", price: "28 000 ₽", stock: false },
    { name: "Масляный насос 3.0 TDI", art: "059115105", price: "12 500 ₽", stock: true },
  ]},
  { category: "Трансмиссия", items: [
    { name: "АКПП DSG-7 DQ381", art: "0GC300012", price: "85 000 ₽", stock: true },
    { name: "Блок гидравлики DSG", art: "0AM325025", price: "22 000 ₽", stock: true },
    { name: "Карданный вал quattro", art: "8K0521101", price: "18 000 ₽", stock: false },
  ]},
  { category: "Подвеска", items: [
    { name: "Передний рычаг A4 B8/B9", art: "8K0407151", price: "8 500 ₽", stock: true },
    { name: "Ступица передняя", art: "8K0407625", price: "6 200 ₽", stock: true },
    { name: "Амортизатор передний", art: "8K0413031", price: "11 000 ₽", stock: true },
  ]},
  { category: "Кузов", items: [
    { name: "Капот A6 C7 рестайлинг", art: "4G0823029", price: "15 000 ₽", stock: true },
    { name: "Крыло переднее A4 B9", art: "8W0821021", price: "9 800 ₽", stock: false },
    { name: "Бампер задний Q5 8R", art: "8R0807511", price: "13 500 ₽", stock: true },
  ]},
];

const GALLERY_IMGS = [
  { url: HERO_BG, caption: "Мастерская Two Motors" },
  { url: HERO_BG, caption: "Диагностический пост" },
  { url: HERO_BG, caption: "Audi A6 C8 после ремонта" },
  { url: HERO_BG, caption: "Склад оригинальных запчастей" },
  { url: HERO_BG, caption: "Кузовной цех" },
  { url: HERO_BG, caption: "Разборка Audi Q7" },
];

const PRICE_LIST = [
  { service: "Компьютерная диагностика", price: "от 2 000 ₽" },
  { service: "Замена масла двигателя (с материалом)", price: "от 4 500 ₽" },
  { service: "Замена тормозных колодок (ось)", price: "от 2 500 ₽" },
  { service: "Замена ремня/цепи ГРМ", price: "от 12 000 ₽" },
  { service: "Ремонт DSG (без запчастей)", price: "от 18 000 ₽" },
  { service: "Капитальный ремонт двигателя 2.0 TFSI", price: "от 65 000 ₽" },
  { service: "Покраска кузовной панели", price: "от 8 000 ₽" },
  { service: "Адаптация блока MMI/МКПП", price: "от 3 000 ₽" },
  { service: "Прошивка блока управления ЭБУ", price: "от 5 000 ₽" },
  { service: "Плановое ТО (без материалов)", price: "от 6 000 ₽" },
];

const REVIEWS = [
  { name: "Алексей М.", model: "Audi A4 B9", text: "Обратился с проблемой DSG — других пугали ценой в 200+ тысяч. Здесь отремонтировали за 35 тысяч. Машина идёт как часы уже год.", rating: 5 },
  { name: "Ирина К.", model: "Audi Q5 8R", text: "Нашла детали на замену после ДТП намного дешевле оригинала в дилерском центре. Все с гарантией. Ребята знают Audi изнутри.", rating: 5 },
  { name: "Дмитрий Р.", model: "Audi A6 C7", text: "Капиталка двигателя 3.0 TDI. Сделали чётко по смете, без сюрпризов. Уже прошло 40 тысяч км — полёт нормальный.", rating: 5 },
  { name: "Сергей В.", model: "Audi Q7 4L", text: "Постоянный клиент три года. Всегда честный диагноз, реальные цены. Не пытаются навязать лишнее — редкость сейчас.", rating: 5 },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchPart, setSearchPart] = useState("");

  const filteredItems = PARTS_CATALOG[activeCategory].items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchPart.toLowerCase()) ||
      item.art.toLowerCase().includes(searchPart.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#ECEEF0] font-ibm">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-sm border-b border-[#1E2024]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Two Motors" className="h-9 w-auto object-contain" style={{ mixBlendMode: 'screen', filter: 'contrast(1.1) brightness(1.1)' }} />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </nav>

          <a href="tel:+78001234567" className="hidden lg:flex items-center gap-2 text-[#E8640A] font-oswald font-semibold text-sm tracking-wider hover:text-white transition-colors">
            <Icon name="Phone" size={14} />
            +7 (800) 123-45-67
          </a>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#A8B0B8]">
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0E1012] border-t border-[#1E2024] px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => { scrollTo(item.id); setMobileMenuOpen(false); }} className="nav-link text-left">
                {item.label}
              </button>
            ))}
            <a href="tel:+78001234567" className="text-[#E8640A] font-oswald font-semibold text-sm mt-2">+7 (800) 123-45-67</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Two Motors сервис" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-[#0A0A0C]/50 to-[#0A0A0C]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8 animate-fade-up">
              <img
                src={LOGO_URL}
                alt="Two Motors"
                className="h-24 w-auto object-contain mx-auto lg:mx-0"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.1) brightness(1.15) drop-shadow(0 0 24px rgba(232,100,10,0.25))' }}
              />
            </div>

            <h1 className="font-oswald text-5xl lg:text-7xl font-bold uppercase leading-none tracking-tight mb-4 animate-fade-up delay-100">
              <span className="text-gradient-silver">Авторазборка</span><br />
              <span className="text-white">и Сервис Audi</span>
            </h1>

            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start animate-fade-up delay-200">
              <span className="audi-ring" />
              <span className="audi-ring" />
              <span className="audi-ring" />
              <span className="audi-ring" style={{ marginRight: 0 }} />
              <span className="ml-4 text-[#A8B0B8] font-ibm text-sm tracking-widest uppercase">Официальный техцентр</span>
            </div>

            <p className="text-[#6E7880] font-ibm text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-up delay-200">
              Профессиональный ремонт, оригинальные запчасти с разборки и полное техническое обслуживание автомобилей Audi. Более 10 лет опыта.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-300">
              <button
                onClick={() => scrollTo("parts")}
                className="px-8 py-4 bg-[#E8640A] text-white font-oswald font-semibold text-sm uppercase tracking-widest hover:bg-[#C84E00] transition-colors"
              >
                Каталог запчастей
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 border border-[#363636] text-[#A8B0B8] font-oswald font-semibold text-sm uppercase tracking-widest hover:border-[#A8B0B8] hover:text-white transition-colors"
              >
                Связаться с нами
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-5 min-w-[220px] animate-fade-up delay-400">
            {[
              { num: "10+", label: "Лет опыта" },
              { num: "5000+", label: "Запчастей в наличии" },
              { num: "98%", label: "Довольных клиентов" },
              { num: "24ч", label: "Время ответа" },
            ].map((s) => (
              <div key={s.num} className="border border-[#1E2024] bg-[#0E1012]/80 px-6 py-4 backdrop-blur-sm">
                <div className="font-oswald text-3xl font-bold text-[#E8640A]">{s.num}</div>
                <div className="text-[#6E7880] text-xs uppercase tracking-wider font-ibm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => scrollTo("about")} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#363636] hover:text-[#A8B0B8] transition-colors animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* О СЕРВИСЕ */}
      <section id="about" className="py-24 bg-[#0D0E10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-line" />
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-6">
                О компании<br /><span className="text-gradient-silver">Two Motors</span>
              </h2>
              <p className="text-[#6E7880] leading-relaxed mb-6">
                Two Motors — специализированный техцентр и авторазборка Audi. Работаем с 2014 года. Наши мастера прошли обучение у официальных дилеров и знают каждую модель Audi изнутри.
              </p>
              <p className="text-[#6E7880] leading-relaxed mb-8">
                Мы не работаем с автомобилями других марок — только Audi. Это позволяет поддерживать высочайший уровень экспертизы и держать на складе более 5000 оригинальных запчастей для всех моделей.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Audi A-серия", "Audi Q-серия", "Audi RS", "Audi TT", "Audi e-tron"].map((m) => (
                  <span key={m} className="border border-[#2A2E34] text-[#A8B0B8] font-oswald text-xs uppercase tracking-wider px-4 py-2">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <img
                src={LOGO_URL}
                alt="Two Motors"
                className="w-full max-w-sm mx-auto"
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.1) contrast(1.05) drop-shadow(0 8px 40px rgba(232,100,10,0.2))' }}
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#E8640A]/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#2A2E34] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="py-24 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Наши услуги</h2>
          <p className="text-[#6E7880] mb-12 max-w-xl">Полный спектр работ с автомобилями Audi — от диагностики до капитального ремонта</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1E2024]">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#0A0A0C] p-8 group hover:bg-[#0E1012] transition-colors">
                <div className="w-12 h-12 border border-[#E8640A]/30 flex items-center justify-center mb-6 group-hover:border-[#E8640A] transition-colors">
                  <Icon name={s.icon} size={20} className="text-[#E8640A]" />
                </div>
                <h3 className="font-oswald text-xl font-semibold uppercase text-white mb-3">{s.title}</h3>
                <p className="text-[#5A6068] text-sm leading-relaxed font-ibm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАТАЛОГ ЗАПЧАСТЕЙ */}
      <section id="parts" className="py-24 bg-[#0D0E10]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Каталог запчастей</h2>
          <p className="text-[#6E7880] mb-10 max-w-xl">Оригинальные запчасти Audi с авторазборки. Гарантия 3 месяца на все позиции</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {PARTS_CATALOG.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`font-oswald text-xs uppercase tracking-widest px-5 py-2.5 border transition-colors ${activeCategory === i ? 'bg-[#E8640A] border-[#E8640A] text-white' : 'border-[#2A2E34] text-[#6E7880] hover:border-[#A8B0B8] hover:text-[#A8B0B8]'}`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="relative max-w-sm">
              <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5058]" />
              <input
                type="text"
                placeholder="Поиск по названию или артикулу..."
                value={searchPart}
                onChange={(e) => setSearchPart(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0E1012] border border-[#2A2E34] text-[#ECEEF0] text-sm font-ibm placeholder-[#3A4048] focus:outline-none focus:border-[#E8640A] transition-colors"
              />
            </div>
          </div>

          <div className="border border-[#1E2024]">
            <div className="grid grid-cols-12 bg-[#0E1012] px-6 py-3 border-b border-[#1E2024]">
              <span className="col-span-5 text-[#4A5058] font-oswald text-xs uppercase tracking-widest">Наименование</span>
              <span className="col-span-3 text-[#4A5058] font-oswald text-xs uppercase tracking-widest">Артикул</span>
              <span className="col-span-2 text-[#4A5058] font-oswald text-xs uppercase tracking-widest">Цена</span>
              <span className="col-span-2 text-[#4A5058] font-oswald text-xs uppercase tracking-widest">Наличие</span>
            </div>
            {filteredItems.length === 0 ? (
              <div className="px-6 py-8 text-[#4A5058] text-sm text-center">Ничего не найдено</div>
            ) : (
              filteredItems.map((item, i) => (
                <div key={i} className="price-row grid grid-cols-12 px-6 py-4 items-center">
                  <span className="col-span-5 text-[#ECEEF0] text-sm font-ibm">{item.name}</span>
                  <span className="col-span-3 text-[#5A6068] text-xs font-mono">{item.art}</span>
                  <span className="col-span-2 text-[#E8640A] font-oswald font-semibold text-sm">{item.price}</span>
                  <span className={`col-span-2 text-xs font-oswald uppercase tracking-wide ${item.stock ? 'text-emerald-500' : 'text-[#4A5058]'}`}>
                    {item.stock ? "В наличии" : "Под заказ"}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => scrollTo("contacts")}
              className="px-8 py-4 bg-[#E8640A] text-white font-oswald font-semibold text-sm uppercase tracking-widest hover:bg-[#C84E00] transition-colors"
            >
              Запросить деталь
            </button>
            <p className="text-[#4A5058] text-xs font-ibm">Не нашли нужную деталь? Оставьте заявку — найдём под заказ</p>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Галерея</h2>
          <p className="text-[#6E7880] mb-12 max-w-xl">Наши работы и производственные мощности</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
            {GALLERY_IMGS.map((img, i) => (
              <div key={i} className="relative group overflow-hidden aspect-video">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-oswald text-sm uppercase tracking-wider text-white">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРАЙС */}
      <section id="price" className="py-24 bg-[#0D0E10]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Прайс-лист</h2>
          <p className="text-[#6E7880] mb-12 max-w-xl">Актуальные цены на основные виды работ</p>

          <div className="max-w-3xl border border-[#1E2024]">
            {PRICE_LIST.map((row, i) => (
              <div key={i} className="price-row flex justify-between items-center px-6 py-4">
                <span className="text-[#A8B0B8] text-sm font-ibm">{row.service}</span>
                <span className="text-[#E8640A] font-oswald font-semibold text-sm whitespace-nowrap ml-4">{row.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 max-w-3xl">
            <Icon name="Info" size={14} className="text-[#3A4048] mt-0.5 shrink-0" />
            <p className="text-[#3A4048] text-xs font-ibm leading-relaxed">
              Цены указаны без учёта стоимости запчастей и расходных материалов. Точную стоимость уточняйте у мастера после диагностики.
            </p>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-24 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Отзывы клиентов</h2>
          <p className="text-[#6E7880] mb-12 max-w-xl">Реальные отзывы владельцев автомобилей Audi</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-[#E8640A]" />
                  ))}
                </div>
                <p className="text-[#6E7880] text-sm font-ibm leading-relaxed mb-6 italic">"{r.text}"</p>
                <div>
                  <div className="font-oswald text-sm uppercase text-white tracking-wider">{r.name}</div>
                  <div className="text-[#4A5058] text-xs font-ibm mt-0.5">{r.model}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 bg-[#0D0E10]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-line" />
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase text-white mb-4">Контакты</h2>
          <p className="text-[#6E7880] mb-12 max-w-xl">Свяжитесь с нами любым удобным способом</p>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67", href: "tel:+78001234567" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@twomotors_audi", href: "#" },
                { icon: "Mail", label: "Email", value: "info@twomotors.ru", href: "mailto:info@twomotors.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Автосервисная, 12", href: "#" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–19:00, Сб 10:00–17:00", href: null },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-[#2A2E34] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={c.icon} size={16} className="text-[#E8640A]" />
                  </div>
                  <div>
                    <div className="text-[#4A5058] font-oswald text-xs uppercase tracking-widest mb-1">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-[#ECEEF0] font-ibm hover:text-white transition-colors">{c.value}</a>
                    ) : (
                      <span className="text-[#ECEEF0] font-ibm">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0A0A0C] border border-[#1E2024] p-8">
              <h3 className="font-oswald text-xl uppercase text-white mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 bg-[#0E1012] border border-[#2A2E34] text-[#ECEEF0] text-sm font-ibm placeholder-[#3A4048] focus:outline-none focus:border-[#E8640A] transition-colors" />
                <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 bg-[#0E1012] border border-[#2A2E34] text-[#ECEEF0] text-sm font-ibm placeholder-[#3A4048] focus:outline-none focus:border-[#E8640A] transition-colors" />
                <input type="text" placeholder="Модель Audi и год" className="w-full px-4 py-3 bg-[#0E1012] border border-[#2A2E34] text-[#ECEEF0] text-sm font-ibm placeholder-[#3A4048] focus:outline-none focus:border-[#E8640A] transition-colors" />
                <textarea placeholder="Опишите проблему или нужную запчасть" rows={4} className="w-full px-4 py-3 bg-[#0E1012] border border-[#2A2E34] text-[#ECEEF0] text-sm font-ibm placeholder-[#3A4048] focus:outline-none focus:border-[#E8640A] transition-colors resize-none" />
                <button className="w-full py-4 bg-[#E8640A] text-white font-oswald font-semibold text-sm uppercase tracking-widest hover:bg-[#C84E00] transition-colors">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#161820] bg-[#080A0C] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <img
            src={LOGO_URL}
            alt="Two Motors"
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: 'screen', filter: 'brightness(0.85) contrast(1.05)' }}
          />
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link text-[#3A4048] hover:text-[#6E7880]">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-[#2A3038] text-xs font-ibm text-center">
            © 2024 Two Motors. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
