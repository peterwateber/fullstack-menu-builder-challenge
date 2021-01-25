import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import { Menu } from "api-contract"
import React from "react"

interface Props {
    handleButtonClick: (id: string) => void
    item: Menu
    loading: boolean
}

const MenuDetails: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { item, loading } = props

    const handleButtonClick = () => {
        props.handleButtonClick(item.id)
    }

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    {!loading && (
                        <div>
                            <Typography
                                className={classes.title}
                                variant="h6"
                                component="h6"
                            >
                                ${item.price}
                            </Typography>
                            <Typography>
                                {item.name}, {item.dish}
                            </Typography>
                            <Typography color="textSecondary">
                                {item.description.substr(0, 20) + "..."}
                            </Typography>
                        </div>
                    )}
                    {loading && (
                        <div>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height={5}
                                className={classes.loadingText}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height={5}
                                className={classes.loadingText}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height={5}
                                className={classes.loadingText}
                            />
                        </div>
                    )}
                </CardContent>
                <div className={classes.controls}>
                    {!loading && (
                        <Button
                            className={classes.button}
                            variant="contained"
                            size="small"
                            onClick={() => {
                                !loading && handleButtonClick()
                            }}
                            disabled={loading}
                        >
                            More
                        </Button>
                    )}
                    {loading && (
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            className={classes.button}
                        />
                    )}
                </div>
            </div>
            {!loading && (
                <CardMedia
                    className={classes.cover}
                    image={item.image}
                    title={item.name}
                />
            )}
            {loading && (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.cover}
                />
            )}
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
            flex: "1",
        },
        content: {
            flex: "1",
        },
        cover: {
            width: 130,
            [theme.breakpoints.up("md")]: {
                width: 190,
                minHeight: 134,
            },
        },
        controls: {
            padding: 16,
        },
        title: {
            fontWeight: 700,
        },
        loadingText: {
            marginBottom: 10,
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
