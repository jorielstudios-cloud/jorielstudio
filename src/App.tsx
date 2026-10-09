import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  Link,
  useRoute,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { portfolioGallery } from '@/lib/portfolio-gallery';

const queryClient = new QueryClient();
const logoPath = '/assets/joriel-logo.jpg';
const whatsappNumber = '254748344466';
const studioMapUrl = 'https://maps.app.goo.gl/nxyCXXXgmZr9LjG47?g_st=aw';

const portfolioItems = [
  { title: 'Quiet confidence', kind: 'Portraits', image: '/assets/portfolio/PORTRAITS/DSC_8421.JPG', size: 'wide' },
  { title: 'Under the jacaranda', kind: 'Weddings', image: '/assets/portfolio/WEDDINGS/DSC_5261.jpg', size: 'tall' },
  { title: 'The next chapter', kind: 'Graduation', image: '/assets/portfolio/GRADUATION/DSC_8923.JPG', size: 'square' },
  { title: 'Made of moments', kind: 'Family', image: '/assets/portfolio/FAMILY/DSC_0015.JPG', size: 'tall' },
  { title: 'Good things, clearly told', kind: 'Branding', image: '/assets/portfolio/PORTRAITS/_MG_2496.JPG', size: 'wide' },
  { title: 'A room full of joy', kind: 'Birthday', image: '/assets/portfolio/BIRTHDAY/_MG_9576.JPG', size: 'square' },
  { title: 'Objects with a point of view', kind: 'Products', image: '/assets/portfolio/PRODUCTS/_MG_16991.jpg', size: 'wide' },
  { title: 'Before the world arrives', kind: 'Maternity', image: '/assets/portfolio/BABY BUMP/DSC_2694.jpg', size: 'tall' },
];

const portfolioPages = [
  { slug: 'portraits', kind: 'Portraits', title: 'Quiet confidence', body: 'Portraits with enough direction to feel easy, and enough space for the real you to come through.', detail: 'For personal portraits, regular sessions, headshots, and the photographs you want to feel like yourself.', points: ['Guided posing and natural direction', 'Studio lighting with clean, considered edits', 'Digital images ready to share and keep'] },
  { slug: 'weddings', kind: 'Weddings', title: 'Under the jacaranda', body: 'A calm eye for the in-between moments, the people you came to celebrate, and everything that happens around the ceremony.', detail: 'Wedding photography shaped around your people, your pace, and the moments you do not want to forget.', points: ['Pre-shoot planning and timeline guidance', 'Candid coverage alongside the key portraits', 'Tailored coverage confirmed after a conversation'] },
  { slug: 'graduation', kind: 'Graduation', title: 'The next chapter', body: 'A proud, bright record of the work it took to get here — from the gown details to the people cheering you on.', detail: 'Graduation portraits for individuals, friends, and families, with gown hire and make-up available on request.', points: ['Studio portraits with a minimum of 10 photos', 'Gown hire and make-up add-ons available', 'Personal, group, and family combinations'] },
  { slug: 'family', kind: 'Family', title: 'Made of moments', body: 'Warm, unforced photographs that keep the energy of your people intact — the laughter, the closeness, and the little details.', detail: 'Family, friends, and group sessions in studio or outdoors, planned around the people in the frame.', points: ['Studio or outdoor locations', 'Space for individual, couple, and group frames', 'A relaxed session with gentle direction'] },
  { slug: 'branding', kind: 'Branding', title: 'Good things, clearly told', body: 'Images with a point of view — made to give your brand a human face and help good work get noticed.', detail: 'Brand and corporate photography for teams, founders, products, and the story behind what you do.', points: ['Professional headshots and team portraits', 'Brand story and behind-the-scenes coverage', 'A visual plan shaped around your audience'] },
  { slug: 'birthday', kind: 'Birthday', title: 'A room full of joy', body: 'Bright, joyful photographs that capture the celebration, the laughter, and the people who make the birthday feel special.', detail: 'Birthday photography for children and adults, with studio or outdoor coverage for celebrations and family moments.', points: ['Studio birthday sessions', 'Family and group combinations', 'A tailored quote after confirming the event details'] },
  { slug: 'products', kind: 'Products', title: 'Objects with a point of view', body: 'Clean, thoughtful product images that make the details easy to see and the reason to care even clearer.', detail: 'Product photography for catalogues, campaigns, online shops, and social content, in studio or outdoors.', points: ['Studio or outdoor product setups', 'Clean images for web, print, and social', 'Per-product pricing with a practical minimum'] },
  { slug: 'maternity', kind: 'Maternity', title: 'Before the world arrives', body: 'A quiet pause for this chapter — soft, intentional images that let the feeling of anticipation stay close.', detail: 'Bump and maternity portraits with gowns, wraps, and make-up available to help you build the look you have in mind.', points: ['Studio maternity portraits', 'Gowns and wraps available as add-ons', 'Gentle direction for a comfortable session'] },
];

const services = [
  { no: '01', name: 'Passport Photography', tags: 'Studio · Digital · Hard copy' },
  { no: '02', name: 'Portrait & Regular Photo Sessions', tags: 'Studio · Outdoor · Personal' },
  { no: '03', name: 'Standard Studio Package', tags: '10 edited photos · 3 outfit changes' },
  { no: '04', name: 'Birthday Package', tags: 'Studio · 1–6 people · Birthday' },
  { no: '05', name: 'Family, Friends & Group Package', tags: 'Studio · Outdoor · Groups' },
  { no: '06', name: 'Executive Family Shoot', tags: 'Family · Executive portraits · Studio or outdoor' },
  { no: '07', name: 'Outdoor Shot', tags: 'Family/group · 4–6 people · 15 photos' },
  { no: '08', name: 'Graduation Package', tags: 'Portraits · Gown hire · Make-up' },
  { no: '09', name: 'Bump Shot Package', tags: 'Maternity · Gowns · Make-up' },
  { no: '10', name: 'Corporate Package', tags: 'Headshots · Teams · Organizations' },
  { no: '11', name: 'Product Shot', tags: 'Studio · Outdoor · Product images' },
  { no: '12', name: 'Podcast Shot', tags: 'Short videos · Reels · Interviews' },
  { no: '13', name: 'Events Package', tags: 'Photography · Videography · Drone' },
];

