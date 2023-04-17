import React, { useState } from 'react';
import axios from 'axios';

function UserRepositories() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub Username:
          <input type="text" value={username} onChange={handleInputChange} />
        </label>
        <button type="submit">Fetch Repositories</button>
      </form>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRepositories;
