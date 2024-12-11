
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    instructions TEXT,
    cook_time INTEGER,
    servings INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE unit (
    id SERIAL PRIMARY KEY,
    unit_name VARCHAR(50)
);

CREATE TABLE quantity (
    id SERIAL PRIMARY KEY,
    quantity_value VARCHAR(50)
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    ingredient VARCHAR(255) NOT NULL
);

CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    menu_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipe_ingredient (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
    quantity_id INTEGER REFERENCES quantity(id),
    unit_id INTEGER REFERENCES unit(id)
);

CREATE TABLE menu_recipe (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
    date DATE NOT NULL
);

CREATE TABLE shopping_list (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shopping_list_item (
    id SERIAL PRIMARY KEY,
    shopping_list_id INTEGER REFERENCES shopping_list(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE SET NULL,
    quantity_id INTEGER REFERENCES quantity(id) ON DELETE SET NULL,
    is_checked BOOLEAN DEFAULT FALSE
);

CREATE TABLE favorite (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);


-- Fyll på med dålig fejkdata

-- 1. Skapa ingredienser
INSERT INTO ingredient (ingredient) VALUES
('Flour'),
('Sugar'),
('Butter'),
('Eggs'),
('Milk'),
('Salt'),
('Tomatoes'),
('Cheese'),
('Chicken'),
('Rice');

-- 2. Skapa enheter
INSERT INTO unit (unit_name) VALUES
('grams'),
('cups'),
('tablespoons'),
('pieces'),
('liters');

-- 3. Skapa kvantiteter
INSERT INTO quantity (quantity_value) VALUES
('100'),
('200'),
('1'),
('2'),
('500');

-- 4. Lägg till recept
INSERT INTO recipe (recipe_name, instructions, cook_time, servings) VALUES
('Pancakes', 'Mix and fry on pan.', 15, 4),
('Spaghetti Bolognese', 'Cook spaghetti and sauce.', 30, 4),
('Chicken Curry', 'Cook chicken with curry sauce.', 40, 4),
('Vegetable Soup', 'Boil vegetables in stock.', 25, 6),
('Cheese Omelette', 'Whisk eggs and fry with cheese.', 10, 2),
('Tomato Salad', 'Mix tomatoes with dressing.', 10, 2),
('Grilled Chicken', 'Marinate and grill chicken.', 60, 4),
('Rice Pilaf', 'Cook rice with spices.', 30, 4),
('Chocolate Cake', 'Bake in oven.', 45, 8),
('Milkshake', 'Blend milk with ingredients.', 5, 1);

-- 5. Koppla recept till ingredienser
INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity_id, unit_id) VALUES
-- Pancakes
(1, 1, 1, 1), -- Flour, 100 grams
(1, 2, 2, 1), -- Sugar, 200 grams
(1, 3, 3, 3), -- Butter, 1 tablespoon
(1, 4, 4, 4), -- Eggs, 2 pieces
(1, 5, 5, 5), -- Milk, 500 ml

-- Spaghetti Bolognese
(2, 7, 1, 3), -- Tomatoes, 100 grams
(2, 8, 2, 1), -- Cheese, 200 grams

-- Chicken Curry
(3, 9, 3, 4), -- Chicken, 1 piece
(3, 10, 4, 1), -- Rice, 2 cups

-- Vegetable Soup
(4, 7, 2, 1), -- Tomatoes, 200 grams
(4, 6, 1, 3), -- Salt, 100 grams

-- Cheese Omelette
(5, 4, 4, 4), -- Eggs, 2 pieces
(5, 8, 1, 1); -- Cheese, 100 grams

-- 6. Skapa menyer
INSERT INTO menu (menu_name, start_date, end_date) VALUES
('Weekly Menu 1', '2024-12-09', '2024-12-15'),
('Weekly Menu 2', '2024-12-16', '2024-12-22'),
('Weekly Menu 3', '2024-12-23', '2024-12-29');

-- 7. Koppla recept till menyer
INSERT INTO menu_recipe (menu_id, recipe_id, date) VALUES
-- Weekly Menu 1
(1, 1, '2024-12-09'),
(1, 2, '2024-12-10'),
(1, 3, '2024-12-11'),

-- Weekly Menu 2
(2, 4, '2024-12-16'),
(2, 5, '2024-12-17'),
(2, 6, '2024-12-18'),

-- Weekly Menu 3
(3, 7, '2024-12-23'),
(3, 8, '2024-12-24'),
(3, 9, '2024-12-25'),
(3, 10, '2024-12-26');
