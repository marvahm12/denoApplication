import ProductModel from "../services/product/product.model.ts";
import { printSuccessMessage } from "../utils/helpers.ts";

export const createProducts = async () => {
  await ProductModel.create([
    {
      brand: "Besh Jeans",
      name: "Jeans Skinny Fit- Blue Denim",
      quantity: 100,
      provider: "Besh",
      price: 34.5,
      imageUrl:
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Strad Jeans",
      name: "MOM FIT RIPS - Straight leg jeans",
      quantity: 100,
      provider: "Strad",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "P&&B",
      name: "WITH RIPPED DETAILING - Slim fit jeans",
      quantity: 150,
      provider: "P&&B",
      price: 36.99,
      imageUrl:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Maxii",
      name: "Relqxed fit jeans- Blue denim",
      quantity: 100,
      provider: "Maxii",
      price: 45.90,
      imageUrl:
        "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Lvy",
      name: "Slim fit jeans - Blue denim",
      quantity: 1000,
      provider: "Lvy",
      price: 62.5,
      imageUrl:
        "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Strad Jeans",
      name: "MOM FIT RIPS - Straight leg jeans - Light blue",
      quantity: 1000,
      provider: "Strad",
      price: 50.99,
      imageUrl:
        "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Maxii",
      name: "Bella Mid Rise - Bootcut jeans- Mid blue glam",
      quantity: 2000,
      provider: "Maxii",
      price: 60.00,
      imageUrl:
        "https://images.unsplash.com/photo-1548615661-5d58be81cb9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "Besh Jeans",
      name: "Jeans Skinny fit - Blue denim",
      quantity: 400,
      provider: "Besh Jeans",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "JJY",
      name: "Jeans jacket - Straight fit- Light blue Denim",
      quantity: 100,
      provider: "JJY",
      price: 74.99,
      imageUrl:
        "https://images.unsplash.com/photo-1546215364-12f3fff5d578?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "JJY Jeans",
      name: "KASH JACKET - Denim jacket- Blue",
      quantity: 50,
      provider: "JJY",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1570563676231-d476637bc4bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "LVY",
      name: "Carter - Regular fit jeans- Blue",
      quantity: 1020,
      provider: "LVY",
      price: 89.95,
      imageUrl:
        "https://images.unsplash.com/photo-1603077399385-01143f096276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    },
    {
      brand: "WLGEN",
      name: "ZOEY HALTER WRAP SKATER DRESS - Party dress - Red",
      quantity: 100,
      provider: "WLGEN",
      price: 290.99,
      imageUrl:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "WLGEN",
      name: "ZOEY HALTER WRAP SKATER DRESS - Party dress - Green",
      quantity: 100,
      provider: "WLGEN",
      price: 290.99,
      imageUrl:
        "https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Guest",
      name: "ELEA DRESS - Cocktail dress / Party dress",
      quantity: 100,
      provider: "Guest",
      price: 150.00,
      imageUrl:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "WLGEN",
      name: "LATIFA DETAIL MIDI DRESS - Party dress - Grey",
      quantity: 100,
      provider: "WLGEN",
      price: 186.98,
      imageUrl:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "WLGEN",
      name: "VALERIE - Party dress- Black",
      quantity: 100,
      provider: "WLGEN",
      price: 199.99,
      imageUrl:
        "https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Strad Jeans",
      name: "Ambona - Cocktail/Party dress - Yellow",
      quantity: 100,
      provider: "Strad",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "Verom",
      name: "Elegant party dress - Red",
      quantity: 50,
      provider: "Verom",
      price: 350.00,
      imageUrl:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "GerryB",
      name: "KASCHMIR - Classic coat - Brown",
      quantity: 100,
      provider: "GerryB",
      price: 139.99,
      imageUrl:
        "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop",
    },
    {
      brand: "Moky",
      name: "Winter coat- Pink",
      quantity: 50,
      provider: "Moky",
      price: 89.99,
      imageUrl:
        "https://images.unsplash.com/flagged/photo-1554033750-2137b5cfd7ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop",
    },
    {
      brand: "ScandEdition",
      name: "Trenchcoat - White",
      quantity: 50,
      provider: "ScandEdition",
      price: 250.99,
      imageUrl:
        "https://images.unsplash.com/photo-1578102718171-ec1f91680562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop",
    },
    {
      brand: "Strad Jeans",
      name: "Classic Kashmir - long classic coat - Brown",
      quantity: 100,
      provider: "Strad",
      price: 190.99,
      imageUrl:
        "https://images.unsplash.com/photo-1619603364904-c0498317e145?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "OnlyS",
      name: "ONSJULIAN KING COAT - Classic coat- Brown",
      quantity: 80,
      provider: "OnlyS",
      price: 60.99,
      imageUrl:
        "https://images.unsplash.com/photo-1619603364904-c0498317e145?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Besh",
      name: "KASCHMIR - Short Coat - Pink",
      quantity: 90,
      provider: "Besh",
      price: 186.80,
      imageUrl:
        "https://images.unsplash.com/photo-1591900947067-851789555ef3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "ThreadB",
      name: "Short winter coat - Green",
      quantity: 100,
      provider: "ThreadB",
      price: 86.60,
      imageUrl:
        "https://images.unsplash.com/photo-1578948856697-db91d246b7b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Didrik",
      name: "Winter coat - yellow",
      quantity: 100,
      provider: "Didrik",
      price: 182.99,
      imageUrl:
        "https://images.unsplash.com/photo-1599407950360-8b8642d423dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Mc",
      name: "Classic Kaschmir - Short coat- Brown",
      quantity: 100,
      provider: "Mc",
      price: 279.50,
      imageUrl:
        "https://images.unsplash.com/photo-1515603848232-f52a8e50511a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGNvYXR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Venty",
      name: "Body FIT - Formal Shirt - Blue",
      quantity: 100,
      provider: "Venty",
      price: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "Strad Jeans",
      name: "Casual Shirt - Black and Yellow",
      quantity: 100,
      provider: "Strad",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Kalvin Golf",
      name: "Shirt - Black and yellow",
      quantity: 100,
      provider: "Kalvin Golf",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "PierTwo",
      name: "Classic - Short shirt - Blue",
      quantity: 100,
      provider: "PierTwo",
      price: 35.99,
      imageUrl:
        "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "Hollis",
      name: "Classic shirt - Light Blue",
      quantity: 100,
      provider: "Hollis",
      price: 65.99,
      imageUrl:
        "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "Venty",
      name: "Regular Fit - Classic shirt - White",
      quantity: 100,
      provider: "Venty",
      price: 70.00,
      imageUrl:
        "https://images.unsplash.com/photo-1605516384564-6e30d6b4f235?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "PierTwo",
      name: "Formal Shirt - grey",
      quantity: 50,
      provider: "PierTwo",
      price: 40.99,
      imageUrl:
        "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTExfHxzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop",
    },
    {
      brand: "Nikee",
      name: "Running sports shoes - Red",
      quantity: 50,
      provider: "Nikee",
      price: 55.99,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Vansy",
      name: "OLD SKOOL UNISEX - Trainers - Black",
      quantity: 50,
      provider: "Vansy",
      price: 40.99,
      imageUrl:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Nikee",
      name: "Trainers - white",
      quantity: 50,
      provider: "Nikee",
      price: 55.99,
      imageUrl:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Nikee",
      name: "Training shoes - red",
      quantity: 50,
      provider: "Nikee",
      price: 55.99,
      imageUrl:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Nikee",
      name: "Trainers - brown",
      quantity: 50,
      provider: "Nikee",
      price: 50.99,
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Nikee",
      name: "Air zoom superrep - yellow",
      quantity: 50,
      provider: "Nikee",
      price: 119.99,
      imageUrl:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop",
    },
    {
      brand: "Betsey",
      name: "High heels - silver",
      quantity: 50,
      provider: "Betsey",
      price: 149.95,
      imageUrl:
        "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "NBalance",
      name: "CW452 - Trainers - Pink",
      quantity: 500,
      provider: "NBalance",
      price: 99.95,
      imageUrl:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
    {
      brand: "Anna",
      name: "High heeled sandals - Pink",
      quantity: 500,
      provider: "Anna",
      price: 100.95,
      imageUrl:
        "https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop",
    },
  ]);
  return printSuccessMessage("Product list created successfully.");
};
