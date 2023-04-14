import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import data from '../data.json';
import './ResourceSelect.css';
import RecipeInfo from './RecipeInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ResourceSelect = ({ id, name, value, onDelete, onChange }) => {
  const [selectedResource, setSelectedResource] = useState(() => value.resource ? value.resource : '');
  const [selectedRecipe, setSelectedRecipe] = useState(() => value.recipe ? value.recipe : '');
  const [recipeOptions, setRecipeOptions] = useState(() => value.resource ? data.selectOptions[value.resource].recipes : []);
  const [showRecipeInfo, setShowRecipeInfo] = useState(false);
  const [machineCount, setMachineCount] = useState(() => value.machineCount ? value.machineCount : 1);
  const [clockSpeed, setClockSpeed] = useState(() => value.clockSpeed ? value.clockSpeed : 1);
  

  const resources = Object.entries(data.selectOptions).map(([id, resource]) => ({
    id,
    name: resource.name,
    recipes: resource.recipes
  }));

  const handleResourceChange = (e) => {
    const selectedResourceId = e.target.value;
    setSelectedResource(selectedResourceId);

    // Find the selected resource and get its recipe options
    const selectedResource = resources.find(resource => resource.id === selectedResourceId);
    setRecipeOptions(selectedResource.recipes);

    // Clear the selected recipe when a new resource is selected
    setSelectedRecipe('');
    setShowRecipeInfo(false);

    // Update the selected resource in the parent component
    onChange({ recipe: "", machineCount: machineCount, clockSpeed: clockSpeed, resource: selectedResourceId });
  };

  const handleRecipeChange = (e) => {
    const selectedRecipe = e.target.value;
    setSelectedRecipe(selectedRecipe);
    setShowRecipeInfo(false);
    onChange({ recipe: selectedRecipe, machineCount: machineCount, clockSpeed: clockSpeed, resource: selectedResource });
  };

  const handleMachineCountChange = (e) => {
    const count = parseInt(e.target.value);
    setMachineCount(parseInt(count));
    onChange({ recipe: selectedRecipe, machineCount: count, clockSpeed: clockSpeed, resource: selectedResource });
  }

  const handleClockSpeedChange = (e) => {
    const speed = e.target.value;
    setClockSpeed(parseFloat(speed));
    onChange({ recipe: selectedRecipe, machineCount: machineCount, clockSpeed: speed, resource: selectedResource });
  }

  const handleShowRecipeInfo = () => {
    setShowRecipeInfo(!showRecipeInfo);
  };

  const handleDelete = () => {
    onDelete(id);
  };

return (
  <div className="content">
    <FormGroup className="d-flex justify-content-between form-group-inline">
      <Input type="select" id="resourceSelect" value={selectedResource} onChange={handleResourceChange} style={{ width: "30%" }}>
        <option value="">Select a Resource</option>
        {resources.map((resource) => (
          <option key={resource.id} value={resource.id}>
            {resource.name}
          </option>
        ))}
      </Input>

      <Input type="select" id="recipeSelect" value={selectedRecipe} onChange={handleRecipeChange} style={{ width: "30%" }}>
        <option value="">Select a Recipe</option>
        {recipeOptions.map((recipe) => (
          <option key={recipe} value={recipe}>
            {data.recipes[recipe].name}
          </option>
        ))}
      </Input>

      <div style={{ width: "15%" }}>
        <Input type="number" id="machineCount" value={machineCount} onChange={handleMachineCountChange} />
      </div>

      <div style={{ width: "15%" }}>
        <Input type="number" id="clockSpeed" value={clockSpeed} min={0} max={2.5} step={0.1} onChange={handleClockSpeedChange} />
      </div>

      <Button color={showRecipeInfo ? "primary" : "secondary"} onClick={handleShowRecipeInfo}>
        {showRecipeInfo ? "^" : "v"}
      </Button>

      <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 5, color: "red" }} onClick={handleDelete} />
    </FormGroup>
    {showRecipeInfo && selectedRecipe && <RecipeInfo recipeId={selectedRecipe} machineCount={machineCount} clockSpeed={clockSpeed} />}
  </div>
);
};

export default ResourceSelect;