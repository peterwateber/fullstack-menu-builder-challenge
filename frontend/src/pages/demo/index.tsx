import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
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

    useEffect(() => {
        getAllMenu(queryParams)
    }, [getAllMenu, queryParams])

    useEffect(() => {
        const id = props.match.params.id
        if (Boolean(id)) {
            getMenuDetails(id)
        }
    }, [getMenuDetails, props.match.params.id])

    if (!Boolean(menu?.items?.length)) {
        return null
    }

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
                        <ListItem button key={index}>
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
                        <ListItem button key={index}>
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
                        <ListItemText primary="Logout" onClick={() => logout()} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Grid spacing={3} container>
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
                        <Grid key={idx} item xs={4}>
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
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        listTitle: {
            fontWeight: 700,
            color: "#aaa",
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    menu: state.menu.menu,
    loading: state.menu.loading,
})

const mapDispatchToProps = {
    getAllMenu,
    getMenuDetails,
    clearAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
