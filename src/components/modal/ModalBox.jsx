import React, { useState } from 'react';
import styles from './ModalBox.module.css';
import { v4 as uuidv4 } from 'uuid';

const ModalBox = ({ handleClose }) => {
  const [name, setName] = useState('');
  const [colour, setColour] = useState('');
  const [error, setError] = useState(false);

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  const formatGroupName = (name) => {
    return name
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCreate = () => {
    const formattedName = formatGroupName(name);
    const newGroup = {
      id: uuidv4(),
      name: formattedName,
      colour,
    };

    const groupsFromLocalStorage = localStorage.getItem('groups');
    const groupsArray = groupsFromLocalStorage ? JSON.parse(groupsFromLocalStorage) : [];

    const groupExists = groupsArray.some(
      (existingGroup) => existingGroup.name.toLowerCase() === formattedName.toLowerCase()
    );

    if (groupExists) {
      setError(true);
      return;
    }

    groupsArray.push(newGroup);
    localStorage.setItem('groups', JSON.stringify(groupsArray));

    handleClose();
    window.location.reload(true); 
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleColourSelect = (selectedColor) => {
    setColour(selectedColor);
  };

  return (
    <div className={styles.box}>
      <h3>Create New Group</h3>
      <div>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          id="groupName"
          placeholder="Enter Group Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      {error && <div className={styles.error}><p>Group already exists</p></div>}
      <div className={styles.color}>
        <span>Choose Colour</span>
        <ul>
          {colors.map((color) => (
            <li
              key={color}
              style={{
                backgroundColor: color,
                cursor: 'pointer',
                border: colour === color ? '4px solid lightgreen' : '4px solid white',
              }}
              onClick={() => handleColourSelect(color)}
            />
          ))}
        </ul>
      </div>
      <div className={styles.button}>
        <button onClick={handleCreate} disabled={!name || !colour}>
          Create
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
