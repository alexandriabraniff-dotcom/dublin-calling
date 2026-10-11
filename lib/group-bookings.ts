// Group booking types and the enquiry form each "Get in Touch" button opens.
// Shared by the pop-up forms (client) and /api/enquiry (server) so both agree on fields.

export type FieldType = "text" | "email" | "tel" | "date" | "time" | "number" | "select" | "textarea" | "checkboxes";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  half?: boolean; // sits beside the next half field on wider screens
  min?: number;
  max?: number;
  hint?: string;
}

export interface BookingType {
  id: "social" | "team" | "private";
  title: string;
  body: string;
  image: string;
  formTitle: string;
  formIntro: string;
  fields: FormField[];
}

const contactFields: FormField[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", half: true },
];

export function getBookingTypes(slug: string): BookingType[] {
  const spaceOptions =
    slug === "vancouver"
      ? ["Full venue (all three floors)", "One full floor", "A section of a floor", "Not sure yet"]
      : ["Full venue", "A private area", "A section of the bar", "Not sure yet"];

  const activityOptions =
    slug === "vancouver"
      ? ["Pool tables", "Punching bag machines", "Watching a game", "Trivia or Music Bingo", "Just food and drinks"]
      : slug === "danforth"
      ? ["Pool tables", "Watching a game", "Trivia night", "Just food and drinks"]
      : ["Watching a game", "Trivia night", "Just food and drinks"];

  return [
    {
      id: "social",
      title: "Social Event",
      body: "Perfect for your next birthday party, bachelorette or simply getting the crew together. Whatever the occasion, we've got you covered.",
      image: "/group-social.jpg",
      formTitle: "Plan a Social Event",
      formIntro: "Tell us about your celebration and we'll get back to you to lock it in.",
      fields: [
        ...contactFields,
        {
          name: "occasion",
          label: "What are you celebrating?",
          type: "select",
          required: true,
          options: ["Birthday", "Bachelorette", "Bachelor", "Engagement", "Farewell or reunion", "Just getting the crew together", "Something else"],
        },
        { name: "date", label: "Preferred date", type: "date", required: true, half: true },
        { name: "time", label: "Arrival time", type: "time", required: true, half: true },
        { name: "guests", label: "Number of guests", type: "number", required: true, min: 2, max: 500, half: true },
        {
          name: "budget",
          label: "Rough budget",
          type: "select",
          half: true,
          options: ["Under $500", "$500 to $1,000", "$1,000 to $2,500", "$2,500+", "Not sure yet"],
        },
        {
          name: "extras",
          label: "Anything you'd like added?",
          type: "checkboxes",
          options: ["Reserved table or area", "Food platters", "Drink package", "Bottle service", "A game on the big screens", "Birthday cake"],
        },
        { name: "notes", label: "Anything else we should know?", type: "textarea" },
      ],
    },
    {
      id: "team",
      title: "Team Outing",
      body: "Planning your next team outing? Bring the crew together for some games, laughs and delicious pub eats.",
      image: "/group-team.jpg",
      formTitle: "Plan a Team Outing",
      formIntro: "Share a few details about your team and we'll put together the right setup.",
      fields: [
        ...contactFields,
        { name: "company", label: "Company or team name", type: "text", required: true, autoComplete: "organization" },
        { name: "date", label: "Preferred date", type: "date", required: true, half: true },
        { name: "time", label: "Start time", type: "time", required: true, half: true },
        { name: "guests", label: "Team size", type: "number", required: true, min: 2, max: 500, half: true },
        {
          name: "budget",
          label: "Budget per person",
          type: "select",
          half: true,
          options: ["Under $30", "$30 to $50", "$50 to $75", "$75+", "Not sure yet"],
        },
        {
          name: "activities",
          label: "What would your team enjoy?",
          type: "checkboxes",
          options: activityOptions,
        },
        {
          name: "catering",
          label: "Food and drinks",
          type: "checkboxes",
          options: ["Shareable platters", "Drink tickets", "Open tab with a limit", "Each person pays their own"],
        },
        { name: "notes", label: "Anything else we should know?", type: "textarea", hint: "Dietary needs, accessibility needs, invoicing details, etc." },
      ],
    },
    {
      id: "private",
      title: "Private Event",
      body: "Let us plan the party for you. With all the fun and games already included, there is not much you need to think about.",
      image: "/group-private.jpg",
      formTitle: "Plan a Private Event",
      formIntro: "Give us the big picture and our events team will build the rest with you.",
      fields: [
        ...contactFields,
        { name: "company", label: "Company or organization (optional)", type: "text", autoComplete: "organization" },
        {
          name: "eventType",
          label: "Type of event",
          type: "select",
          required: true,
          options: ["Corporate event", "Holiday party", "Birthday or milestone", "Wedding or engagement party", "Fundraiser", "Launch or promo event", "Something else"],
        },
        { name: "date", label: "Event date", type: "date", required: true },
        { name: "startTime", label: "Start time", type: "time", required: true, half: true },
        { name: "endTime", label: "End time", type: "time", required: true, half: true },
        { name: "guests", label: "Expected guests", type: "number", required: true, min: 10, max: 2000, half: true },
        {
          name: "budget",
          label: "Total budget",
          type: "select",
          half: true,
          options: ["Under $2,500", "$2,500 to $5,000", "$5,000 to $10,000", "$10,000+", "Not sure yet"],
        },
        { name: "space", label: "Space you need", type: "select", required: true, options: spaceOptions },
        {
          name: "services",
          label: "What should we take care of?",
          type: "checkboxes",
          options: ["Food and catering", "Bar package or drink tickets", "DJ or music", "Screens and AV", "Microphone for speeches", "Decorations"],
        },
        { name: "notes", label: "Tell us about your event", type: "textarea", hint: "Theme, run of show, dietary or accessibility needs, anything you have in mind." },
      ],
    },
  ];
}