const rates = [
  { label: 'Passport Photography', price: 'Ksh 100', note: 'Ksh 100 per photo, soft copy only · Ksh 200 for 4 hard copies.' },
  { label: 'Portrait & Regular Photo Session', price: 'Ksh 1,500 minimum', note: 'Ksh 300 per photo with a minimum of 5 photos.' },
  { label: 'Standard Package', price: 'Ksh 3,000 minimum', note: 'Ksh 300 per photo, minimum of 10 photos, with a minimum of 3 outfits.' },
  { label: 'Birthday Package', price: 'Ksh 3,500–Ksh 5,000/hr', note: '1–3 people: Ksh 3,500 per hour for 10 photos minimum · 4–6 people: Ksh 5,000 per hour for 15 photos minimum.' },
  { label: 'Family, Friends & Group', price: 'From Ksh 5,000', note: 'Studio: minimum 15 photos at Ksh 5,000 for 1 hour · outdoor: Ksh 12,000 for 3 hours or Ksh 15,000 for half day.' },
  { label: 'Executive Family Shoot', price: 'Ksh 12,000', note: 'A tailored family photography session with an executive portrait finish.' },
  { label: 'Outdoor Shot', price: 'Ksh 6,000/hr', note: 'Family/group shoot for 4–6 people, with 15 photos minimum.' },
  { label: 'Graduation Package', price: 'Ksh 3,000 minimum', note: 'Ksh 300 per photo, minimum of 10 photos · gown Ksh 1,000 · make-up Ksh 1,500.' },
  { label: 'Bump Shot Package', price: 'Ksh 3,000 minimum', note: 'Ksh 300 minimum of 10 photos · gown Ksh 1,200 · wraps Ksh 500 · make-up Ksh 1,500.' },
  { label: 'Corporate Package', price: 'Ksh 3,000 minimum', note: 'Ksh 300 per photo for a minimum of 10 photos.' },
  { label: 'Product Shot', price: 'Ksh 200–Ksh 300/product', note: 'Studio: Ksh 200 per product, minimum 5 photos · outdoor: Ksh 300 per product, minimum 10 photos.' },
  { label: 'Podcast Shot', price: 'Ksh 3,000/hr', note: 'Short videos, reels, and interviews · one-minute video from Ksh 2,000.' },
  { label: 'Events Package', price: 'Quotation', note: 'Photography and videography quoted after logistical analysis · drone Ksh 15,000 · live coverage with 2 cameras Ksh 40,000 · wedding packages on request.' },
];

const printRates = [
  ['A5 photomount', 'Ksh 800'],
  ['A4 photomount', 'Ksh 1,500'],
  ['A3 photomount', 'Ksh 2,500'],
  ['A2 photomount', 'Ksh 4,500'],
  ['A1 photomount', 'Ksh 8,500'],
  ['A0 photomount', 'Ksh 12,000'],
  ['4 × 6 frame', 'Ksh 400'],
  ['6 × 8 frame', 'Ksh 700'],
  ['8 × 10 frame', 'Ksh 800'],
  ['8 × 12 frame', 'Ksh 1,000–Ksh 1,500'],
  ['A3 frame', 'Ksh 3,000'],
  ['A2 frame', 'Ksh 5,000–Ksh 6,000'],
  ['A1 frame', 'Ksh 8,000'],
];

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex items-center gap-3" data-testid="link-logo">
      <span className={`block overflow-hidden rounded-sm bg-[#260205] ${compact ? 'h-10 w-[70px]' : 'h-12 w-[82px]'}`}>
        <img src={logoPath} alt="Joriel Studios" className="h-full w-full object-contain" />
      </span>
      {!compact && <span className="hidden text-[10px] font-medium uppercase tracking-[.28em] text-[#f5ebdc] sm:block">Photography studio</span>}
    </Link>
  );
}

const branchItems = [
  ['Home', '/', 'Main page'],
  ['Portfolio', '/portfolio', 'Selected work'],
  ['Rate card', '/pricing', 'Services & prices'],
  ['Booking', '/booking', 'Start here'],
];

