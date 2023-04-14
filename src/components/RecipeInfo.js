import React from 'react';
import data from '../data.json';
import './RecipeInfo.css';

const RecipeInfo = ({ recipeId, machineCount, clockSpeed }) => {
  const recipe = data.recipes[recipeId];

  if (!recipe) {
    return <div>No recipe selected.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1' }}>
          <h5 style={{textDecoration: 'underline'}}>Ingredients:</h5>
          <ul style={{ listStyleType: 'none' }}>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.item}>{data.items[ingredient.item].name}: {60/recipe.time * ingredient.amount * machineCount * clockSpeed} </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1' }}>
          <h5 style={{textDecoration: 'underline'}}>Products:</h5>
          <ul style={{ listStyleType: 'none' }}>
            {recipe.products.map((product) => (
              <li key={product.item}>{data.items[product.item].name}: {60/recipe.time * product.amount * machineCount * clockSpeed} </li>
            ))}
          </ul>
        </div>
        
        <div style={{ flex: '1' }}>
          <h5 style={{textDecoration: 'underline'}}>Machine:</h5>
          <p>{data.buildings[recipe.producedIn].name}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
