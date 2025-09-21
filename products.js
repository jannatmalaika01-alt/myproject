// ================= PRODUCTS DATA ==================
const products = [
  // ================= MEN'S ATHLETICS =================
  {
    id: 101,
    name: "Sustainable Athletics",
    category: "Men's Athletics",
    price: 120,
    description: "Eco-friendly athletics shoes made with sustainable materials.",
    image: "menshoes1.png",
    link: "shoe1men.html",
    reviews: "85 reviews"
  },
  {
    id: 102,
    name: "Trainers",
    category: "Men's Athletics",
    price: 200,
    description: "Stylish trainers perfect for casual wear and light workouts.",
    image: "menshoes2.png",
    link: "shoe2men.html",
    reviews: "102 reviews"
  },
  {
    id: 103,
    name: "Gym Shoes",
    category: "Men's Athletics",
    price: 220,
    description: "High-performance gym shoes with maximum grip and comfort.",
    image: "menshoes3.png",
    link: "shoe3men.html",
    reviews: "76 reviews"
  },
  {
    id: 104,
    name: "Running Shoes",
    category: "Men's Athletics",
    price: 220,
    description: "Lightweight running shoes designed for speed and durability.",
    image: "menshoes4.png",
    link: "shoe4men.html",
    reviews: "98 reviews"
  },

  // ================= WOMEN'S ATHLETICS =================
  {
    id: 201,
    name: "Women Sustainable Athletics",
    category: "Women's Athletics",
    price: 120,
    description: "Eco-friendly athletics shoes made with sustainable materials.",
    image: "womsh1.png",
    link: "shoe1wom.html",
    reviews: "85 reviews"
  },
  {
    id: 202,
    name: "Women Trainers",
    category: "Women's Athletics",
    price: 200,
    description: "Stylish trainers perfect for casual wear and light workouts.",
    image: "womsh2.png",
    link: "shoe2wom.html",
    reviews: "102 reviews"
  },
  {
    id: 203,
    name: "Women Gym Shoes",
    category: "Women's Athletics",
    price: 220,
    description: "High-performance gym shoes with maximum grip and comfort.",
    image: "womsh3.png",
    link: "shoe3wom.html",
    reviews: "76 reviews"
  },
  {
    id: 204,
    name: "Women Running Shoes",
    category: "Women's Athletics",
    price: 220,
    description: "Lightweight running shoes designed for speed and durability.",
    image: "womsh4.png",
    link: "shoe4wom.html",
    reviews: "98 reviews"
  },

  // ================= WOMEN'S TAILORED DRESSES =================
  {
    id: 301,
    name: "Black Evening Dress",
    category: "Women's Tailored Dresses",
    price: 520,
    description: "Elegant full-length evening gown with glittering details.",
    image: "womdress1.png",
    link: "womsilk1.html",
    reviews: "48 reviews"
  },
  {
    id: 302,
    name: "Silk Cocktail Dress",
    category: "Women's Tailored Dresses",
    price: 480,
    description: "Luxurious silk dress perfect for parties and events.",
    image: "womdress2.png",
    link: "womsilk2.html",
    reviews: "63 reviews"
  },
  {
    id: 303,
    name: "Formal Dress",
    category: "Women's Tailored Dresses",
    price: 550,
    description: "Premium tailored dress for formal occasions.",
    image: "womdress3.png",
    link: "womsilk3.html",
    reviews: "37 reviews"
  },
  {
    id: 304,
    name: "Formal Dress",
    category: "Women's Tailored Dresses",
    price: 600,
    description: "Intricate embroidery on a flowing maxi dress.",
    image: "womdress4.png",
    link: "womsilk4.html",
    reviews: "42 reviews"
  },
  {
    id: 305,
    name: "Luxury Party Dress",
    category: "Women's Tailored Dresses",
    price: 620,
    description: "Tailored cocktail dress with premium fabrics and fit.",
    image: "womdress5.png",
    link: "womsilk5.html",
    reviews: "35 reviews"
  },
  {
    id: 306,
    name: "Red Carpet Gown",
    category: "Women's Tailored Dresses",
    price: 750,
    description: "Show-stopping tailored gown for gala events.",
    image: "womdress6.png",
    link: "womsilk6.html",
    reviews: "55 reviews"
  },
  {
    id: 307,
    name: "Elegant Evening Dress",
    category: "Women's Tailored Dresses",
    price: 680,
    description: "Floor-length tailored dress with exquisite design.",
    image: "womdress7.png",
    link: "womsilk7.html",
    reviews: "60 reviews"
  },
  {
    id: 308,
    name: "Designer Gala Dress",
    category: "Women's Tailored Dresses",
    price: 800,
    description: "Tailored designer dress perfect for gala or red carpet.",
    image: "womdress8.png",
    link: "womsilk8.html",
    reviews: "50 reviews"
  },

  // ================= EXTRA ATHLETICS =================
  {
    id: 1000,
    name: "Men Rovers",
    description: "High-performance running shoe with excellent cushioning and support. Perfect for daily workouts and athletic activities.",
    price: 220,
    image: "menava1.jpg",
    category: "Men's Athletics",
    sizes: [7, 8, 9, 10, 11],
    link: "#"
  },
  {
    id: 1001,
    name: "Women Rovers",
    description: "High-performance running shoe with excellent cushioning and support. Perfect for daily workouts and athletic activities.",
    price: 220,
    image: "womava1.jpg",
    category: "Women's Athletics",
    sizes: [7, 8, 9, 10, 11],
    link: "#"
  },

  // ================= MEN'S CORD SETS =================
  {
    id: 200,
    name: "Men Cord Set 1",
    description: "Comfortable and stylish cord set perfect for casual outings.",
    price: 120,
    image: "coord1.png",
    category: "Men's Cord Sets",
    link: "#"
  },
  {
    id: 201,
    name: "Men Cord Set 2",
    description: "Trendy cord set designed with breathable fabric for all-day comfort.",
    price: 200,
    image: "coord2.png",
    category: "Men's Cord Sets",
    link: "#"
  },
  {
    id: 202,
    name: "Men Cord Set 3",
    description: "Lightweight cord set ideal for both casual and semi-formal occasions.",
    price: 220,
    image: "coord3.png",
    category: "Men's Cord Sets",
    link: "#"
  },
  {
    id: 203,
    name: "Men Cord Set 4",
    description: "Premium quality cord set with a sleek and modern look.",
    price: 220,
    image: "coord4.png",
    category: "Men's Cord Sets",
    link: "#"
  },
  {
    id: 204,
    name: "Men Cord Set 5",
    description: "Elegant cord set with a balance of comfort and sophistication.",
    price: 220,
    image: "coord5.png",
    category: "Men's Cord Sets",
    link: "#"
  },

  // ================= MEN'S TAILORED SUITS =================
  {
    id: 300,
    name: "Classic Black Suit",
    description: "Premium tailored black suit for formal occasions.",
    price: 750,
    image: "mendress1.png",
    category: "Men's Tailored Suits",
    link: "mensuit1.html"
  },
  {
    id: 301,
    name: "Classic Grey Suit",
    description: "Premium tailored grey suit for formal occasions.",
    price: 1000,
    image: "mensuit7.png",
    category: "Men's Tailored Suits",
    link: "mensuit7.html"
  },
  {
    id: 302,
    name: "Business Suit",
    description: "Tailored navy suit perfect for office or meetings.",
    price: 780,
    image: "mendress2.png",
    category: "Men's Tailored Suits",
    link: "mensuit2.html"
  },
  {
    id: 303,
    name: "Charcoal Formal Suit",
    description: "Elegant grey tailored suit for formal events.",
    price: 800,
    image: "mendress3.png",
    category: "Men's Tailored Suits",
    link: "mensuit3.html"
  },
  {
    id: 304,
    name: "Luxury Grey Suit",
    description: "Tailored charcoal suit with premium fabric and fit.",
    price: 850,
    image: "mendress4.png",
    category: "Men's Tailored Suits",
    link: "mensuit4.html"
  },
  {
    id: 305,
    name: "Luxury Suit",
    description: "Tailored designer suit perfect for weddings or events.",
    price: 900,
    image: "mendress5.png",
    category: "Men's Tailored Suits",
    link: "mensuit5.html"
  },
  {
    id: 306,
    name: "Premium Tailored Suit",
    description: "Top-quality fabric and fit, perfect for formal gatherings.",
    price: 950,
    image: "mendress6.png",
    category: "Men's Tailored Suits",
    link: "mensuit6.html"
  }
];

// Export for Node.js or browser
if (typeof module !== "undefined") {
  module.exports = products;
} else {
  window.products = products;
}
