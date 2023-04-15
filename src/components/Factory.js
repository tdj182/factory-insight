import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import data from '../data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ResourceSelect from './ResourceSelect';
import ResourceList from './ResourceList';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './Factory.css';

const Factory = ({ id, name = 'new factory', resources = {}, onNameChange, onDelete }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [resourceKeys, setResourceKeys] = useState(() => {
    const storedResources = JSON.parse(localStorage.getItem(`factory-${id}`));
    return storedResources ? Object.keys(storedResources) : [];
  });
  const [selectedResources, setSelectedResources] = useState(() => {
    const storedResources = JSON.parse(localStorage.getItem(`factory-${id}`));
    return storedResources ? storedResources : {};
  });
  const [resourceData, setResourceData] = useState([]);
  const [showResourceSelects, setShowResourceSelects] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(`factory-${id}`, JSON.stringify(selectedResources));
    calculateProduction();
  }, [id, selectedResources]);

  const toggleEditingName = () => {
    setIsEditingName(!isEditingName);
  };

  const handleNameChange = (e) => {
    setTempName(e.target.value);
  };

  const saveNameChange = () => {
    onNameChange(id, tempName);
    toggleEditingName();
  };

  const cancelNameChange = () => {
    setTempName(name);
    toggleEditingName();
  };

  const handleAddResource = () => {
    const newKey = `resource${resourceKeys.length + 1}`;
    const newResource = { recipe: "", machineCount: 1, clockSpeed: 1 };
    setSelectedResources({...selectedResources, [newKey]: newResource});
    setResourceKeys([...resourceKeys, newKey]);
    setShowResourceSelects(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const toggleResourceSelects = () => {
    setShowResourceSelects(!showResourceSelects);
  };

  const handleShareInputs = () => {
    const data = JSON.stringify(selectedResources);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'resource-selects.json';
    a.href = url;
    a.click();
  };

  const handleUploadInputs = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setSelectedResources(data);
      setResourceKeys(Object.keys(data));
    };
    reader.readAsText(file);
  };

  const calculateProduction = () => {
    const production = {};
    const consumption = {};
    Object.values(selectedResources).forEach(({ recipe, machineCount, clockSpeed, resource }) => {
      if (!recipe || recipe === '') {
        return;
      }
      const recipeData = data.recipes[recipe];
      if (!recipeData) {
        console.error(`Recipe data not found for recipe "${recipe}"`);
        return;
      }
      debugger;
      const manufacturTimer = 60/recipeData.time;
      recipeData.ingredients.forEach(input => {
        if (!(input.item in data.resources)) {
          const inputAmount = manufacturTimer * input.amount * machineCount * clockSpeed;
          // calculateSubIngredients()
          consumption[input.item] = (consumption[input.item] || 0) + inputAmount;
        }
      });
      recipeData.products.forEach(output => {
        const outputAmount = manufacturTimer * output.amount * machineCount * clockSpeed;
        production[output.item] = (production[output.item] || 0) + outputAmount;
      });
    });
  
    const resourceData = Object.entries(data.items).map(([id, resource]) => {
      const consumed = consumption[id] || 0;
      const produced = production[id] || 0;
      const remaining = (selectedResources[id]?.amount || 0) + produced - consumed;
      if (consumed === 0 && produced === 0) {
        return null;
      }
      return {
        id,
        name: resource.name,
        consumed,
        produced,
        remaining,
      };
    }).filter(resource => resource !== null);
    setResourceData(resourceData);
    return resourceData;
  };

  return (
    <div>
      <h2>
        {isEditingName ? (
          <Form inline onSubmit={(e) => e.preventDefault()}>
            <FormGroup>
              <Input type="text" value={tempName} onChange={handleNameChange} />
            </FormGroup>
            <Button color="primary" onClick={saveNameChange}>
              Save
            </Button>
            <Button color="secondary" onClick={cancelNameChange}>
              Cancel
            </Button>
          </Form>
        ) : (
          <span>
            <FontAwesomeIcon onClick={toggleEditingName} icon={faEdit} style={{ marginRight: 5 }} />
            {name}
          </span>
        )}
        <Button color="danger" size="sm" onClick={handleDelete} style={{ marginLeft: 10 }}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </h2>
      <div>
        <h3><span className='toggleHeader' onClick={toggleResourceSelects}>Resource Inputs</span></h3>
        {showResourceSelects && 
          resourceKeys.map((key) => (
            <ResourceSelect
              key={key}
              id={id}
              name={key}
              value={selectedResources[key]}
              onChange={(newResource) =>
                setSelectedResources({...selectedResources, [key]: newResource})
              }
              onDelete={() => {
                const newSelectedResources = Object.fromEntries(
                  Object.entries(selectedResources).filter(([k, v]) => k !== key)
                );
                setSelectedResources(newSelectedResources);
                setResourceKeys(Object.keys(newSelectedResources));
              }}
            />
          ))
        }
      </div>
      <Button className="mb-2" color="primary" onClick={handleAddResource}>
        <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 5 }} />
        Add Resource
      </Button>

      <div className='content form-group-inline' >
        <Button className="mx-2" color="primary" onClick={handleShareInputs}>
          Share Inputs
        </Button>
        <Input className="mx-2" type="file" accept=".json" onChange={handleUploadInputs} style={{ width: "30%"}}/>
        <Button className="mx-2" color="primary" onClick={() => document.querySelector('input[type="file"]').click()}>
          Upload Inputs
        </Button>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this factory?"
      />
      <ResourceList resourceData={resourceData}/>
    </div>
  );
};

export default Factory;
