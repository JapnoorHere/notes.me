import React, { useEffect, useState } from 'react';
import penImg from '../assets/pen-white.png';
import { HiHome } from 'react-icons/hi';
import { GrAdd } from 'react-icons/gr';
import { BiLogOut, BiSearch } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    fetchNotes(); // Fetch notes when component mounts
  }, [email]); // Fetch notes whenever email changes

 

  const handleAddClick = () => {
    const note = window.prompt('Enter note : ');

    if (note) {
      fetch('http://localhost:4000/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: note, email: email }),
      })
        .then((res) => res.json())
        .then(() => {
          fetch('http://localhost:4000/home')
            .then((res) => res.json())
            .then((notes) => {
              setNotesArray(notes.notes);
            })
        })
        .catch((error) => {
          console.error('Error adding note:', error);
        });
    }
  };

  return (
    <div className=''>
      <div className='flex flex-row'>
        <div id='left-container' className='fixed flex flex-col items-center justify-between p-3 w-20 h-screen bg-[#3c3d43]'>
          <img src={penImg} alt='Pen' />
          <div className='flex flex-col gap-4 items-center justify-center'>
            <HiHome color='white' fontSize={30} className='cursor-pointer' />
            <GrAdd color='gray' fontSize={30} className='cursor-pointer' onClick={handleAddClick} />
          </div>
          <BiLogOut fontSize={30} className='cursor-pointer' color='gray' />
        </div>

        <div className='ml-20 p-10 w-full bg-[#fffdfa]'>
          <div className='flex items-center gap-4'>
            <BiSearch color='gray' />
            <input type='text' placeholder='Search Notes' className='focus:outline-none' />
          </div>
          <div className='mt-16'>
            <h1 className='text-3xl'>Hello Japnoor👋</h1>
            <p>All your notes are here in one place.</p>
          </div>
          <div className='flex flex-wrap gap-4 mt-10'>
            {notesArray.map((note, index) => (
              <div key={index} className='p-2 w-[200px] h-[200px] bg-yellow-100'>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
