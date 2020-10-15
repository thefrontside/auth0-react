import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setUserToken } from '../src/test-helpers';

export const SignIn = () => {
  let [username, setUsername] = useState("");
  let history = useHistory();
  return (
    <div>
      <h1>sign in</h1>
      <form
        onSubmit={() => {
          console.log('username', username)
          setUserToken(username);
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
