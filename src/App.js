import React, { useState, useEffect } from 'react'
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() =>{
    api.get('/repositories',).then(response =>{
        setRepositories(response.data)
    })
 }, []);


  async function handleAddRepository() {
      const response = await api.post('/repositories',{ 
      id: 123,
      title: `Desafio ReactJS`,
      url:'https://github.com/josepholiveira',
	    techs:  [ 'React', 'Node.js' ],
  })

  const repository = response.data;

  setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);  

    const filtrados = repositories.filter((repository)=>{return repository.id !=id})
    console.log(filtrados)
    setRepositories(filtrados)

    
     
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
      {repositories.map(repository => <li key={repository.id}>
          {repository.title} 

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
