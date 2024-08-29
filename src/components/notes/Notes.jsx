import React, { useEffect, useState } from 'react';
import styles from './Notes.module.css';
import { BiSolidSend } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useShort } from '../../useShort';
import { FaArrowLeft } from 'react-icons/fa';

const Notes = () => {
  const [text, setText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const groupData = JSON.parse(localStorage.getItem("groups")).find(grp => grp.id === id);
  const shortName = useShort(groupData.name);
  const savedNotes = localStorage.getItem(groupData.name);

  const addMessage = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newNote = { date, time, message: text };
    let storedNotes = localStorage.getItem(groupData.name);

    if (storedNotes) {
      storedNotes = JSON.parse(storedNotes);
      storedNotes.push(newNote);
      localStorage.setItem(groupData.name, JSON.stringify(storedNotes));
    } else {
      localStorage.setItem(groupData.name, JSON.stringify([newNote]));
    }
    
    setChatHistory([...chatHistory, newNote]);
    setText('');
    window.location.reload();
  };

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (savedNotes) {
      setChatHistory(JSON.parse(savedNotes));
    }
  }, [savedNotes, id]);

  return (
    <div className={`${styles.notes} ${styles.mobileChat}`}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.back} size={20} onClick={goBack} />
        <span className={styles.bubble} style={{ backgroundColor: groupData.colour }}>{shortName.toUpperCase()}</span>
        <h2>{groupData.name}</h2>
      </div>
      <div className={styles.body}>
        {chatHistory.map((note, index) => (
          <div key={index} className={styles.message}>
            {note.message}
            <div className={styles.date}>
              <span>{note.date}</span> &bull; <span>{note.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.input}>
        <textarea placeholder="Enter your text here..." onChange={(e) => setText(e.target.value)} value={text} />
        <button className={styles.send} disabled={!text} onClick={addMessage}>
          <BiSolidSend size={30} />
        </button>
      </div>
    </div>
  );
};

export default Notes;
