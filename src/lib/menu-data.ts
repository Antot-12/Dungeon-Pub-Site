import { type LanguageCode } from './translations';

export type MenuItem = {
    name: string;
    description?: string;
    price?: string;
    isSubheader?: boolean;
};

export type MenuCategory = {
    name: string;
    description?: string;
    items: MenuItem[];
};

type MenuCollection = {
    [key in LanguageCode]?: MenuCategory[];
}

export const menuData: MenuCollection = {
  sk: [
    {
        name: "🍺 Pivo",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Urpiner 11° – svetlé", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – svetlé", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – svetlé", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – tmavé", price: "2,40 € / 1,90 €" },
            { name: "Pivný špeciál", price: "podľa ponuky" },
        ],
    },
    {
        name: "🍯 Pivo s medovinou",
        items: [
            { name: "Korma Light – svetlá 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – tmavá 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Iné",
        items: [
            { name: "Radler (miešaný) 0,5 l", price: "2,60 €" },
            { name: "Cider Strongbow (apple / dark fruit / grep) 0,44 l", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Nealko Pivo",
        items: [
            { name: "Bernard (klasický / višňa / slivka) 0,5 l", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Nealko – Nápoje",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 l / 0,5 l)", price: "3,30 € / 1,80 €" },
            { name: "Citronáda", price: "5,80 € / 3,00 €" },
            { name: "Limonáda (podľa ponuky)", price: "3,20 €" },
            { name: "Domáci ľadový čaj 0,5 l", price: "3,20 €" },
            { name: "Džús Toma (pomaranč / jablko / jahoda / ananás)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Sóda", price: "0,40 €" },
            { name: "Maté lime 0,33 l", price: "2,50 €" },
            { name: "Ginger beer 0,33 l", price: "2,70 €" },
            { name: "Pink Tonic 0,33 l", price: "2,70 €" },
            { name: "Red Bull 0,33 l", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Káva & Čaj",
        items: [
            { name: "Espresso / Doppio", price: "1,60 € / 2,80 €" },
            { name: "Cappuccino / ochutené (hazelnut / kokos / almond)", price: "2,80 € / 3,00 €" },
            { name: "Caffé Latte", price: "2,80 €" },
            { name: "Ľadová káva", price: "3,20 €" },
            { name: "Espresso Tonic", price: "2,60 €" },
            { name: "Kakavko (Granko, mlieko, šľahačka, mandle)", price: "3,50 €" },
            { name: "Sypaný čaj (zelený / zázvorový / mätový)", price: "2,80 €" },
            { name: "Porciovaný čaj (čierny / ovocný / zelený / mätový)", price: "1,60 €" },
            { name: "Pečený čaj – rôzne", price: "2,90 €" },
            { name: "Mlieko / bezlaktózové / med / citrón", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 House Drinks",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Absinth Euphoria, Fruit Liquor, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Passion fruit likér, Fizz, Lime fresh, Monin Grenadine" },
            { name: "Sith", price: "6,60 €", description: "Vodka Absolut, Passoa, Jahodový džús, Lime fresh, Monin Peach" },
            { name: "Soul Stone", price: "5,80 €", description: "Likér Jägermeister, Triple sec, Citrus fresh, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Rum Bacardi, Ananásový džús, Mlieko, Orange fresh, Monin Coconut" },
            { name: "Pink Panther", price: "6,20 €", description: "Gin Beefeater Pink, Passoa, Lime fresh, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Rum Bacardi, Bailey’s Salted Caramel, Disaronno Amaretto, Mlieko, Monin Hazelnut" },
        ]
    },
    {
        name: "🧙 Fantasy Cocktails",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Zlatá Tequila, Triple Sec, Pomarančový džús, Monin Grenadine" },
            { name: "Ravenclaw", price: "6,20 €", description: "Gin Beefeater, Jahodový džús, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Rum Bacardi, Jablkový & Pomarančový džús, Monin Litchi" },
            { name: "Slytherin", price: "6,60 €", description: "Vodka Absolut, Triple Sec Cointreau, Pomarančový džús, Lime fresh, Monin Curaçao & Passion fruit" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Vodka Absolut, Malibu, Mlieko, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Spišská Borovička, Pomarančový džús, Red Bull" },
            { name: "Virgin variants", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Tradičné Cocktaily",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour s bielkom / bez", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour s bielkom / bez", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Rum",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Filipíny", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37,5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Gin",
        items: [
            { name: "Lúčny 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink jahoda 37,5%", price: "3,50 €" },
            { name: "Malfy Rosa grep 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Whisk(e)y",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Borievky",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínska Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Vodka",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Tequila",
        items: [
            { name: "Strieborná 40% (citrón & soľ)", price: "3,40 €" },
            { name: "Zlatá 40% (pomaranč & škorica)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Destiláty",
        items: [
            { name: "Hruškovica 42%", price: "3,60 €" },
            { name: "Marhuľovica 45%", price: "3,70 €" },
            { name: "Slivovica 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Likéry",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "Pepermintový likér 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Absinth",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Nealko Miešané Nápoje",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Mlieko, Ananásový džús, Pomarančový fresh, Kokosový sirup" },
            { name: "Monte (7)", price: "3,90 €", description: "Mlieko, Orieškový sirup, Granko, Šľahačka, Bueno, Mandle" },
            { name: "Luffy", price: "3,60 €", description: "Pomarančový džús, Monin Grenadina & Maracuja, Lime fresh" },
            { name: "Powder", price: "3,60 €", description: "Monin Kiwi & Curaçao, Lime fresh, Sóda, Kyslé rybičky" },
            { name: "Healthy Potion", price: "3,40 €", description: "Jablkový džús, Jahodový sirup, Citrus fresh, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Broskyňový džús, Litchi sirup, Citrusový fresh" },
            { name: "Legendárna Impotencia", price: "2,90 €", description: "Jahodový džús, Sóda" },
            { name: "Slytherin", price: "3,60 €", description: "Pomarančový piadidžús, Sirup z hadích šupín, Prášok z mesačných kameňov" },
        ]
    },
    {
        name: "🍷 Víno & Medovina",
        description: "(ceny sú uvedené za 1 dl, ak nie je uvedené inak)",
        items: [
            { name: "Biele", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – suché 12%", price: "2,00 €" },
            { name: "Tureček – Rizling Vlašský – polosladké 12%", price: "2,00 €" },
            { name: "fľaša 0,75 l", price: "15 €" },
            { name: "Červené", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – suché 13,5%", price: "2,00 €" },
            { name: "fľaša 0,75 l", price: "15 €" },
            { name: "Ovocné", isSubheader: true },
            { name: "Miluron – Baza / Višňa", price: "2,10 €" },
            { name: "fľaša 0,75 l", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "fľaša 0,75 l", price: "16 €" },
            { name: "Medovina", isSubheader: true },
            { name: "Apimed Trnavská medovina 13,5%", price: "2,20 €" },
            { name: "fľaša 0,75 l", price: "18 €" },
        ]
    },
    {
        name: "🍿 Pochutiny",
        items: [
            { name: "Čipsy Lay’s 55–60 g (1, 6, 7) solené / paprikové / fromage / BBQ / syr & cayenne", price: "1,70 €" },
            { name: "Čipsy Lay’s pečené 110 g (1, 6, 7) bylinkové / grilovaná zelenina", price: "2,20 €" },
            { name: "Chrumky arašidové 60 g (5)", price: "1,60 €" },
            { name: "Tyčinky 45 g (1, 7, 9)", price: "1,20 €" },
            { name: "Arašidy 100 g (5)", price: "1,60 €" },
            { name: "Horalky 50 g (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 g (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ],
  en: [
    {
        name: "🍺 Beer",
        description: "(0.5 l / 0.3 l)",
        items: [
            { name: "Urpiner 11° – light", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – light", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – light", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – dark", price: "2,40 € / 1,90 €" },
            { name: "Beer Special", price: "by offer" },
        ],
    },
    {
        name: "🍯 Beer with Mead",
        items: [
            { name: "Korma Light – light 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – dark 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Other",
        items: [
            { name: "Radler (mixed) 0.5 l", price: "2,60 €" },
            { name: "Cider Strongbow (apple / dark fruit / grapefruit) 0.44 l", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Non-alcoholic Beer",
        items: [
            { name: "Bernard (classic / cherry / plum) 0.5 l", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Soft Drinks",
        description: "(0.5 l / 0.3 l)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 l / 0.5 l)", price: "3,30 € / 1,80 €" },
            { name: "Lemonade", price: "5,80 € / 3,00 €" },
            { name: "Lemonade (by offer)", price: "3,20 €" },
            { name: "Homemade Iced Tea 0.5 l", price: "3,20 €" },
            { name: "Toma Juice (orange / apple / strawberry / pineapple)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Soda", price: "0,40 €" },
            { name: "Maté lime 0.33 l", price: "2,50 €" },
            { name: "Ginger beer 0.33 l", price: "2,70 €" },
            { name: "Pink Tonic 0.33 l", price: "2,70 €" },
            { name: "Red Bull 0.33 l", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Coffee & Tea",
        items: [
            { name: "Espresso / Doppio", price: "1,60 € / 2,80 €" },
            { name: "Cappuccino / flavored (hazelnut / coconut / almond)", price: "2,80 € / 3,00 €" },
            { name: "Caffé Latte", price: "2,80 €" },
            { name: "Iced Coffee", price: "3,20 €" },
            { name: "Espresso Tonic", price: "2,60 €" },
            { name: "Cocoa (Granko, milk, whipped cream, almonds)", price: "3,50 €" },
            { name: "Loose-leaf Tea (green / ginger / mint)", price: "2,80 €" },
            { name: "Portioned Tea (black / fruit / green / mint)", price: "1,60 €" },
            { name: "Baked Tea – various", price: "2,90 €" },
            { name: "Milk / lactose-free / honey / lemon", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 House Drinks",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Absinth Euphoria, Fruit Liquor, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Passion fruit liqueur, Fizz, Fresh lime, Monin Grenadine" },
            { name: "Sith", price: "6,60 €", description: "Absolut Vodka, Passoa, Strawberry juice, Fresh lime, Monin Peach" },
            { name: "Soul Stone", price: "5,80 €", description: "Jägermeister Liqueur, Triple sec, Fresh citrus, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Bacardi Rum, Pineapple juice, Milk, Fresh orange, Monin Coconut" },
            { name: "Pink Panther", price: "6,20 €", description: "Beefeater Pink Gin, Passoa, Fresh lime, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Bacardi Rum, Bailey’s Salted Caramel, Disaronno Amaretto, Milk, Monin Hazelnut" },
        ]
    },
    {
        name: "🧙 Fantasy Cocktails",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Gold Tequila, Triple Sec, Orange juice, Monin Grenadine" },
            { name: "Ravenclaw", price: "6,20 €", description: "Beefeater Gin, Strawberry juice, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Bacardi Rum, Apple & Orange juice, Monin Litchi" },
            { name: "Slytherin", price: "6,60 €", description: "Absolut Vodka, Triple Sec Cointreau, Orange juice, Fresh lime, Monin Curaçao & Passion fruit" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Absolut Vodka, Malibu, Milk, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Spišská Borovička, Orange juice, Red Bull" },
            { name: "Virgin variants", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Traditional Cocktails",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour with/without egg white", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour with/without egg white", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Rum",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Philippines", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37.5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Gin",
        items: [
            { name: "Lúčny (Meadow) 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink Strawberry 37.5%", price: "3,50 €" },
            { name: "Malfy Rosa Grapefruit 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Whisk(e)y",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Borovička (Juniper Spirit)",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínska Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Vodka",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Tequila",
        items: [
            { name: "Silver 40% (lemon & salt)", price: "3,40 €" },
            { name: "Gold 40% (orange & cinnamon)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Spirits",
        items: [
            { name: "Hruškovica (Pear) 42%", price: "3,60 €" },
            { name: "Marhuľovica (Apricot) 45%", price: "3,70 €" },
            { name: "Slivovica (Plum) 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Liqueurs",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "Peppermint Liqueur 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Absinthe",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Non-alcoholic Mixed Drinks",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Milk, Pineapple juice, Fresh orange, Coconut syrup" },
            { name: "Monte (7)", price: "3,90 €", description: "Milk, Hazelnut syrup, Cocoa powder, Whipped cream, Bueno, Almonds" },
            { name: "Luffy", price: "3,60 €", description: "Orange juice, Monin Grenadine & Passion fruit, Fresh lime" },
            { name: "Powder", price: "3,60 €", description: "Monin Kiwi & Curaçao, Fresh lime, Soda, Sour fish candy" },
            { name: "Healthy Potion", price: "3,40 €", description: "Apple juice, Strawberry syrup, Fresh citrus, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Peach juice, Litchi syrup, Fresh citrus" },
            { name: "Legendary Impotence", price: "2,90 €", description: "Strawberry juice, Soda" },
            { name: "Slytherin", price: "3,60 €", description: "Orange \"piadidžús\", Syrup of snake scales, Powder of moonstones" },
        ]
    },
    {
        name: "🍷 Wine & Mead",
        description: "(prices shown for 1 dl unless stated otherwise)",
        items: [
            { name: "White", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – dry 12%", price: "2,00 €" },
            { name: "Tureček – Welschriesling – semi-sweet 12%", price: "2,00 €" },
            { name: "bottle 0.75 l", price: "15 €" },
            { name: "Red", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – dry 13.5%", price: "2,00 €" },
            { name: "bottle 0.75 l", price: "15 €" },
            { name: "Fruit", isSubheader: true },
            { name: "Miluron – Elderflower / Cherry", price: "2,10 €" },
            { name: "bottle 0.75 l", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "bottle 0.75 l", price: "16 €" },
            { name: "Mead", isSubheader: true },
            { name: "Apimed Trnava Mead 13.5%", price: "2,20 €" },
            { name: "bottle 0.75 l", price: "18 €" },
        ]
    },
    {
        name: "🍿 Snacks",
        items: [
            { name: "Lay’s Chips 55–60 g (1, 6, 7) salted / paprika / fromage / BBQ / cheese & cayenne", price: "1,70 €" },
            { name: "Lay’s Baked Chips 110 g (1, 6, 7) herbs / grilled vegetables", price: "2,20 €" },
            { name: "Peanut Puffs 60 g (5)", price: "1,60 €" },
            { name: "Salty Sticks 45 g (1, 7, 9)", price: "1,20 €" },
            { name: "Peanuts 100 g (5)", price: "1,60 €" },
            { name: "Horalky 50 g (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 g (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ],
  cs: [
    {
        name: "🍺 Pivo",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Urpiner 11° – světlé", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – světlé", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – světlé", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – tmavé", price: "2,40 € / 1,90 €" },
            { name: "Pivní speciál", price: "dle nabídky" },
        ],
    },
    {
        name: "🍯 Pivo s medovinou",
        items: [
            { name: "Korma Light – světlá 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – tmavá 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Jiné",
        items: [
            { name: "Radler (míchaný) 0,5 l", price: "2,60 €" },
            { name: "Cider Strongbow (jablko / tmavé ovoce / grep) 0,44 l", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Nealko Pivo",
        items: [
            { name: "Bernard (klasický / višeň / švestka) 0,5 l", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Nealko – Nápoje",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 l / 0,5 l)", price: "3,30 € / 1,80 €" },
            { name: "Citronáda", price: "5,80 € / 3,00 €" },
            { name: "Limonáda (dle nabídky)", price: "3,20 €" },
            { name: "Domácí ledový čaj 0,5 l", price: "3,20 €" },
            { name: "Džus Toma (pomeranč / jablko / jahoda / ananas)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Sóda", price: "0,40 €" },
            { name: "Maté lime 0,33 l", price: "2,50 €" },
            { name: "Ginger beer 0,33 l", price: "2,70 €" },
            { name: "Pink Tonic 0,33 l", price: "2,70 €" },
            { name: "Red Bull 0,33 l", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Káva & Čaj",
        items: [
            { name: "Espresso / Doppio", price: "1,60 € / 2,80 €" },
            { name: "Cappuccino / ochucené (lískový ořech / kokos / mandle)", price: "2,80 € / 3,00 €" },
            { name: "Caffé Latte", price: "2,80 €" },
            { name: "Ledová káva", price: "3,20 €" },
            { name: "Espresso Tonic", price: "2,60 €" },
            { name: "Kakao (Granko, mléko, šlehačka, mandle)", price: "3,50 €" },
            { name: "Sypaný čaj (zelený / zázvorový / mátový)", price: "2,80 €" },
            { name: "Porcovaný čaj (černý / ovocný / zelený / mátový)", price: "1,60 €" },
            { name: "Pečený čaj – různé", price: "2,90 €" },
            { name: "Mléko / bezlaktózové / med / citron", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 Domácí drinky",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Absinth Euphoria, Ovocný likér, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Maracujový likér, Fizz, Limetkový fresh, Monin Grenadina" },
            { name: "Sith", price: "6,60 €", description: "Vodka Absolut, Passoa, Jahodový džus, Limetkový fresh, Monin Broskev" },
            { name: "Soul Stone", price: "5,80 €", description: "Likér Jägermeister, Triple sec, Citrusový fresh, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Rum Bacardi, Ananasový džus, Mléko, Pomerančový fresh, Monin Kokos" },
            { name: "Pink Panther", price: "6,20 €", description: "Gin Beefeater Pink, Passoa, Limetkový fresh, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Rum Bacardi, Bailey’s Salted Caramel, Disaronno Amaretto, Mléko, Monin Lískový ořech" },
        ]
    },
    {
        name: "🧙 Fantasy koktejly",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Zlatá Tequila, Triple Sec, Pomerančový džus, Monin Grenadina" },
            { name: "Ravenclaw", price: "6,20 €", description: "Gin Beefeater, Jahodový džus, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Rum Bacardi, Jablečný & Pomerančový džus, Monin Litchi" },
            { name: "Slytherin", price: "6,60 €", description: "Vodka Absolut, Triple Sec Cointreau, Pomerančový džus, Limetkový fresh, Monin Curaçao & Maracuja" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Vodka Absolut, Malibu, Mléko, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Spišská Borovička, Pomerančový džus, Red Bull" },
            { name: "Virgin variants", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Tradiční koktejly",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour s bílkem / bez", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour s bílkem / bez", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Rum",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Filipíny", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37,5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Gin",
        items: [
            { name: "Lúčny 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink jahoda 37,5%", price: "3,50 €" },
            { name: "Malfy Rosa grep 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Whisk(e)y",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Jalovcová",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínská Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Vodka",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Tequila",
        items: [
            { name: "Stříbrná 40% (citron & sůl)", price: "3,40 €" },
            { name: "Zlatá 40% (pomeranč & skořice)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Destiláty",
        items: [
            { name: "Hruškovice 42%", price: "3,60 €" },
            { name: "Meruňkovice 45%", price: "3,70 €" },
            { name: "Slivovice 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Likéry",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "Pepermintový likér 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Absint",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Nealko Míchané Nápoje",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Mléko, Ananasový džus, Pomerančový fresh, Kokosový sirup" },
            { name: "Monte (7)", price: "3,90 €", description: "Mléko, Lískooříškový sirup, Granko, Šlehačka, Bueno, Mandle" },
            { name: "Luffy", price: "3,60 €", description: "Pomerančový džus, Monin Grenadina & Maracuja, Limetkový fresh" },
            { name: "Powder", price: "3,60 €", description: "Monin Kiwi & Curaçao, Limetkový fresh, Soda, Kyselé rybičky" },
            { name: "Healthy Potion", price: "3,40 €", description: "Jablečný džus, Jahodový sirup, Citrusový fresh, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Broskvový džus, Litchi sirup, Citrusový fresh" },
            { name: "Legendární Impotence", price: "2,90 €", description: "Jahodový džus, Soda" },
            { name: "Slytherin", price: "3,60 €", description: "Pomerančový \"piadidžus\", Sirup z hadích šupin, Prášek z měsíčních kamenů" },
        ]
    },
    {
        name: "🍷 Víno & Medovina",
        description: "(ceny jsou uvedeny za 1 dl, pokud není uvedeno jinak)",
        items: [
            { name: "Bílé", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – suché 12%", price: "2,00 €" },
            { name: "Tureček – Ryzlink Vlašský – polosladké 12%", price: "2,00 €" },
            { name: "láhev 0,75 l", price: "15 €" },
            { name: "Červené", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – suché 13,5%", price: "2,00 €" },
            { name: "láhev 0,75 l", price: "15 €" },
            { name: "Ovocné", isSubheader: true },
            { name: "Miluron – Bez / Višeň", price: "2,10 €" },
            { name: "láhev 0,75 l", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "láhev 0,75 l", price: "16 €" },
            { name: "Medovina", isSubheader: true },
            { name: "Apimed Trnavská medovina 13,5%", price: "2,20 €" },
            { name: "láhev 0,75 l", price: "18 €" },
        ]
    },
    {
        name: "🍿 Pochutiny",
        items: [
            { name: "Chipsy Lay’s 55–60 g (1, 6, 7) solené / paprikové / fromage / BBQ / sýr & kajenský pepř", price: "1,70 €" },
            { name: "Chipsy Lay’s pečené 110 g (1, 6, 7) bylinkové / grilovaná zelenina", price: "2,20 €" },
            { name: "Arašídové křupky 60 g (5)", price: "1,60 €" },
            { name: "Tyčinky 45 g (1, 7, 9)", price: "1,20 €" },
            { name: "Arašídy 100 g (5)", price: "1,60 €" },
            { name: "Horalky 50 g (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 g (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ],
  uk: [
    {
        name: "🍺 Пиво",
        description: "(0,5 л / 0,3 л)",
        items: [
            { name: "Urpiner 11° – світле", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – світле", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – світле", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – темне", price: "2,40 € / 1,90 €" },
            { name: "Пивний спеціалітет", price: "за пропозицією" },
        ],
    },
    {
        name: "🍯 Пиво з медом",
        items: [
            { name: "Korma Light – світле 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – темне 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Інше",
        items: [
            { name: "Радлер (змішаний) 0,5 л", price: "2,60 €" },
            { name: "Сидр Strongbow (яблуко / темні фрукти / грейпфрут) 0,44 л", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Безалкогольне пиво",
        items: [
            { name: "Bernard (класичний / вишня / слива) 0,5 л", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Безалкогольні напої",
        description: "(0,5 л / 0,3 л)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 л / 0,5 л)", price: "3,30 € / 1,80 €" },
            { name: "Лимонад", price: "5,80 € / 3,00 €" },
            { name: "Лимонад (за пропозицією)", price: "3,20 €" },
            { name: "Домашній холодний чай 0,5 л", price: "3,20 €" },
            { name: "Сік Toma (апельсин / яблуко / полуниця / ананас)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Содова", price: "0,40 €" },
            { name: "Мате лайм 0,33 л", price: "2,50 €" },
            { name: "Імбирне пиво 0,33 л", price: "2,70 €" },
            { name: "Рожевий тонік 0,33 л", price: "2,70 €" },
            { name: "Red Bull 0,33 л", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Кава та чай",
        items: [
            { name: "Еспресо / Доппіо", price: "1,60 € / 2,80 €" },
            { name: "Капучино / з ароматом (лісовий горіх / кокос / мигдаль)", price: "2,80 € / 3,00 €" },
            { name: "Кафе-латте", price: "2,80 €" },
            { name: "Холодна кава", price: "3,20 €" },
            { name: "Еспресо-тонік", price: "2,60 €" },
            { name: "Какао (Granko, молоко, збиті вершки, мигдаль)", price: "3,50 €" },
            { name: "Розсипний чай (зелений / імбирний / м'ятний)", price: "2,80 €" },
            { name: "Порційний чай (чорний / фруктовий / зелений / м'ятний)", price: "1,60 €" },
            { name: "Печений чай – різні", price: "2,90 €" },
            { name: "Молоко / безлактозне / мед / лимон", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 Фірмові напої",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Абсент Euphoria, Фруктовий лікер, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Лікер з маракуї, Fizz, Свіжий лайм, Monin Grenadine" },
            { name: "Sith", price: "6,60 €", description: "Горілка Absolut, Passoa, Полуничний сік, Свіжий лайм, Monin Peach" },
            { name: "Soul Stone", price: "5,80 €", description: "Лікер Jägermeister, Triple sec, Свіжий цитрус, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Ром Bacardi, Ананасовий сік, Молоко, Свіжий апельсин, Monin Coconut" },
            { name: "Pink Panther", price: "6,20 €", description: "Джин Beefeater Pink, Passoa, Свіжий лайм, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Ром Bacardi, Bailey’s Salted Caramel, Disaronno Amaretto, Молоко, Monin Hazelnut" },
        ]
    },
    {
        name: "🧙 Фентезі-коктейлі",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Золота Текіла, Triple Sec, Апельсиновий сік, Monin Grenadine" },
            { name: "Ravenclaw", price: "6,20 €", description: "Джин Beefeater, Полуничний сік, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Ром Bacardi, Яблучний та апельсиновий сік, Monin Litchi" },
            { name: "Slytherin", price: "6,60 €", description: "Горілка Absolut, Triple Sec Cointreau, Апельсиновий сік, Свіжий лайм, Monin Curaçao & Маракуя" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Горілка Absolut, Malibu, Молоко, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Спишська Боровичка, Апельсиновий сік, Red Bull" },
            { name: "Virgin variants", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Традиційні коктейлі",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour з/без білка", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour з/без білка", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Ром",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Philippines", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37.5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Джин",
        items: [
            { name: "Lúčny (Луговий) 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink полуниця 37.5%", price: "3,50 €" },
            { name: "Malfy Rosa грейпфрут 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Віскі",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Боровичка (Ялівцева горілка)",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínska Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Горілка",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Текіла",
        items: [
            { name: "Срібна 40% (лимон і сіль)", price: "3,40 €" },
            { name: "Золота 40% (апельсин і кориця)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Дистиляти",
        items: [
            { name: "Hruškovica (Грушева) 42%", price: "3,60 €" },
            { name: "Marhuľovica (Абрикосова) 45%", price: "3,70 €" },
            { name: "Slivovica (Сливова) 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Лікери",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "М'ятний лікер 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Абсент",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Безалкогольні змішані напої",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Молоко, Ананасовий сік, Свіжий апельсин, Кокосовий сироп" },
            { name: "Monte (7)", price: "3,90 €", description: "Молоко, Горіховий сироп, Какао-порошок, Збиті вершки, Bueno, Мигдаль" },
            { name: "Luffy", price: "3,60 €", description: "Апельсиновий сік, Monin Grenadine & Маракуя, Свіжий лайм" },
            { name: "Powder", price: "3,60 €", description: "Monin Kiwi & Curaçao, Свіжий лайм, Содова, Кислі рибки" },
            { name: "Healthy Potion", price: "3,40 €", description: "Яблучний сік, Полуничний сироп, Свіжий цитрус, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Персиковий сік, Сироп лічі, Свіжий цитрус" },
            { name: "Legendary Impotence", price: "2,90 €", description: "Полуничний сік, Содова" },
            { name: "Slytherin", price: "3,60 €", description: "Апельсиновий \"piadidžus\", Сироп зі зміїної луски, Порошок з місячних каменів" },
        ]
    },
    {
        name: "🍷 Вино та мед",
        description: "(ціни вказані за 1 дл, якщо не вказано інше)",
        items: [
            { name: "Біле", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – сухе 12%", price: "2,00 €" },
            { name: "Tureček – Welschriesling – напівсолодке 12%", price: "2,00 €" },
            { name: "пляшка 0,75 л", price: "15 €" },
            { name: "Червоне", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – сухе 13.5%", price: "2,00 €" },
            { name: "пляшка 0,75 л", price: "15 €" },
            { name: "Фруктове", isSubheader: true },
            { name: "Miluron – Бузина / Вишня", price: "2,10 €" },
            { name: "пляшка 0,75 л", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "пляшка 0,75 л", price: "16 €" },
            { name: "Мед", isSubheader: true },
            { name: "Apimed Trnava Мед 13.5%", price: "2,20 €" },
            { name: "пляшка 0,75 л", price: "18 €" },
        ]
    },
    {
        name: "🍿 Закуски",
        items: [
            { name: "Чіпси Lay’s 55–60 г (1, 6, 7) солені / паприка / fromage / BBQ / сир і каєнський перець", price: "1,70 €" },
            { name: "Печені чіпси Lay’s 110 г (1, 6, 7) трави / грильовані овочі", price: "2,20 €" },
            { name: "Арахісові палички 60 г (5)", price: "1,60 €" },
            { name: "Солоні палички 45 г (1, 7, 9)", price: "1,20 €" },
            { name: "Арахіс 100 г (5)", price: "1,60 €" },
            { name: "Horalky 50 г (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 г (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ],
  pl: [
    {
        name: "🍺 Piwo",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Urpiner 11° – jasne", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – jasne", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – jasne", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – ciemne", price: "2,40 € / 1,90 €" },
            { name: "Specjał piwny", price: "wg oferty" },
        ],
    },
    {
        name: "🍯 Piwo z miodem",
        items: [
            { name: "Korma Light – jasne 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – ciemne 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Inne",
        items: [
            { name: "Radler (mieszany) 0,5 l", price: "2,60 €" },
            { name: "Cydr Strongbow (jabłkowy / ciemne owoce / grejpfrut) 0,44 l", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Piwo bezalkoholowe",
        items: [
            { name: "Bernard (klasyczny / wiśnia / śliwka) 0,5 l", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Napoje bezalkoholowe",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 l / 0,5 l)", price: "3,30 € / 1,80 €" },
            { name: "Lemoniada", price: "5,80 € / 3,00 €" },
            { name: "Lemoniada (wg oferty)", price: "3,20 €" },
            { name: "Domowa mrożona herbata 0,5 l", price: "3,20 €" },
            { name: "Sok Toma (pomarańczowy / jabłkowy / truskawkowy / ananasowy)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Woda sodowa", price: "0,40 €" },
            { name: "Maté lime 0,33 l", price: "2,50 €" },
            { name: "Piwo imbirowe 0,33 l", price: "2,70 €" },
            { name: "Różowy tonik 0,33 l", price: "2,70 €" },
            { name: "Red Bull 0,33 l", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Kawa i herbata",
        items: [
            { name: "Espresso / Doppio", price: "1,60 € / 2,80 €" },
            { name: "Cappuccino / smakowe (orzech laskowy / kokos / migdał)", price: "2,80 € / 3,00 €" },
            { name: "Caffé Latte", price: "2,80 €" },
            { name: "Kawa mrożona", price: "3,20 €" },
            { name: "Espresso Tonic", price: "2,60 €" },
            { name: "Kakao (Granko, mleko, bita śmietana, migdały)", price: "3,50 €" },
            { name: "Herbata sypana (zielona / imbirowa / miętowa)", price: "2,80 €" },
            { name: "Herbata w torebkach (czarna / owocowa / zielona / miętowa)", price: "1,60 €" },
            { name: "Herbata pieczona – różne", price: "2,90 €" },
            { name: "Mleko / bezlaktozowe / miód / cytryna", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 Drinki domowe",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Absynt Euphoria, Likier owocowy, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Likier z marakui, Fizz, Świeża limonka, Monin Grenadine" },
            { name: "Sith", price: "6,60 €", description: "Wódka Absolut, Passoa, Sok truskawkowy, Świeża limonka, Monin Brzoskwinia" },
            { name: "Soul Stone", price: "5,80 €", description: "Likier Jägermeister, Triple sec, Świeży cytrus, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Rum Bacardi, Sok ananasowy, Mleko, Świeża pomarańcza, Monin Kokos" },
            { name: "Pink Panther", price: "6,20 €", description: "Gin Beefeater Pink, Passoa, Świeża limonka, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Rum Bacardi, Bailey’s Salted Caramel, Disaronno Amaretto, Mleko, Monin Orzech laskowy" },
        ]
    },
    {
        name: "🧙 Koktajle fantasy",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Złota Tequila, Triple Sec, Sok pomarańczowy, Monin Grenadine" },
            { name: "Ravenclaw", price: "6,20 €", description: "Gin Beefeater, Sok truskawkowy, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Rum Bacardi, Sok jabłkowy i pomarańczowy, Monin Liczi" },
            { name: "Slytherin", price: "6,60 €", description: "Wódka Absolut, Triple Sec Cointreau, Sok pomarańczowy, Świeża limonka, Monin Curaçao & Marakuja" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Wódka Absolut, Malibu, Mleko, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Spišská Borovička, Sok pomarańczowy, Red Bull" },
            { name: "Warianty Virgin", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Tradycyjne koktajle",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour z/bez białka", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour z/bez białka", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Rum",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Filipiny", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37,5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Gin",
        items: [
            { name: "Lúčny (Łąkowy) 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink truskawka 37,5%", price: "3,50 €" },
            { name: "Malfy Rosa grejpfrut 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Whisk(e)y",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Jałowcówka",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínska Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Wódka",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Tequila",
        items: [
            { name: "Srebrna 40% (cytryna i sól)", price: "3,40 €" },
            { name: "Złota 40% (pomarańcza i cynamon)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Destylaty",
        items: [
            { name: "Hruškovica (Gruszkówka) 42%", price: "3,60 €" },
            { name: "Marhuľovica (Morelówka) 45%", price: "3,70 €" },
            { name: "Slivovica (Śliwowica) 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Likiery",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "Likier miętowy 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Absynt",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Bezalkoholowe napoje mieszane",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Mleko, Sok ananasowy, Świeża pomarańcza, Syrop kokosowy" },
            { name: "Monte (7)", price: "3,90 €", description: "Mleko, Syrop orzechowy, Kakao, Bita śmietana, Bueno, Migdały" },
            { name: "Luffy", price: "3,60 €", description: "Sok pomarańczowy, Monin Grenadyna i Marakuja, Świeża limonka" },
            { name: "Powder", price: "3,60 €", description: "Monin Kiwi i Curaçao, Świeża limonka, Woda sodowa, Kwaśne rybki" },
            { name: "Healthy Potion", price: "3,40 €", description: "Sok jabłkowy, Syrop truskawkowy, Świeży cytrus, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Sok brzoskwiniowy, Syrop liczi, Świeży cytrus" },
            { name: "Legendarna impotencja", price: "2,90 €", description: "Sok truskawkowy, Woda sodowa" },
            { name: "Slytherin", price: "3,60 €", description: "Pomarańczowy \"piadidżus\", Syrop z łusek węża, Proszek z kamieni księżycowych" },
        ]
    },
    {
        name: "🍷 Wino i miód pitny",
        description: "(ceny podane za 1 dl, chyba że podano inaczej)",
        items: [
            { name: "Białe", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – wytrawne 12%", price: "2,00 €" },
            { name: "Tureček – Ryzlink Włoski – półsłodkie 12%", price: "2,00 €" },
            { name: "butelka 0,75 l", price: "15 €" },
            { name: "Czerwone", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – wytrawne 13,5%", price: "2,00 €" },
            { name: "butelka 0,75 l", price: "15 €" },
            { name: "Owocowe", isSubheader: true },
            { name: "Miluron – Bez / Wiśnia", price: "2,10 €" },
            { name: "butelka 0,75 l", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "butelka 0,75 l", price: "16 €" },
            { name: "Miód pitny", isSubheader: true },
            { name: "Apimed Trnawski miód pitny 13,5%", price: "2,20 €" },
            { name: "butelka 0,75 l", price: "18 €" },
        ]
    },
    {
        name: "🍿 Przekąski",
        items: [
            { name: "Chipsy Lay’s 55–60 g (1, 6, 7) solone / paprykowe / fromage / BBQ / ser i cayenne", price: "1,70 €" },
            { name: "Chipsy Lay’s pieczone 110 g (1, 6, 7) ziołowe / grillowane warzywa", price: "2,20 €" },
            { name: "Chrupki orzechowe 60 g (5)", price: "1,60 €" },
            { name: "Paluszki 45 g (1, 7, 9)", price: "1,20 €" },
            { name: "Orzeszki ziemne 100 g (5)", price: "1,60 €" },
            { name: "Horalky 50 g (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 g (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ],
  hu: [
    {
        name: "🍺 Sör",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Urpiner 11° – világos", price: "2,20 € / 1,70 €" },
            { name: "Urpiner Premium 12° – világos", price: "2,40 € / 1,90 €" },
            { name: "Urpiner Extra 14° – világos", price: "2,80 € / 2,30 €" },
            { name: "Urpiner Dark 11° – barna", price: "2,40 € / 1,90 €" },
            { name: "Sörkülönlegesség", price: "ajánlat szerint" },
        ],
    },
    {
        name: "🍯 Sör mézzel",
        items: [
            { name: "Korma Light – világos 12°", price: "3,20 € / 2,70 €" },
            { name: "Darth Korma – barna 11°", price: "3,20 € / 2,70 €" },
        ],
    },
    {
        name: "🍺 Egyéb",
        items: [
            { name: "Radler (kevert) 0,5 l", price: "2,60 €" },
            { name: "Cider Strongbow (alma / sötét gyümölcs / grapefruit) 0,44 l", price: "2,60 €" },
        ],
    },
    {
        name: "🚫 Alkoholmentes sör",
        items: [
            { name: "Bernard (klasszikus / meggy / szilva) 0,5 l", price: "2,50 €" },
        ],
    },
    {
        name: "🥤 Üdítők",
        description: "(0,5 l / 0,3 l)",
        items: [
            { name: "Kofola", price: "1,90 € / 1,40 €" },
            { name: "Kofola (1 l / 0,5 l)", price: "3,30 € / 1,80 €" },
            { name: "Limonádé", price: "5,80 € / 3,00 €" },
            { name: "Limonádé (ajánlat szerint)", price: "3,20 €" },
            { name: "Házi jeges tea 0,5 l", price: "3,20 €" },
            { name: "Toma gyümölcslé (narancs / alma / eper / ananász)", price: "0,70 €" },
            { name: "Pepsi / Pepsi Max / 7up / Tonic", price: "0,70 €" },
            { name: "Szóda", price: "0,40 €" },
            { name: "Maté lime 0,33 l", price: "2,50 €" },
            { name: "Gyömbérsör 0,33 l", price: "2,70 €" },
            { name: "Rózsaszín tonik 0,33 l", price: "2,70 €" },
            { name: "Red Bull 0,33 l", price: "3,00 €" },
        ],
    },
    {
        name: "☕ Kávé és tea",
        items: [
            { name: "Eszpresszó / Dupla", price: "1,60 € / 2,80 €" },
            { name: "Cappuccino / ízesített (mogyoró / kókusz / mandula)", price: "2,80 € / 3,00 €" },
            { name: "Caffé Latte", price: "2,80 €" },
            { name: "Jeges kávé", price: "3,20 €" },
            { name: "Eszpresszó tonik", price: "2,60 €" },
            { name: "Kakaó (Granko, tej, tejszínhab, mandula)", price: "3,50 €" },
            { name: "Szálas tea (zöld / gyömbér / menta)", price: "2,80 €" },
            { name: "Filteres tea (fekete / gyümölcs / zöld / menta)", price: "1,60 €" },
            { name: "Sült tea – különböző", price: "2,90 €" },
            { name: "Tej / laktózmentes / méz / citrom", price: "0,30 €" },
        ]
    },
    {
        name: "🍸 Házi italok",
        items: [
            { name: "Mana Potion", price: "6,40 €", description: "Abszint Euphoria, Gyümölcslikőr, Fizz, Monin Curaçao" },
            { name: "Health Potion", price: "5,60 €", description: "Maracuja likőr, Fizz, Friss lime, Monin Grenadine" },
            { name: "Sith", price: "6,60 €", description: "Absolut Vodka, Passoa, Eperlé, Friss lime, Monin Barack" },
            { name: "Soul Stone", price: "5,80 €", description: "Jägermeister likőr, Triple sec, Friss citrus, 7UP" },
            { name: "Mr. Poopybutthole’s Piña Colada (7)", price: "6,50 €", description: "Bacardi Rum, Ananászlé, Tej, Friss narancs, Monin Kókusz" },
            { name: "Pink Panther", price: "6,20 €", description: "Beefeater Pink Gin, Passoa, Friss lime, 7UP" },
            { name: "Kozmodróm (7)", price: "6,40 €", description: "Bacardi Rum, Bailey’s Salted Caramel, Disaronno Amaretto, Tej, Monin Mogyoró" },
        ]
    },
    {
        name: "🧙 Fantasy koktélok",
        items: [
            { name: "Gryffindor", price: "6,40 €", description: "Arany Tequila, Triple Sec, Narancslé, Monin Grenadine" },
            { name: "Ravenclaw", price: "6,20 €", description: "Beefeater Gin, Eperlé, Fizz, Monin Curaçao" },
            { name: "Hufflepuff", price: "6,20 €", description: "Bacardi Rum, Alma- és narancslé, Monin Licsi" },
            { name: "Slytherin", price: "6,60 €", description: "Absolut Vodka, Triple Sec Cointreau, Narancslé, Friss lime, Monin Curaçao & Maracuja" },
            { name: "Blue Milk (7)", price: "5,90 €", description: "Absolut Vodka, Malibu, Tej, Monin Curaçao" },
            { name: "Šano Bomb", price: "5,60 €", description: "Spišská Borovička, Narancslé, Red Bull" },
            { name: "Szűz változatok", price: "3,40 €" },
        ]
    },
    {
        name: "🍹 Hagyományos koktélok",
        items: [
            { name: "Long Island Iced Tea", price: "9,20 €" },
            { name: "Lady Killer", price: "6,90 €" },
            { name: "Bomberman B52", price: "5,00 €" },
            { name: "Umbakarna (Mai Tai)", price: "7,10 €" },
            { name: "Rum Sour tojásfehérjével / anélkül", price: "6,90 € / 6,40 €" },
            { name: "Cuba Libre", price: "5,60 €" },
            { name: "Espresso Martini", price: "6,70 €" },
            { name: "Moscow Mule", price: "6,60 €" },
            { name: "White Russian", price: "5,70 €" },
            { name: "Screwdriver", price: "4,90 €" },
            { name: "Skinny B*tch", price: "5,60 €" },
            { name: "Whisky Sour tojásfehérjével / anélkül", price: "6,90 € / 6,20 €" },
            { name: "Lynchburg Lemonade", price: "6,40 €" },
            { name: "Vermouth Orange Spritz", price: "4,90 €" },
        ]
    },
    {
        name: "🥃 Rum",
        items: [
            { name: "Piquero 40% Panama", price: "6,40 €" },
            { name: "Don Papa Baroko 40% Fülöp-szigetek", price: "6,50 €" },
            { name: "Mount Gay XO 43% Barbados", price: "6,90 €" },
            { name: "Bacardi Carta Blanca 37,5%", price: "3,20 €" },
            { name: "Kraken Black Spiced 40%", price: "4,30 €" },
            { name: "Legendario Elixir de Cuba 34%", price: "3,80 €" },
            { name: "Captain Morgan 35%", price: "3,30 €" },
            { name: "Republica Božkov 38%", price: "3,60 €" },
        ]
    },
    {
        name: "🍸 Gin",
        items: [
            { name: "Lúčny (Réti) 40%", price: "3,60 €" },
            { name: "Beefeater 40%", price: "3,40 €" },
            { name: "Roku Gin 43%", price: "4,20 €" },
            { name: "Beefeater Pink eper 37,5%", price: "3,50 €" },
            { name: "Malfy Rosa grapefruit 41%", price: "4,40 €" },
        ]
    },
    {
        name: "🥃 Whisk(e)y",
        items: [
            { name: "Jameson 40%", price: "3,50 €" },
            { name: "Ballantine’s 40%", price: "3,70 €" },
            { name: "Jack Daniel’s 40%", price: "3,90 €" },
            { name: "Jack Daniel’s Apple 35%", price: "4,00 €" },
            { name: "Writer’s Tears Copper Pot 40%", price: "4,40 €" },
            { name: "Glenmorangie 10 yrs 40%", price: "5,40 €" },
            { name: "Oban 14 yrs 43%", price: "7,10 €" },
            { name: "Buffalo Trace 40%", price: "3,60 €" },
        ]
    },
    {
        name: "🌲 Boróka",
        items: [
            { name: "Spišská Borovička 40%", price: "2,70 €" },
            { name: "Rusínska Borovička 40%", price: "2,70 €" },
        ]
    },
    {
        name: "🍸 Vodka",
        items: [
            { name: "Absolut Blue 40%", price: "3,30 €" },
            { name: "Goral Master 40%", price: "3,80 €" },
            { name: "42 Below 40%", price: "4,00 €" },
        ]
    },
    {
        name: "🌵 Tequila",
        items: [
            { name: "Ezüst 40% (citrom és só)", price: "3,40 €" },
            { name: "Arany 40% (narancs és fahéj)", price: "3,60 €" },
        ]
    },
    {
        name: "🍑 Párlatok",
        items: [
            { name: "Hruškovica (Körte) 42%", price: "3,60 €" },
            { name: "Marhuľovica (Barack) 45%", price: "3,70 €" },
            { name: "Slivovica (Szilva) 52%", price: "4,00 €" },
        ]
    },
    {
        name: "🍬 Likőrök",
        items: [
            { name: "Jägermeister 35%", price: "3,30 €" },
            { name: "Fernet Stock Citrus 37%", price: "2,70 €" },
            { name: "Bailey’s Salted Caramel 17%", price: "3,20 €" },
            { name: "Disaronno Amaretto 28%", price: "3,70 €" },
            { name: "Malibu 21%", price: "2,90 €" },
            { name: "Borsmenta likőr 28%", price: "2,70 €" },
        ]
    },
    {
        name: "🍵 TatraTea",
        items: [
            { name: "TatraTea 42% Peach", price: "3,70 €" },
            { name: "TatraTea 52% Original", price: "3,50 €" },
            { name: "TatraTea 62% Forest Fruit", price: "3,90 €" },
        ]
    },
    {
        name: "🌿 Abszint",
        items: [
            { name: "Suicide Red 70%", price: "4,90 €" },
            { name: "Suicide Black 70%", price: "4,90 €" },
            { name: "Euphoria 80%", price: "5,90 €" },
        ]
    },
    {
        name: "🧃 Alkoholmentes kevert italok",
        items: [
            { name: "Virgincollada (7)", price: "3,80 €", description: "Tej, Ananászlé, Friss narancs, Kókuszzirup" },
            { name: "Monte (7)", price: "3,90 €", description: "Tej, Mogyorószirup, Kakaópor, Tejszínhab, Bueno, Mandula" },
            { name: "Luffy", price: "3,60 €", description: "Narancslé, Monin Grenadin és Maracuja, Friss lime" },
            { name: "Powder", price: "3,60 €", description: "Monin Kivi és Curaçao, Friss lime, Szóda, Savanyú halacskák" },
            { name: "Healthy Potion", price: "3,40 €", description: "Almalé, Eperszirup, Friss citrus, 7UP" },
            { name: "Peach Moxxie", price: "3,40 €", description: "Baracklé, Licsi szirup, Friss citrus" },
            { name: "Legendás impotencia", price: "2,90 €", description: "Eperlé, Szóda" },
            { name: "Slytherin", price: "3,60 €", description: "Narancsos \"piadidzsúsz\", Kígyópikkely-szirup, Holdkőpor" },
        ]
    },
    {
        name: "🍷 Bor és mézbor",
        description: "(az árak 1 dl-re vonatkoznak, hacsak másképp nincs feltüntetve)",
        items: [
            { name: "Fehér", isSubheader: true },
            { name: "Tureček – Sauvignon / Silvanské – száraz 12%", price: "2,00 €" },
            { name: "Tureček – Olaszrizling – félédes 12%", price: "2,00 €" },
            { name: "üveg 0,75 l", price: "15 €" },
            { name: "Vörös", isSubheader: true },
            { name: "Tureček – Dunaj / Neronet – száraz 13,5%", price: "2,00 €" },
            { name: "üveg 0,75 l", price: "15 €" },
            { name: "Gyümölcs", isSubheader: true },
            { name: "Miluron – Bodza / Meggy", price: "2,10 €" },
            { name: "üveg 0,75 l", price: "16 €" },
            { name: "Prosecco", isSubheader: true },
            { name: "Prosecco Dal Bello DOC 11%", price: "2,10 €" },
            { name: "üveg 0,75 l", price: "16 €" },
            { name: "Mézbor", isSubheader: true },
            { name: "Apimed Nagyszombati mézbor 13,5%", price: "2,20 €" },
            { name: "üveg 0,75 l", price: "18 €" },
        ]
    },
    {
        name: "🍿 Rágcsálnivalók",
        items: [
            { name: "Lay’s Chips 55–60 g (1, 6, 7) sós / paprika / fromage / BBQ / sajt és cayenne", price: "1,70 €" },
            { name: "Lay’s Sült Chips 110 g (1, 6, 7) fűszeres / grillezett zöldségek", price: "2,20 €" },
            { name: "Mogyorós puffancs 60 g (5)", price: "1,60 €" },
            { name: "Sós pálcika 45 g (1, 7, 9)", price: "1,20 €" },
            { name: "Földimogyoró 100 g (5)", price: "1,60 €" },
            { name: "Horalky 50 g (1, 3, 5, 6, 7)", price: "1,20 €" },
            { name: "Kinder Bueno 43 g (1, 5, 6, 7)", price: "1,60 €" },
        ]
    },
  ]
};
