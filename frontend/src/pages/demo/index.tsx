import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import MenuItem from "@material-ui/core/MenuItem"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { Category, Dish, Menus } from "api-contract"
import queryString from "query-string"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, clearAuthUser } from "store/actions/Auth"
import { getAllMenu, getMenuDetails } from "store/actions/Menu"
import MenuDetails from "./components/MenuDetails"
import MenuDialog from "./components/MenuDialog"

interface DispatchProps {
    getAllMenu: (params: object) => void
    getMenuDetails: (id: string) => void
    clearAuthUser: () => AuthAction
}

interface Props extends DispatchProps, RouteComponentProps<any> {
    menu: Menus
    email: string | undefined
    loading: boolean
}

const Demo: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [openMenuDialog, setOpenMenuDialog] = useState(
        Boolean(props.match.params.id)
    )
    const [queryParams, setQueryParams] = useState(
        queryString.parse(window.location.search)
    )
    const [category, setCategory] = useState<Category | "">("")
    const [dish, setDish] = useState<Dish | "">("")

    const { getAllMenu, getMenuDetails, loading, menu } = props

    const toggleMenuDialog = () => {
        setOpenMenuDialog(!openMenuDialog)
    }

    const handleButtonClick = (id: string) => {
        props.history.push(`demo/${id}`)
        getMenuDetails(id)
        toggleMenuDialog()
    }

    const handleDialogClose = () => {
        props.history.push("/demo")
        toggleMenuDialog()
    }

    const handleFilterSelection = (
        value: Category | Dish,
        by: string,
        index: number
    ) => {
        props.history.replace(`/demo?by=${by}&selected=${index}&value=${value}`)
        setQueryParams(queryString.parse(window.location.search))
    }

    const logout = async () => {
        await AuthService.signOut()
        window.location.href = "/login"
        props.clearAuthUser()
    }

    const onChangeFilterCategory = (value: Category, index: number) => {
        setDish("")
        setCategory(value)
        handleFilterSelection(value, "Category", index)
    }

    const onChangeFilterDish = (value: Dish, index: number) => {
        setCategory("")
        setDish(value)
        handleFilterSelection(value, "Dish", index)
    }
    

    useEffect(() => {
        const findSelected = (by: any, byStr: string): any => {
            return Object.values(by).find(
                (c, idx) =>
                    queryParams.by === byStr &&
                    idx === Number(queryParams.selected)
            )
        }
        if (queryParams.by === "Category") {
            setCategory(findSelected(Category, "Category"))
            setDish("")
        } else if (queryParams.by === "Dish") {
            setDish(findSelected(Dish, "Dish"))
            setCategory("")
        }
    }, [queryParams])

    useEffect(() => {
        getAllMenu(queryParams)
    }, [getAllMenu, queryParams])

    useEffect(() => {
        const id = props.match.params.id
        if (Boolean(id)) {
            getMenuDetails(id)
        }
    }, [getMenuDetails, props.match.params.id])

    return (
        <div className={classes.root}>
            <Helmet>
                <title>Demo</title>
            </Helmet>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List
                    component="nav"
                    subheader={
                        <ListSubheader
                            component="div"
                            className={classes.listTitle}
                        >
                            Category
                        </ListSubheader>
                    }
                >
                    {Object.values(Category).map((text, index) => (
                        <ListItem
                            button
                            key={index}
                            selected={
                                queryParams.by === "Category" &&
                                Number(queryParams.selected) === index
                            }
                        >
                            <ListItemText
                                primary={text}
                                onClick={() =>
                                    handleFilterSelection(
                                        text,
                                        "Category",
                                        index
                                    )
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List
                    component="nav"
                    subheader={
                        <ListSubheader
                            component="div"
                            className={classes.listTitle}
                        >
                            Dish
                        </ListSubheader>
                    }
                >
                    {Object.values(Dish).map((text, index) => (
                        <ListItem
                            button
                            key={index}
                            selected={
                                queryParams.by === "Dish" &&
                                Number(queryParams.selected) === index
                            }
                        >
                            <ListItemText
                                primary={text}
                                onClick={() =>
                                    handleFilterSelection(text, "Dish", index)
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List component="nav">
                    <ListItem button>
                        <ListItemText
                            primary="Logout"
                            onClick={logout}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Grid spacing={3} container>
                    <Grid item xs={12} className={classes.mobileFilter}>
                        <div className={classes.formControl}>
                            <TextField
                                fullWidth
                                size="small"
                                id="dish"
                                select
                                label="Category*"
                                variant="outlined"
                                value={category}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    onChangeFilterCategory(
                                        e.target.value as Category,
                                        Object.values(Category).indexOf(
                                            e.target.value as Category
                                        )
                                    )
                                }}
                            >
                                {Object.values(Category).map((option, idx) => (
                                    <MenuItem key={idx} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={classes.formControl}>
                            <TextField
                                fullWidth
                                size="small"
                                id="dish"
                                select
                                label="Dish*"
                                variant="outlined"
                                value={dish}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    onChangeFilterDish(
                                        e.target.value as Dish,
                                        Object.values(Dish).indexOf(
                                            e.target.value as Dish
                                        )
                                    )
                                }}
                            >
                                {Object.values(Dish).map((option, idx) => (
                                    <MenuItem key={idx} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <h3>
                            Welcome, <em>{props?.email}</em>!
                        </h3>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Grid>
                    {Boolean(Object.values(queryParams).length) && (
                        <Grid item xs={12}>
                            <Typography>
                                {props.menu.total} results found. Filtered by{" "}
                                <strong>
                                    {queryParams.by}: {queryParams.value}
                                </strong>
                            </Typography>
                        </Grid>
                    )}
                    {menu.items.map((item, idx) => (
                        <Grid key={idx} item xs={12} lg={4} md={6} sm={6}>
                            <MenuDetails
                                item={item}
                                loading={loading}
                                handleButtonClick={handleButtonClick}
                            />
                        </Grid>
                    ))}
                </Grid>
            </main>
            <MenuDialog
                isOpen={openMenuDialog}
                handleDialogClose={handleDialogClose}
            />
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            display: "none",
            flexShrink: 0,
            [theme.breakpoints.up("md")]: {
                display: "flex",
                width: 240,
            },
        },
        drawerPaper: {
            [theme.breakpoints.up("md")]: {
                width: 240,
            },
        },
        mobileFilter: {
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
        formControl: {
            marginBottom: 15,
        },
        content: {
            padding: "10px",
            flexGrow: 1,
            [theme.breakpoints.up("sm")]: {
                padding: theme.spacing(3),
            },
        },
        listTitle: {
            fontWeight: 700,
            color: "#aaa",
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    menu: state.menu.menu,
    email: state.auth.user.email,
    loading: state.menu.loading,
})

const mapDispatchToProps = {
    getAllMenu,
    getMenuDetails,
    clearAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
