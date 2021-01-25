import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { AuthState } from "api-contract"
import React, { createContext, useEffect, useState } from "react"
import { connect } from "react-redux"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, setAuthUser, clearAuthUser } from "store/actions/Auth"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

export const AuthContext = createContext({})

export interface AuthData {
    email: string
    token: string
}

interface DispatchProps {
    setAuthUser: (email: string, token: string) => AuthAction
    clearAuthUser: () => AuthAction
}

interface Props extends DispatchProps {
    auth?: AuthState
}

const AuthProvider: React.FC<Props> = (props) => {
    const [auth, setAuth] = useState({ loading: true, email: "", token: "" })
    const [modal, setModal] = useState({
        open: false,
        title: props.auth?.modal.title || "",
        message: props.auth?.modal.message,
        showLogout: false,
    })

    const setGeneralError = (
        title: string,
        message: string,
        showLogout: boolean = false
    ) => {
        setModal({
            open: true,
            title,
            message,
            showLogout,
        })
    }

    const handleModalClose = async () => {
        setModal({
            ...modal,
            open: false,
        })

        if (props.auth?.modal.showLogout) {
            await AuthService.signOut()
            props.clearAuthUser()
            window.location.reload()
        }
    }

    const setAuthData = (loading: boolean, email: string, token: string) => {
        setAuth({ loading, email, token })
    }

    const { setAuthUser } = props
    useEffect(() => {
        const authData = JSON.parse(
            window.localStorage.getItem("authData") || "{}"
        ) as AuthData
        setAuthUser(authData.email, authData.token)
        setAuth({
            loading: false,
            email: authData.email,
            token: authData.token,
        })
    }, [setAuthUser])

    useEffect(() => {
        if (props.auth?.modal.error) {
            setModal({
                open: true,
                title: props.auth.modal.title,
                message: props.auth.modal.message,
                showLogout: props.auth.modal.showLogout,
            })
        }
    }, [props.auth?.modal])

    useEffect(() => {
        async function getToken() {
            if (props.auth?.user?.token) {
                try {
                    await AuthService.validateAuth()
                } catch (ex) {
                    setGeneralError(ex.title, ex.message, ex.showLogout)
                }
                setAuth({
                    loading: props?.auth?.loading || false,
                    email: props.auth?.user?.email || "",
                    token: props.auth?.user?.token || "",
                })
            }
        }
        getToken()
    }, [props.auth?.user, props.auth?.loading])

    return (
        <AuthContext.Provider value={{ auth, setAuthData, setGeneralError }}>
            <ThemeProvider theme={theme}>
                {props.children}
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={modal.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {modal.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            dangerouslySetInnerHTML={{
                                __html: modal.message || "",
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </AuthContext.Provider>
    )
}

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiTypography: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
            body1: {
                fontSize: 14,
            },
        },
        MuiFormLabel: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiInput: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiOutlinedInput: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiTextField: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiMenuItem: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
    },
})

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    setAuthUser,
    clearAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
