import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Menu } from "api-contract"
import React from "react"

interface Props {
    handleButtonClick: (id: string) => void
    item: Menu
}

const MenuDetails: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { item } = props

    console.log(item)

    const handleButtonClick = () => {
        props.handleButtonClick(item.id)
    }

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        component="h6"
                    >
                        {item.price}
                    </Typography>
                    <Typography>{item.name}</Typography>
                    <Typography color="textSecondary">
                        {item.description}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        size="small"
                        onClick={handleButtonClick}
                    >
                        More
                    </Button>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={item.image}
                title={item.name}
            />
        </Card>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            borderRadius: 12,
            boxShadow: `0 -1px 4px rgba(220, 228, 246, 0.35),
                    0 2px 4px rgba(220, 228, 246, 0.35)`,
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        content: {
            flex: "1 0 auto",
        },
        cover: {
            width: 191,
        },
        controls: {
            padding: 16,
        },
        title: {
            fontWeight: 700,
        },
        button: {
            borderRadius: 12,
            fontWeight: 700,
            boxShadow: "none",
            width: "100%",
            "&:hover,&:active": {
                boxShadow: "none",
            },
        },
    })
)

export default MenuDetails
