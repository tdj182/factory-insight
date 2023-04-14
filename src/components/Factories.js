import React, { useState, useEffect } from 'react';
import { Button, Nav, TabContent, TabPane } from 'reactstrap';
import Factory from './Factory';
import FactoryNavItem from './FactoryNavItem';
import { v4 as uuidv4 } from 'uuid';

const Factories = () => {
  const [factories, setFactories] = useState(() => {
    const storedFactories = localStorage.getItem('factories');
    return storedFactories ? JSON.parse(storedFactories) : [];
  });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    localStorage.setItem('factories', JSON.stringify(factories));
  }, [factories]);

  const handleAddFactory = () => {
    let newFactoryName = 'New Factory';
    let i = 1;
    while (factories.some(factory => factory.name === newFactoryName)) {
      newFactoryName = `New Factory (${i++})`;
    }

    const newFactory = {
      id: uuidv4(),
      name: newFactoryName,
      resources: {}
    };
    setFactories([...factories, newFactory]);
    setActiveTab(factories.length);
  };

  const handleFactoryNameChange = (id, newName) => {
    debugger;
    const nameExists = factories.some(factory => factory.name === newName);

    if (nameExists) {
      alert('Factory name must be unique.');
      return;
    }

    setFactories(prevFactories => {
      const newFactories = [...prevFactories];
      const factory = newFactories.find(f => f.id === id);
      if (factory) {
        factory.name = newName;
      }
      return newFactories;
    });
  };

  const handleDeleteFactory = (id) => {
    setFactories(prevFactories => prevFactories.filter(f => f.id !== id));
    localStorage.removeItem(`factory-${id}`)
  };

  const handleFactoryClick = (factory) => {
    const index = factories.findIndex(f => f.id === factory.id);
    if (index !== -1) {
      setActiveTab(index);
    }
  };

  const handleFactoryClose = (factory) => {
    const index = factories.findIndex(f => f.id === factory.id);
    if (index !== -1) {
      const newFactories = [...factories];
      newFactories.splice(index, 1);
      setFactories(newFactories);
      if (activeTab === index) {
        setActiveTab(0);
      }
    }
  };

  return (
    <div>
      <h1>Factories</h1>
      <Button color="primary" onClick={handleAddFactory}>New Factory</Button>
      <Nav tabs>
        {factories.map((factory, index) => (
          <FactoryNavItem
            key={factory.id}
            active={activeTab === index}
            factory={factory}
            onClick={handleFactoryClick}
            onClose={handleFactoryClose}
          />
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {factories.map((factory, index) => (
          <TabPane key={factory.id} tabId={index}>
            <Factory
              id={factory.id}
              name={factory.name}
              resources={factory.resources}
              onNameChange={handleFactoryNameChange}
              onDelete={handleDeleteFactory}
              factories={factories}
            />
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

export default Factories;