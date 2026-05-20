export const categories = [
  {
    id: 1,
    name: 'Fabric Painting',
    slug: 'fabric-painting',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85',
    startingPrice: 50,
    description: 'Hand-painted designs on premium fabric with vibrant colors that last.',
    items: [
      { name: 'Kerchief Painting', price: '₹50+' },
      { name: 'Simple T-shirt', price: '₹199+' },
      { name: 'Custom T-shirt', price: '₹350+' },
      { name: 'Shirt Painting', price: '₹499+' },
    ]
  },
  {
    id: 2,
    name: 'Embroidery Works',
    slug: 'embroidery-works',
    image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85',
    startingPrice: 80,
    description: 'Intricate hand-stitched embroidery with premium threads and artistry.',
    items: [
      { name: 'Name Embroidery', price: '₹80+' },
      { name: 'Small Floral Design', price: '₹150+' },
      { name: 'Sleeve Embroidery', price: '₹199+' },
      { name: 'Custom Embroidery', price: '₹350+' },
    ]
  },
  {
    id: 3,
    name: 'Combo Works',
    slug: 'combo-works',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
    startingPrice: 499,
    description: 'The best of both worlds — fabric painting combined with embroidery artistry.',
    items: [
      { name: 'Paint+Embroidery T-shirt', price: '₹499+' },
      { name: 'Paint+Embroidery Shirt', price: '₹699+' },
    ]
  }
];

