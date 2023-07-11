const Ingredient = require("../../models/ingredient");

document.getElementById;

document
  .getElementById("ingredientAdd")
  .addEventListener("submit", ingredientAppend);

function ingredientAppend(event) {
  event.preventDefault();
  const ingredient = document.getElementById("ingredient").value;
  const recipeList = document.getElementById("recipeList");
  const ingredientItem = document.createElement("li");
  ingredientItem.textContent = ingredient;
  recipeList.appendChild(ingredientItem);
  document.getElementById("recipeList").value = "";
  const ingredientObject = {
    searchValue: ingredient,
    term: ingredient,
  };
//   //   Ingredient.create(ingredientObject)
//   //     .then((dbIngredientData) => {
//   //       console.log(dbIngredientData);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
// }
