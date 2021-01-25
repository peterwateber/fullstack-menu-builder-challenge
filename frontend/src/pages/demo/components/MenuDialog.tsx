import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Dialog from "@material-ui/core/Dialog"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import { Menu } from "api-contract"
import React from "react"
import { connect } from "react-redux"
import { RootState } from "store"

interface Props {
    item: Menu | null
    loading: boolean
    isOpen: boolean
    handleDialogClose: () => void
}

const MenuDialog: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { item, loading } = props

    if (!Boolean(Object.values(item || {}).length) || loading)
        return (
            <Dialog
                onClose={props.handleDialogClose}
                aria-labelledby="simple-dialog-title"
                open={props.isOpen}
            >
                <div className={classes.loading}>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton />
                    <Skeleton width="60%" />
                </div>
            </Dialog>
        )

    return (
        <Dialog
            onClose={props.handleDialogClose}
            aria-labelledby="simple-dialog-title"
            open={props.isOpen}
        >
            <Card className={classes.card}>
                <CardActionArea>
                    {Boolean(item?.image) && (
                        <CardMedia
                            className={classes.media}
                            image={item?.image}
                            title={item?.name}
                        />
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h3">
                            {item?.name}, <i>{item?.dish}</i>
                        </Typography>
                        <Typography variant="body2" component="p">
                            <strong>${item?.price}</strong>, {item?.category}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.description}
                        >
                            {item?.description}
                        </Typography>
                        {Boolean(item?.other) && (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className={classes.description}
                            >
                                <em>Others: {item?.other}</em>
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Dialog>
    )
}

const useStyles = makeStyles({
    card: {
        width: 320,
    },
    loading: {
        padding: 10,
    },
    media: {
        height: 160,
    },
    description: {
        marginTop: 5,
    },
})

const mapStateToProps = (state: RootState) => ({
    item: state.menu.viewing,
    loading: state.menu.isViewingLoading
})

export default connect(mapStateToProps)(MenuDialog)