function BranchRail() {
  const [location] = useLocation();
  return (
    <div className="mx-auto max-w-[1360px] px-5 md:px-10 lg:px-14">
      <div className="branch-rail overflow-x-auto border-y border-[#f7eee2]/15 py-2.5">
        <div className="flex min-w-max items-center gap-2">
          <span className="mr-2 whitespace-nowrap font-mono-ui text-[11px] uppercase tracking-[.18em] text-[#f5bd4e]/70">Studio map</span>
          {branchItems.map(([label, href, description], index) => (
            <div key={href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="h-px w-5 bg-[#f7eee2]/25" />}
              <Link href={href} className={`focus-ring group flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 transition-colors ${location === href ? 'border-[#f5bd4e] bg-[#f5bd4e] text-[#3c1117]' : 'border-[#f7eee2]/20 text-[#f7eee2]/75 hover:border-[#f5bd4e] hover:text-[#f5bd4e]'}`} data-testid={`link-branch-${label.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current transition-transform group-hover:scale-125" />
                <span className="text-[11px] font-semibold uppercase tracking-[.12em]">{label}</span>
                <span className="hidden text-[11px] opacity-60 sm:inline">· {description}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const nav = [
    ['Home', '/'],
    ['Portfolio', '/portfolio'],
    ['Rate card', '/pricing'],
    ['Booking', '/booking'],
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-5 md:px-10 lg:px-14">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`focus-ring text-[11px] font-semibold uppercase tracking-[.16em] transition-colors hover:text-[#f5bd4e] ${location === href ? 'text-[#f5bd4e]' : 'text-[#f7eee2]/80'}`} data-testid={`link-nav-${label.toLowerCase()}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a className="focus-ring flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#f7eee2]/80 transition-colors hover:text-[#f5bd4e]" href="tel:+254748344466" data-testid="link-header-phone"><Phone size={14} /> 0748 344466</a>
          <Link href="/booking" className="focus-ring rounded-sm bg-[#f5bd4e] px-5 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-[#3c1117] transition-transform hover:-translate-y-0.5" data-testid="link-header-booking">Make an enquiry</Link>
        </div>
        <button type="button" className="focus-ring rounded-sm border border-[#f5ebdc]/30 p-2 text-[#f5ebdc] lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <BranchRail />
      {open && (
        <nav className="mx-4 border border-[#f5ebdc]/15 bg-[#3c1117] p-4 shadow-xl lg:hidden" aria-label="Mobile navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="focus-ring block border-b border-[#f5ebdc]/10 px-3 py-4 text-xs font-semibold uppercase tracking-[.16em] text-[#f7eee2]" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)} className="focus-ring mt-4 block bg-[#f5bd4e] px-3 py-4 text-center text-xs font-bold uppercase tracking-[.16em] text-[#3c1117]" data-testid="link-mobile-booking">Make an enquiry</Link>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#260205] px-5 py-14 text-[#f7eee2] md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 border-b border-[#f7eee2]/15 pb-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <Logo compact />
            <p className="mt-7 max-w-sm font-display text-3xl leading-[1.1] text-[#f5ebdc]">The good light is<br /><em>always</em> worth waiting for.</p>
          </div>
          <div>
            <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f5bd4e]">Find us</p>
            <p className="mt-4 max-w-[220px] text-sm leading-7 text-[#f7eee2]/70">Kitengela Milele Centre<br />near Equity Bank</p>
            <a href={studioMapUrl} target="_blank" rel="noreferrer" className="focus-ring mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-[#f7eee2] hover:text-[#f5bd4e]" data-testid="link-footer-map">Open in maps <ExternalLink size={13} /></a>
          </div>
          <div>
            <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f5bd4e]">Say hello</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href="tel:+254748344466" className="focus-ring block text-[#f7eee2]/75 hover:text-[#f5bd4e]" data-testid="link-footer-phone">0748 344466</a>
              <a href="mailto:jorielstudios@gmail.com" className="focus-ring block text-[#f7eee2]/75 hover:text-[#f5bd4e]" data-testid="link-footer-email">jorielstudios@gmail.com</a>
              <button type="button" onClick={() => openWhatsApp('Hello Joriel Studios, I would like to make an enquiry.')} className="focus-ring inline-flex items-center gap-2 text-[#f7eee2]/75 hover:text-[#f5bd4e]" data-testid="button-footer-whatsapp"><MessageCircle size={15} /> WhatsApp us</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.15em] text-[#f7eee2]/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Joriel Studios</span>
          <span>Kitengela, Kenya · Made for real moments</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`grain min-h-[100dvh] ${dark ? 'bg-[#3c1117]' : 'bg-[#f4eddf]'}`}><SiteHeader />{children}<SiteFooter /></div>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`font-mono-ui text-[10px] uppercase tracking-[.24em] ${light ? 'text-[#f5bd4e]' : 'text-[#d84c24]'}`}>{children}</p>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`focus-ring group inline-flex items-center gap-3 border-b pb-3 text-[11px] font-bold uppercase tracking-[.18em] ${light ? 'border-[#f7eee2]/40 text-[#f7eee2] hover:border-[#f5bd4e]' : 'border-[#3c1117]/35 text-[#3c1117] hover:border-[#d84c24]'}`} data-testid={`link-arrow-${href.slice(1)}`}>
    {children}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
  </Link>;
}

function Home() {
  return (
    <Shell dark>
      <main>
        <section className="relative flex min-h-[820px] items-end overflow-hidden bg-[#3c1117] pt-28 lg:min-h-[920px]">
          <div className="absolute inset-0 lg:left-[38%]">
            <img src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Photographer capturing a moment outdoors" className="h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3c1117] via-[#3c1117]/65 to-transparent lg:via-[#3c1117]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3c1117] via-transparent to-[#3c1117]/40" />
          </div>
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 pb-16 md:px-10 md:pb-24 lg:px-14 lg:pb-28">
            <div className="max-w-[760px]">
              <Eyebrow light>Joriel Studios · Kitengela, Kenya</Eyebrow>
              <h1 className="rise-in delay-1 mt-6 font-display text-[clamp(4.5rem,12vw,10.5rem)] leading-[.83] tracking-[-.055em] text-[#f7eee2]">Keep the<br /><em className="text-[#f5bd4e]">feeling.</em></h1>
              <div className="rise-in delay-2 mt-9 flex max-w-xl flex-col justify-between gap-8 border-l border-[#f5bd4e] pl-5 sm:flex-row sm:items-end sm:pl-6">
                <p className="max-w-[300px] text-sm leading-7 text-[#f7eee2]/75">Photography for the chapters you want to remember — and the work you want people to notice.</p>
                <ArrowLink href="/booking" light>Start a conversation</ArrowLink>
              </div>
            </div>
            <div className="mt-20 grid max-w-xl grid-cols-3 gap-4 border-t border-[#f7eee2]/20 pt-5 sm:mt-28">
              {[['8+', 'Years'], ['450+', 'Shoots'], ['24h', 'Reply']].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl text-[#f5bd4e]">{value}</p>
                  <p className="mt-1 font-mono-ui text-[9px] uppercase tracking-[.18em] text-[#f7eee2]/50">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-end justify-between">
              <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f7eee2]/50">01 — 04</p>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#f7eee2]/50"><span className="h-px w-12 bg-[#f7eee2]/35" />Scroll to explore</span>
            </div>
          </div>
        </section>

        <section className="bg-[#260205] px-5 py-20 text-[#f7eee2] md:px-10 md:py-24 lg:px-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Eyebrow light>Explore the studio</Eyebrow>
                <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">One home base.<br /><em className="text-[#f5bd4e]">Four ways in.</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-[#f7eee2]/70">Follow a branch below to move from the studio story to the work, the rates, or your booking.</p>
            </div>
            <div className="relative mt-14">
              <div className="absolute left-1/2 top-[72px] hidden h-10 w-px -translate-x-1/2 bg-[#f5eee2]/25 md:block" />
              <div className="absolute left-[12.5%] right-[12.5%] top-[112px] hidden h-px bg-[#f5eee2]/25 md:block" />
              <Link href="/" className="focus-ring relative z-10 mx-auto flex w-fit flex-col items-center rounded-full border border-[#f5bd4e] bg-[#f5bd4e] px-8 py-5 text-center text-[#3c1117]" data-testid="link-network-home">
                <span className="font-mono-ui text-[9px] uppercase tracking-[.18em]">Main page</span>
                <span className="mt-1 font-display text-2xl">Joriel Studios</span>
              </Link>
              <div className="relative z-10 mt-10 grid gap-3 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
                {branchItems.slice(1).map(([label, href, description]) => (
                  <Link key={href} href={href} className="focus-ring group rounded-sm border border-[#f7eee2]/20 bg-[#3c1117] p-5 transition-colors hover:border-[#f5bd4e] hover:bg-[#4b171d]" data-testid={`link-network-${label.toLowerCase().replaceAll(' ', '-')}`}>
                    <span className="flex items-center justify-between"><span className="h-2 w-2 rounded-full bg-[#f5bd4e] transition-transform group-hover:scale-150" /><ArrowUpRight size={17} className="text-[#f5bd4e] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                    <span className="mt-8 block font-display text-3xl">{label}</span>
                    <span className="mt-2 block text-sm text-[#f7eee2]/60">{description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4eddf] px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div><Eyebrow>The studio approach</Eyebrow><p className="mt-5 max-w-xs text-sm leading-7 text-[#56363a]">Not stiff. Not over-directed. Just thoughtful images that leave room for who you already are.</p></div>
            <div><h2 className="max-w-4xl font-display text-4xl leading-[1.05] tracking-[-.03em] text-[#3c1117] sm:text-6xl">There is a version of you in every photograph. <em className="text-[#d84c24]">We look for the one that feels true.</em></h2><div className="mt-10"><ArrowLink href="/about">Meet the studio</ArrowLink></div></div>
          </div>
        </section>

        <section className="bg-[#e3b7a0] px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1360px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><Eyebrow>Selected work</Eyebrow><h2 className="mt-4 font-display text-5xl tracking-[-.04em] text-[#3c1117] sm:text-7xl">A little proof.</h2></div><ArrowLink href="/portfolio">View all work</ArrowLink></div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
              <PortfolioCard item={portfolioItems[0]} className="lg:col-span-7" />
              <PortfolioCard item={portfolioItems[1]} className="lg:col-span-5 lg:mt-20" />
              <PortfolioCard item={portfolioItems[4]} className="lg:col-span-5" />
              <PortfolioCard item={portfolioItems[2]} className="lg:col-span-7 lg:mt-[-5rem]" />
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f5bd4e] py-6">
          <div className="marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-4xl italic tracking-[-.02em] text-[#3c1117] sm:text-6xl">
            <span>Portraits · Weddings · Graduation · Family · Branding · Birthday · Product · Maternity ·</span><span>Portraits · Weddings · Graduation · Family · Branding · Birthday · Product · Maternity ·</span>
          </div>
        </section>

        <section className="bg-[#f4eddf] px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-8 border-b border-[#3c1117]/20 pb-10 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>How booking works</Eyebrow>
                <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.98] tracking-[-.04em] text-[#3c1117] sm:text-7xl">A clear path to<br /><em className="text-[#d84c24]">your frame.</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-[#56363a]">Choose a service, share the details, and send the request straight to WhatsApp.</p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ['01', 'Choose a service', 'Start with the shoot you have in mind. Our services and rates are listed clearly.'],
                ['02', 'Share the details', 'Tell us the date, time, location, and the feeling you want the images to carry.'],
                ['03', 'Confirm the plan', 'Your request opens in WhatsApp so we can check availability and talk through the next step.'],
              ].map(([number, title, body]) => (
                <div key={number} className="border-t border-[#3c1117]/25 pt-4">
                  <span className="font-mono-ui text-xs text-[#d84c24]">{number}</span>
                  <h3 className="mt-8 font-display text-3xl text-[#3c1117]">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#56363a]">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ArrowLink href="/booking">Start your booking</ArrowLink>
            </div>
          </div>
        </section>

        <section className="bg-[#3c1117] px-5 py-20 text-[#f7eee2] md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1fr_1fr]">
            <div><Eyebrow light>Ready when you are</Eyebrow><h2 className="mt-5 max-w-xl font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl">Bring us your<br /><em className="text-[#f5bd4e]">good idea.</em></h2></div>
            <div className="flex flex-col justify-end"><p className="max-w-md text-sm leading-7 text-[#f7eee2]/70">Tell us what you are planning, what matters most, and when you need it. We will take it from there.</p><div className="mt-8"><ArrowLink href="/booking" light>Make a booking request</ArrowLink></div></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function PortfolioCard({ item, className = '' }: { item: typeof portfolioItems[number]; className?: string }) {
  return <Link href={`/portfolio/${item.kind.toLowerCase()}`} className={`focus-ring group block ${className}`} data-testid={`card-portfolio-${item.kind.toLowerCase()}`}><div className={`relative overflow-hidden bg-[#3c1117] ${item.size === 'tall' ? 'aspect-[4/5]' : item.size === 'wide' ? 'aspect-[1.35/1]' : 'aspect-square'}`}><img src={item.image} alt={`${item.kind} photography — ${item.title}`} className="image-wash h-full w-full object-cover opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-[#260205]/75 via-transparent to-transparent opacity-70" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[#f7eee2]"><div><p className="font-mono-ui text-[9px] uppercase tracking-[.2em] text-[#f5bd4e]">{item.kind}</p><h3 className="mt-2 font-display text-2xl">{item.title}</h3></div><ArrowUpRight size={20} /></div></div></Link>;
}

function PageIntro({ number, title, body, image }: { number: string; title: ReactNode; body: string; image?: string }) {
  return <section className="relative overflow-hidden bg-[#3c1117] px-5 pb-16 pt-36 text-[#f7eee2] md:px-10 md:pb-24 md:pt-48 lg:px-14"><div className="absolute right-0 top-0 hidden h-full w-[35%] opacity-40 lg:block">{image && <img src={image} alt="" className="h-full w-full object-cover mix-blend-screen" />}<div className="absolute inset-0 bg-gradient-to-r from-[#3c1117] to-transparent" /></div><div className="relative z-10 mx-auto max-w-[1360px]"><div className="flex items-start justify-between"><Eyebrow light>Joriel Studios / {number}</Eyebrow><span className="font-mono-ui text-[10px] text-[#f7eee2]/40">Kitengela · Kenya</span></div><h1 className="mt-8 max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] leading-[.84] tracking-[-.055em]">{title}</h1><p className="mt-9 max-w-md border-l border-[#f5bd4e] pl-5 text-sm leading-7 text-[#f7eee2]/70">{body}</p></div></section>;
}

function getPortfolioGallery(kind: string) {
  if (kind === 'Weddings') return portfolioGallery.WEDDINGS;
  if (kind === 'Maternity') return portfolioGallery['BABY BUMP'];
  if (kind === 'Branding') return portfolioGallery.PORTRAITS;
  return portfolioGallery[kind.toUpperCase()] ?? [];
}

function PortfolioGallery({ images, kind }: { images: string[]; kind: string }) {
  return <section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto max-w-[1360px]"><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Eyebrow>{kind} gallery</Eyebrow><h2 className="mt-4 font-display text-4xl sm:text-5xl">All frames.</h2></div><p className="max-w-sm text-sm leading-6 text-[#56363a]">A complete collection from the {kind.toLowerCase()} section.</p></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((image, index) => <figure key={image} className="group overflow-hidden bg-[#3c1117]"><div className="aspect-[4/3] overflow-hidden"><img src={image} alt={`${kind} photography — frame ${index + 1}`} className="image-wash h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div></figure>)}</div></div></section>;
}

function Portfolio() {
  const [filter, setFilter] = useState('All work');
  const filters = ['All work', 'Portraits', 'Weddings', 'Brands', 'Life'];
  const filtered = portfolioItems.filter((item) => filter === 'All work' || (filter === 'Brands' ? item.kind === 'Branding' || item.kind === 'Products' : filter === 'Life' ? ['Family', 'Maternity', 'Birthday'].includes(item.kind) : item.kind === filter));
  return <Shell><main><PageIntro number="01" title={<>Work with<br /><em className="text-[#f5bd4e]">a pulse.</em></>} body="A selection of frames from the kinds of work we love to make: warm, intentional, and never just for the sake of filling a frame." image={portfolioItems[4].image} /><section className="bg-[#f4eddf] px-5 py-14 md:px-10 md:py-20 lg:px-14"><div className="mx-auto max-w-[1360px]"><div className="border-b border-[#3c1117]/15 pb-6"><Eyebrow>Browse by package</Eyebrow><p className="mt-3 max-w-xl text-base leading-7 text-[#56363a]">Every package has its own page. Choose a direction below, then make a booking request when you are ready.</p><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{portfolioPages.map((page) => <Link key={page.slug} href={`/portfolio/${page.slug}`} className="focus-ring group flex items-center justify-between border border-[#3c1117]/20 bg-[#f8f2e8] px-4 py-4 transition-colors hover:border-[#d84c24] hover:bg-[#e3b7a0]" data-testid={`link-portfolio-package-${page.slug}`}><span><span className="block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#d84c24]">{page.kind}</span><span className="mt-1 block font-display text-2xl text-[#3c1117]">{page.title}</span></span><ArrowUpRight size={18} className="text-[#d84c24] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}</div></div><div className="mt-12 flex flex-wrap items-center gap-3"><span className="font-mono-ui text-[10px] uppercase tracking-[.17em] text-[#9a6e63]">Filter overview</span>{filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`focus-ring px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[.17em] transition-colors ${filter === item ? 'bg-[#3c1117] text-[#f7eee2]' : 'text-[#56363a] hover:bg-[#e3b7a0]'}`} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">{filtered.map((item, index) => <PortfolioCard key={item.title} item={item} className={index % 4 === 1 ? 'lg:col-span-5 lg:mt-16' : index % 4 === 2 ? 'lg:col-span-7' : 'lg:col-span-7'} />)}</div></div></section></main></Shell>;
}

function PortfolioPackagePage() {
  const [, params] = useRoute('/portfolio/:slug');
  const page = portfolioPages.find((item) => item.slug === params?.slug);
  if (!page) return <NotFound />;
  const portfolioItem = portfolioItems.find((item) => item.kind === page.kind);
  if (!portfolioItem) return <NotFound />;
  const galleryImages = getPortfolioGallery(page.kind);
  const pageNumber = String(portfolioPages.findIndex((item) => item.slug === page.slug) + 1).padStart(2, '0');
  return <Shell><main><PageIntro number={`01 / ${pageNumber}`} title={<>{page.title}<br /><em className="text-[#f5bd4e]">{page.kind}.</em></>} body={page.body} image={portfolioItem.image} /><section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div><Eyebrow>{page.kind} package</Eyebrow><h2 className="mt-5 max-w-lg font-display text-5xl leading-[.98] tracking-[-.04em] text-[#3c1117]">A frame that<br /><em className="text-[#d84c24]">feels like you.</em></h2><p className="mt-8 max-w-lg text-base leading-8 text-[#56363a]">{page.detail}</p><div className="mt-10"><ArrowLink href="/booking">Book this package</ArrowLink></div></div><div className="overflow-hidden bg-[#3c1117]"><img src={portfolioItem.image} alt={`${page.kind} photography — ${page.title}`} className="image-wash aspect-[4/3] w-full object-cover" /><div className="flex items-center justify-between gap-4 bg-[#3c1117] px-5 py-4 text-[#f7eee2]"><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#f5bd4e]">{page.kind} / selected work</span><ArrowUpRight size={17} className="text-[#f5bd4e]" /></div></div></div></section><PortfolioGallery images={galleryImages} kind={page.kind} /><section className="bg-[#e3b7a0] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>What to expect</Eyebrow><h2 className="mt-4 font-display text-4xl leading-[1.05] text-[#3c1117]">Thoughtful from<br />first message to final frame.</h2></div><div className="grid gap-5 sm:grid-cols-3">{page.points.map((point, index) => <div key={point} className="border-t border-[#3c1117]/25 pt-4"><span className="font-mono-ui text-xs text-[#d84c24]">{String(index + 1).padStart(2, '0')}</span><p className="mt-5 text-base leading-7 text-[#56363a]">{point}</p></div>)}</div></div></section><section className="bg-[#3c1117] px-5 py-16 text-[#f7eee2] md:px-10 md:py-24 lg:px-14"><div className="mx-auto max-w-[1200px]"><div className="flex flex-col justify-between gap-6 border-b border-[#f7eee2]/15 pb-8 sm:flex-row sm:items-end"><div><Eyebrow light>More from the portfolio</Eyebrow><h2 className="mt-4 font-display text-4xl sm:text-6xl">Keep exploring.</h2></div><ArrowLink href="/portfolio" light>Back to portfolio</ArrowLink></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{portfolioPages.filter((other) => other.slug !== page.slug).slice(0, 4).map((other) => <Link key={other.slug} href={`/portfolio/${other.slug}`} className="focus-ring border border-[#f7eee2]/15 p-4 transition-colors hover:border-[#f5bd4e]"><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#f5bd4e]">{other.kind}</span><span className="mt-2 block font-display text-2xl">{other.title}</span></Link>)}</div></div></section></main></Shell>;
}

function Services() {
  const serviceDetails = [
    ['Passport Photography', 'Ksh 100 per photo soft copy only · Ksh 200 for 4 hard copies', 'Quick passport photos with print-ready and digital options.'],
    ['Portrait & Regular Photo Sessions', 'Ksh 300 per photo, minimum of 5 photos at Ksh 1,500', 'Guided posing, studio lighting, clean edits, and fast delivery.'],
    ['Standard Studio Package', 'Ksh 300 per photo, minimum of 10 photos at Ksh 3,000', 'Minimum of 3 outfit changes.'],
    ['Birthday Package', 'Ksh 3,500–Ksh 5,000 per hour', 'Studio shoot for 1–3 people: Ksh 3,500 per hour for 10 photos minimum. For 4–6 people: Ksh 5,000 per hour for 15 photos minimum.'],
    ['Family, Friends & Group Package', 'Studio Ksh 5,000 · outdoor Ksh 12,000–Ksh 15,000', 'Studio: minimum 15 photos for 1 hour. Outdoor: Ksh 12,000 for 3 hours or Ksh 15,000 for half day.'],
    ['Executive Family Shoot', 'Ksh 12,000', 'A tailored family photography session with an executive portrait finish.'],
    ['Outdoor Shot', 'Ksh 6,000 per hour', 'Family/group shoot for 4–6 people, with 15 photos minimum.'],
    ['Graduation Package', 'Ksh 300 per photo, minimum of 10 photos at Ksh 3,000', 'Gown Ksh 1,000 · make-up Ksh 1,500.'],
    ['Bump Shot Package', 'Ksh 300 minimum of 10 photos', 'Gown Ksh 1,200 · wraps Ksh 500 · make-up Ksh 1,500.'],
    ['Corporate Package', 'Ksh 300 per photo, minimum of 10 photos at Ksh 3,000', 'Studio shoot for professional headshots and team portraits.'],
    ['Product Shot', 'Studio Ksh 200 · outdoor Ksh 300 per product', 'Studio minimum 5 photos · outdoor minimum 10 photos.'],
    ['Podcast Shot', 'Ksh 3,000 per hour', 'Short videos, reels, and interviews · one-minute video from Ksh 2,000.'],
    ['Events Package', 'Quotation', 'Photography and videography quoted after logistical analysis. Drone Ksh 15,000 · live coverage with 2 cameras Ksh 40,000 · wedding packages on request.'],
  ];
  const reminders = [
    'Please observe the agreed shoot time.',
    'Edited photos are delivered within 3 days maximum.',
    'Booking fee is Ksh 1,000, redeemable and non-refundable.',
    'Outdoor booking fee is 50%-70% of the rate cost.',
    'Arrive neatly dressed with at least 3 outfit changes for studio sessions.',
    'Damaged studio equipment or props must be paid for.',
  ];
  return <Shell><main><PageIntro number="02" title={<>Made for<br /><em className="text-[#f5bd4e]">your chapter.</em></>} body="From a first portrait to a full wedding day, Joriel Studios makes space for the details that turn a session into something you can feel." image={portfolioItems[6].image} /><section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto max-w-[1100px]">{services.map((service, index) => { const detail = serviceDetails[index]; return <div key={service.no} className="group grid gap-4 border-b border-[#3c1117]/20 py-7 md:grid-cols-[70px_1fr_1.2fr_auto] md:items-center" data-testid={`service-${service.name.toLowerCase().replaceAll(' ', '-')}`}><span className="font-mono-ui text-xs text-[#d84c24]">{service.no}</span><div><h2 className="font-display text-3xl text-[#3c1117]">{detail[0]}</h2><p className="mt-2 text-sm font-semibold text-[#d84c24]">{detail[1]}</p></div><div><p className="max-w-md text-sm leading-6 text-[#56363a]">{detail[2]}</p><p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[.14em] text-[#9a6e63]">{service.tags}</p></div><ArrowUpRight className="hidden text-[#d84c24] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" size={21} /></div>; })}</div></section><section className="bg-[#e3b7a0] px-5 py-16 md:px-10 lg:px-14"><div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><Eyebrow>Prints & photomounts</Eyebrow><h2 className="mt-4 font-display text-4xl text-[#3c1117]">Keep the frame<br />close.</h2><div className="mt-8 grid gap-3 sm:grid-cols-2"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#9a6e63]">Photomounts</p><ul className="mt-3 space-y-2 text-sm text-[#56363a]">{printRates.slice(0, 6).map(([label, price]) => <li key={label} className="flex justify-between gap-4"><span>{label.replace(' photomount', '')}</span><span className="font-semibold text-[#d84c24]">{price}</span></li>)}</ul></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#9a6e63]">Frames</p><ul className="mt-3 space-y-2 text-sm text-[#56363a]">{printRates.slice(6).map(([label, price]) => <li key={label} className="flex justify-between gap-4"><span>{label.replace(' frame', '')}</span><span className="font-semibold text-[#d84c24]">{price}</span></li>)}</ul></div></div></div><div><Eyebrow>Before you book</Eyebrow><h2 className="mt-4 font-display text-4xl text-[#3c1117]">A few studio<br />reminders.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{reminders.map((item, index) => <div key={item} className="border-t border-[#3c1117]/25 pt-4"><span className="font-mono-ui text-xs text-[#d84c24]">{String(index + 1).padStart(2, '0')}</span><p className="mt-4 text-sm leading-6 text-[#56363a]">{item}</p></div>)}</div></div></div></section></main></Shell>;
}

function Pricing() {
  return <Shell><main><PageIntro number="03" title={<>Good work<br /><em className="text-[#f5bd4e]">has a rate.</em></>} body="Clear starting points for your planning. Every brief is a little different, so wedding, event, brand, and product work is confirmed with a tailored quote." image={portfolioItems[2].image} /><section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[1.15fr_.85fr]"><div><Eyebrow>Current rate card / sessions</Eyebrow><p className="mt-5 max-w-xl text-sm leading-7 text-[#56363a]">Use these starting prices to plan your shoot. Wedding, event, brand, product, and other custom work is confirmed with a tailored quote.</p><div className="mt-7">{rates.map((rate) => <div key={rate.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#3c1117]/15 py-5" data-testid={`rate-${rate.label.toLowerCase().replaceAll(' ', '-')}`}><div><h3 className="font-display text-2xl text-[#3c1117]">{rate.label}</h3><p className="mt-1 text-sm leading-6 text-[#56363a]">{rate.note}</p></div><span className="self-center text-right text-sm font-bold text-[#d84c24]">{rate.price}</span></div>)}</div></div><div><Eyebrow>Frames & photomounts</Eyebrow><p className="mt-5 max-w-sm text-sm leading-7 text-[#56363a]">The photographs you love deserve a life beyond the camera roll. Ask about frame and photomount orders with your booking.</p><div className="mt-7 bg-[#3c1117] p-6 text-[#f7eee2]">{printRates.map(([label, price]) => <div key={label} className="flex justify-between gap-4 border-b border-[#f7eee2]/15 py-4 text-sm last:border-0"><span>{label}</span><span className="whitespace-nowrap font-mono-ui text-xs text-[#f5bd4e]">{price}</span></div>)}</div><div className="mt-10"><ArrowLink href="/booking">Request a tailored quote</ArrowLink></div></div></div></section><section className="bg-[#3c1117] px-5 py-16 text-[#f7eee2] md:px-10 md:py-24 lg:px-14"><div className="mx-auto max-w-[1200px]"><Eyebrow light>Original rate cards</Eyebrow><h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] sm:text-6xl">The full card, kept<br /><em className="text-[#f5bd4e]">in view.</em></h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#f7eee2]/70">The typed rates above are kept for easy reading. These are the original Joriel Studios cards for visual reference.</p><div className="mt-10 grid gap-6 md:grid-cols-2"><figure className="overflow-hidden border border-[#f7eee2]/15 bg-[#f7eee2]"><img src="/assets/rate-card-packages.jpeg" alt="Joriel Studios packages rate card" className="h-auto w-full" /><figcaption className="bg-[#260205] px-5 py-4 font-mono-ui text-[10px] uppercase tracking-[.14em] text-[#f7eee2]/70">Packages & studio services</figcaption></figure><figure className="overflow-hidden border border-[#f7eee2]/15 bg-[#f7eee2]"><img src="/assets/rate-card-frames.jpeg" alt="Joriel Studios frames and photomounts rate card" className="h-auto w-full" /><figcaption className="bg-[#260205] px-5 py-4 font-mono-ui text-[10px] uppercase tracking-[.14em] text-[#f7eee2]/70">Frames, photomounts & reminders</figcaption></figure></div></div></section><section className="bg-[#f5bd4e] px-5 py-12 md:px-10 lg:px-14"><div className="mx-auto flex max-w-[1200px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><p className="font-display text-3xl text-[#3c1117]">A question about what is included?</p><button type="button" onClick={() => openWhatsApp('Hello Joriel Studios, I have a question about your rates.')} className="focus-ring inline-flex items-center gap-2 self-start border-b border-[#3c1117] pb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#3c1117]" data-testid="button-pricing-whatsapp">Ask on WhatsApp <MessageCircle size={16} /></button></div></section></main></Shell>;
}

function About() {
  return <Shell><main><PageIntro number="04" title={<>A studio<br /><em className="text-[#f5bd4e]">with feeling.</em></>} body="Joriel Studios is a photography studio in Kitengela, Kenya, making room for portraits, celebrations, people, products, and the stories around them." image={portfolioItems[3].image} /><section className="bg-[#f4eddf] px-5 py-20 md:px-10 md:py-28 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><Eyebrow>Why Joriel</Eyebrow><p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#9a6e63]">A human approach to the frame</p></div><div><h2 className="font-display text-4xl leading-[1.08] tracking-[-.03em] text-[#3c1117] sm:text-6xl">We are interested in the pause before the pose, the laugh after the take, and the little details that make a picture <em className="text-[#d84c24]">belong to you.</em></h2><p className="mt-10 max-w-xl text-sm leading-8 text-[#56363a]">Whether you are stepping in front of a camera for the first time or bringing a whole team with you, the process stays simple: make a plan, find the light, and let the real moment have the final word.</p></div></div></section><section className="bg-[#d84c24] px-5 py-20 text-[#f7eee2] md:px-10 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-3">{[['01', 'Warm direction', 'Enough guidance to feel comfortable, never so much that the image stops feeling like you.'], ['02', 'A considered frame', 'A clear eye for light, composition, and the detail that gives an image its life.'], ['03', 'Made to keep', 'Digital images for the present, and print options for the photographs you want close.']].map(([no, title, text]) => <div key={no} className="border-t border-[#f7eee2]/35 pt-4"><span className="font-mono-ui text-xs text-[#f5bd4e]">{no}</span><h3 className="mt-10 font-display text-3xl">{title}</h3><p className="mt-4 max-w-xs text-sm leading-7 text-[#f7eee2]/75">{text}</p></div>)}</div></section></main></Shell>;
}

function Booking() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: 'Studio portrait', date: '', time: '', location: '', message: '' });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      'Hello Joriel Studios, I would like to make a booking.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Location: ${form.location || 'To be confirmed'}`,
      `Notes: ${form.message || 'No extra notes'}`,
    ].join('\n');
    openWhatsApp(message);
    setSent(true);
  }
  return <Shell><main><PageIntro number="05" title={<>Let us make<br /><em className="text-[#f5bd4e]">a plan.</em></>} body="Share a few details and your request will open in WhatsApp, where we can talk through the good stuff." image={portfolioItems[0].image} /><section className="bg-[#e3b7a0] px-5 py-6 md:px-10 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-3 sm:grid-cols-3">{[['01', 'Choose a service'], ['02', 'Share your details'], ['03', 'Confirm on WhatsApp']].map(([number, label], index) => <div key={number} className={`flex items-center gap-3 border-t pt-3 ${index === 0 ? 'border-[#d84c24]' : 'border-[#3c1117]/25'}`}><span className="font-mono-ui text-xs text-[#d84c24]">{number}</span><span className="text-sm font-semibold text-[#3c1117]">{label}</span></div>)}</div></section><section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>Booking request</Eyebrow><h2 className="mt-5 font-display text-4xl leading-[1.05] text-[#3c1117]">Start with<br />the basics.</h2><div className="mt-10 space-y-5 border-t border-[#3c1117]/20 pt-5 text-sm leading-6 text-[#56363a]"><p className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-[#d84c24]" />Booking fee: Ksh 1,000 redeemable and non-refundable.</p><p className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-[#d84c24]" />Delivery within 3 days maximum.</p><p className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-[#d84c24]" />Outdoor booking fee is 50%-70% of rate cost.</p></div></div><form onSubmit={submit} className="grid gap-6 sm:grid-cols-2" aria-label="Booking request form"><Field label="Your name" id="name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} /><Field label="Phone number" id="phone" required value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} /><label className="block"><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#56363a]">What are we photographing?</span><select required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} className="focus-ring mt-3 w-full border-0 border-b border-[#3c1117]/25 bg-transparent px-0 py-3 text-sm text-[#3c1117]" data-testid="select-booking-service"><option>Studio portrait</option><option>Wedding photography</option><option>Graduation shoot</option><option>Birthday or event coverage</option><option>Brand or product shoot</option><option>Bump shoot</option><option>Podcast shoot</option><option>Family & group shoot</option><option>Executive family shoot</option><option>Passport photography</option><option>Outdoor shot</option><option>Corporate package</option><option>Product shot</option><option>Events package</option></select></label><Field label="Shoot location" id="location" value={form.location} onChange={(value) => setForm({ ...form, location: value })} /><Field label="Preferred date" id="date" type="date" required value={form.date} onChange={(value) => setForm({ ...form, date: value })} /><Field label="Preferred time" id="time" type="time" required value={form.time} onChange={(value) => setForm({ ...form, time: value })} /><label className="block sm:col-span-2"><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#56363a]">Tell us a little more</span><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={4} placeholder="The occasion, location, number of people, or the feeling you have in mind…" className="focus-ring mt-3 w-full resize-y border-0 border-b border-[#3c1117]/25 bg-transparent px-0 py-3 text-sm text-[#3c1117] placeholder:text-[#9a6e63]" data-testid="textarea-booking-message" /></label><div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center"><button type="submit" className="focus-ring inline-flex items-center gap-3 bg-[#3c1117] px-6 py-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#f7eee2] transition-transform hover:-translate-y-0.5" data-testid="button-submit-booking">Open WhatsApp <Send size={15} /></button>{sent && <p className="text-xs text-[#d84c24]" role="status" data-testid="status-booking-sent">Your request is ready in WhatsApp.</p>}</div></form></div></section></main></Shell>;
}

function Field({ label, id, required = false, value, onChange, type = 'text' }: { label: string; id: string; required?: boolean; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block"><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#56363a]">{label}{required && <span className="ml-1 text-[#d84c24]">*</span>}</span><input required={required} id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-3 w-full border-0 border-b border-[#3c1117]/25 bg-transparent px-0 py-3 text-sm text-[#3c1117]" data-testid={`input-booking-${id}`} /></label>;
}

function Contact() {
  return <Shell><main><PageIntro number="06" title={<>Come say<br /><em className="text-[#f5bd4e]">hello.</em></>} body="For a booking, a quick question, or simply to see if we are the right fit — we would love to hear from you." image={portfolioItems[7].image} /><section className="bg-[#f4eddf] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>Contact details</Eyebrow><div className="mt-10 space-y-8"><ContactLink icon={<Phone />} title="Call us" value="0748 344466 / +254 748 344466" href="tel:+254748344466" testId="link-contact-phone" /><ContactLink icon={<MessageCircle />} title="WhatsApp" value="Start a conversation" onClick={() => openWhatsApp('Hello Joriel Studios, I would like to make an enquiry.')} testId="button-contact-whatsapp" /><ContactLink icon={<Mail />} title="Email" value="jorielstudios@gmail.com" href="mailto:jorielstudios@gmail.com" testId="link-contact-email" /></div></div><div><div className="relative aspect-[4/3] overflow-hidden bg-[#3c1117]"><img src="https://images.pexels.com/photos/2088170/pexels-photo-2088170.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Warm-toned studio workspace" className="image-wash h-full w-full object-cover opacity-75" /><div className="absolute inset-0 bg-[#3c1117]/45" /><div className="absolute inset-0 flex items-center justify-center"><a href={studioMapUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-3 bg-[#f5bd4e] px-5 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#3c1117]" data-testid="link-contact-map"><MapPin size={16} /> Open map <ExternalLink size={14} /></a></div></div><div className="mt-5 flex justify-between gap-6 border-t border-[#3c1117]/20 pt-5"><p className="max-w-xs text-sm leading-6 text-[#56363a]">Kitengela Milele Centre<br />near Equity Bank</p><p className="font-mono-ui text-right text-[10px] uppercase leading-5 tracking-[.12em] text-[#9a6e63]">Joriel Studios<br />Kitengela, Kenya</p></div></div></div></section><section className="bg-[#e3b7a0] px-5 py-14 md:px-10 lg:px-14"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><Eyebrow>Prefer a form?</Eyebrow><h2 className="mt-3 font-display text-4xl text-[#3c1117]">Tell us what you are imagining.</h2></div><ArrowLink href="/booking">Make a booking request</ArrowLink></div></section></main></Shell>;
}

function ContactLink({ icon, title, value, href, onClick, testId }: { icon: ReactNode; title: string; value: string; href?: string; onClick?: () => void; testId: string }) {
  const content = <><span className="flex h-10 w-10 items-center justify-center border border-[#d84c24]/35 text-[#d84c24]">{icon}</span><span><span className="block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#9a6e63]">{title}</span><span className="mt-1 block text-sm text-[#3c1117]">{value}</span></span><ArrowUpRight className="ml-auto text-[#d84c24]" size={17} /></>;
  return href ? <a href={href} className="focus-ring flex max-w-md items-center gap-4 border-b border-[#3c1117]/15 pb-5" data-testid={testId}>{content}</a> : <button type="button" onClick={onClick} className="focus-ring flex w-full max-w-md items-center gap-4 border-b border-[#3c1117]/15 pb-5 text-left" data-testid={testId}>{content}</button>;
}

function NotFound() {
  return <Shell><main className="flex min-h-[70vh] items-center bg-[#f4eddf] px-5 py-32 md:px-10 lg:px-14"><div className="mx-auto w-full max-w-[1100px]"><Eyebrow>404 / Lost frame</Eyebrow><h1 className="mt-5 font-display text-7xl leading-[.9] text-[#3c1117] sm:text-9xl">This page<br /><em className="text-[#d84c24]">isn't here.</em></h1><div className="mt-10"><ArrowLink href="/">Back to the studio</ArrowLink></div></div></main></Shell>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/portfolio" component={Portfolio} /><Route path="/portfolio/:slug" component={PortfolioPackagePage} /><Route path="/services" component={Services} /><Route path="/pricing" component={Pricing} /><Route path="/about" component={About} /><Route path="/booking" component={Booking} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;

