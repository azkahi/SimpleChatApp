import { OAuth2Client } from "google-auth-library";
import { ParsedUrlQuery } from "querystring";

const client = new OAuth2Client();

const Auth = (auth_token: string, header_token: string) => {

    const { error } = ValidateToken(auth_token, header_token);

    if (error) return { error };

    VerifyOAuthGoogle(auth_token).catch((error) => {
        return { error: error };
    });

    return { error: null };
};

const ValidateToken = (auth_token: string, header_token: string) => {
    if (!auth_token) return { error: 'Token is required.' };
    if (!header_token) return { error: 'Token is required.' };
    if (auth_token !== auth_token) return { error: 'Token is invalid.' };
    return { error: null };
};

const VerifyOAuthGoogle = async (token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return { error: 'Not Authenticated.' };
    const userid = payload['sub'];

    return { error: null };
};  

export default Auth;