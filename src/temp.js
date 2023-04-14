
/** Keep this if we need it to get the json object for selected items  put this in ResourceSelect.js for the info*/

  // const resourcesData = {};
  // for (const [recipe, recipeData] of Object.entries(data.recipes)) {
  //   if (recipeData.inMachine) {
  //     recipeData.products.forEach(product => {
  //       if (!(product.item in resourcesData)) {
  //         debugger;
  //         const recipeName = data.selectOptions[recipe]?.name || product.item;
  //         resourcesData[product.item] = {
  //           name: data.items[product.item].name,
  //           slug: recipe,
  //           recipes: [recipe]
  //         };
  //       } else {
  //         resourcesData[product.item].recipes.push(recipe);
  //       }
  //     });
  //   }
  // }
  // const sortedSelectOptions = Object.fromEntries(
  //   Object.entries(resourcesData).sort(([, a], [, b]) => a.name.localeCompare(b.name))
  // );
  // console.log(sortedSelectOptions);
  // console.log(resourcesData);