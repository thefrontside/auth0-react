import React, { useState } from 'react';
import { generateCodeForUser } from '../src/generate-code-for-user';

export const SignIn = () => {
  let [username, setUsername] = useState("");
  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let code = generateCodeForUser({ username });
          window.location.href = `/?code=${code}`;
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
