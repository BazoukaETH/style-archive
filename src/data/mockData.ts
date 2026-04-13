export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  color: string;
  colorHex: string;
  seasons: string[];
  occasions: string[];
  purchaseDate: string;
  price: number;
  notes: string;
  photos: string[];
  dateAdded: string;
}

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  items: string[];
  dateCreated: string;
  styledBy?: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  bio: string;
  location: string;
  clients: number;
  yearsOnPlatform: number;
  services: StylistService[];
  reviews: Review[];
  avatar: string;
}

export interface StylistService {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  itemCount: number;
  total: number;
  status: 'preparing' | 'shipped' | 'delivered';
  items: string[];
}

const photoColors = [
  '#E8DDD3', '#D4C5B5', '#C9B99A', '#BEB5A8',
  '#A39B8B', '#948B7B', '#D6CFC4', '#C4BDB2',
  '#B8AFA3', '#E2D9CE', '#D0C7BB', '#CABFB1',
  '#DDD4C7', '#CCC3B6', '#BAB1A4', '#E5DCD0',
];

export const wardrobeItems: WardrobeItem[] = [
  { id: '1', name: 'Cream Cashmere Sweater', brand: 'COS', category: 'Tops', subcategory: 'Knitwear', color: 'Cream', colorHex: '#F5F0E8', seasons: ['Fall', 'Winter'], occasions: ['Casual', 'Work'], purchaseDate: '2024-10-15', price: 180, notes: 'Dry clean only. Runs slightly oversized.', photos: [photoColors[0]], dateAdded: '2024-12-01' },
  { id: '2', name: 'Black Wool Trousers', brand: 'Theory', category: 'Bottoms', subcategory: 'Trousers', color: 'Black', colorHex: '#1A1A1A', seasons: ['Fall', 'Winter', 'Spring'], occasions: ['Work', 'Formal'], purchaseDate: '2024-09-20', price: 295, notes: 'High-waisted, wide leg.', photos: [photoColors[1]], dateAdded: '2024-11-28' },
  { id: '3', name: 'Silk Midi Dress', brand: 'Reformation', category: 'Dresses', subcategory: 'Midi', color: 'Sage', colorHex: '#A8B89C', seasons: ['Spring', 'Summer'], occasions: ['Evening', 'Formal'], purchaseDate: '2024-06-10', price: 328, notes: 'V-neck, adjustable straps.', photos: [photoColors[2]], dateAdded: '2024-11-20' },
  { id: '4', name: 'Camel Wool Coat', brand: 'Max Mara', category: 'Outerwear', subcategory: 'Coats', color: 'Camel', colorHex: '#C4A882', seasons: ['Fall', 'Winter'], occasions: ['Work', 'Casual', 'Formal'], purchaseDate: '2024-11-01', price: 890, notes: 'Investment piece. Fits perfectly.', photos: [photoColors[3]], dateAdded: '2024-11-15' },
  { id: '5', name: 'White Leather Sneakers', brand: 'Common Projects', category: 'Shoes', subcategory: 'Sneakers', color: 'White', colorHex: '#FFFFFF', seasons: ['Spring', 'Summer', 'Fall'], occasions: ['Casual'], purchaseDate: '2024-04-15', price: 425, notes: 'Size 38. Break in period needed.', photos: [photoColors[4]], dateAdded: '2024-11-10' },
  { id: '6', name: 'Black Leather Tote', brand: 'Celine', category: 'Bags', subcategory: 'Totes', color: 'Black', colorHex: '#1A1A1A', seasons: ['All Seasons'], occasions: ['Work', 'Casual'], purchaseDate: '2024-08-20', price: 1950, notes: 'Saffiano leather. Gold hardware.', photos: [photoColors[5]], dateAdded: '2024-11-05' },
  { id: '7', name: 'Gold Chain Necklace', brand: 'Mejuri', category: 'Accessories', subcategory: 'Jewelry', color: 'Gold', colorHex: '#D4AF37', seasons: ['All Seasons'], occasions: ['Casual', 'Work', 'Evening'], purchaseDate: '2024-03-14', price: 148, notes: '14k gold vermeil, 18 inch.', photos: [photoColors[6]], dateAdded: '2024-10-28' },
  { id: '8', name: 'Navy Blazer', brand: 'Totême', category: 'Tops', subcategory: 'Blazers', color: 'Navy', colorHex: '#1B2A4A', seasons: ['Fall', 'Winter', 'Spring'], occasions: ['Work', 'Formal'], purchaseDate: '2024-09-05', price: 560, notes: 'Slightly oversized fit. Perfect with trousers.', photos: [photoColors[7]], dateAdded: '2024-10-20' },
  { id: '9', name: 'Linen Wide-Leg Pants', brand: 'ARKET', category: 'Bottoms', subcategory: 'Trousers', color: 'Oatmeal', colorHex: '#D4C9B8', seasons: ['Spring', 'Summer'], occasions: ['Casual', 'Travel'], purchaseDate: '2024-05-22', price: 89, notes: 'Wrinkles easily but looks great.', photos: [photoColors[8]], dateAdded: '2024-10-15' },
  { id: '10', name: 'Suede Ankle Boots', brand: 'Isabel Marant', category: 'Shoes', subcategory: 'Boots', color: 'Tan', colorHex: '#B8956A', seasons: ['Fall', 'Winter'], occasions: ['Casual', 'Evening'], purchaseDate: '2024-10-01', price: 650, notes: 'Block heel, very comfortable.', photos: [photoColors[9]], dateAdded: '2024-10-10' },
  { id: '11', name: 'Striped Cotton Shirt', brand: 'Nili Lotan', category: 'Tops', subcategory: 'Shirts', color: 'Blue/White', colorHex: '#B8C8D8', seasons: ['Spring', 'Summer', 'Fall'], occasions: ['Casual', 'Work'], purchaseDate: '2024-07-18', price: 275, notes: 'Relaxed boyfriend fit.', photos: [photoColors[10]], dateAdded: '2024-09-25' },
  { id: '12', name: 'Black Mini Skirt', brand: 'Saint Laurent', category: 'Bottoms', subcategory: 'Skirts', color: 'Black', colorHex: '#1A1A1A', seasons: ['All Seasons'], occasions: ['Evening', 'Casual'], purchaseDate: '2024-02-14', price: 890, notes: 'Leather, high-waisted.', photos: [photoColors[11]], dateAdded: '2024-09-15' },
  { id: '13', name: 'Cashmere Scarf', brand: 'Johnstons of Elgin', category: 'Accessories', subcategory: 'Scarves', color: 'Grey', colorHex: '#9B9B9B', seasons: ['Fall', 'Winter'], occasions: ['Casual', 'Work'], purchaseDate: '2024-11-10', price: 195, notes: 'Extra large, can be worn as wrap.', photos: [photoColors[12]], dateAdded: '2024-09-10' },
  { id: '14', name: 'Pointed Toe Heels', brand: 'Jimmy Choo', category: 'Shoes', subcategory: 'Heels', color: 'Nude', colorHex: '#D4B99A', seasons: ['All Seasons'], occasions: ['Formal', 'Evening', 'Work'], purchaseDate: '2024-01-20', price: 695, notes: '85mm heel, patent leather.', photos: [photoColors[13]], dateAdded: '2024-09-01' },
  { id: '15', name: 'Quilted Crossbody', brand: 'Chanel', category: 'Bags', subcategory: 'Crossbody', color: 'Beige', colorHex: '#D4C5A9', seasons: ['All Seasons'], occasions: ['Casual', 'Evening'], purchaseDate: '2023-12-25', price: 5800, notes: 'Classic flap, gold hardware.', photos: [photoColors[14]], dateAdded: '2024-08-20' },
  { id: '16', name: 'White T-Shirt', brand: 'The Row', category: 'Tops', subcategory: 'T-Shirts', color: 'White', colorHex: '#FAFAFA', seasons: ['All Seasons'], occasions: ['Casual'], purchaseDate: '2024-04-01', price: 190, notes: 'Perfect weight cotton. Buy multiples.', photos: [photoColors[15]], dateAdded: '2024-08-15' },
];

