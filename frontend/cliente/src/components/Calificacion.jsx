import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';


import styles from "./styles.module.scss";
import movie from "./movie.module.scss";

const CalificacionPage = () => {
  const { id } = useParams();
  const [calificacion, setCalificacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [movies, setMovies] = useState(null); 
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/peliculas/movies/${id}`) // Agregué el ID en la URL
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => setError(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/api/calificacion/calificar/${id}`,
        {
          calificacion,
          comentario,
          peliculaId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      

      // Maneja la respuesta según tus necesidades
      console.log('Respuesta del servidor:', response.data);
      window.location.href = `/welcome/${localStorage.getItem('userId')}`;
    } catch (error) {
      console.error('Error al enviar la calificación:', error);
    }
  };

  const onChange = (e) => {
    setCalificacion(e.target.value);
  };

  return (
    <div className={movie.calificar}>
      <h1>Calificar Película</h1>
      {movies && (
        <>
          <h2>{movies.nombre}</h2>
          <img src={movies.image.url} alt={movies.nombre} />
          <form onSubmit={handleSubmit}>
          <div className={styles.menu}>
                <div className={styles.left}>
                    <label htmlFor='calificacion'>Calificacion </label>
                    <select
                        value={calificacion}
                        onChange={(e) => onChange(e)}
                        id='calificacion'
                        name='calificacion'
                    >
                        <option value=''>Selecciona una opcion</option>
                        <option value='Muy Mala'>Muy Mala</option>
                        <option value='Mala'>Mala</option>
                        <option value='Regular'>Regular</option>
                        <option value='Buena'>Buena</option>
                        <option value='Muy Buena'>Muy Buena</option>
                    </select>
                </div>
            </div>
            <br />
            <label>
              Comentario:
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Enviar Calificación</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CalificacionPage;
