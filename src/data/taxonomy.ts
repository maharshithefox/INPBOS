import { SmartEventType, EventCategory } from '../types/pbos';

export const CATEGORY_EVENT_MAPPING: Record<EventCategory, string[]> = {
  'Wedding & Marriage': [
    'Wedding', 'Destination Wedding', 'Court Marriage', 'Temple Wedding', 'Church Wedding',
    'Nikah', 'Reception', 'Engagement', 'Ring Ceremony', 'Proposal', 'Pre-Wedding Shoot',
    'Post-Wedding Shoot', 'Save the Date Shoot', 'Haldi', 'Mehendi', 'Sangeet',
    'Bridal Shower', 'Bachelor Party', 'Bachelorette Party', 'Anniversary',
    'Silver Jubilee', 'Golden Jubilee', 'Diamond Jubilee', 'Vow Renewal'
  ],
  'Baby & Family': [
    'Baby Shower', 'Gender Reveal', 'Maternity Shoot', 'Newborn Shoot', 'Naming Ceremony',
    'Cradle Ceremony', 'Annaprashan', 'Mundan Ceremony', 'First Birthday', 'Kids Birthday',
    'Birthday Party', 'Family Reunion', 'Cousins Meet', 'Family Picnic', 'Retirement Celebration'
  ],
  'Religious Events': [
    'Housewarming (Griha Pravesh)', 'Satyanarayana Pooja', 'Homa / Havan', 'Navaratri',
    'Ganesh Chaturthi', 'Diwali', 'Dussehra', 'Ugadi', 'Sankranti', 'Pongal', 'Onam',
    'Holi', 'Ram Navami', 'Krishna Janmashtami', 'Shivaratri', 'Temple Festival',
    'Rath Yatra', 'Kumbhabhishekam', 'Baptism', 'First Communion', 'Confirmation',
    'Church Service', 'Christmas Celebration', 'Easter Celebration', 'Eid Celebration',
    'Ramadan Iftar', 'Muharram Gathering', 'Guru Nanak Jayanti', 'Jain Festival', 'Buddhist Ceremony'
  ],
  'School & College': [
    'School Annual Day', 'College Fest', 'Convocation', 'Graduation', 'Farewell',
    'Freshers Party', 'Sports Day', 'Cultural Day', 'Science Exhibition', 'Art Exhibition',
    'Alumni Meet', 'Prize Distribution', 'Debate Competition', 'Quiz Competition'
  ],
  'Corporate Events': [
    'Conference', 'Seminar', 'Workshop', 'Training Session', 'Product Launch',
    'Brand Launch', 'Office Inauguration', 'Store Opening', 'Annual Day', 'Award Ceremony',
    'Team Building Event', 'Corporate Party', 'Business Meeting', 'Press Conference',
    'Investor Meet', 'Networking Event', 'CEO Town Hall', 'Vendor Meet', 'Dealer Meet', 'Franchise Launch'
  ],
  'Entertainment Events': [
    'Music Concert', 'DJ Night', 'Live Band Performance', 'Dance Show', 'Theatre Play',
    'Drama', 'Stand-up Comedy', 'Open Mic', 'Fashion Show', 'Beauty Pageant',
    'Talent Hunt', 'Reality Show', 'Celebrity Appearance', 'Fan Meet', 'Movie Premiere',
    'Audio Launch', 'Trailer Launch', 'Film Promotion'
  ],
  'Sports Events': [
    'Cricket Match', 'Football Match', 'Volleyball Tournament', 'Basketball Tournament',
    'Badminton Tournament', 'Tennis Tournament', 'Kabaddi Tournament', 'Marathon',
    'Cycling Event', 'Gym Competition', 'Fitness Challenge', 'Yoga Event',
    'Swimming Competition', 'Martial Arts Championship', 'Adventure Race'
  ],
  'Government & Public Events': [
    'Independence Day', 'Republic Day', 'Public Rally', 'Political Campaign',
    'Government Function', 'Award Distribution', 'Inauguration Ceremony',
    'Swearing-in Ceremony', 'Cultural Festival', 'Community Gathering'
  ],
  'Business & Commercial Events': [
    'Trade Fair', 'Trade Expo', 'Exhibition', 'Auto Expo', 'Property Expo',
    'Jewellery Exhibition', 'Food Festival', 'Book Fair', 'Craft Fair',
    'Startup Expo', 'Tech Expo', 'Industrial Expo'
  ],
  'Social & Lifestyle Events': [
    'Private Party', 'Cocktail Party', 'Pool Party', 'Yacht Party', 'Reunion Party',
    'High Tea', 'Dinner Party', 'Charity Gala', 'Fundraiser', 'NGO Event',
    'Community Event', 'Club Event', 'Society Event'
  ],
  'Personal Shoots': [
    'Portrait Session', 'Couple Shoot', 'Family Portrait', 'Fashion Shoot',
    'Lifestyle Shoot', 'Model Portfolio', 'Actor Portfolio', 'Personal Branding Shoot',
    'Graduation Photoshoot', 'Pet Photoshoot', 'Fitness Photoshoot', 'Travel Photoshoot',
    'Vacation Photography', 'Friends Photoshoot', 'Surprise Proposal Shoot', 'Dating Profile Shoot'
  ],
  'Food, Hospitality & Real Estate': [
    'Hotel Launch', 'Restaurant Opening', 'Café Launch', 'Food Tasting Event',
    'Chef Showcase', 'Property Launch', 'Villa Showcase', 'Apartment Launch',
    'Interior Showcase', 'Home Décor Event'
  ],
  'Cultural Events': [
    'Folk Dance Festival', 'Music Festival', 'Heritage Festival', 'Carnival',
    'Street Festival', 'Flower Show', 'Kite Festival', 'Literature Festival',
    'Film Festival', 'Art Festival', 'Photography Exhibition', 'Cultural Parade'
  ]
};

export const ALL_EVENT_CATEGORIES: EventCategory[] = [
  'Wedding & Marriage',
  'Baby & Family',
  'Religious Events',
  'School & College',
  'Corporate Events',
  'Entertainment Events',
  'Sports Events',
  'Government & Public Events',
  'Business & Commercial Events',
  'Social & Lifestyle Events',
  'Personal Shoots',
  'Food, Hospitality & Real Estate',
  'Cultural Events'
];

export const TAXONOMY_EVENTS: SmartEventType[] = Object.entries(CATEGORY_EVENT_MAPPING).flatMap(
  ([category, events], catIdx) =>
    events.map((evt, evtIdx) => ({
      id: `tax-${catIdx}-${evtIdx}`,
      name: evt,
      category: category as EventCategory,
      defaultDeliverables: [
        'Edited Photos (High-Res)',
        'Cinematic Highlight Film',
        'Social Media Teaser Reel (4K)'
      ],
      suggestedGear: ['Dual Sony Mirrorless Cameras', 'Fast Prime Lenses', 'Off-Camera Lighting'],
      popularAddons: ['4K Drone Aerial Coverage', 'Live LED Wall Streaming', 'Instant Photo Printing']
    }))
);
