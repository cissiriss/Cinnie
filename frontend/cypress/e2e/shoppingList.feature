
Feature: Shoppinglista

Det ska finnas en shoppinglista baserad på ingredienserna från recepten i vald meny.

Scenario: Skapa inköpslista från en meny
Given Jag är på hemsidan för menyer
When Jag klickar på "Visa inköpslista" för menyn "Veckomeny 1"
Then Inköpslistan ska innehålla "Butter 1 tablespoons"
