import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Dialog from "@material-ui/core/Dialog"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

interface Props extends RouteComponentProps<any> {
    isOpen: boolean
    handleDialogClose: () => void
}

const MenuDialog: React.FC<Props> = (props) => {
    const classes = useStyles()
    return (
        <Dialog
            onClose={props.handleDialogClose}
            aria-labelledby="simple-dialog-title"
            open={props.isOpen}
        >
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://d3qvqlc701gzhm.cloudfront.net/full/dc73bfd2623912fd8b080f69d623fa66d92dc6e513d2feb1d727dc6667337f84.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h3">
                            Something here
                        </Typography>
                        <Typography variant="body2" component="p">
                            <strong>$30</strong>, <i>Breakfast</i>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.description}
                        >
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Dialog>
    )
}

const useStyles = makeStyles({
    card: {
        maxWidth: 320,
    },
    media: {
        height: 160,
    },
    description: {
        marginTop: 5
    }
})

export default MenuDialog
