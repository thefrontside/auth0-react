import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthorizeAuth0 } from '../src/test-helpers';

export const SignIn = () => {
  let [username, setUsername] = useState("");
  let history = useHistory();
  return (
    <div>
      <h1>sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          AuthorizeAuth0({ username });
          history.push("/");
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
