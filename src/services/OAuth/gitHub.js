import qs from 'query-string';
import dotenv from 'dotenv';

dotenv.config();

export default function redirectToGithub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
        response_type: 'code',
        scope: 'user public_repo',
        client_id: '243f7e5db9389fc7256a',
        redirect_uri: process.env.REDIRECT_URL,
        state: 'rating'
    };

    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
}