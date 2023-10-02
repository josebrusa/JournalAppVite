import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
    email: "",
    password: "",
    displayName: "",
};

const formValidations = {
    email: [(value) => value.includes("@"), "Introduzca un correo valido"],
    password: [
        (value) => value.length >= 6,
        "El password debe de contener mas de 6 caracters",
    ],
    displayName: [(value) => value.length >= 2, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitte] = useState(false);

    const { status, errorMessage } = useSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(
        () => status === "checking",
        [status]
    );

    const {
        displayName,
        email,
        password,
        onInputChange,
        formState,
        displayNameValid,
        isFormValid,
        emailValid,
        passwordValid,
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitte(true);

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState));
    };
    return (
        <AuthLayout title="Register">
            <p>
                {isFormValid
                    ? "Formulario correcto"
                    : "Rellene los campos obligatiorios"}
            </p>
            <form
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre"
                            type="text"
                            placeholder="Jonh Apple"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={errorMessage ? "" : "none"}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/login"
                        >
                            Inicie Sesion
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
