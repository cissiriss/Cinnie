CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time INTEGER,
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