export const products = [
  {
    id: 1, categoryId: 1, name: 'Floral Paradise T-shirt', description: 'Hand-painted tropical floral design with vibrant colors on premium cotton.',
    basePrice: 599, tags: ['trending', 'floral'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', colors: ['White', 'Black', 'Pastel Pink'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2, categoryId: 2, name: 'Royal Name Embroidery Shirt', description: 'Elegant cursive name embroidery with golden thread on premium shirt.',
    basePrice: 450, tags: ['new-arrival'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', colors: ['White', 'Sky Blue', 'Cream'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3, categoryId: 3, name: 'Anime Art Combo Tee', description: 'Custom anime character painting with embroidered name and details.',
    basePrice: 799, tags: ['trending', 'anime'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'White', 'Navy'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4, categoryId: 1, name: 'Couple Portrait T-shirts', description: 'Matching hand-painted couple portraits on premium cotton tees.',
    basePrice: 999, tags: ['couple', 'trending'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5, categoryId: 2, name: 'Festival Embroidery Collection', description: 'Festive motifs with mirror work and colorful thread embroidery.',
    basePrice: 650, tags: ['festival', 'new-arrival'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', colors: ['Red', 'Green', 'Yellow'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6, categoryId: 1, name: 'Butterfly Dreams Kerchief', description: 'Delicate butterfly painting on soft cotton kerchief.',
    basePrice: 150, tags: ['floral', 'new-arrival'], isCustomizable: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', colors: ['White', 'Cream'], sizes: ['Free Size']
  },
  {
    id: 7, categoryId: 3, name: 'Premium Wedding Combo', description: 'Luxury embroidery + fabric painting for wedding outfits.',
    basePrice: 1299, tags: ['festival', 'trending'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', colors: ['White', 'Ivory', 'Gold'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 8, categoryId: 2, name: 'Sleeve Art Embroidery', description: 'Intricate sleeve embroidery with floral vine patterns.',
    basePrice: 399, tags: ['floral'], isCustomizable: true,
    image: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'White', 'Maroon'], sizes: ['S', 'M', 'L', 'XL']
  }
];

export const pricingRules = [
  { itemType: 'name_embroidery', shirtType: 'tshirt', price: 80 },
  { itemType: 'name_embroidery', shirtType: 'shirt', price: 100 },
  { itemType: 'sleeve_embroidery', shirtType: 'tshirt', price: 199 },
  { itemType: 'sleeve_embroidery', shirtType: 'shirt', price: 249 },
  { itemType: 'fabric_paint', shirtType: 'tshirt', price: 199 },
  { itemType: 'fabric_paint', shirtType: 'shirt', price: 499 },
  { itemType: 'custom_embroidery', shirtType: 'tshirt', price: 350 },
  { itemType: 'custom_embroidery', shirtType: 'shirt', price: 450 },
];

export const reviews = [
  {
    id: 1, name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', date: '2024-12-15', hasVideo: false
  },
  {
    id: 2, name: 'Rahul Kumar', rating: 5, comment: 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-01-20', hasVideo: true
  },
  {
    id: 3, name: 'Ananya Reddy', rating: 4, comment: 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-02-08', hasVideo: false
  },
  {
    id: 4, name: 'Vikash Patel', rating: 5, comment: 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-03-01', hasVideo: false
  },
  {
    id: 5, name: 'Meera Iyer', rating: 5, comment: 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality and craftsmanship.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-03-15', hasVideo: true
  },
  {
    id: 6, name: 'Arjun Nair', rating: 4, comment: 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-04-02', hasVideo: false
  }
];

export const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Royal Floral Embroidery', likes: 234 },
  { id: 2, src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Sunset Paradise Tee', likes: 187 },
  { id: 3, src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Wedding Special Combo', likes: 312 },
  { id: 4, src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Name Art Collection', likes: 156 },
  { id: 5, src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Anime Character Art', likes: 445 },
  { id: 6, src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', category: 'customer', title: 'Customer Creation', likes: 98 },
  { id: 7, src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Festival Special', likes: 267 },
  { id: 8, src: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Sleeve Detail Work', likes: 189 },
  { id: 9, src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Butterfly Collection', likes: 334 },
  { id: 10, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', category: 'customer', title: 'Happy Customer', likes: 121 },
  { id: 11, src: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Mirror Work Design', likes: 278 },
  { id: 12, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Couple Set', likes: 399 },
];

export const instagramPosts = [
  { id: 'ig1', mediaUrl: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', caption: 'New floral embroidery collection dropping soon! 🌸✨ #DharshiniCreations', permalink: 'https://instagram.com' },
  { id: 'ig2', mediaUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', caption: 'Behind the scenes — hand-painting this gorgeous tee 🎨 #HandmadeWithLove', permalink: 'https://instagram.com' },
  { id: 'ig3', mediaUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', caption: 'Customer order ready! Every stitch tells a story 🪡 #EmbroideryArt', permalink: 'https://instagram.com' },
  { id: 'ig4', mediaUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', caption: 'Festival collection is HERE 🎉 Limited pieces available! #FestivalFashion', permalink: 'https://instagram.com' },
  { id: 'ig5', mediaUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', caption: 'Custom anime tee for a happy customer! 🎌 #AnimeFashion #CustomArt', permalink: 'https://instagram.com' },
  { id: 'ig6', mediaUrl: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', caption: 'The magic of needle and thread ✨ #Handcrafted #PremiumQuality', permalink: 'https://instagram.com' },
];

export const faqData = [
  { question: 'How long does a custom order take?', answer: 'Custom orders typically take 5-10 business days depending on the complexity of the design. Rush orders can be accommodated for an additional fee.' },
  { question: 'What materials do you use?', answer: 'We use premium quality threads (DMC & Anchor), fabric paints (Fevicryl Fabric Colors), and source the finest cotton and linen fabrics for our work.' },
  { question: 'Can I provide my own design?', answer: 'Absolutely! You can upload your own design through our AI Custom Builder or send it directly via WhatsApp. We\'ll review it and provide a quote within 24 hours.' },
  { question: 'Do you ship internationally?', answer: 'Currently, we ship across India. International shipping is available on request — please contact us via WhatsApp for a custom shipping quote.' },
  { question: 'What is your return policy?', answer: 'Since each piece is handmade and custom-crafted, we don\'t accept returns. However, if there\'s a quality issue, we\'ll work with you to make it right.' },
  { question: 'Can I wash embroidered/painted clothes normally?', answer: 'We recommend gentle hand washing or machine wash on delicate cycle with cold water. Turn the garment inside out. Avoid bleach and tumble drying.' },
];

export const shirtColors = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Pastel Pink', hex: '#FFD1DC' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Maroon', hex: '#800020' },
  { name: 'Olive', hex: '#556B2F' },
];

export const floralStyles = [
  { id: 1, name: 'Rose Garden', preview: '🌹' },
  { id: 2, name: 'Lotus Mandala', preview: '🪷' },
  { id: 3, name: 'Cherry Blossom', preview: '🌸' },
  { id: 4, name: 'Sunflower', preview: '🌻' },
  { id: 5, name: 'Jasmine Vine', preview: '🌼' },
  { id: 6, name: 'Peacock Feather', preview: '🦚' },
];
