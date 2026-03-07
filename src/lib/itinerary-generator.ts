export interface Activity {
  time: string;
  title: string;
  location: string;
  cost: number;
  costCurrency: string;
  emoji: string;
}

export interface DayItinerary {
  dayNumber: number;
  vibeKeyword: string;
  neighborhood: string;
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
      vibeKeyword: "Heritage",
      neighborhood: "Asakusa & Akihabara",
      activities: [
        { time: "9:00 AM", title: "Senso-ji Temple Morning", location: "Nakamise-dori, Asakusa", cost: 0, costCurrency: "¥", emoji: "⛩️" },
        { time: "11:30 AM", title: "Tempura at Daikokuya", location: "Asakusa 1-chome", cost: 1800, costCurrency: "¥", emoji: "🍤" },
        { time: "2:00 PM", title: "Electric Town Gaming Arcades", location: "Chuo-dori, Akihabara", cost: 2000, costCurrency: "¥", emoji: "🎮" },
        { time: "6:00 PM", title: "Izakaya Hopping in Yurakucho", location: "Yurakucho Gado-shita", cost: 3500, costCurrency: "¥", emoji: "🍶" },
      ],
      tip: "Asakusa is best before 10 AM when tour buses arrive. Take the Ginza Line directly to Akihabara - it's only 10 minutes."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Culinary",
      neighborhood: "Tsukiji & Ginza",
      activities: [
        { time: "7:00 AM", title: "Tsukiji Outer Market Breakfast", location: "Tsukiji 4-chome", cost: 2500, costCurrency: "¥", emoji: "🍣" },
        { time: "10:00 AM", title: "Imperial Palace East Gardens", location: "Kokyo Higashi Gyoen", cost: 0, costCurrency: "¥", emoji: "🏯" },
        { time: "1:00 PM", title: "Depachika Food Hall Lunch", location: "Mitsukoshi Ginza B2F", cost: 2200, costCurrency: "¥", emoji: "🍱" },
        { time: "4:00 PM", title: "TeamLab Planets Immersive Art", location: "Toyosu", cost: 3800, costCurrency: "¥", emoji: "🎨" },
      ],
      tip: "Depachika (department store basements) offer incredible prepared foods. Buy obento for a picnic or try samples while browsing."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Nature",
      neighborhood: "Mount Fuji & Kawaguchiko",
      activities: [
        { time: "6:30 AM", title: "Highway Bus to Kawaguchiko", location: "Shinjuku Bus Terminal", cost: 2000, costCurrency: "¥", emoji: "🚌" },
        { time: "10:00 AM", title: "Chureito Pagoda Photo Spot", location: "Arakurayama Sengen Park", cost: 0, costCurrency: "¥", emoji: "🗻" },
        { time: "1:00 PM", title: "Hoto Noodles at Kosaku", location: "Kawaguchiko Station Area", cost: 1400, costCurrency: "¥", emoji: "🍜" },
        { time: "3:30 PM", title: "Lake Kawaguchiko Cruise", location: "Kawaguchiko Pier", cost: 1000, costCurrency: "¥", emoji: "⛵" },
      ],
      tip: "Book your bus tickets online 1 month in advance through Fujikyu. Weather is unpredictable - check forecasts and have a backup plan."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Youth Culture",
      neighborhood: "Harajuku & Shibuya",
      activities: [
        { time: "9:00 AM", title: "Meiji Jingu Shrine Walk", location: "Yoyogi Park Entrance", cost: 0, costCurrency: "¥", emoji: "⛩️" },
        { time: "11:00 AM", title: "Takeshita-dori Street Snacks", location: "Harajuku Takeshita Street", cost: 1500, costCurrency: "¥", emoji: "🍦" },
        { time: "2:00 PM", title: "Cat Street Vintage Shopping", location: "Cat Street, Ura-Harajuku", cost: 4000, costCurrency: "¥", emoji: "👘" },
        { time: "6:30 PM", title: "Shibuya Sky Observatory Sunset", location: "Shibuya Scramble Square", cost: 2000, costCurrency: "¥", emoji: "🌆" },
      ],
      tip: "Visit on Sunday to see cosplayers in Yoyogi Park. Cat Street has better shopping than Takeshita-dori with fewer crowds."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Nightlife",
      neighborhood: "Shinjuku & Golden Gai",
      activities: [
        { time: "10:00 AM", title: "Shinjuku Gyoen National Garden", location: "Shinjuku Gyoen", cost: 500, costCurrency: "¥", emoji: "🌸" },
        { time: "1:00 PM", title: "Tonkatsu at Maisen", location: "Omotesando", cost: 1800, costCurrency: "¥", emoji: "🥩" },
        { time: "3:00 PM", title: "Tokyo Metropolitan Building", location: "Nishi-Shinjuku", cost: 0, costCurrency: "¥", emoji: "🏢" },
        { time: "8:00 PM", title: "Golden Gai Bar Hopping", location: "Kabukicho 1-chome", cost: 3000, costCurrency: "¥", emoji: "🍺" },
      ],
      tip: "Golden Gai bars charge a cover (usually ¥500-1000). Choose bars with English signs if nervous. Omoide Yokocho nearby has great yakitori stalls."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Roppongi & Tokyo Station",
      activities: [
        { time: "10:00 AM", title: "Mori Art Museum", location: "Roppongi Hills", cost: 1800, costCurrency: "¥", emoji: "🎨" },
        { time: "1:00 PM", title: "Final Sushi at Sushi Zanmai", location: "Roppongi Crossing", cost: 4000, costCurrency: "¥", emoji: "🍣" },
        { time: "3:30 PM", title: "Tokyo Station Souvenir Shopping", location: "Tokyo Station Gransta", cost: 5000, costCurrency: "¥", emoji: "🎁" },
        { time: "6:00 PM", title: "Yakitori Under the Tracks", location: "Yurakucho Gado-shita", cost: 2500, costCurrency: "¥", emoji: "🍢" },
      ],
      tip: "Tokyo Station Gransta (basement) has the best souvenirs: Tokyo Banana, Shiroi Koibito, and regional sake. Perfect for last-minute gifts."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateLondonItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Royal",
      neighborhood: "Tower & Borough",
      activities: [
        { time: "9:00 AM", title: "Tower of London Crown Jewels", location: "Tower Hill, EC3", cost: 35, costCurrency: "£", emoji: "👑" },
        { time: "12:30 PM", title: "Borough Market Street Food", location: "Southwark, SE1", cost: 18, costCurrency: "£", emoji: "🥧" },
        { time: "2:30 PM", title: "Tower Bridge Glass Floor Walk", location: "Tower Bridge Road", cost: 12, costCurrency: "£", emoji: "🌉" },
        { time: "6:00 PM", title: "Historic Pub at The George Inn", location: "Borough High Street", cost: 25, costCurrency: "£", emoji: "🍺" },
      ],
      tip: "Book Tower of London tickets online for Beefeater tour at 10 AM. Borough Market is best Thursday-Saturday."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Culture",
      neighborhood: "Bloomsbury & Soho",
      activities: [
        { time: "10:00 AM", title: "British Museum Rosetta Stone", location: "Great Russell Street, WC1", cost: 0, costCurrency: "£", emoji: "🏛️" },
        { time: "1:00 PM", title: "Dishoom Bombay Brunch", location: "Covent Garden, WC2", cost: 22, costCurrency: "£", emoji: "🍛" },
        { time: "3:00 PM", title: "Changing of the Guard", location: "Buckingham Palace, SW1", cost: 0, costCurrency: "£", emoji: "💂" },
        { time: "7:30 PM", title: "West End Theatre Show", location: "Leicester Square, WC2", cost: 45, costCurrency: "£", emoji: "🎭" },
      ],
      tip: "British Museum is free but book a timed slot online. TodayTix app has £20-30 West End tickets released daily at 10 AM."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Heritage",
      neighborhood: "Westminster & Kensington",
      activities: [
        { time: "9:00 AM", title: "Westminster Abbey Poets' Corner", location: "Parliament Square, SW1", cost: 27, costCurrency: "£", emoji: "⛪" },
        { time: "11:30 AM", title: "Houses of Parliament Exterior", location: "Westminster Bridge", cost: 0, costCurrency: "£", emoji: "🏛️" },
        { time: "2:00 PM", title: "Afternoon Tea at Biscuiteers", location: "Notting Hill, W11", cost: 35, costCurrency: "£", emoji: "☕" },
        { time: "4:30 PM", title: "Kensington Gardens Serpentine", location: "Hyde Park, W2", cost: 0, costCurrency: "£", emoji: "🦢" },
      ],
      tip: "Skip overpriced hotel tea and try Biscuiteers for Instagram-worthy cookies. Hyde Park is massive - rent a Boris bike to explore."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Alternative",
      neighborhood: "Camden & Kings Cross",
      activities: [
        { time: "10:00 AM", title: "Camden Lock Market Vintage Finds", location: "Camden Lock Place, NW1", cost: 20, costCurrency: "£", emoji: "🎸" },
        { time: "1:00 PM", title: "Street Food at Camden Market", location: "Buck Street Market, NW1", cost: 12, costCurrency: "£", emoji: "🌮" },
        { time: "3:00 PM", title: "Regent's Canal Towpath Walk", location: "Camden to Kings Cross", cost: 0, costCurrency: "£", emoji: "🚶" },
        { time: "6:00 PM", title: "Coal Drops Yard Modern British", location: "Granary Square, N1C", cost: 30, costCurrency: "£", emoji: "🍽️" },
      ],
      tip: "Camden is best on weekends but incredibly crowded. Walk the canal to Kings Cross for a peaceful contrast to market chaos."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Panoramic",
      neighborhood: "Notting Hill & City",
      activities: [
        { time: "9:30 AM", title: "Portobello Road Antiques", location: "Notting Hill, W11", cost: 25, costCurrency: "£", emoji: "🎨" },
        { time: "12:00 PM", title: "Brunch at Granger & Co", location: "Westbourne Grove, W11", cost: 18, costCurrency: "£", emoji: "🥑" },
        { time: "3:00 PM", title: "Sky Garden Free Observatory", location: "20 Fenchurch Street, EC3", cost: 0, costCurrency: "£", emoji: "🌆" },
        { time: "7:00 PM", title: "Thames River Evening Cruise", location: "Westminster Pier, SW1", cost: 25, costCurrency: "£", emoji: "🛳️" },
      ],
      tip: "Sky Garden is free but requires advance booking. Book exactly 3 weeks ahead when slots open. Sunset time is most popular."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Shoreditch & South Bank",
      activities: [
        { time: "10:00 AM", title: "Brick Lane Sunday Market", location: "Brick Lane, E1", cost: 15, costCurrency: "£", emoji: "🎨" },
        { time: "1:00 PM", title: "Beigel Bake 24hr Bakery", location: "Brick Lane, E1", cost: 5, costCurrency: "£", emoji: "🥯" },
        { time: "3:00 PM", title: "Tate Modern Free Galleries", location: "Bankside, SE1", cost: 0, costCurrency: "£", emoji: "🖼️" },
        { time: "6:30 PM", title: "Farewell Rooftop Dinner", location: "OXO Tower, SE1", cost: 45, costCurrency: "£", emoji: "🌃" },
      ],
      tip: "Brick Lane is Sunday-only for the full experience. Beigel Bake's salt beef beigel is legendary and only £5."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateParisItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Iconic",
      neighborhood: "Tour Eiffel & Trocadéro",
      activities: [
        { time: "8:30 AM", title: "Tour Eiffel Summit Ascent", location: "Champ de Mars, 7e", cost: 28, costCurrency: "€", emoji: "🗼" },
        { time: "11:30 AM", title: "Café Crème at Café de l'Homme", location: "Place du Trocadéro, 16e", cost: 18, costCurrency: "€", emoji: "☕" },
        { time: "2:00 PM", title: "Bateaux Mouches Seine Cruise", location: "Pont de l'Alma, 8e", cost: 15, costCurrency: "€", emoji: "🚢" },
        { time: "7:00 PM", title: "Bistrot Paul Bert Classic", location: "Rue Paul Bert, 11e", cost: 35, costCurrency: "€", emoji: "🥩" },
      ],
      tip: "Book Eiffel Tower tickets 60 days in advance online. Summit sells out instantly. Visit at opening (8:30 AM) to avoid lines."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Artistic",
      neighborhood: "Louvre & Jardin des Tuileries",
      activities: [
        { time: "9:00 AM", title: "Musée du Louvre Mona Lisa", location: "Rue de Rivoli, 1er", cost: 22, costCurrency: "€", emoji: "🎨" },
        { time: "1:00 PM", title: "Jardin des Tuileries Picnic", location: "Place de la Concorde, 1er", cost: 15, costCurrency: "€", emoji: "🧺" },
        { time: "3:30 PM", title: "Champs-Élysées to Arc de Triomphe", location: "Avenue des Champs-Élysées, 8e", cost: 13, costCurrency: "€", emoji: "🏛️" },
        { time: "6:30 PM", title: "Wine Bar at Juveniles", location: "Rue de Richelieu, 1er", cost: 25, costCurrency: "€", emoji: "🍷" },
      ],
      tip: "Buy picnic supplies at Monoprix: baguette, cheese, wine, fruit. Sit by the fountain in Tuileries for peak Parisian vibes."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Bohemian",
      neighborhood: "Montmartre & Pigalle",
      activities: [
        { time: "8:00 AM", title: "Sacré-Cœur Sunrise Views", location: "Parvis du Sacré-Cœur, 18e", cost: 0, costCurrency: "€", emoji: "⛪" },
        { time: "10:30 AM", title: "Place du Tertre Artist Square", location: "Montmartre, 18e", cost: 0, costCurrency: "€", emoji: "🎨" },
        { time: "1:00 PM", title: "Le Consulat Croque Monsieur", location: "Rue Norvins, 18e", cost: 22, costCurrency: "€", emoji: "🥪" },
        { time: "3:00 PM", title: "Musée d'Orsay Impressionists", location: "Quai d'Orsay, 7e", cost: 16, costCurrency: "€", emoji: "🖼️" },
      ],
      tip: "Montmartre is touristy but magical early morning. Skip artist portraits - they're overpriced. Find the I Love You Wall for free."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Grandeur",
      neighborhood: "Château de Versailles",
      activities: [
        { time: "8:00 AM", title: "RER C Train to Versailles", location: "Gare d'Austerlitz, 13e", cost: 7, costCurrency: "€", emoji: "🚂" },
        { time: "9:30 AM", title: "Hall of Mirrors Palace Tour", location: "Place d'Armes, Versailles", cost: 20, costCurrency: "€", emoji: "👑" },
        { time: "12:30 PM", title: "La Flottille Canalside Lunch", location: "Versailles Gardens", cost: 25, costCurrency: "€", emoji: "🍽️" },
        { time: "3:00 PM", title: "Marie Antoinette's Hamlet", location: "Versailles Estate", cost: 0, costCurrency: "€", emoji: "🏡" },
      ],
      tip: "Arrive at 9 AM opening time. Palace takes 2 hours, gardens need 3+ hours. Rent golf cart or bike to cover the massive grounds."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Trendy",
      neighborhood: "Le Marais & Île de la Cité",
      activities: [
        { time: "10:00 AM", title: "Le Marais Vintage Boutiques", location: "Rue des Francs-Bourgeois, 3e", cost: 30, costCurrency: "€", emoji: "👗" },
        { time: "1:00 PM", title: "L'As du Fallafel Lunch Queue", location: "Rue des Rosiers, 4e", cost: 10, costCurrency: "€", emoji: "🥙" },
        { time: "3:00 PM", title: "Notre-Dame Cathedral Exterior", location: "Parvis Notre-Dame, 4e", cost: 0, costCurrency: "€", emoji: "⛪" },
        { time: "7:00 PM", title: "Latin Quarter Jazz at Caveau", location: "Rue de la Huchette, 5e", cost: 25, costCurrency: "€", emoji: "🎷" },
      ],
      tip: "L'As du Fallafel line moves fast - worth the 20-minute wait. Free Concept Store (rue de Sévigné) has cool Parisian design souvenirs."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Saint-Germain & Eiffel",
      activities: [
        { time: "10:00 AM", title: "Café de Flore Philosophers' Table", location: "Boulevard Saint-Germain, 6e", cost: 12, costCurrency: "€", emoji: "☕" },
        { time: "12:00 PM", title: "Bon Marché Gourmet Shopping", location: "Rue de Sèvres, 7e", cost: 40, costCurrency: "€", emoji: "🛍️" },
        { time: "3:00 PM", title: "Jardin du Luxembourg Farewell", location: "6e arrondissement", cost: 0, costCurrency: "€", emoji: "🌳" },
        { time: "8:00 PM", title: "Eiffel Tower Sparkling Show", location: "Champ de Mars, 7e", cost: 0, costCurrency: "€", emoji: "✨" },
      ],
      tip: "Eiffel Tower sparkles for 5 minutes every hour after sunset. Best viewing from Trocadéro or Champ de Mars lawn with wine."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateNewYorkItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Midtown",
      neighborhood: "Central Park & Upper West Side",
      activities: [
        { time: "8:00 AM", title: "Central Park Bow Bridge Sunrise", location: "Mid-Park at 74th Street", cost: 0, costCurrency: "$", emoji: "🌳" },
        { time: "11:00 AM", title: "Levain Bakery Cookie", location: "Amsterdam Ave & 74th", cost: 6, costCurrency: "$", emoji: "🍪" },
        { time: "1:00 PM", title: "Metropolitan Museum Met Collection", location: "Fifth Avenue at 82nd", cost: 30, costCurrency: "$", emoji: "🏛️" },
        { time: "6:00 PM", title: "Times Square Neon Night Walk", location: "Broadway & 42nd Street", cost: 0, costCurrency: "$", emoji: "🌃" },
      ],
      tip: "Get a 7-day unlimited MetroCard ($34) if staying longer. Way cheaper than individual rides and includes buses."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Liberty",
      neighborhood: "Lower Manhattan & Brooklyn",
      activities: [
        { time: "8:30 AM", title: "Statue of Liberty Crown Reserve", location: "Liberty Island Ferry", cost: 24, costCurrency: "$", emoji: "🗽" },
        { time: "1:00 PM", title: "Stone Street Oysters & Beer", location: "Financial District, FiDi", cost: 35, costCurrency: "$", emoji: "🦪" },
        { time: "3:30 PM", title: "Brooklyn Bridge Pedestrian Walk", location: "City Hall Park entrance", cost: 0, costCurrency: "$", emoji: "🌉" },
        { time: "6:00 PM", title: "Grimaldi's Coal Oven Pizza", location: "Front Street, DUMBO", cost: 25, costCurrency: "$", emoji: "🍕" },
      ],
      tip: "Book Statue Crown tickets 3 months ahead. They sell out instantly. Pedestal access is easier to get and still amazing views."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Memorial",
      neighborhood: "Financial District & Chelsea",
      activities: [
        { time: "9:00 AM", title: "9/11 Memorial Reflecting Pools", location: "World Trade Center, FiDi", cost: 0, costCurrency: "$", emoji: "🕊️" },
        { time: "11:00 AM", title: "Oculus Shopping Architecture", location: "WTC Transportation Hub", cost: 0, costCurrency: "$", emoji: "🏗️" },
        { time: "1:00 PM", title: "Chelsea Market Lobster Roll", location: "9th Avenue & 15th Street", cost: 28, costCurrency: "$", emoji: "🦞" },
        { time: "3:00 PM", title: "High Line Elevated Park Walk", location: "Gansevoort to 34th Street", cost: 0, costCurrency: "$", emoji: "🌿" },
      ],
      tip: "High Line is beautiful but crowded midday. Go early morning or sunset golden hour. Exit at 16th Street for good cafes."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Broadway",
      neighborhood: "Midtown & Theater District",
      activities: [
        { time: "9:00 AM", title: "Empire State 86th Floor Observatory", location: "Fifth Avenue & 34th Street", cost: 44, costCurrency: "$", emoji: "🏙️" },
        { time: "12:00 PM", title: "Bryant Park Le Panier Picnic", location: "42nd Street & 6th Avenue", cost: 18, costCurrency: "$", emoji: "🥖" },
        { time: "2:00 PM", title: "MoMA Modern Art Starry Night", location: "53rd Street & 5th Avenue", cost: 25, costCurrency: "$", emoji: "🎨" },
        { time: "7:30 PM", title: "Broadway Show Orchestra Seats", location: "Theater District, 40s", cost: 80, costCurrency: "$", emoji: "🎭" },
      ],
      tip: "TodayTix app releases rush tickets at 10 AM daily. TKTS booth in Times Square offers 20-50% off same-day shows."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Downtown",
      neighborhood: "SoHo & Lower East Side",
      activities: [
        { time: "10:00 AM", title: "SoHo Cast Iron Architecture Walk", location: "Greene Street Historic District", cost: 0, costCurrency: "$", emoji: "🏛️" },
        { time: "1:00 PM", title: "Prince Street Pizza Pepperoni Square", location: "Prince & Mott, Nolita", cost: 6, costCurrency: "$", emoji: "🍕" },
        { time: "3:00 PM", title: "Tenement Museum Immigration Stories", location: "Orchard Street, LES", cost: 30, costCurrency: "$", emoji: "🏠" },
        { time: "7:00 PM", title: "Katz's Delicatessen Pastrami", location: "Houston & Ludlow, LES", cost: 25, costCurrency: "$", emoji: "🥪" },
      ],
      tip: "SoHo shopping is expensive but window browsing is free. McNally Jackson bookstore (Prince St) is perfect for rainy afternoon."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Rockefeller & Grand Central",
      activities: [
        { time: "10:00 AM", title: "Grand Central Whispering Gallery", location: "42nd Street & Park Avenue", cost: 0, costCurrency: "$", emoji: "🚂" },
        { time: "12:00 PM", title: "Grand Central Oyster Bar", location: "Lower Level, Grand Central", cost: 35, costCurrency: "$", emoji: "🦪" },
        { time: "2:00 PM", title: "Top of the Rock Observation Deck", location: "Rockefeller Center, 50th St", cost: 40, costCurrency: "$", emoji: "🌆" },
        { time: "7:00 PM", title: "Farewell Rooftop at 230 Fifth", location: "Fifth Avenue & 27th Street", cost: 20, costCurrency: "$", emoji: "🍸" },
      ],
      tip: "Top of the Rock has better Empire State views than Empire State itself. Sunset time slots book out - reserve 2 weeks ahead."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateBangkokItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Royal",
      neighborhood: "Rattanakosin Island",
      activities: [
        { time: "8:00 AM", title: "Grand Palace Emerald Buddha", location: "Na Phra Lan Road, Phra Nakhon", cost: 500, costCurrency: "฿", emoji: "👑" },
        { time: "11:00 AM", title: "Wat Pho Reclining Buddha", location: "Chetuphon Road, Phra Nakhon", cost: 200, costCurrency: "฿", emoji: "🛕" },
        { time: "1:00 PM", title: "Tha Tien Boat Noodles", location: "Maharat Road Pier", cost: 80, costCurrency: "฿", emoji: "🍜" },
        { time: "4:00 PM", title: "Chao Phraya River Express Boat", location: "Tha Maharaj Pier", cost: 50, costCurrency: "฿", emoji: "🚤" },
      ],
      tip: "Grand Palace dress code is strict: covered shoulders and knees. They sell wraps at entrance but bring your own to save money."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Shopping",
      neighborhood: "Chatuchak & Ari",
      activities: [
        { time: "9:00 AM", title: "Chatuchak Weekend Market Maze", location: "Kamphaeng Phet 2 Road", cost: 500, costCurrency: "฿", emoji: "🛍️" },
        { time: "12:00 PM", title: "Market Mango Sticky Rice", location: "Chatuchak Section 26", cost: 80, costCurrency: "฿", emoji: "🥭" },
        { time: "3:00 PM", title: "Or Tor Kor Fresh Market", location: "Chatuchak Weekend Market", cost: 200, costCurrency: "฿", emoji: "🍊" },
        { time: "6:00 PM", title: "Ari Hipster Cafes & Dinner", location: "Phahonyothin Soi Ari", cost: 350, costCurrency: "฿", emoji: "☕" },
      ],
      tip: "Chatuchak has 15,000 stalls. Arrive at opening (9 AM) before heat becomes unbearable. Bring water, cash, and bargaining skills."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Ancient",
      neighborhood: "Ayutthaya Historical Park",
      activities: [
        { time: "7:00 AM", title: "Minivan to Ayutthaya", location: "Victory Monument Departure", cost: 120, costCurrency: "฿", emoji: "🚐" },
        { time: "10:00 AM", title: "Wat Mahathat Buddha in Tree", location: "Ayutthaya Historical Park", cost: 50, costCurrency: "฿", emoji: "🌳" },
        { time: "1:00 PM", title: "Riverside Grilled River Prawns", location: "Malakor Jetty Restaurant", cost: 250, costCurrency: "฿", emoji: "🦐" },
        { time: "3:00 PM", title: "Wat Chaiwatthanaram Sunset", location: "U Thong Road, Ayutthaya", cost: 50, costCurrency: "฿", emoji: "🛕" },
      ],
      tip: "Rent bicycles at Ayutthaya train station (50฿/day) to explore temple ruins. Start early - it's incredibly hot by midday."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Floating",
      neighborhood: "Damnoen Saduak & Ratchada",
      activities: [
        { time: "6:00 AM", title: "Floating Market Boat Tour", location: "Damnoen Saduak, Ratchaburi", cost: 1000, costCurrency: "฿", emoji: "🚣" },
        { time: "10:00 AM", title: "Coconut Sugar Farm Visit", location: "Damnoen Saduak District", cost: 100, costCurrency: "฿", emoji: "🥥" },
        { time: "2:00 PM", title: "Talad Rot Fai Train Market", location: "Ratchadaphisek Soi 4", cost: 300, costCurrency: "฿", emoji: "🚂" },
        { time: "7:00 PM", title: "Sky Bar at Lebua State Tower", location: "Silom, Bang Rak", cost: 500, costCurrency: "฿", emoji: "🍹" },
      ],
      tip: "Floating markets are touristy but worth it once. Tours leave Bangkok at 6 AM - book through hostel for better prices than street touts."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Culinary",
      neighborhood: "Thonglor & Ekkamai",
      activities: [
        { time: "10:00 AM", title: "Thai Cooking Class at Silom", location: "Silom Thai Cooking School", cost: 1200, costCurrency: "฿", emoji: "👨‍🍳" },
        { time: "2:00 PM", title: "EmQuartier Mall Window Shopping", location: "Sukhumvit Road, Khlong Toei", cost: 0, costCurrency: "฿", emoji: "🏬" },
        { time: "5:00 PM", title: "Benjakitti Park Jogging Track", location: "Ratchadaphisek Road", cost: 0, costCurrency: "฿", emoji: "🏃" },
        { time: "7:00 PM", title: "Thonglor Soi 13 Bar Hopping", location: "Sukhumvit Soi 55", cost: 600, costCurrency: "฿", emoji: "🍺" },
      ],
      tip: "Thai cooking classes teach 4-6 dishes you can replicate. Market tour included. Book in advance - popular classes fill up fast."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Asiatique & Riverside",
      activities: [
        { time: "11:00 AM", title: "Wat Arun White Temple Climb", location: "Arun Amarin Road, Bangkok Yai", cost: 100, costCurrency: "฿", emoji: "⛪" },
        { time: "1:00 PM", title: "Supanniga Eating Room", location: "Thonglor Soi 8", cost: 400, costCurrency: "฿", emoji: "🍽️" },
        { time: "4:00 PM", title: "Traditional Thai Massage", location: "Wat Pho Massage School", cost: 420, costCurrency: "฿", emoji: "💆" },
        { time: "7:00 PM", title: "Asiatique Night Market Ferris Wheel", location: "Charoen Krung Road", cost: 300, costCurrency: "฿", emoji: "🎡" },
      ],
      tip: "Wat Pho massage school offers authentic Thai massage at half the price of spas. Book last slot (4 PM) to relax before flight."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateSingaporeItinerary = (days: number): DayItinerary[] => {
  const baseItinerary: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Futuristic",
      neighborhood: "Marina Bay & Gardens",
      activities: [
        { time: "9:00 AM", title: "Gardens by the Bay Cloud Forest", location: "18 Marina Gardens Drive", cost: 28, costCurrency: "S$", emoji: "🌿" },
        { time: "12:00 PM", title: "Maxwell Food Centre Hainanese Chicken", location: "1 Kadayanallur Street", cost: 6, costCurrency: "S$", emoji: "🍗" },
        { time: "2:00 PM", title: "Marina Bay Sands SkyPark", location: "10 Bayfront Avenue", cost: 26, costCurrency: "S$", emoji: "🏙️" },
        { time: "7:00 PM", title: "Supertree Grove Light Show", location: "Gardens by the Bay", cost: 0, costCurrency: "S$", emoji: "🌳" },
      ],
      tip: "Download MyTransport.SG app for real-time MRT directions. Singapore's public transport is world-class efficient."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Heritage",
      neighborhood: "Chinatown & Little India",
      activities: [
        { time: "9:00 AM", title: "Buddha Tooth Relic Temple", location: "288 South Bridge Road", cost: 0, costCurrency: "S$", emoji: "🛕" },
        { time: "11:00 AM", title: "Chinatown Complex Hawker", location: "335 Smith Street", cost: 5, costCurrency: "S$", emoji: "🍜" },
        { time: "2:00 PM", title: "Sri Veeramakaliamman Temple", location: "141 Serangoon Road", cost: 0, costCurrency: "S$", emoji: "🕉️" },
        { time: "5:00 PM", title: "Tekka Centre Prata Dinner", location: "665 Buffalo Road", cost: 8, costCurrency: "S$", emoji: "🫓" },
      ],
      tip: "Hawker centers are Singapore's soul. Must-try: chicken rice, laksa, char kway teow. Never more than S$8 per meal."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Beach",
      neighborhood: "Sentosa Island",
      activities: [
        { time: "9:00 AM", title: "Sentosa Express to Beach Station", location: "VivoCity Level 3", cost: 4, costCurrency: "S$", emoji: "🚝" },
        { time: "10:00 AM", title: "Siloso Beach Morning Swim", location: "Siloso Beach Walk", cost: 0, costCurrency: "S$", emoji: "🏖️" },
        { time: "1:00 PM", title: "S.E.A. Aquarium Ocean Dome", location: "8 Sentosa Gateway", cost: 34, costCurrency: "S$", emoji: "🐠" },
        { time: "7:00 PM", title: "Wings of Time Water Show", location: "Siloso Beach", cost: 18, costCurrency: "S$", emoji: "🎆" },
      ],
      tip: "Buy Sentosa Fun Pass online for better value. Island has free beach access - just pay monorail entry."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Wildlife",
      neighborhood: "Mandai & Orchard",
      activities: [
        { time: "9:00 AM", title: "Singapore Zoo Open Habitat", location: "80 Mandai Lake Road", cost: 39, costCurrency: "S$", emoji: "🦁" },
        { time: "1:00 PM", title: "Ah Meng Restaurant Zoo Lunch", location: "Singapore Zoo", cost: 15, costCurrency: "S$", emoji: "🍱" },
        { time: "3:00 PM", title: "Orchard Road ION Sky Free Observatory", location: "2 Orchard Turn Level 56", cost: 0, costCurrency: "S$", emoji: "🏙️" },
        { time: "6:00 PM", title: "Newton Food Centre Chili Crab", location: "500 Clemenceau Avenue North", cost: 40, costCurrency: "S$", emoji: "🦀" },
      ],
      tip: "Singapore Zoo is world-class. River Wonders and Night Safari are adjacent - combo tickets save money if doing multiple."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Eclectic",
      neighborhood: "Kampong Glam & City Hall",
      activities: [
        { time: "9:00 AM", title: "Sultan Mosque Golden Dome", location: "3 Muscat Street", cost: 0, costCurrency: "S$", emoji: "🕌" },
        { time: "11:00 AM", title: "Haji Lane Instagram Murals", location: "Haji Lane, Kampong Glam", cost: 0, costCurrency: "S$", emoji: "🎨" },
        { time: "1:00 PM", title: "Zam Zam Murtabak Lunch", location: "697-699 North Bridge Road", cost: 10, costCurrency: "S$", emoji: "🥙" },
        { time: "3:00 PM", title: "National Gallery Singapore Art", location: "1 St Andrew's Road", cost: 20, costCurrency: "S$", emoji: "🖼️" },
      ],
      tip: "Haji Lane has the most Instagrammable street art. Go early before crowds. Nearby Arab Street has great fabric and carpet shops."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Katong & Marina Bay",
      activities: [
        { time: "10:00 AM", title: "Katong Peranakan Shophouses", location: "Joo Chiat Road, Katong", cost: 0, costCurrency: "S$", emoji: "🏠" },
        { time: "12:00 PM", title: "328 Katong Laksa Final Meal", location: "51 East Coast Road", cost: 8, costCurrency: "S$", emoji: "🍜" },
        { time: "3:00 PM", title: "Singapore Flyer Observation Wheel", location: "30 Raffles Avenue", cost: 33, costCurrency: "S$", emoji: "🎡" },
        { time: "6:00 PM", title: "Lau Pa Sat Satay Street Sunset", location: "18 Raffles Quay", cost: 15, costCurrency: "S$", emoji: "�串串" },
      ],
      tip: "Bring home kaya (coconut jam), bak kwa (BBQ pork), and TWG tea. Changi Airport has best duty-free prices for these."
    }
  ];

  return baseItinerary.slice(0, days - 1);
};

