const e = require("express");
const Ingredient = require("../../models/ingredient");

const searchIngredient = document.getElementById("searchIngredient");
const publish = document.getElementById("publish");
const userProfile = document.getElementById("userProfile");
const discardRecipe = document.getElementById("discardRecipe");

function ingredientAppend(event) {
  event.preventDefault();
  console.log("ingredient appended");
  const ingredient = searchIngredient.value;
  const recipeList = document.getElementById("recipeList");
  const ingredientItem = document.createElement("li");
  const deleteButton = document.createElement("button");
  ingredientItem.textContent = ingredient;
  recipeList.appendChild(ingredientItem);
  searchIngredient.value = "";

  deleteButton.textContent = "Delete";
  ingredientItem.appendChild(deleteButton);
  // Add click event listener to the delete button
  deleteButton.addEventListener("click", function () {
    ingredientItem.remove();
    console.log("item removed");
  });
  //route
}

function publishRecipe(event) {
  event.preventDefault();
  console.log("recipe published");
  const recipeName = document.getElementById("recipeName").value;
  const recipeDescription = document.getElementById("recipeDescription").value;
  const recipeList = document.getElementById("recipeList").value;
  const recipe = {
    name: recipeName,
    description: recipeDescription,
    ingredients: recipeList,
  };
  console.log("recipe list", recipe);
  fetch("/api/recipe", {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log("Recipe created!");
      } else {
        alert("Failed to create recipe");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

$(function () {
  $("#searchIngredient").autocomplete({
    source: function (request, response) {
      var term = request.term;
      fetch(`/api/ingredient?name=${term}`)
        .then(function (responseFromAPI) {
          return responseFromAPI.json();
        })
        .then(function (dataFromAPI) {
          var newIngredientArray = [];
          for (let i = 0; i < dataFromAPI.length; i++) {
            var element = dataFromAPI[i];
            newIngredientArray.push({
              label: element.name,
              value: element.name,
            });
          }
          response(newIngredientArray);
        });
    },
  });
});

function removeRecipe(event) {
  event.preventDefault();
  //add prompt that says are you sure and happens off confirmation
  console.log("recipe removed");
  //add modal later
  if (confirm("Are you sure you want to delete this recipe?")) {
    document.getElementById("recipeName").value = "";
    document.getElementById("recipeDescription").value = "";
    document.getElementById("recipeList").innerHTML = "";
  } else {
    modal.style.display = "none";
  }
}
// post route
// const logout = async () => {
//   const response = await fetch('/api/users/logout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/login');
//   } else {
//     alert(response.statusText);
//   }
// };

search.addEventListener("submit", ingredientAppend);
publish.addEventListener("click", publishRecipe);
userProfile.addEventListener("click", logout);
