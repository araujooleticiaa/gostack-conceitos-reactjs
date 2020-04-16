import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {

    const response =  await api.post('repositories', {
      title,
      url,
      techs
    });
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(repository =>  repository.id !== id));
  } 

  return (
    <div>
      <h1>Repositórios cadastrados!</h1>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>

          <strong>Titulo:</strong>
          <p>{repository.title}</p>

          <strong>Url:</strong>
          <p>{repository.url}</p>

          <strong>Techs:</strong>
          <p>{repository.techs}</p>

          <strong>Likes:</strong>
          <p>{repository.likes}</p>

          <button type="submit" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))} 
     </ul>    

      <form onSubmit={handleAddRepository}>

        <input placeholder="Titulo"
        value={title}
        onChange={e => setTitle(e.target.value)}/>

        <input placeholder="Url"
        value={url}
        onChange={e => setUrl(e.target.value)}/>

        <input placeholder="Techs" 
        value={techs}
        onChange={e => setTechs(e.target.value)}/>

        <button type="submit">Adicionar</button>
      </form>

    </div>
  );
}

export default App;
