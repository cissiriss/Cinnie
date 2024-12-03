CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    calories INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50)
);

CREATE TABLE recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(10,2)
);

CREATE TABLE meal_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meal_plan_recipes (
    id SERIAL PRIMARY KEY,
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    recipe_id INTEGER REFERENCES recipes(id),
    meal_time VARCHAR(50),
    date DATE NOT NULL
);

CREATE TABLE shopping_lists (
    id SERIAL PRIMARY KEY,
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    shopping_list_id INTEGER REFERENCES shopping_lists(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(10,2),
    is_checked BOOLEAN DEFAULT FALSE
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    recipe_id INTEGER REFERENCES recipes(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- För snabb sökning på e-post
CREATE INDEX idx_users_email ON users(email);

-- För att snabbt hitta recept som tillhör en användare
CREATE INDEX idx_recipes_user_id ON recipes(user_id);

-- För att snabbt slå upp ingredienser i en receptkoppling
CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);

-- För snabb åtkomst till matplaner för en användare
CREATE INDEX idx_meal_plans_user_id ON meal_plans(user_id);

-- För att hitta recept kopplade till en matplan
CREATE INDEX idx_meal_plan_recipes_meal_plan_id ON meal_plan_recipes(meal_plan_id);
CREATE INDEX idx_meal_plan_recipes_recipe_id ON meal_plan_recipes(recipe_id);

-- För inköpslistor kopplade till matplaner
CREATE INDEX idx_shopping_lists_meal_plan_id ON shopping_lists(meal_plan_id);

-- För snabb åtkomst till favoritrecept för en användare
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_recipe_id ON favorites(recipe_id);


CREATE OR REPLACE FUNCTION generate_shopping_list()
RETURNS TRIGGER AS $$
DECLARE
    recipe RECORD;
    ingredient RECORD;
BEGIN
    -- Skapa en inköpslista kopplad till matplanen
    INSERT INTO shopping_lists (meal_plan_id, created_at)
    VALUES (NEW.id, NOW())
    RETURNING id INTO NEW.shopping_list_id;

    -- Hämta alla recept kopplade till matplanen
    FOR recipe IN 
        SELECT recipe_id FROM meal_plan_recipes WHERE meal_plan_id = NEW.id
    LOOP
        -- Lägg till varje ingrediens från receptet i inköpslistan
        FOR ingredient IN 
            SELECT ingredient_id, quantity 
            FROM recipe_ingredients 
            WHERE recipe_id = recipe.recipe_id
        LOOP
            INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, quantity, is_checked)
            VALUES (NEW.shopping_list_id, ingredient.ingredient_id, ingredient.quantity, FALSE);
        END LOOP;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_shopping_list
AFTER INSERT ON meal_plans
FOR EACH ROW
EXECUTE FUNCTION generate_shopping_list();

INSERT INTO users (name, email, password_hash) 
VALUES 
    ('Anna Svensson', 'anna@example.com', 'hashedpassword1'),
    ('Erik Karlsson', 'erik@example.com', 'hashedpassword2');

INSERT INTO ingredients (name, unit) 
VALUES 
    ('Tomat', 'st'),
    ('Kycklingfilé', 'gram'),
    ('Olivolja', 'ml'),
    ('Vitlök', 'klyfta'),
    ('Pasta', 'gram');

INSERT INTO recipes (user_id, name, description, instructions, prep_time, cook_time, servings, calories) 
VALUES 
    (1, 'Kycklingpasta', 'En krämig pasta med kyckling och vitlök', '1. Koka pastan. 2. Stek kyckling...', 10, 20, 4, 500),
    (2, 'Tomatsoppa', 'En enkel soppa med tomat och vitlök', '1. Hacka tomater. 2. Koka med olivolja...', 5, 15, 2, 200);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) 
VALUES 
    (1, 1, 2),  -- 2 tomater till kycklingpasta
    (1, 2, 300), -- 300 gram kyckling till kycklingpasta
    (1, 3, 10),  -- 10 ml olivolja till kycklingpasta
    (2, 1, 3),   -- 3 tomater till tomatsoppa
    (2, 4, 2);   -- 2 vitlöksklyftor till tomatsoppa

INSERT INTO meal_plans (user_id, name, start_date, end_date) 
VALUES 
    (1, 'Veckoplan v1', '2024-12-01', '2024-12-07'),
    (2, 'Vegetarisk vecka', '2024-12-01', '2024-12-07');

INSERT INTO meal_plan_recipes (meal_plan_id, recipe_id, meal_time, date) 
VALUES 
    (1, 1, 'Lunch', '2024-12-01'), -- Kycklingpasta till lunch
    (1, 2, 'Middag', '2024-12-01'); -- Tomatsoppa till middag

INSERT INTO meal_plans (user_id, name, start_date, end_date) 
VALUES (1, 'Testplan', '2024-12-02', '2024-12-08');

SELECT * FROM shopping_lists; -- Ska visa en ny inköpslista
SELECT * FROM shopping_list_items; -- Ska visa ingredienserna från recepten i planen
