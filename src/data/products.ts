// Demonstration catalogue. Replace names, prices (PKR) and copy with real data.
export type Category = "Cakes" | "Pastries" | "Cookies" | "Pies";
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  description: string;
  ingredients: string[];
};

export const CATEGORIES: Category[] = ["Cakes", "Pastries", "Cookies", "Pies"];

export const PRODUCTS: Product[] = [
  { id: "c1", name: "Midnight Ganache Tier", category: "Cakes", price: 6500, rating: 4.9, description: "Three tiers of dark cocoa sponge under a mirror ganache drip.", ingredients: ["Dark chocolate", "Cocoa", "Butter", "Cream", "Eggs", "Flour"] },
  { id: "c2", name: "Lavender Honey Chiffon", category: "Cakes", price: 5200, rating: 4.7, description: "Feather-light chiffon brushed with lavender honey syrup.", ingredients: ["Lavender", "Honey", "Eggs", "Flour", "Cream"] },
  { id: "c3", name: "Rose Vanilla Celebration", category: "Cakes", price: 7800, rating: 4.8, description: "Vanilla bean layers, rose cream and hand-piped pearls.", ingredients: ["Vanilla bean", "Rose water", "Butter", "Sugar", "Flour"] },
  { id: "c4", name: "Mocha Opera Slice Box", category: "Cakes", price: 3400, rating: 4.6, description: "Six slices of coffee-soaked almond joconde and ganache.", ingredients: ["Espresso", "Almond", "Dark chocolate", "Butter"] },
  { id: "p1", name: "Classic Butter Croissant", category: "Pastries", price: 450, rating: 4.8, description: "Laminated for three days; shatteringly crisp, honeycombed inside.", ingredients: ["Butter", "Flour", "Yeast", "Milk", "Salt"] },
  { id: "p2", name: "Lavender Glazed Éclair", category: "Pastries", price: 650, rating: 4.7, description: "Choux filled with vanilla crème pâtissière, lavender glaze.", ingredients: ["Choux", "Vanilla", "Cream", "Lavender sugar"] },
  { id: "p3", name: "Apricot Danish", category: "Pastries", price: 550, rating: 4.5, description: "Flaky pinwheel with roasted apricot and almond cream.", ingredients: ["Apricot", "Almond", "Butter", "Flour"] },
  { id: "p4", name: "Pistachio Pain Suisse", category: "Pastries", price: 700, rating: 4.6, description: "Brioche-croissant dough rolled with pistachio cream.", ingredients: ["Pistachio", "Butter", "Eggs", "Flour"] },
  { id: "k1", name: "Brown Butter Chunk", category: "Cookies", price: 350, rating: 4.9, description: "Toasty brown butter, 70% dark chocolate puddles, sea salt.", ingredients: ["Brown butter", "Dark chocolate", "Sea salt", "Flour"] },
  { id: "k2", name: "Espresso Shortbread", category: "Cookies", price: 280, rating: 4.4, description: "Sandy shortbread with finely ground Karachi-roasted espresso.", ingredients: ["Butter", "Espresso", "Flour", "Sugar"] },
  { id: "k3", name: "Double Cocoa Crinkle", category: "Cookies", price: 300, rating: 4.6, description: "Fudgy cracked cookies rolled in powdered sugar.", ingredients: ["Cocoa", "Eggs", "Sugar", "Flour"] },
  { id: "k4", name: "Oat & Date Brittle", category: "Cookies", price: 260, rating: 4.3, description: "Crisp oat cookies with dates and cardamom.", ingredients: ["Oats", "Dates", "Cardamom", "Butter"] },
  { id: "i1", name: "Lattice Cherry Pie", category: "Pies", price: 2800, rating: 4.7, description: "Tart cherries under a hand-woven all-butter lattice.", ingredients: ["Cherries", "Butter", "Flour", "Sugar"] },
  { id: "i2", name: "Salted Caramel Apple", category: "Pies", price: 2600, rating: 4.8, description: "Spiced apples and salted caramel in a deep crust.", ingredients: ["Apples", "Caramel", "Cinnamon", "Butter"] },
  { id: "i3", name: "Mango Cream Tart", category: "Pies", price: 3000, rating: 4.6, description: "Seasonal mango custard over a crisp sablé base.", ingredients: ["Mango", "Cream", "Eggs", "Sablé"] },
  { id: "i4", name: "Chocolate Pecan Pie", category: "Pies", price: 3200, rating: 4.5, description: "Toasted pecans set in dark chocolate custard.", ingredients: ["Pecans", "Dark chocolate", "Eggs", "Butter"] },
];

export const formatPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
