import axios from 'axios';
import { Buffer } from 'buffer';

import { private_key, public_key, public_key_api } from './keys';

interface DictStr {
  [key: string]: string;
}

interface DictEnumStr {
  [key: string]: string[];
}

async function encrypt_request(
  login_data: DictStr,
  public_key_api: string,
): DictEnumStr {
  let encrypted_data: DictEnumStr = {};
  const JSEncrypt = (await import('jsencrypt')).default;
  let cipher = new JSEncrypt({
    default_key_size: '2048',
  });
  cipher.setPublicKey(public_key_api);
  Object.entries(login_data).map(([key, value]: [string, string]) => {
    let value_enc: string[] = [];
    let iterations: number = Math.ceil(value.length / 150);

    for (let it = 0; it < iterations; it++) {
      const it_pos = 150 * it;
      const substr: string = value.substring(it_pos, it_pos + 150);
      const encrypted_result = cipher.encrypt(substr);
      if (encrypted_result) {
        value_enc.push(encrypted_result);
      }
    }
    encrypted_data[key] = value_enc;
  });

  return encrypted_data;
}

async function decrypt_response(response_data: string): DictStr {
  let encrypted_data: DictStr = {};
  const JSEncrypt = (await import('jsencrypt')).default;
  let cipher = new JSEncrypt({
    default_key_size: '2048',
  });
  cipher.setPrivateKey(private_key);
  Object.entries(response_data).map(([key, value_list]: any) => {
    let value_enc: string = '';
    encrypted_data[key] = '';
    value_list.map((value: string) => {
      const new_val = Buffer.from(value).toString('latin1');
      const encrypted_result = cipher.decrypt(new_val);
      if (encrypted_result) {
        value_enc = encrypted_result;
      }
      encrypted_data[key] += value_enc;
    });
  });
  return encrypted_data;
}

async function login_ldap(
  username: string,
  password: string,
): Promise<boolean> {
  const jsonurl = `https://ldap-auth-api.lnls.br`;
  const login_data: DictStr = {
    email: username,
    password: password,
    public_key: public_key,
  };

  const encrypted: DictEnumStr = await encrypt_request(
    login_data,
    public_key_api,
  );
  const encrypt_string: string = JSON.stringify(encrypted);
  const res = await axios
    .post(jsonurl, {
      method: 'post',
      timeout: 2000,
      data: encrypt_string,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      return res.data;
    });
  console.log(await decrypt_response(res));
}

export { login_ldap };
