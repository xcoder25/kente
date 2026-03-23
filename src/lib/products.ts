export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  culturalStory: string;
  kentePatternDescription: string;
};

export const products: Product[] = [
  {
    id: 'adinkra-royalty-hoodie',
    name: "'Adinkra Royalty' Hoodie",
    price: 89.99,
    description: "Embrace the symbols of West Africa with our 'Adinkra Royalty' Hoodie. Crafted from premium, heavyweight cotton, this hoodie features intricately embroidered Kente patterns along the sleeves and a central Adinkra symbol representing leadership and greatness. A perfect blend of comfort, style, and heritage.",
    images: ['prod-hoodie-1', 'prod-hoodie-2'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    culturalStory: "The Adinkra symbols are visual representations of proverbs and concepts from the Akan people of Ghana. The 'Gye Nyame' symbol featured on this hoodie is one of the most famous, meaning 'except for God,' signifying the supremacy and omnipotence of God. Wearing it is a statement of faith and resilience.",
    kentePatternDescription: "Classic gold, green, and red Kente weave with geometric shapes symbolizing royalty and wealth. The pattern is tight and vibrant, designed to stand out against the hoodie's black fabric.",
  },
  {
    id: 'sankofa-heritage-t-shirt',
    name: "'Sankofa' Heritage T-Shirt",
    price: 39.99,
    description: "Look back to move forward. The 'Sankofa' Heritage T-Shirt is a modern essential with a powerful message. Made from soft, breathable organic cotton, it features a stylized Sankofa bird emblem on the chest, rendered in a vibrant crimson and deep green. A timeless piece for the conscious trendsetter.",
    images: ['prod-tshirt-1', 'prod-tshirt-2'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    culturalStory: "Sankofa, from the Akan language, translates to 'return and get it.' It is symbolized by a bird with its head turned backward, carrying a precious egg in its mouth. It teaches us the importance of learning from the past to build a better future. This T-shirt is a tribute to that wisdom.",
    kentePatternDescription: "A subtle, print-based pattern inspired by the Sankofa symbol. It uses a two-tone crimson and green palette, with fine lines mimicking traditional stitch work. The design is modern and minimalist.",
  },
  {
    id: 'gye-nyame-supremacy-snapback',
    name: "'Gye Nyame' Supremacy Snapback",
    price: 34.99,
    description: "Top off your look with authority. Our 'Gye Nyame' Snapback is crafted from durable burnt orange twill, featuring a bold, 3D embroidered Gye Nyame symbol in black. With an adjustable snap closure and a classic fit, it's a versatile accessory that speaks volumes.",
    images: ['prod-cap-1', 'prod-cap-2'],
    category: 'Accessories',
    sizes: ['One Size'],
    culturalStory: "The 'Gye Nyame' symbol is the ultimate representation of the supremacy of God over all creation. It is a constant reminder of the higher power that guides and protects. This snapback makes that declaration a part of your daily style.",
    kentePatternDescription: "This accessory focuses on a single, powerful symbol rather than a full pattern. The 'Gye Nyame' is embroidered in thick black thread, providing a strong contrast to the burnt orange fabric. The aesthetic is clean and impactful.",
  },
  {
    id: 'asase-ye-duru-bomber-jacket',
    name: "'Asase Ye Duru' Bomber Jacket",
    price: 149.99,
    description: "A statement piece for the urban explorer. The 'Asase Ye Duru' Bomber is a masterpiece of contemporary design and cultural reverence. Its deep green satin shell is adorned with gold Kente-inspired patterns, and the lining features a map of ancient African kingdoms. Ribbed cuffs and hem provide a classic bomber fit.",
    images: ['prod-bomber-1', 'prod-bomber-2'],
    category: 'Jackets',
    sizes: ['M', 'L', 'XL'],
    culturalStory: "'Asase Ye Duru' means 'the Earth has weight,' a symbol of divinity and providence. It encourages respect for the Earth and its resources. This jacket is a tribute to mother nature and the lands from which our heritage springs.",
    kentePatternDescription: "A luxurious, gold-printed pattern on deep green fabric. The design includes repeating diamond motifs, representing the richness of the earth, interspersed with linear elements that suggest pathways and journeys.",
  },
  {
    id: 'fihankra-unity-tote-bag',
    name: "'Fihankra' Unity Tote Bag",
    price: 45.00,
    description: "Carry your essentials and your heritage with the 'Fihankra' Unity Tote. This spacious and durable canvas tote features a full-print Kente design, reinforced straps, and an internal pocket. Perfect for daily use, it’s a functional piece of art that symbolizes community and togetherness.",
    images: ['prod-tote-1', 'prod-tote-2'],
    category: 'Accessories',
    sizes: ['One Size'],
    culturalStory: "The Fihankra symbol, representing a house or compound, stands for brotherhood, security, and completeness. It reminds us that in unity, there is strength. This tote bag is a celebration of the communities that lift us up.",
    kentePatternDescription: "A vibrant, full-coverage print featuring a checkerboard of Kente patterns in gold, black, and red. The pattern is bold and energetic, designed to capture the eye and celebrate the spirit of unity.",
  },
];
