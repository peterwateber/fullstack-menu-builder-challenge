import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Menus } from "api-contract"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import { RootState } from "store"
import { getAllMenu, getMenuDetails } from "store/actions/Menu"
import "./base.scss"
import MenuDetails from "./components/MenuDetails"
import MenuDialog from "./components/MenuDialog"

interface DispatchProps {
    getAllMenu: () => void
    getMenuDetails: (id: string) => void
}

interface Props extends DispatchProps, RouteComponentProps<any> {
    menu: Menus
}

const Demo: React.FC<Props> = (props) => {
    const classes = useStyles()
    const _id = window.location.pathname.substr(1).split("/")
    const hasId = _id.length > 1
    const [openMenuDialog, setOpenMenuDialog] = useState(hasId)
    const { getAllMenu, getMenuDetails, menu } = props

    const toggleMenuDialog = () => {
        setOpenMenuDialog(!openMenuDialog)
    }

    const handleButtonClick = (id: string) => {
        props.history.push(`demo/${id}`)
        toggleMenuDialog()
    }

    const handleDialogClose = () => {
        props.history.push("/demo")
        toggleMenuDialog()
    }

    useEffect(() => {
        getAllMenu()
    }, [getAllMenu])

    useEffect(() => {
        if (hasId) getMenuDetails(_id[1])
    }, [getMenuDetails])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    {["Breakfast", "Lunch", "Dinner"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <Grid spacing={3} container>
                    {/* <Grid item xs={12}>
                        <ToggleButtonGroup>
                            <ToggleButton value="check">
                                <ViewComfySharpIcon />
                            </ToggleButton>
                            <ToggleButton value="check">
                                <ViewHeadlineSharpIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid> */}
                    {menu.items.map((item, idx) => (
                        <Grid key={idx} item xs={4}>
                            <MenuDetails
                                item={item}
                                handleButtonClick={handleButtonClick}
                            />
                        </Grid>
                    ))}
                </Grid>
            </main>
            <MenuDialog
                isOpen={openMenuDialog}
                handleDialogClose={handleDialogClose}
                {...props}
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
    })
)

const mapStateToProps = (state: RootState) => ({
    menu: state.menu.menu,
})

const mapDispatchToProps = {
    getAllMenu,
    getMenuDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
