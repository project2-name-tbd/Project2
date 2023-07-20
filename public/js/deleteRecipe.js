


function deleteRecipe(event) {
  
    event.preventDefault();
  console.log("deleting recipe...");
 
  const recipeId = document.getElementById("recipe.id");
  console.log(recipeId);

  fetch(`/api/recipe/${recipeId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log("recipe DELETED!");
        // window.location.replace("/");
      } else {
        alert("Failed to create recipe");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const recipeDeleteButton = document.querySelector(".deleteButton");

recipeDeleteButton.addEventListener('click', deleteRecipe);