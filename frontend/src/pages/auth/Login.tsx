import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/styles"
import { AuthContext } from "contexts/AuthProvider"
import React, { useContext, useState } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, setAuthUser } from "store/actions/Auth"
import "./base.scss"

interface DispatchProps {
    setAuthUser: (email: string, token: string) => AuthAction
}

interface Props extends RouteComponentProps<any>, DispatchProps {}

const Login: React.FC<Props> = (props) => {
    const classes = styles(props)
    const year = new Date().getFullYear()

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")

    const { setAuthData }: any = useContext(AuthContext)

    const onFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const authData = await AuthService.auth(email, password)
        if (authData.error) {
            setMessage(authData.message)
        } else {
            setAuthData(false, authData.email, authData.token)
            props.setAuthUser(authData.email, authData.token)
        }
    }

    return (
        <div className={classes.root}>
            <div className="wrapper">
                <Container maxWidth="sm">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {Boolean(message) && (
                                <Alert severity="error">{message}</Alert>
                            )}
                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={onFormSubmit}
                            >
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        required
                                        id="email"
                                        label="Email Address"
                                        variant="outlined"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="password"
                                        label="Password *"
                                        type="password"
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    className={classes.button}
                                    variant="contained"
                                    disableElevation
                                >
                                    <span className={classes.buttonLabel}>
                                        Sign In
                                    </span>
                                </Button>
                            </form>
                            <Typography
                                className={classes.copyright}
                                variant="overline"
                                display="block"
                                gutterBottom
                            >
                                Copyright &copy; {year}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

const styles = makeStyles({
    root: {
        display: "table",
        margin: "0px auto",
        height: "100%",
    },
    wrapper: {
        display: "table-cell",
        verticalAlign: "middle",
    },
    formControl: {
        width: "100%",
        marginBottom: "15px",
    },
    button: {
        color: "white",
        background:
            "linear-gradient(130deg, #02698f 10%, #07688bfa 0%, #207b9d 30%, #3fa7cc 80%)",
        transition: "opacity 0.2s ease-in-out",
        marginTop: "15px",
        width: "100%",

        "&:hover": {
            background:
                "linear-gradient(130deg, #0095b6 10%, #0095b6 0%, #0095b6 20%, #00c0d4 70%)",
            opacity: 0.9,
        },
    },
    buttonLabel: {
        fontFamily: "Spartan, sans-serif",
        textTransform: "none",
    },
    copyright: {
        marginTop: "15px",
        textAlign: "center",
    },
})

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    setAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
