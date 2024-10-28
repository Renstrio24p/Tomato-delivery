// main.js or wherever you are using the assets

import { menu_images, food_images } from './assets.ts';

// Define the menu categories with images
export const menu_list = [
    { menu_name: "Salad", menu_image: menu_images.menu_1 },
    { menu_name: "Rolls", menu_image: menu_images.menu_2 },
    { menu_name: "Deserts", menu_image: menu_images.menu_3 },
    { menu_name: "Sandwich", menu_image: menu_images.menu_4 },
    { menu_name: "Cake", menu_image: menu_images.menu_5 },
    { menu_name: "Pure Veg", menu_image: menu_images.menu_6 },
    { menu_name: "Pasta", menu_image: menu_images.menu_7 },
    { menu_name: "Noodles", menu_image: menu_images.menu_8 }
];

// Define the list of food items with details for each menu category
export const food_list = [
    // Salads
    { _id: "1", name: "Greek Salad", image: food_images.food_1, price: 12, description: "Fresh greens, feta cheese, and olives.", category: "Salad" },
    { _id: "2", name: "Veg Salad", image: food_images.food_2, price: 18, description: "Mix of seasonal vegetables with a tangy dressing.", category: "Salad" },

    // Rolls
    { _id: "3", name: "Veggie Roll", image: food_images.food_3, price: 8, description: "A delicious roll with mixed vegetables and sauces.", category: "Rolls" },
    { _id: "4", name: "Paneer Roll", image: food_images.food_4, price: 10, description: "Roll with grilled paneer and spices.", category: "Rolls" },

    // Deserts
    { _id: "5", name: "Brownie", image: food_images.food_5, price: 6, description: "Rich chocolate brownie with nuts.", category: "Deserts" },
    { _id: "6", name: "Ice Cream", image: food_images.food_6, price: 5, description: "Vanilla ice cream with chocolate drizzle.", category: "Deserts" },

    // Sandwiches
    { _id: "7", name: "Grilled Sandwich", image: food_images.food_7, price: 9, description: "Toasted sandwich with cheese and vegetables.", category: "Sandwich" },
    { _id: "8", name: "Club Sandwich", image: food_images.food_8, price: 12, description: "Layered sandwich with a mix of fillings.", category: "Sandwich" },

    // Cakes
    { _id: "9", name: "Chocolate Cake", image: food_images.food_9, price: 15, description: "Rich chocolate cake with frosting.", category: "Cake" },
    { _id: "10", name: "Cheesecake", image: food_images.food_10, price: 14, description: "Creamy cheesecake with a biscuit base.", category: "Cake" },

    // Pure Veg
    { _id: "11", name: "Aloo Gobi", image: food_images.food_11, price: 10, description: "Cauliflower and potato curry.", category: "Pure Veg" },
    { _id: "12", name: "Palak Paneer", image: food_images.food_12, price: 13, description: "Spinach and cottage cheese curry.", category: "Pure Veg" },

    // Pasta
    { _id: "13", name: "Pasta Alfredo", image: food_images.food_13, price: 12, description: "Creamy pasta with Alfredo sauce.", category: "Pasta" },
    { _id: "14", name: "Spaghetti Bolognese", image: food_images.food_14, price: 14, description: "Classic pasta with Bolognese sauce.", category: "Pasta" },

    // Noodles
    { _id: "15", name: "Hakka Noodles", image: food_images.food_15, price: 10, description: "Stir-fried noodles with vegetables.", category: "Noodles" },
    { _id: "16", name: "Schezwan Noodles", image: food_images.food_16, price: 12, description: "Spicy noodles with a Schezwan sauce.", category: "Noodles" }
];
