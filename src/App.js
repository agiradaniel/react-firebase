import {React, useState, useEffect} from 'react';
import './App.css';
import Auth from './auth';
import { db, storage, auth } from './config/firebase';
import { doc, getDocs, collection, addDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
//import {auth} from "./config/firebase.js"


function App() {

  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

 
  /*const onSubmitMovie = async () => {
      try{

      }catch(err){
        console.error(err)
      }
  } */
  const getMovieList = async () => {
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setMovieList(filteredData)
    } catch(err){
      console.error(err)
    }
  }
  
  useEffect(()=>{
    getMovieList();
  },[])

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate, 
        receivedAnOscar: isNewMovieOscar, 
        userId: auth?.currentUser?.uid,
      })
      getMovieList();
    }
    
    catch(err){
      console.error(err);
    }
  }

 

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
   
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedTitle});
  
  }

  const uploadFile = async() =>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    }catch(err){
      console.error(err)
    }  
  }

  return (
    <div className="App">
      <Auth/>

    <div>
      <input placeholder="Movie title ..." onChange={(e)=>{
        setNewMovieTitle(e.target.value)
      }}/>
      <input placeholder="Release date..." type="number"onChange={(e)=>{
        setNewReleaseDate(Number(e.target.value));
      }}/>
      <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>{
        setIsNewMovieOscar(e.target.checked)
      }}/>
      <label>Received an oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={()=>{
              deleteMovie(movie.id)
            }}>Delete movie</button>
            <input placeholder='new title ...' onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={() => {
              updateMovieTitle(movie.id)
            }}>Update Title</button>
          </div>
        ))}
      </div>
            
      <div>
            <input type="file" onChange={(e )=>{
              setFileUpload(e.target.files[0])
            }}/>
            <button onClick={uploadFile}>Upload file</button>
      </div>      

    </div>
  );
}

export default App;
