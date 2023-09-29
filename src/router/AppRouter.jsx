import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useDispatch, useSelector } from "react-redux";
import { CheckingAuth } from "../UI";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        });
    }, []);

    if (status === "checking") {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {status === "authenticated" ? (
                <Route path="/*" element={<JournalRoutes />} />
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
