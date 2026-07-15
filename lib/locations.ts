export type LocationSlug = "adelaide" | "danforth" | "vancouver";

export interface Event {
  date: string;
  title: string;
  description: string;
  tag?: string;
  ticketUrl?: string;
}

export interface ScheduleDay {
  dayName: string;
  items: string[];
}

export interface Location {
  slug: LocationSlug;
  timezone: string;
  name: string;
  label: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  email: string;
  hours: { days: string; time: string }[];
  heroTagline: string;
  stats: { value: string; label: string }[];
  features: { icon: string; title: string; desc: string }[];
  events: Event[];
  faqs: { q: string; a: string }[];
  bookingUrl: string;
  happyHour: string;
  social: { facebook: string; instagram: string };
  uniqueFeature?: string;
  ageNote?: string;
  weeklySchedule: ScheduleDay[];
}

const LOCATIONS: Record<LocationSlug, Location> = {
  adelaide: {
    slug: "adelaide",
    timezone: "America/Toronto",
    name: "Adelaide",
    label: "Toronto, Adelaide St",
    city: "Toronto",
    province: "ON",
    address: "250 Adelaide St. W, Toronto, ON M5H 1X6",
    phone: "+1 (437) 747-5918",
    email: "adelaide@dublincalling.com",
    hours: [
      { days: "Mon to Wed", time: "3:00 PM to 12:00 AM" },
      { days: "Thu to Fri", time: "3:00 PM to 2:00 AM" },
      { days: "Saturday", time: "12:00 PM to 2:00 AM" },
      { days: "Sunday", time: "12:00 PM to 12:00 AM" },
    ],
    heroTagline: "Downtown Toronto's loudest party pub.",
    stats: [
      { value: "20+", label: "Big Screen TVs" },
      { value: "4-6PM", label: "Daily Happy Hour" },
      { value: "3", label: "Floors of Fun" },
    ],
    features: [
      {
        icon: "🏈",
        title: "Bills Backers Club",
        desc: "Official Buffalo Bills fan chapter. Never miss a snap.",
      },
      {
        icon: "🎯",
        title: "Trivia Nights",
        desc: "Weekly pub trivia with TriviaTO. Bring your A-game.",
      },
      {
        icon: "🎉",
        title: "Post-Game Program",
        desc: "Exclusive after-game social events. Register your team.",
      },
      {
        icon: "📺",
        title: "20+ Big Screens",
        desc: "MLB, NFL, UFC, Soccer. We've got every game covered.",
      },
    ],
    events: [
      {
        date: "Every Monday",
        title: "Trivia Night",
        description: "Test your knowledge with TriviaTO. Sign up online.",
        tag: "Weekly",
      },
      {
        date: "Sun to Fri, 4 to 6PM",
        title: "Happy Hour",
        description: "Discounted drinks every weekday and Sunday afternoon.",
        tag: "Daily",
      },
      {
        date: "Game Days",
        title: "Bills Backers Watch Party",
        description: "Official Bills Backers Club. Every game, every week.",
        tag: "NFL",
      },
      {
        date: "Ongoing",
        title: "UFC Fight Nights",
        description: "Every UFC card live on the big screens. No missing out.",
        tag: "UFC",
      },
    ],
    faqs: [
      {
        q: "Is there a cover charge?",
        a: "No cover charge for most nights. Ticketed events are listed on our events page.",
      },
      {
        q: "Can I book a table for a group?",
        a: "Groups of up to 20 can book online. For larger parties, email us at adelaide@dublincalling.com.",
      },
      {
        q: "What sports do you show?",
        a: "All major sports: NFL, MLB, NBA, NHL, UFC, Premier League, MLS, and more.",
      },
      {
        q: "Do you have happy hour?",
        a: "Yes. Happy Hour runs Sunday to Friday, 4PM to 6PM.",
      },
      {
        q: "Is the venue accessible?",
        a: "Please contact us directly at +1 (437) 747-5918 for accessibility information.",
      },
      {
        q: "What is the Bills Backers Club?",
        a: "We are an official Buffalo Bills fan chapter. Join us every game day for watch parties, specials, and fellow Bills fans.",
      },
    ],
    bookingUrl: "https://themrggroup.tripleseat.com/dynamic_party_request/528",
    happyHour: "Sun to Fri, 4:00 PM to 6:00 PM",
    social: {
      facebook: "https://facebook.com/dublincallingto",
      instagram: "https://instagram.com/dublincallingadelaide",
    },
    uniqueFeature: "Home of the Official Bills Backers Club",
    weeklySchedule: [
      { dayName: "Tuesday",   items: ["MLB All-Star Game, 8:00 PM ET"] },
      { dayName: "Wednesday", items: [] },
      { dayName: "Thursday",  items: ["Toronto FC at CF Montreal, 7:30 PM ET"] },
      { dayName: "Friday",    items: ["Chicago White Sox vs Toronto Blue Jays, 7:07 PM ET"] },
      { dayName: "Saturday",  items: ["Chicago White Sox vs Toronto Blue Jays, 3:07 PM ET"] },
      { dayName: "Sunday",    items: ["Chicago White Sox vs Toronto Blue Jays, 12:15 PM ET"] },
      { dayName: "Monday",    items: ["Tampa Bay Rays vs Toronto Blue Jays, 7:07 PM ET", "Trivia Night with TriviaTO, 7:00 PM"] },
    ],
  },

  danforth: {
    slug: "danforth",
    timezone: "America/Toronto",
    name: "Danforth",
    label: "Toronto, Danforth Ave",
    city: "Toronto",
    province: "ON",
    address: "526 Danforth Ave, Toronto, ON M4K 1P8",
    phone: "+1 (437) 476-6778",
    email: "danforth@dublincalling.com",
    hours: [
      { days: "Mon to Wed", time: "3:00 PM to 12:00 AM" },
      { days: "Thu to Fri", time: "3:00 PM to 2:00 AM" },
      { days: "Saturday", time: "12:00 PM to 2:00 AM" },
      { days: "Sunday", time: "12:00 PM to 12:00 AM" },
    ],
    heroTagline: "East Toronto's favourite pub in the heart of the Danforth.",
    stats: [
      { value: "10+", label: "Big Screen TVs" },
      { value: "4-6PM", label: "Daily Happy Hour" },
      { value: "Mon", label: "Pool Tournaments" },
    ],
    features: [
      {
        icon: "🎱",
        title: "Pool Tournaments",
        desc: "Monday night pool tournaments. Rack them up and compete.",
      },
      {
        icon: "🧠",
        title: "Trivia Nights",
        desc: "Weekly pub trivia with TriviaTO. Prizes for the top table.",
      },
      {
        icon: "📺",
        title: "10+ Big Screens",
        desc: "Never miss a moment. Every game shown across our screens.",
      },
      {
        icon: "🍺",
        title: "Happy Hour",
        desc: "Sun to Fri, 4PM to 6PM. Great drinks, even better prices.",
      },
    ],
    events: [
      {
        date: "Every Monday",
        title: "Pool Tournament",
        description: "Monday night pool at Danforth. Sign in by 7PM to compete.",
        tag: "Weekly",
      },
      {
        date: "Every Tuesday",
        title: "Trivia Night",
        description: "TriviaTO hosts pub trivia. Form a team and test your knowledge.",
        tag: "Weekly",
      },
      {
        date: "Sun to Fri, 4 to 6PM",
        title: "Happy Hour",
        description: "Discounted drinks every day, Sunday through Friday.",
        tag: "Daily",
      },
      {
        date: "Ongoing",
        title: "UFC & Sports Nights",
        description: "Every major UFC card and sports fixture live on screen.",
        tag: "Sports",
      },
    ],
    faqs: [
      {
        q: "Is there a cover charge?",
        a: "No cover charge for most nights. Ticketed events are listed on our events page.",
      },
      {
        q: "Can I book for a group?",
        a: "Yes. Book online for groups up to 20. For larger events email danforth@dublincalling.com.",
      },
      {
        q: "When are the pool tournaments?",
        a: "Every Monday night. Sign in by 7PM to join the tournament.",
      },
      {
        q: "What sports are shown?",
        a: "All major leagues: NFL, MLB, NBA, NHL, UFC, Premier League, MLS, and more.",
      },
      {
        q: "Do you have happy hour?",
        a: "Yes. Sunday to Friday, 4PM to 6PM.",
      },
      {
        q: "Is parking available nearby?",
        a: "Street parking is available on Danforth Ave and surrounding streets. Check your local parking app.",
      },
    ],
    bookingUrl: "https://themrggroup.tripleseat.com/dynamic_party_request/528",
    happyHour: "Sun to Fri, 4:00 PM to 6:00 PM",
    social: {
      facebook: "https://facebook.com/profile.php?id=61587657773522",
      instagram: "https://instagram.com/dublincallingdanforth",
    },
    uniqueFeature: "Monday Night Pool Tournaments",
    weeklySchedule: [
      { dayName: "Tuesday",   items: ["MLB All-Star Game, 8:00 PM ET", "Trivia Night with TriviaTO, 7:00 PM"] },
      { dayName: "Wednesday", items: [] },
      { dayName: "Thursday",  items: ["Toronto FC at CF Montreal, 7:30 PM ET"] },
      { dayName: "Friday",    items: ["Chicago White Sox vs Toronto Blue Jays, 7:07 PM ET"] },
      { dayName: "Saturday",  items: ["Chicago White Sox vs Toronto Blue Jays, 3:07 PM ET"] },
      { dayName: "Sunday",    items: ["Chicago White Sox vs Toronto Blue Jays, 12:15 PM ET"] },
      { dayName: "Monday",    items: ["Tampa Bay Rays vs Toronto Blue Jays, 7:07 PM ET", "Pool Tournament, sign in by 7:00 PM"] },
    ],
  },

  vancouver: {
    slug: "vancouver",
    timezone: "America/Vancouver",
    name: "Vancouver",
    label: "Vancouver, Granville St",
    city: "Vancouver",
    province: "BC",
    address: "900 Granville St, Vancouver, BC V6Z 1L2",
    phone: "(604) 670-2980",
    email: "info@dublincalling.com",
    hours: [
      { days: "Sun to Wed", time: "12:00 PM to 1:00 AM" },
      { days: "Thursday", time: "12:00 PM to 2:00 AM" },
      { days: "Fri to Sat", time: "12:00 PM to 3:00 AM" },
    ],
    heroTagline: "Granville Street's biggest party pub. Open until 3AM.",
    stats: [
      { value: "15", label: "Big Screen TVs" },
      { value: "12+", label: "Beers on Tap" },
      { value: "3AM", label: "Late on Weekends" },
    ],
    features: [
      {
        icon: "🍺",
        title: "12+ Beers on Tap",
        desc: "A massive rotating tap list. Always something new to try.",
      },
      {
        icon: "👑",
        title: "Ladies Night",
        desc: "Recurring Ladies Night events. Ticket info on our events page.",
      },
      {
        icon: "🧠",
        title: "Biweekly Trivia",
        desc: "TriviaTO trivia every other Tuesday on the main floor.",
      },
      {
        icon: "🌙",
        title: "Open Until 3AM",
        desc: "Friday and Saturday nights. The party doesn't stop.",
      },
    ],
    events: [
      {
        date: "Jul 17, 31 & Aug 7",
        title: "Ladies Night",
        description: "An unforgettable night out. Tickets via AdmitOne.",
        tag: "Ticketed",
        ticketUrl: "https://admitone.com",
      },
      {
        date: "Aug 15",
        title: "UFC 330",
        description: "The next massive UFC card. Come early for the best seat.",
        tag: "UFC",
      },
      {
        date: "Sun to Fri, 4 to 6PM",
        title: "Happy Hour",
        description: "Tap beers and cocktails at happy hour prices.",
        tag: "Daily",
      },
      {
        date: "Biweekly Tuesdays",
        title: "Trivia Night",
        description: "Main floor trivia with TriviaTO. Sign up in advance.",
        tag: "Weekly",
      },
    ],
    faqs: [
      {
        q: "Is there an age restriction?",
        a: "19+ after 10PM every night. Please bring valid government-issued ID.",
      },
      {
        q: "What time do you close on weekends?",
        a: "Friday and Saturday we are open until 3AM. Sunday through Thursday we close at 1AM (Thursday at 2AM).",
      },
      {
        q: "How many beers on tap?",
        a: "12+ rotating taps. Ask your server what's pouring tonight.",
      },
      {
        q: "Can I book for a group?",
        a: "Groups up to 20 can book online. For larger events email info@dublincalling.com.",
      },
      {
        q: "When is Ladies Night?",
        a: "Recurring events. Check our Events page for upcoming dates and ticket links.",
      },
      {
        q: "Do you show Canucks / Whitecaps / BC Lions games?",
        a: "Absolutely. Every local team's games are shown live, alongside all major international fixtures.",
      },
    ],
    bookingUrl: "https://themrggroup.tripleseat.com/dynamic_party_request/528",
    happyHour: "Sun to Fri, 4:00 PM to 6:00 PM",
    social: {
      facebook: "https://facebook.com/dublincallingvan",
      instagram: "https://instagram.com/dublincallingvan",
    },
    uniqueFeature: "12+ Beers on Tap. Open Until 3AM.",
    ageNote: "19+ after 10PM",
    weeklySchedule: [
      { dayName: "Tuesday",   items: ["MLB All-Star Game, 5:00 PM PT"] },
      { dayName: "Wednesday", items: [] },
      { dayName: "Thursday",  items: ["Vancouver Whitecaps FC at Chicago Fire FC, 5:30 PM PT"] },
      { dayName: "Friday",    items: ["Chicago White Sox vs Toronto Blue Jays, 4:07 PM PT", "BC Lions at Edmonton Elks, 6:00 PM PT"] },
      { dayName: "Saturday",  items: ["Chicago White Sox vs Toronto Blue Jays, 12:07 PM PT"] },
      { dayName: "Sunday",    items: ["Chicago White Sox vs Toronto Blue Jays, 9:15 AM PT"] },
      { dayName: "Monday",    items: ["Tampa Bay Rays vs Toronto Blue Jays, 4:07 PM PT"] },
    ],
  },
};

export const LOCATION_SLUGS: LocationSlug[] = ["adelaide", "danforth", "vancouver"];

export function getLocation(slug: string): Location | null {
  if (slug in LOCATIONS) return LOCATIONS[slug as LocationSlug];
  return null;
}

export default LOCATIONS;
