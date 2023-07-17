const searchIngredient = document.getElementById("searchIngredient");
const publish = document.getElementById("publish");
// const userProfile = document.getElementById("userProfile");
const discardRecipe = document.getElementById("discardRecipe");
const addIngredient = document.getElementById("addIngredient");
const recipeForm = document.getElementById("recipeForm");

const ingredientArray = []
const quantityArray = []
const measurementArray = []

function ingredientAppend(event) {
  event.stopPropagation();
  event.preventDefault();
  console.log("ingredient appended");
  const ingredient = searchIngredient.value;
  const ingredientList = document.getElementById("ingredientList");
  const ingredientItem = document.createElement("li");
  const deleteButton = document.createElement("button");

  const quantityEl = document.getElementById("ingredientQuantity");

  const quantity = quantityEl.value

  const measurementEl = document.getElementById('ingredientMeasurement')
  const measurement = measurementEl.value


  ingredientItem.textContent = quantity + " " + measurement + " " + ingredient;
  ingredientList.appendChild(ingredientItem); 
  searchIngredient.value = "";

  ingredientArray.push(ingredient)
  quantityArray.push(quantity)
  measurementArray.push(measurement)
  

  quantityEl.value = "";

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
  const recipeList = document.getElementById("searchIngredient").value;
  const ingredientQuantity = document.getElementById('ingredientQuantity').value
  const measurement = document.getElementById('ingredientMeasurement').value
  
const ingredientString = ingredientArray.toLocaleString()
const quantityString = quantityArray.toLocaleString()
const measurementString = measurementArray.toLocaleString()

  
  const recipe = {
    title: recipeName,
    description: recipeDescription,
    ingredients: ingredientArray,
    unitOfMeasure: measurementArray,
    quantity: quantityArray
  };
  console.log("recipe list", recipe);
  fetch("/api/recipe", {
    method: "POST",
    body: JSON.stringify({ recipeName, recipeDescription, ingredientString, measurementString, quantityString }),
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
      fetch(`/api/ingredient/${encodeURIComponent(term.trim())}`)
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
recipeForm.addEventListener("submit", publishRecipe);
addIngredient.addEventListener("click", ingredientAppend);
publish.addEventListener("click", publishRecipe);
// userProfile.addEventListener("click", logout);
