import React, {useState} from 'react';
import './ResourceList.css'

const ResourceList = ({ resourceData }) => {
  const [showResourceList, setShowResourceList] = useState(true);

  const toggleResourceList = () => {
    setShowResourceList(!showResourceList);
  };
  return (
    <div>
      <h3><span className='toggleHeader' onClick={toggleResourceList}>Resource List</span></h3>
      {showResourceList && 
        <table className="resource-table" style={{ textAlign: 'center', margin: '0 auto' }}>
          <thead>
            <tr>
              <th className='resource-name'>Name</th>
              <th>Production</th>
              <th>Consumption</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {resourceData.map(({ id, name, produced, consumed, remaining }) => (
              <tr key={id}>
                <td className='resource-name'>{name}</td>
                <td className={produced < 0 ? 'negative' : ''}>{produced}</td>
                <td className={consumed < 0 ? 'negative' : ''}>{consumed}</td>
                <td className={remaining < 0 ? 'negative' : ''}>{remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default ResourceList;