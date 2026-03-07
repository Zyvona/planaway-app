import { Coffee, Utensils, Camera, ShoppingBag, Landmark, Mountain, Waves, TreePine, Building2, Heart, Music, Palette } from "lucide-react";

export interface Activity {
  time: string;
  title: string;
  location: string;
  cost: number;
  icon: React.ElementType;
}

export interface DayItinerary {
  dayNumber: number;
  activities: Activity[];
  tip: string;
}

export const generateItinerary = (destination: string, totalDays: number): DayItinerary[] => {
  const dest = destination.toLowerCase();

  if (dest.includes("tokyo")) {
    return generateTokyoItinerary(totalDays);
  } else if (dest.includes("london")) {
    return generateLondonItinerary(totalDays);
  } else if (dest.includes("paris")) {
    return generateParisItinerary(totalDays);
  } else if (dest.includes("new york") || dest.includes("nyc")) {
    return generateNewYorkItinerary(totalDays);
  } else if (dest.includes("bangkok")) {
    return generateBangkokItinerary(totalDays);
  } else if (dest.includes("singapore")) {
    return generateSingaporeItinerary(totalDays);
  } else {
    return generateGenericItinerary(totalDays, destination);
  }
};

const generateTokyoItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Visit Senso-ji Temple", location: "Asakusa", cost: 0, icon: Landmark },
        { time: "12:00 PM", title: "Lunch at Traditional Restaurant", location: "Asakusa", cost: 15, icon: Utensils },
        { time: "2:30 PM", title: "Explore Akihabara District", location: "Akihabara", cost: 20, icon: ShoppingBag },
        { time: "6:00 PM", title: "Dinner in Shibuya", location: "Shibuya Crossing", cost: 25, icon: Utensils },
      ],
      tip: "Download Google Translate app for offline use. Most signs have English, but it's helpful for menus and conversations."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "8:00 AM", title: "Tsukiji Outer Market Breakfast", location: "Tsukiji", cost: 20, icon: Coffee },
        { time: "11:00 AM", title: "Imperial Palace Gardens", location: "Chiyoda", cost: 0, icon: TreePine },
        { time: "2:00 PM", title: "TeamLab Borderless Museum", location: "Odaiba", cost: 35, icon: Palette },
        { time: "6:30 PM", title: "Ramen Dinner", location: "Shinjuku", cost: 12, icon: Utensils },
      ],
      tip: "Carry cash! Many small restaurants and shops don't accept credit cards. ATMs at 7-Eleven accept international cards."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "7:00 AM", title: "Day Trip to Mount Fuji", location: "Fujinomiya", cost: 60, icon: Mountain },
        { time: "12:00 PM", title: "Lunch with Mountain Views", location: "Kawaguchiko", cost: 18, icon: Utensils },
        { time: "4:00 PM", title: "Visit Oshino Hakkai", location: "Oshino Village", cost: 5, icon: Waves },
        { time: "7:00 PM", title: "Return to Tokyo", location: "Shinjuku", cost: 0, icon: Building2 },
      ],
      tip: "Book Mount Fuji tours in advance. Weather can be unpredictable, so bring layers and check forecasts."
    },
    {
      dayNumber: 5,
      activities: [
        { time: "9:30 AM", title: "Meiji Shrine Visit", location: "Harajuku", cost: 0, icon: Landmark },
        { time: "11:30 AM", title: "Harajuku Shopping & Street Food", location: "Takeshita Street", cost: 25, icon: ShoppingBag },
        { time: "3:00 PM", title: "Yoyogi Park Relaxation", location: "Shibuya", cost: 0, icon: TreePine },
        { time: "6:00 PM", title: "Izakaya Dinner Experience", location: "Ebisu", cost: 30, icon: Utensils },
      ],
      tip: "Sunday is the best day for people-watching in Yoyogi Park. You'll see musicians, dancers, and unique fashion styles."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "10:00 AM", title: "Ueno Park & Museums", location: "Ueno", cost: 10, icon: Camera },
        { time: "1:00 PM", title: "Ameya-Yokocho Market Lunch", location: "Ueno", cost: 15, icon: Utensils },
        { time: "3:30 PM", title: "Tokyo Skytree Observatory", location: "Sumida", cost: 25, icon: Building2 },
        { time: "7:00 PM", title: "Asakusa Evening Walk", location: "Asakusa", cost: 0, icon: Camera },
      ],
      tip: "Visit Tokyo Skytree at sunset for the best views. The city lights starting to glow are magical."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "9:00 AM", title: "Last-minute Shopping", location: "Ginza", cost: 40, icon: ShoppingBag },
        { time: "12:00 PM", title: "Final Sushi Experience", location: "Ginza", cost: 35, icon: Utensils },
        { time: "3:00 PM", title: "Souvenir Shopping", location: "Tokyo Station", cost: 30, icon: ShoppingBag },
        { time: "6:00 PM", title: "Farewell Dinner", location: "Roppongi", cost: 40, icon: Heart },
      ],
      tip: "Pack souvenirs carefully. Tokyo Station has excellent shops for last-minute gifts and snacks to bring home."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateLondonItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Tower of London Visit", location: "Tower Hill", cost: 35, icon: Landmark },
        { time: "12:30 PM", title: "Lunch at Borough Market", location: "Southwark", cost: 18, icon: Utensils },
        { time: "2:30 PM", title: "Tower Bridge Walk", location: "Tower Bridge", cost: 0, icon: Camera },
        { time: "5:00 PM", title: "Pub Dinner Experience", location: "Covent Garden", cost: 25, icon: Utensils },
      ],
      tip: "Book major attractions online in advance to skip queues. London Eye and Tower of London can have 2+ hour waits."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "10:00 AM", title: "British Museum", location: "Bloomsbury", cost: 0, icon: Palette },
        { time: "1:00 PM", title: "Lunch in Soho", location: "Soho", cost: 20, icon: Utensils },
        { time: "3:00 PM", title: "Buckingham Palace", location: "Westminster", cost: 0, icon: Landmark },
        { time: "6:30 PM", title: "West End Show", location: "Leicester Square", cost: 45, icon: Music },
      ],
      tip: "Most major museums are free! British Museum, National Gallery, and Tate Modern cost nothing to enter."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "9:00 AM", title: "Westminster Abbey", location: "Westminster", cost: 27, icon: Landmark },
        { time: "11:30 AM", title: "Big Ben & Parliament", location: "Westminster", cost: 0, icon: Camera },
        { time: "1:00 PM", title: "Afternoon Tea", location: "Kensington", cost: 35, icon: Coffee },
        { time: "4:00 PM", title: "Hyde Park Stroll", location: "Hyde Park", cost: 0, icon: TreePine },
      ],
      tip: "Afternoon tea is a must-try experience. Book in advance for popular spots like Sketch or The Ritz."
    },
    {
      dayNumber: 5,
      activities: [
        { time: "10:00 AM", title: "Camden Market Exploring", location: "Camden Town", cost: 15, icon: ShoppingBag },
        { time: "1:00 PM", title: "Street Food Lunch", location: "Camden Lock", cost: 12, icon: Utensils },
        { time: "3:00 PM", title: "Regent's Canal Walk", location: "Camden to Kings Cross", cost: 0, icon: Waves },
        { time: "6:00 PM", title: "King's Cross Dining", location: "Coal Drops Yard", cost: 30, icon: Utensils },
      ],
      tip: "Camden Market is best on weekends. It's vibrant, eclectic, and perfect for unique souvenirs."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "9:30 AM", title: "Notting Hill Exploration", location: "Notting Hill", cost: 0, icon: Camera },
        { time: "12:00 PM", title: "Portobello Road Market", location: "Notting Hill", cost: 20, icon: ShoppingBag },
        { time: "3:00 PM", title: "Sky Garden Views", location: "City of London", cost: 0, icon: Building2 },
        { time: "7:00 PM", title: "Thames River Cruise", location: "Westminster Pier", cost: 25, icon: Waves },
      ],
      tip: "Sky Garden is free but requires advance booking. It offers stunning 360° views of London."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Last-minute Shopping", location: "Oxford Street", cost: 50, icon: ShoppingBag },
        { time: "1:00 PM", title: "Lunch at Dishoom", location: "Covent Garden", cost: 22, icon: Utensils },
        { time: "3:30 PM", title: "Final Museum Visit", location: "South Kensington", cost: 0, icon: Palette },
        { time: "6:30 PM", title: "Farewell Dinner", location: "Shoreditch", cost: 35, icon: Heart },
      ],
      tip: "Keep Sunday in mind for planning - many shops have shorter hours and some attractions close early."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateParisItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Eiffel Tower Visit", location: "Champ de Mars", cost: 28, icon: Landmark },
        { time: "12:00 PM", title: "Café Lunch", location: "Trocadéro", cost: 18, icon: Coffee },
        { time: "2:30 PM", title: "Seine River Cruise", location: "Port de la Bourdonnais", cost: 15, icon: Waves },
        { time: "6:00 PM", title: "Bistro Dinner", location: "Latin Quarter", cost: 30, icon: Utensils },
      ],
      tip: "Book Eiffel Tower tickets online weeks in advance. Walk-up tickets sell out quickly, especially in summer."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "9:00 AM", title: "Louvre Museum", location: "Palais Royal", cost: 20, icon: Palette },
        { time: "1:00 PM", title: "Jardin des Tuileries Picnic", location: "Tuileries", cost: 12, icon: Coffee },
        { time: "3:00 PM", title: "Champs-Élysées Walk", location: "8th Arrondissement", cost: 0, icon: Camera },
        { time: "6:00 PM", title: "Arc de Triomphe", location: "Place Charles de Gaulle", cost: 13, icon: Landmark },
      ],
      tip: "Buy a fresh baguette, cheese, and wine from a local shop for a perfect Parisian picnic in the gardens."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "10:00 AM", title: "Montmartre & Sacré-Cœur", location: "Montmartre", cost: 0, icon: Landmark },
        { time: "12:30 PM", title: "Artist Square Lunch", location: "Place du Tertre", cost: 22, icon: Utensils },
        { time: "3:00 PM", title: "Musée d'Orsay", location: "Left Bank", cost: 16, icon: Palette },
        { time: "6:30 PM", title: "Saint-Germain Dinner", location: "6th Arrondissement", cost: 35, icon: Utensils },
      ],
      tip: "Visit Montmartre early in the morning to avoid crowds and get the best photos at Sacré-Cœur."
    },
    {
      dayNumber: 5,
      activities: [
        { time: "9:00 AM", title: "Versailles Palace", location: "Versailles", cost: 20, icon: Landmark },
        { time: "12:00 PM", title: "Lunch at Versailles", location: "Versailles Town", cost: 25, icon: Utensils },
        { time: "3:00 PM", title: "Palace Gardens Walk", location: "Versailles Gardens", cost: 0, icon: TreePine },
        { time: "6:00 PM", title: "Return to Paris", location: "Gare Saint-Lazare", cost: 0, icon: Building2 },
      ],
      tip: "Versailles is massive - wear comfortable shoes! The gardens alone can take hours to explore."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "10:00 AM", title: "Le Marais Exploration", location: "Le Marais", cost: 0, icon: Camera },
        { time: "1:00 PM", title: "Falafel Lunch", location: "Rue des Rosiers", cost: 10, icon: Utensils },
        { time: "3:00 PM", title: "Notre-Dame Area", location: "Île de la Cité", cost: 0, icon: Landmark },
        { time: "6:00 PM", title: "Latin Quarter Evening", location: "5th Arrondissement", cost: 28, icon: Music },
      ],
      tip: "Le Marais is perfect for vintage shopping and has some of the best falafel in Paris on Rue des Rosiers."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Final Shopping", location: "Le Bon Marché", cost: 40, icon: ShoppingBag },
        { time: "1:00 PM", title: "Elegant Lunch", location: "Saint-Germain-des-Prés", cost: 35, icon: Utensils },
        { time: "3:30 PM", title: "Luxembourg Gardens", location: "6th Arrondissement", cost: 0, icon: TreePine },
        { time: "6:30 PM", title: "Farewell Dinner", location: "Eiffel Tower View", cost: 50, icon: Heart },
      ],
      tip: "End your trip with a view of the sparkling Eiffel Tower at night - it glitters every hour after sunset."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateNewYorkItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Central Park Walk", location: "Central Park", cost: 0, icon: TreePine },
        { time: "12:00 PM", title: "NYC Pizza Lunch", location: "Upper West Side", cost: 15, icon: Utensils },
        { time: "2:00 PM", title: "Metropolitan Museum", location: "Upper East Side", cost: 30, icon: Palette },
        { time: "6:00 PM", title: "Times Square Evening", location: "Midtown", cost: 0, icon: Camera },
      ],
      tip: "Get a MetroCard for unlimited subway rides. It's the fastest and cheapest way to explore NYC."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "9:00 AM", title: "Statue of Liberty & Ellis Island", location: "Battery Park", cost: 24, icon: Landmark },
        { time: "2:00 PM", title: "Wall Street & Charging Bull", location: "Financial District", cost: 0, icon: Building2 },
        { time: "4:00 PM", title: "Brooklyn Bridge Walk", location: "Brooklyn Bridge", cost: 0, icon: Camera },
        { time: "7:00 PM", title: "DUMBO Dinner", location: "Brooklyn", cost: 35, icon: Utensils },
      ],
      tip: "Book Statue of Liberty tickets early online. Ferry tickets sell out, especially during summer months."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "10:00 AM", title: "9/11 Memorial & Museum", location: "Financial District", cost: 28, icon: Landmark },
        { time: "1:00 PM", title: "Chelsea Market Lunch", location: "Chelsea", cost: 18, icon: Utensils },
        { time: "3:00 PM", title: "High Line Walk", location: "Chelsea to Hudson Yards", cost: 0, icon: TreePine },
        { time: "6:00 PM", title: "Greenwich Village Dinner", location: "West Village", cost: 32, icon: Utensils },
      ],
      tip: "The High Line is a beautiful elevated park. Visit in late afternoon for golden hour photos."
    },
    {
      dayNumber: 5,
      activities: [
        { time: "9:30 AM", title: "Empire State Building", location: "Midtown", cost: 44, icon: Building2 },
        { time: "12:00 PM", title: "Lunch at Bryant Park", location: "Midtown", cost: 16, icon: Coffee },
        { time: "2:00 PM", title: "MoMA Visit", location: "Midtown", cost: 25, icon: Palette },
        { time: "6:00 PM", title: "Broadway Show", location: "Theater District", cost: 80, icon: Music },
      ],
      tip: "Buy Broadway tickets at TKTS booth in Times Square for same-day discounts up to 50% off."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "10:00 AM", title: "SoHo Shopping", location: "SoHo", cost: 40, icon: ShoppingBag },
        { time: "1:00 PM", title: "Little Italy Lunch", location: "Little Italy", cost: 25, icon: Utensils },
        { time: "3:00 PM", title: "Chinatown Exploration", location: "Chinatown", cost: 10, icon: Camera },
        { time: "6:00 PM", title: "Lower East Side Evening", location: "LES", cost: 30, icon: Music },
      ],
      tip: "SoHo has great shopping but also amazing street art. Keep your eyes up for beautiful cast-iron architecture."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Fifth Avenue Shopping", location: "Midtown", cost: 50, icon: ShoppingBag },
        { time: "1:00 PM", title: "Lunch at Grand Central", location: "Grand Central Terminal", cost: 20, icon: Utensils },
        { time: "3:00 PM", title: "Rockefeller Center", location: "Midtown", cost: 40, icon: Building2 },
        { time: "6:30 PM", title: "Farewell Dinner", location: "Rooftop Restaurant", cost: 60, icon: Heart },
      ],
      tip: "Visit Grand Central Terminal's Whispering Gallery - stand in opposite corners and whisper to each other!"
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateBangkokItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "8:00 AM", title: "Grand Palace Visit", location: "Phra Nakhon", cost: 15, icon: Landmark },
        { time: "11:30 AM", title: "Wat Pho Temple", location: "Phra Nakhon", cost: 5, icon: Landmark },
        { time: "1:00 PM", title: "Thai Lunch", location: "Tha Tien", cost: 8, icon: Utensils },
        { time: "4:00 PM", title: "Chao Phraya River Cruise", location: "Tha Maharaj", cost: 10, icon: Waves },
      ],
      tip: "Dress modestly for temples - cover shoulders and knees. Many temples provide wraps at the entrance."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "9:00 AM", title: "Chatuchak Weekend Market", location: "Chatuchak", cost: 20, icon: ShoppingBag },
        { time: "12:00 PM", title: "Market Food Sampling", location: "Chatuchak", cost: 6, icon: Utensils },
        { time: "3:00 PM", title: "Jim Thompson House", location: "Wang Mai", cost: 7, icon: Palette },
        { time: "6:00 PM", title: "Dinner at Siam Square", location: "Pathum Wan", cost: 12, icon: Utensils },
      ],
      tip: "Chatuchak Market is huge (15,000+ stalls) - arrive early, wear comfortable shoes, and bring water."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "7:00 AM", title: "Day Trip to Ayutthaya", location: "Ayutthaya", cost: 25, icon: Mountain },
        { time: "12:00 PM", title: "Riverside Lunch", location: "Ayutthaya", cost: 10, icon: Utensils },
        { time: "3:00 PM", title: "Ancient Temples Tour", location: "Ayutthaya Historical Park", cost: 8, icon: Landmark },
        { time: "7:00 PM", title: "Return to Bangkok", location: "Phaya Thai", cost: 0, icon: Building2 },
      ],
      tip: "Rent a bicycle or tuk-tuk in Ayutthaya to explore the temple ruins. It's hot - start early!"
    },
    {
      dayNumber: 5,
      activities: [
        { time: "9:00 AM", title: "Floating Market Visit", location: "Damnoen Saduak", cost: 30, icon: Waves },
        { time: "12:00 PM", title: "Boat Noodles Lunch", location: "Ratchada", cost: 5, icon: Utensils },
        { time: "3:00 PM", title: "MBK Shopping Center", location: "Pathum Wan", cost: 25, icon: ShoppingBag },
        { time: "7:00 PM", title: "Sky Bar Experience", location: "Silom", cost: 15, icon: Building2 },
      ],
      tip: "Floating markets are touristy but worth it. Go early (7-9 AM) before it gets too crowded and hot."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "10:00 AM", title: "Lumpini Park Jog", location: "Lumpini", cost: 0, icon: TreePine },
        { time: "12:00 PM", title: "Thai Cooking Class", location: "Silom", cost: 35, icon: Utensils },
        { time: "4:00 PM", title: "Asiatique Night Market", location: "Bang Kho Laem", cost: 20, icon: ShoppingBag },
        { time: "7:00 PM", title: "Riverside Dinner", location: "Asiatique", cost: 18, icon: Utensils },
      ],
      tip: "Thai cooking classes are affordable and fun. You'll learn to make 4-6 dishes you can recreate at home."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Last-minute Shopping", location: "Siam Paragon", cost: 30, icon: ShoppingBag },
        { time: "1:00 PM", title: "Farewell Lunch", location: "CentralWorld", cost: 15, icon: Utensils },
        { time: "3:00 PM", title: "Traditional Thai Massage", location: "Sukhumvit", cost: 20, icon: Heart },
        { time: "6:00 PM", title: "Final Pad Thai", location: "Thong Lor", cost: 8, icon: Utensils },
      ],
      tip: "Get a traditional Thai massage before you leave - it's affordable and a perfect way to relax before your flight."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateSingaporeItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Gardens by the Bay", location: "Marina Bay", cost: 28, icon: TreePine },
        { time: "12:00 PM", title: "Hawker Center Lunch", location: "Maxwell Food Centre", cost: 8, icon: Utensils },
        { time: "2:30 PM", title: "Marina Bay Sands SkyPark", location: "Marina Bay", cost: 26, icon: Building2 },
        { time: "6:00 PM", title: "Evening at Clarke Quay", location: "Clarke Quay", cost: 25, icon: Utensils },
      ],
      tip: "Download the MyTransport app for real-time public transport directions. Singapore's system is incredibly efficient."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "9:00 AM", title: "Chinatown Exploration", location: "Chinatown", cost: 0, icon: Camera },
        { time: "11:00 AM", title: "Buddha Tooth Relic Temple", location: "Chinatown", cost: 0, icon: Landmark },
        { time: "1:00 PM", title: "Lunch at Chinatown Complex", location: "Chinatown", cost: 6, icon: Utensils },
        { time: "4:00 PM", title: "Little India Visit", location: "Little India", cost: 10, icon: ShoppingBag },
      ],
      tip: "Hawker centers offer incredible food at low prices. Don't miss chicken rice, laksa, and satay!"
    },
    {
      dayNumber: 4,
      activities: [
        { time: "9:00 AM", title: "Sentosa Island Day Trip", location: "Sentosa", cost: 45, icon: Waves },
        { time: "12:00 PM", title: "Beach Club Lunch", location: "Siloso Beach", cost: 22, icon: Utensils },
        { time: "3:00 PM", title: "S.E.A. Aquarium", location: "Resorts World", cost: 34, icon: Waves },
        { time: "7:00 PM", title: "Wings of Time Show", location: "Sentosa", cost: 18, icon: Music },
      ],
      tip: "Buy a Sentosa Fun Pass for better value if visiting multiple attractions. The island has great beaches!"
    },
    {
      dayNumber: 5,
      activities: [
        { time: "10:00 AM", title: "Singapore Zoo", location: "Mandai", cost: 39, icon: TreePine },
        { time: "1:00 PM", title: "Zoo Lunch", location: "Mandai", cost: 15, icon: Utensils },
        { time: "3:00 PM", title: "Orchard Road Shopping", location: "Orchard", cost: 40, icon: ShoppingBag },
        { time: "6:30 PM", title: "Dinner at ION Sky", location: "Orchard", cost: 30, icon: Building2 },
      ],
      tip: "Singapore Zoo is world-class with open habitats. Go early to beat the heat and see animals most active."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "9:00 AM", title: "Arab Street & Haji Lane", location: "Kampong Glam", cost: 15, icon: Camera },
        { time: "12:00 PM", title: "Malay Cuisine Lunch", location: "Kampong Glam", cost: 12, icon: Utensils },
        { time: "3:00 PM", title: "National Gallery Singapore", location: "City Hall", cost: 20, icon: Palette },
        { time: "7:00 PM", title: "Supertree Light Show", location: "Gardens by the Bay", cost: 0, icon: Music },
      ],
      tip: "The Supertree Grove light show at Gardens by the Bay is free and runs twice nightly. Magical experience!"
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Final Shopping", location: "VivoCity", cost: 35, icon: ShoppingBag },
        { time: "1:00 PM", title: "Laksa Lunch", location: "Katong", cost: 10, icon: Utensils },
        { time: "3:00 PM", title: "Singapore Flyer Ride", location: "Marina Bay", cost: 33, icon: Building2 },
        { time: "6:00 PM", title: "Farewell Dinner", location: "Boat Quay", cost: 40, icon: Heart },
      ],
      tip: "Bring home bak kwa (BBQ pork), kaya (coconut jam), and local tea as souvenirs from Singapore."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateGenericItinerary = (days: number, destination: string): DayItinerary[] => {
  const genericDays: DayItinerary[] = [
    {
      dayNumber: 2,
      activities: [
        { time: "9:00 AM", title: "Historical Landmark Visit", location: "City Center", cost: 20, icon: Landmark },
        { time: "12:00 PM", title: "Local Cuisine Lunch", location: "Popular District", cost: 15, icon: Utensils },
        { time: "2:30 PM", title: "Museum or Gallery Tour", location: "Cultural Quarter", cost: 12, icon: Palette },
        { time: "6:00 PM", title: "Dinner at Local Restaurant", location: "Downtown", cost: 25, icon: Utensils },
      ],
      tip: "Research local customs and basic phrases in the local language. A little effort goes a long way with locals."
    },
    {
      dayNumber: 3,
      activities: [
        { time: "8:30 AM", title: "Morning Market Visit", location: "Central Market", cost: 10, icon: ShoppingBag },
        { time: "11:00 AM", title: "Religious or Cultural Site", location: "Historic District", cost: 5, icon: Landmark },
        { time: "1:00 PM", title: "Street Food Sampling", location: "Food Street", cost: 12, icon: Utensils },
        { time: "4:00 PM", title: "Walking Tour", location: "Old Town", cost: 15, icon: Camera },
      ],
      tip: "Join free walking tours to meet other solo travelers and learn hidden gems from local guides."
    },
    {
      dayNumber: 4,
      activities: [
        { time: "7:00 AM", title: "Day Trip Adventure", location: `Near ${destination}`, cost: 35, icon: Mountain },
        { time: "12:00 PM", title: "Lunch at Day Trip Location", location: "Countryside", cost: 18, icon: Utensils },
        { time: "3:00 PM", title: "Natural Attraction Visit", location: "Scenic Area", cost: 10, icon: TreePine },
        { time: "7:00 PM", title: "Return to City", location: "City Center", cost: 0, icon: Building2 },
      ],
      tip: "Book day trips through your hotel or hostel. They often have better local knowledge and competitive prices."
    },
    {
      dayNumber: 5,
      activities: [
        { time: "9:30 AM", title: "Shopping District Exploration", location: "Main Shopping Area", cost: 25, icon: ShoppingBag },
        { time: "12:30 PM", title: "Café Lunch Break", location: "Trendy Neighborhood", cost: 14, icon: Coffee },
        { time: "3:00 PM", title: "Viewpoint or Observation Deck", location: "Tallest Building", cost: 20, icon: Building2 },
        { time: "6:00 PM", title: "Evening Entertainment", location: "Entertainment District", cost: 30, icon: Music },
      ],
      tip: "Visit viewpoints at sunset for the best photos. The city looks magical when lights start coming on."
    },
    {
      dayNumber: 6,
      activities: [
        { time: "10:00 AM", title: "Neighborhood Exploration", location: "Local District", cost: 0, icon: Camera },
        { time: "1:00 PM", title: "Traditional Meal Experience", location: "Local Restaurant", cost: 22, icon: Utensils },
        { time: "3:30 PM", title: "Park or Garden Visit", location: "City Park", cost: 5, icon: TreePine },
        { time: "6:30 PM", title: "Waterfront Evening", location: "Harbor/River Area", cost: 20, icon: Waves },
      ],
      tip: "Explore residential neighborhoods to see authentic daily life. Some of the best food is away from tourist areas."
    },
    {
      dayNumber: 7,
      activities: [
        { time: "10:00 AM", title: "Souvenir Shopping", location: "Gift Shops", cost: 35, icon: ShoppingBag },
        { time: "1:00 PM", title: "Final Local Meal", location: "Favorite Spot", cost: 20, icon: Utensils },
        { time: "3:00 PM", title: "Last Sightseeing Stop", location: "Must-See Spot", cost: 15, icon: Camera },
        { time: "6:00 PM", title: "Farewell Dinner", location: "Special Restaurant", cost: 40, icon: Heart },
      ],
      tip: "Pack light souvenirs and leave room in your bag. Take lots of photos but also remember to be present in the moment."
    }
  ];

  return genericDays.slice(0, days - 1);
};
