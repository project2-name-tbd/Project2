let recipeDelete = document.querySelectorAll(".deleteRecipeButton");

function deleteRecipe(event) {
  event.preventDefault();
  // console.log("deleting recipe...");
  console.log(recipeDelete);
  const recipeId = event.target.attributes['id'].value;
  console.log("RECIPE ID " + recipeId);

  fetch(`/api/recipe/${recipeId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log("recipe DELETED!");
        window.location.replace("/");
      } else {
        alert("Failed to delete recipe");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

for(let i=0; i<recipeDelete.length; i++){
  recipeDelete[i].addEventListener('click', deleteRecipe);
};