const generateGenericItinerary = (days: number, destination: string): DayItinerary[] => {
  const genericDays: DayItinerary[] = [
    {
      dayNumber: 2,
      vibeKeyword: "Heritage",
      neighborhood: "Historic Center",
      activities: [
        { time: "9:00 AM", title: "Main Historical Landmark", location: "Old Town District", cost: 20, costCurrency: "$", emoji: "🏛️" },
        { time: "12:00 PM", title: "Traditional Local Lunch", location: "Central Food Quarter", cost: 15, costCurrency: "$", emoji: "🍽️" },
        { time: "2:30 PM", title: "City Museum Visit", location: "Museum District", cost: 12, costCurrency: "$", emoji: "🎨" },
        { time: "6:00 PM", title: "Authentic Local Dinner", location: "Popular Restaurant Row", cost: 25, costCurrency: "$", emoji: "🥘" },
      ],
      tip: "Research key phrases in the local language. Knowing 'hello', 'thank you', and 'where is' goes a long way with locals."
    },
    {
      dayNumber: 3,
      vibeKeyword: "Market",
      neighborhood: "Local Markets Area",
      activities: [
        { time: "8:00 AM", title: "Morning Market Exploration", location: "Central Market Hall", cost: 10, costCurrency: "$", emoji: "🛒" },
        { time: "11:00 AM", title: "Religious Landmark Visit", location: "Sacred District", cost: 5, costCurrency: "$", emoji: "⛪" },
        { time: "1:00 PM", title: "Street Food Tour", location: "Food Street Area", cost: 12, costCurrency: "$", emoji: "🍜" },
        { time: "4:00 PM", title: "Walking Tour Old Town", location: "Historic Quarter", cost: 15, costCurrency: "$", emoji: "🚶" },
      ],
      tip: "Join free walking tours to meet other solo travelers. Guides work for tips and share insider knowledge."
    },
    {
      dayNumber: 4,
      vibeKeyword: "Adventure",
      neighborhood: "Day Trip Destination",
      activities: [
        { time: "7:00 AM", title: "Day Trip Departure", location: `Near ${destination}`, cost: 25, costCurrency: "$", emoji: "🚌" },
        { time: "10:00 AM", title: "Natural Wonder Visit", location: "Scenic Viewpoint", cost: 15, costCurrency: "$", emoji: "🏞️" },
        { time: "1:00 PM", title: "Regional Cuisine Lunch", location: "Local Village", cost: 18, costCurrency: "$", emoji: "🥙" },
        { time: "4:00 PM", title: "Outdoor Activity", location: "Nature Reserve", cost: 20, costCurrency: "$", emoji: "🥾" },
      ],
      tip: "Book day trips through your accommodation. They often have better rates and local connections than online booking sites."
    },
    {
      dayNumber: 5,
      vibeKeyword: "Shopping",
      neighborhood: "Commercial District",
      activities: [
        { time: "10:00 AM", title: "Shopping District Stroll", location: "Main Shopping Street", cost: 30, costCurrency: "$", emoji: "🛍️" },
        { time: "1:00 PM", title: "Trendy Cafe Lunch", location: "Hipster Neighborhood", cost: 16, costCurrency: "$", emoji: "☕" },
        { time: "3:00 PM", title: "Viewpoint or Tower", location: "Tallest Building", cost: 20, costCurrency: "$", emoji: "🏙️" },
        { time: "7:00 PM", title: "Evening Entertainment", location: "Nightlife District", cost: 30, costCurrency: "$", emoji: "🎭" },
      ],
      tip: "Visit observation decks at sunset for dramatic lighting. Book tickets online in advance to skip ticket counter lines."
    },
    {
      dayNumber: 6,
      vibeKeyword: "Local Life",
      neighborhood: "Residential Quarter",
      activities: [
        { time: "9:00 AM", title: "Neighborhood Exploration", location: "Local District", cost: 0, costCurrency: "$", emoji: "🏘️" },
        { time: "12:00 PM", title: "Family-Run Restaurant", location: "Residential Area", cost: 18, costCurrency: "$", emoji: "🍲" },
        { time: "3:00 PM", title: "Park or Garden Visit", location: "City Green Space", cost: 5, costCurrency: "$", emoji: "🌳" },
        { time: "6:00 PM", title: "Waterfront Evening", location: "Harbor or River Walk", cost: 20, costCurrency: "$", emoji: "🌅" },
      ],
      tip: "Best authentic food is in residential neighborhoods away from tourist zones. Look for places packed with locals."
    },
    {
      dayNumber: 7,
      vibeKeyword: "Farewell",
      neighborhood: "Souvenir District",
      activities: [
        { time: "10:00 AM", title: "Souvenir Shopping", location: "Craft Markets", cost: 35, costCurrency: "$", emoji: "🎁" },
        { time: "1:00 PM", title: "Favorite Dish Revisit", location: "Best Restaurant", cost: 20, costCurrency: "$", emoji: "❤️" },
        { time: "3:00 PM", title: "Final Photo Stop", location: "Iconic Landmark", cost: 10, costCurrency: "$", emoji: "📸" },
        { time: "6:00 PM", title: "Farewell Sunset Dinner", location: "Scenic Restaurant", cost: 40, costCurrency: "$", emoji: "🌆" },
      ],
      tip: "Leave buffer time before your flight. Take photos but be present. The best souvenir is the memory of your solo adventure."
    }
  ];

  return genericDays.slice(0, days - 1);
};
