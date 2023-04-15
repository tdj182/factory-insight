import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import data from '../data.json';
import './ResourceSelect.css';
import RecipeInfo from './RecipeInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock, faBuilding, faInfo } from '@fortawesome/free-solid-svg-icons';

const ResourceSelect = ({ id, name, value, onDelete, onChange }) => {
  const [selectedResource, setSelectedResource] = useState(() => value.resource ? value.resource : '');
  const [selectedRecipe, setSelectedRecipe] = useState(() => value.recipe ? value.recipe : '');
  const [recipeOptions, setRecipeOptions] = useState(() => value.resource ? data.selectOptions[value.resource].recipes : []);
  const [showRecipeInfo, setShowRecipeInfo] = useState(false);
  const [machineCount, setMachineCount] = useState(() => value.machineCount ? value.machineCount : 1);
  const [clockSpeed, setClockSpeed] = useState(() => value.clockSpeed ? value.clockSpeed : 1);
  const [inputOverride, setInputOverride] = useState(() => value.inputOverride ? value.inputOverride : 0);
  
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
    onChange({ recipe: "", machineCount: machineCount, clockSpeed: clockSpeed, resource: selectedResourceId, inputOverride: inputOverride });
  };

  const handleRecipeChange = (e) => {
    const selectedRecipe = e.target.value;
    setSelectedRecipe(selectedRecipe);
    setShowRecipeInfo(false);
    onChange({ recipe: selectedRecipe, machineCount: machineCount, clockSpeed: clockSpeed, resource: selectedResource, inputOverride: inputOverride });
  };

  const handleMachineCountChange = (e) => {
    const count = parseInt(e.target.value);
    setMachineCount(count);
    onChange({ recipe: selectedRecipe, machineCount: count, clockSpeed: clockSpeed, resource: selectedResource, inputOverride: inputOverride });
  }

  const handleClockSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setClockSpeed(speed);
    onChange({ recipe: selectedRecipe, machineCount: machineCount, clockSpeed: speed, resource: selectedResource, inputOverride: inputOverride });
  }

  const handleInputOverrideChange = (e) => {
    const inputOverride = parseFloat(e.target.value);
    setInputOverride(inputOverride);
    onChange({ recipe: selectedRecipe, machineCount: machineCount, clockSpeed: clockSpeed, resource: selectedResource, inputOverride: inputOverride });
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
      
      <div style={{ width: "30%" }}>
        <span>Resource</span>
        <Input type="select" id="resourceSelect" value={selectedResource} onChange={handleResourceChange}>
          <option value="">Select a Resource</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </Input>
      </div>

      <div style={{ width: "30%" }}>
        <span>Recipe</span>
        <Input type="select" id="recipeSelect" value={selectedRecipe} onChange={handleRecipeChange} >
          <option value="">Select a Recipe</option>
          {recipeOptions.map((recipe) => (
            <option key={recipe} value={recipe}>
              {data.recipes[recipe].name}
            </option>
          ))}
        </Input>
      </div>

      <div className='number-input'>
        <FontAwesomeIcon icon={faBuilding} title="Machine Count"/>
        <Input type="number" id="machineCount" value={machineCount} min={0} onChange={handleMachineCountChange} />
      </div>

      <div className='number-input'>
        <FontAwesomeIcon icon={faClock} title="Clock Speed"/>
        <Input type="number" id="clockSpeed" value={clockSpeed} min={0} max={2.5} step={0.1} onChange={handleClockSpeedChange} />
      </div>


      <div className='number-input'>
        <FontAwesomeIcon icon={faInfo} title="Input Override: ignores recipe, building count, and clock speed. Won't display ingredient information in resource list"/>
        <Input type="number" id="inputOverride" value={inputOverride} min={0} onChange={handleInputOverrideChange} />
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