export const outfits: Outfit[] = [
  { id: 'o1', name: 'Office Monday', occasion: 'Work', items: ['1', '2', '8', '14'], dateCreated: '2024-12-01', styledBy: 'Nour H.' },
  { id: 'o2', name: 'Weekend Brunch', occasion: 'Casual', items: ['16', '9', '5', '7'], dateCreated: '2024-11-28' },
  { id: 'o3', name: 'Date Night', occasion: 'Evening', items: ['3', '10', '15', '7'], dateCreated: '2024-11-20' },
  { id: 'o4', name: 'Travel Day', occasion: 'Travel', items: ['11', '9', '5', '6'], dateCreated: '2024-11-15' },
];

export const stylists: Stylist[] = [
  {
    id: 's1', name: 'Nour Hassan', specialty: 'Wardrobe Organization & Personal Style', rating: 4.9, reviewCount: 48, priceFrom: 75, bio: 'Certified personal stylist with 8 years of experience helping clients build intentional wardrobes. I believe style should be effortless and sustainable. My approach combines classic principles with modern trends to create a wardrobe that truly works for your lifestyle.', location: 'Dubai, UAE', clients: 200, yearsOnPlatform: 3, avatar: '#C4A882',
    services: [
      { id: 'sv1', name: 'Wardrobe Audit', description: 'Complete review of your wardrobe with keep/donate/style recommendations', duration: '2 hours', price: 150 },
      { id: 'sv2', name: 'Outfit Planning', description: 'Weekly outfit plans based on your schedule and wardrobe', duration: '1 hour', price: 75 },
      { id: 'sv3', name: 'Seasonal Refresh', description: 'Prepare your wardrobe for the new season with styling and shopping list', duration: '3 hours', price: 200 },
    ],
    reviews: [
      { name: 'Amira K.', rating: 5, date: '2024-11-15', text: 'Nour completely transformed my wardrobe. I now have 30% fewer items but 3x more outfits. Incredible!' },
      { name: 'Fatima R.', rating: 5, date: '2024-10-28', text: 'Best investment I\'ve made. Nour helped me understand my personal style and shop more intentionally.' },
      { name: 'Sara M.', rating: 4, date: '2024-09-15', text: 'Very professional and knowledgeable. Great suggestions for mixing high and low pieces.' },
    ],
  },
  {
    id: 's2', name: 'Layla Mansouri', specialty: 'Personal Shopping & Event Styling', rating: 4.8, reviewCount: 35, priceFrom: 100, bio: 'Former fashion editor turned personal stylist. I specialize in helping clients find their signature look and dress confidently for every occasion. From corporate boardrooms to destination weddings.', location: 'Riyadh, KSA', clients: 150, yearsOnPlatform: 2, avatar: '#A8B89C',
    services: [
      { id: 'sv4', name: 'Personal Shopping', description: 'Curated shopping experience tailored to your style and budget', duration: '3 hours', price: 250 },
      { id: 'sv5', name: 'Event Styling', description: 'Complete look curation for special events including accessories', duration: '2 hours', price: 180 },
      { id: 'sv6', name: 'Virtual Styling Session', description: 'Remote wardrobe consultation via video call', duration: '1 hour', price: 100 },
    ],
    reviews: [
      { name: 'Dina A.', rating: 5, date: '2024-11-01', text: 'Layla styled me for my sister\'s wedding and I received so many compliments. She understood exactly what I wanted.' },
      { name: 'Hana B.', rating: 5, date: '2024-10-15', text: 'Excellent taste and very patient. Made the shopping experience actually enjoyable.' },
      { name: 'Reem S.', rating: 4, date: '2024-09-20', text: 'Great eye for detail. Would definitely book again for my next event.' },
    ],
  },
  {
    id: 's3', name: 'Omar Khalil', specialty: 'Minimalist Wardrobes & Capsule Collections', rating: 4.7, reviewCount: 28, priceFrom: 90, bio: 'I help people simplify their wardrobes without sacrificing style. Specializing in capsule wardrobes, sustainable fashion, and building a timeless collection that lasts years, not seasons.', location: 'Amman, Jordan', clients: 120, yearsOnPlatform: 2, avatar: '#948B7B',
    services: [
      { id: 'sv7', name: 'Capsule Wardrobe Build', description: 'Design a complete capsule wardrobe from your existing pieces', duration: '3 hours', price: 220 },
      { id: 'sv8', name: 'Declutter Session', description: 'Guided wardrobe declutter with styling tips for kept items', duration: '2 hours', price: 140 },
      { id: 'sv9', name: 'Shopping List Curation', description: 'Personalized shopping list to fill wardrobe gaps', duration: '1 hour', price: 90 },
    ],
    reviews: [
      { name: 'Tariq W.', rating: 5, date: '2024-10-30', text: 'Omar helped me go from 200+ items to 60 and I\'ve never dressed better. Life changing.' },
      { name: 'Yasmin H.', rating: 5, date: '2024-09-25', text: 'Practical, no-nonsense advice. Loved the capsule wardrobe he designed for me.' },
      { name: 'Karim D.', rating: 4, date: '2024-08-10', text: 'Good approach to sustainable fashion. Helped me see my wardrobe differently.' },
    ],
  },
  {
    id: 's4', name: 'Salma El-Amine', specialty: 'Color Analysis & Body Styling', rating: 4.9, reviewCount: 62, priceFrom: 85, bio: 'Certified color analyst and image consultant. Understanding your colors and body proportions is the foundation of great style. I combine science-backed analysis with fashion expertise to help you look and feel your absolute best.', location: 'Cairo, Egypt', clients: 280, yearsOnPlatform: 4, avatar: '#D4A882',
    services: [
      { id: 'sv10', name: 'Color Analysis', description: 'Discover your best colors with professional draping analysis', duration: '2 hours', price: 160 },
      { id: 'sv11', name: 'Style Profile', description: 'Complete body and style analysis with personalized guidelines', duration: '2.5 hours', price: 185 },
      { id: 'sv12', name: 'Wardrobe Color Audit', description: 'Evaluate your current wardrobe colors and create a cohesive palette', duration: '1.5 hours', price: 120 },
    ],
    reviews: [
      { name: 'Mona F.', rating: 5, date: '2024-11-10', text: 'Salma\'s color analysis was a revelation. I finally understand why some clothes look amazing on me.' },
      { name: 'Lina T.', rating: 5, date: '2024-10-05', text: 'Worth every penny. The color palette she created for me has made shopping so much easier.' },
      { name: 'Nadia K.', rating: 5, date: '2024-08-28', text: 'Incredibly knowledgeable and warm. Made the whole experience fun and educational.' },
      { name: 'Aya M.', rating: 4, date: '2024-07-15', text: 'Very thorough analysis. I learned so much about dressing for my body shape.' },
    ],
  },
  {
    id: 's5', name: 'Zara Hakim', specialty: 'Sustainable Fashion & Ethical Styling', rating: 4.6, reviewCount: 22, priceFrom: 70, bio: 'Passionate about sustainable fashion and ethical brands. I help clients build beautiful wardrobes that are kind to the planet. From thrift styling to identifying quality investment pieces that last.', location: 'Beirut, Lebanon', clients: 85, yearsOnPlatform: 1, avatar: '#B8C8A8',
    services: [
      { id: 'sv13', name: 'Sustainable Style Session', description: 'Build an eco-conscious wardrobe without compromising on style', duration: '2 hours', price: 130 },
      { id: 'sv14', name: 'Thrift Styling', description: 'Guided thrift shopping for unique, sustainable finds', duration: '3 hours', price: 110 },
      { id: 'sv15', name: 'Ethical Brand Guide', description: 'Personalized guide to ethical brands matching your style and budget', duration: '1 hour', price: 70 },
    ],
    reviews: [
      { name: 'Joud L.', rating: 5, date: '2024-10-22', text: 'Zara opened my eyes to so many amazing sustainable brands I never knew about.' },
      { name: 'Mariam S.', rating: 4, date: '2024-09-10', text: 'Great thrift shopping experience. Found some real gems with her guidance.' },
    ],
  },
];

