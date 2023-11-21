import React, { useState } from 'react';

import { login_ldap } from './ldap';

/**
 * Authentication feature for the manager page.
 */
const Login: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <div>
        Email:
        <input
          type="text"
          onChange={(evt: any) => setUser(evt.target.value)}
          value={user}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          onChange={(evt: any) => setPassword(evt.target.value)}
          value={password}
        />
      </div>
      <button onClick={() => console.log(login_ldap(user, password))}>
        Log In
      </button>
    </div>
  );
};

export default Login;
