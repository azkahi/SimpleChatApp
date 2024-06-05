import { OAuth2Client } from "google-auth-library";

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
    if (auth_token !== header_token) return { error: 'Token is invalid.' };
    return { error: null };
};

const VerifyOAuthGoogle = async (token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload.sub) return { error: 'Not Authenticated.' };
    
    return { error: null };
};  

export default Auth;