import qs from 'query-string';
import dotenv from 'dotenv';
import { gitHub } from '../../services/oauthApi';

dotenv.config();

export default function redirectToGithub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
        response_type: 'code',
        scope: 'user public_repo',
        client_id: '243f7e5db9389fc7256a',
        redirect_uri: 'http://localhost:3000/login',
        state: 'rating'
    };

    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
}

export async function userGitInfo() { 
    window.onload = async () => {
      const { code } = qs.parseUrl(window.location.href).query;
      if(code) {
          try {
            const user = await gitHub(code);
            return user;
          } catch (err) {
            console.log(err);
          }
        }
    }
}

export async function sign() { 
  //ver se o user ja existe 
  //se nn exister cadastrar ele 
  //se ja existir puxar as infos do db
}