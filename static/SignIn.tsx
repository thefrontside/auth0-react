import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generateCodeForUser } from '../src/generate-code-for-user';

export const SignIn = () => {
  let [username, setUsername] = useState("");
  let history = useHistory();
  return (
    <div>
      <h1>sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let code = generateCodeForUser({ username });
          history.push(`/?code=${code}`);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input type="password" placeholder="Password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
