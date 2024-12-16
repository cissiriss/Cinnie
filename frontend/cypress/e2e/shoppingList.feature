
Feature: Shoppinglista

Det ska finnas en shoppinglista baserad på ingredienserna från recepten i vald meny.

Scenario: Skapa inköpslista från en meny
Given Jag är på sidan för menyer och rubriken visar Menus
When Jag klickar på “Create shopping list” för menyn Weekly menu 1
Then Inköpslistan ska visas
Then Inköpslistan ska innehålla rubriken Shopping List
