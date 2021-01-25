import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AuthState, Category, Dish, UserState } from "api-contract"
import React, { useState } from "react"
import { connect } from "react-redux"
import MenuService from "services/Menu"
import { clearAuthUser, setAuthModal, AuthAction } from "store/actions/Auth"
import Form from "./components/Form"
import Preview from "./components/Preview"
import { Helmet } from "react-helmet"
import { RootState } from "store"
import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import AuthService from "services/Auth"

interface DispatchProps {
    setAuthModal: (payload: Pick<AuthState, "modal">) => AuthAction
    clearAuthUser: () => AuthAction
}

interface Props extends DispatchProps {
    user: UserState
}

const Admin: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [name, setName] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState<Category | "">("")
    const [dish, setDish] = useState<Dish | "">("")
    const [image, setImage] = useState("")
    const [other, setOther] = useState("")
    const [newlyAdded, setNewlyAdded] = useState("")

    const onChangeName = (value: string) => {
        setName(value)
    }

    const onChangePrice = (value: number) => {
        setPrice(value)
    }

    const onChangeDish = (value: Dish) => {
        setDish(value)
    }

    const onChangeCategory = (value: Category) => {
        setCategory(value)
    }

    const onChangeDescription = (value: string) => {
        setDescription(value)
    }

    const onChangeImage = (value: string) => {
        setImage(value)
    }

    const onChangeOther = (value: string) => {
        setOther(value)
    }

    const resetForm = () => {
        setName("")
        setPrice(0)
        setDish("")
        setCategory("")
        setDescription("")
        setImage("")
        setOther("")
    }

    const onSubmit = async (ev: React.SyntheticEvent) => {
        ev.preventDefault()
        try {
            const { id } = await MenuService.createMenu({
                name,
                price,
                description,
                category: category as Category,
                dish: dish as Dish,
                image,
                other,
            })
            setNewlyAdded(id)
            resetForm()
        } catch (ex) {
            props.setAuthModal({
                modal: {
                    error: true,
                    title: ex.title,
                    message: ex.message,
                    showLogout: ex.showLogout,
                },
            })
        }
    }

    const logout = async () => {
        await AuthService.signOut()
        props.clearAuthUser()
        window.location.href = "/login"
    }

    if (!Boolean(props.user.token)) {
        return null
    }

    return (
        <Container fixed className={classes.root}>
            <Helmet>
                <title>Admin page</title>
            </Helmet>
            <Grid container spacing={5}>
                <Grid className={classes.left} item xs={3}>
                    <Typography variant="caption">
                        Welcome,{" "}
                        <strong>
                            <em>{props.user.email}</em>
                        </strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={logout}
                    >
                        Logout
                    </Button>
                    <Form
                        name={name}
                        price={price}
                        description={description}
                        category={category}
                        dish={dish}
                        image={image}
                        other={other}
                        onSubmit={onSubmit}
                        onChangeName={onChangeName}
                        onChangePrice={onChangePrice}
                        onChangeDish={onChangeDish}
                        onChangeCategory={onChangeCategory}
                        onChangeDescription={onChangeDescription}
                        onChangeImage={onChangeImage}
                        onChangeOther={onChangeOther}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Preview
                        name={name}
                        price={price}
                        description={description}
                        category={category}
                        dish={dish}
                        image={image}
                        other={other}
                        newlyAdded={newlyAdded}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "40px 0",
        },
        left: {
            borderRight: "1px solid #CCC",
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    setAuthModal,
    clearAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
