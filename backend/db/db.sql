

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE quantity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
)

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity_id INTEGER REFERENCES quantity(id),
    unit_id INTEGER REFERENCES units(id),
);

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE menus_recipes (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menus(id),
    recipe_id INTEGER REFERENCES recipes(id),
    meal_time VARCHAR(50),
    date DATE NOT NULL
);

CREATE TABLE shopping_lists (
    id SERIAL PRIMARY KEY,
    name INTEGER REFERENCES menus(name),
    menu_id INTEGER REFERENCES menus(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    shopping_list_id INTEGER REFERENCES shopping_lists(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity_id INTEGER REFERENCES quantity(id),
    is_checked BOOLEAN DEFAULT FALSE
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    created_at TIMESTAMP DEFAULT NOW()
);
