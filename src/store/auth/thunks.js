import { checkingCredential, login, logout } from "./authSlice";
import {
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    singInWithGoogle,
} from "../../firebase/providers";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredential());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredential());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    };
};

export const startCreatingUserWithEmailPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredential());

        const result = await registerUserWithEmailPassword({
            email,
            password,
            displayName,
        });

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredential());

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    };
};
