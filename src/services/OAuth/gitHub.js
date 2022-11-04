import qs from 'query-string';

export default function redirectToGithub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
        response_type: 'code',
        scope: 'user public_repo',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URL,
        state: 'rating'
    };

    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
}