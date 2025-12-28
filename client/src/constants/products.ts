import type { Product } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: 'Lumina Skin',
    name: 'Retinol Renewal Serum',
    category: 'Anti-Aging',
    price: 85.00,
    ingredients: ['Retinol 1%', 'Hyaluronic Acid', 'Vitamin E', 'Squalane', 'Green Tea Extract'],
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    size: '30ml',
    description: 'A potent retinol treatment designed to accelerate skin turnover and reduce fine lines.'
  },
  {
    id: '2',
    brand: 'The Ordinary Lab',
    name: 'Advanced Retinoid 2%',
    category: 'Anti-Aging',
    price: 12.90,
    ingredients: ['Granactive Retinoid', 'Squalane', 'Bisabolol', 'Caprylic Triglyceride'],
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    size: '30ml',
    description: 'An entry-level retinoid emulsion that offers stable vitamin A delivery.'
  },
  {
    id: '3',
    brand: 'Dewy Cloud',
    name: 'Hydra-Silk Cream',
    category: 'Moisture',
    price: 64.00,
    ingredients: ['Ceramides NP', 'Niacinamide', 'Oat Beta Glucan', 'Shea Butter'],
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    size: '50ml',
    description: 'The ultimate barrier repair cream for sensitive and dry skin types.'
  },
  {
    id: '4',
    brand: 'Pure Essence',
    name: 'Ceramide Barrier Balm',
    category: 'Moisture',
    price: 18.50,
    ingredients: ['Ceramide AP', 'Ceramide EOP', 'Phytosphingosine', 'Cholesterol'],
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    size: '50ml',
    description: 'Affordable clinical-grade ceramide replenishment.'
  },
  {
    id: '5',
    brand: 'Tatcha',
    name: 'The Rice Wash',
    category: 'Cleanser',
    price: 40.00,
    ingredients: ['Rice Flour', 'Hyaluronic Acid', 'Algae Extract', 'Glycerin'],
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    size: '120ml',
    description: 'A pH-neutral cream cleanser that gently polishes skin.'
  },
  {
    id: '6',
    brand: 'Skinfix',
    name: 'Foaming Oil Cleanser',
    category: 'Cleanser',
    price: 30.00,
    ingredients: ['Squalane', 'Glycerin', 'Aloe Vera', 'Sodium Hyaluronate'],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    size: '175ml',
    description: 'A deep hydrating cleanser for barrier support.'
  },
  {
    id: '7',
    brand: 'Supergoop!',
    name: 'Unseen Sunscreen',
    category: 'Protection',
    price: 38.00,
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene'],
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    size: '50ml',
    description: 'The original 100% invisible, weightless, scentless sunscreen.'
  },
  {
    id: '8',
    brand: "Trader Joe's",
    name: 'Daily Facial Sunscreen',
    category: 'Protection',
    price: 8.99,
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene'],
    imageUrl: 'https://images.unsplash.com/photo-1556229167-731333066314?q=80&w=800&auto=format&fit=crop',
    rating: 4.4,
    size: '50ml',
    description: 'An affordable oil-free invisible daily sunscreen.'
  },
  {
    id: '9',
    brand: "Kiehl's",
    name: 'Ultra Facial Cream',
    category: 'Moisture',
    price: 38.00,
    ingredients: ['Squalane', 'Glycerin', 'Glacial Glycoprotein'],
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    size: '50ml',
    description: 'A 24-hour daily face moisturizer with Squalane.'
  },
  {
    id: '10',
    brand: 'First Aid Beauty',
    name: 'Ultra Repair Cream',
    category: 'Moisture',
    price: 18.00,
    ingredients: ['Colloidal Oatmeal', 'Shea Butter', 'Ceramide 3', 'Glycerin'],
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    size: '56g',
    description: 'A fast-absorbing, rich moisturizer that provides instant hydration.'
  }
];