export const orders: Order[] = [
  { id: 'ord1', orderNumber: 'CT-20240115', date: '2024-01-15', itemCount: 4, total: 19, status: 'delivered', items: ['1', '2', '3', '4'] },
  { id: 'ord2', orderNumber: 'CT-20241201', date: '2024-12-01', itemCount: 6, total: 26, status: 'shipped', items: ['5', '6', '7', '8', '9', '10'] },
];

export const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Bags', 'Accessories'];
export const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Seasons'];
export const occasionsList = ['Casual', 'Work', 'Formal', 'Evening', 'Sport', 'Travel'];
export const subcategories: Record<string, string[]> = {
  Tops: ['T-Shirts', 'Shirts', 'Blouses', 'Knitwear', 'Blazers'],
  Bottoms: ['Trousers', 'Jeans', 'Skirts', 'Shorts'],
  Dresses: ['Mini', 'Midi', 'Maxi', 'Shirt Dress'],
  Outerwear: ['Coats', 'Jackets', 'Vests'],
  Shoes: ['Sneakers', 'Heels', 'Boots', 'Sandals', 'Flats'],
  Bags: ['Totes', 'Crossbody', 'Clutch', 'Backpack'],
  Accessories: ['Jewelry', 'Scarves', 'Belts', 'Hats', 'Sunglasses'],
};

export const commonColors = [
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'White', hex: '#FAFAFA' },
  { name: 'Cream', hex: '#F5F0E8' },
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Grey', hex: '#9B9B9B' },
  { name: 'Camel', hex: '#C4A882' },
  { name: 'Brown', hex: '#8B6F4E' },
  { name: 'Burgundy', hex: '#722F37' },
  { name: 'Sage', hex: '#A8B89C' },
  { name: 'Blue', hex: '#4A7CB5' },
  { name: 'Pink', hex: '#D4A0A0' },
  { name: 'Red', hex: '#C45C5C' },
];
