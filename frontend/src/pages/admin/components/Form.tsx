import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Category, Dish } from "api-contract"
import React from "react"
import { Link } from "react-router-dom"

interface Props {
    name: string
    price: number
    description: string
    category: Category | ""
    dish: Dish | ""
    image: string
    other?: string
    onSubmit: (ev: React.SyntheticEvent) => void
    onChangeName: (value: string) => void
    onChangePrice: (value: number) => void
    onChangeDish: (value: Dish) => void
    onChangeCategory: (value: Category) => void
    onChangeDescription: (value: string) => void
    onChangeImage: (value: string) => void
    onChangeOther: (value: string) => void
}

const Form: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { name, price, description, category, dish, image, other } = props

    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={(ev) => props.onSubmit(ev)}
            className={classes.root}
        >
            <div className={classes.formControl}>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={name}
                    size="small"
                    onChange={(e) => props.onChangeName(e.target.value)}
                />
            </div>
            <FormControl
                size="small"
                variant="outlined"
                fullWidth
                className={classes.formControl}
            >
                <InputLabel htmlFor="price">Price*</InputLabel>
                <OutlinedInput
                    id="price"
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                    labelWidth={45}
                    type="number"
                    value={price}
                    onChange={(e) =>
                        props.onChangePrice(parseInt(e.target.value, 10))
                    }
                />
            </FormControl>
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
                    onChange={(e) => props.onChangeDish(e.target.value as Dish)}
                >
                    {Object.values(Dish).map((option, idx) => (
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
                    label="Category*"
                    variant="outlined"
                    value={category}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) =>
                        props.onChangeCategory(e.target.value as Category)
                    }
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
                    label="Description*"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={description}
                    onChange={(e) => props.onChangeDescription(e.target.value)}
                />
            </div>
            <div className={classes.formControl}>
                <TextField
                    fullWidth
                    label="Image URL*"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size="small"
                    value={image}
                    onChange={(e) => props.onChangeImage(e.target.value)}
                />
            </div>
            <div className={classes.formControl}>
                <TextField
                    fullWidth
                    label="Other (optional)"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={other}
                    onChange={(e) => props.onChangeOther(e.target.value)}
                />
            </div>
            <div className={classes.formControl}>
                <Button
                    fullWidth
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    disableElevation
                >
                    <span className={classes.buttonLabel}>Add menu</span>
                </Button>
            </div>
            <Link to="/demo">View all menu &rarr;</Link>
        </form>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "block",
            paddingTop: 15
        },
        form: {
            width: 320,
        },
        formControl: {
            marginBottom: 15,
        },
        button: {
            color: "white",
            background:
                "linear-gradient(130deg, #068b6c 10%, #0a8b6d 0%, #0c9776 30%, #0f896c 80%)",
            transition: "opacity 0.2s ease-in-out",
            marginTop: "15px",
            width: "100%",

            "&:hover": {
                background:
                    "linear-gradient(130deg, #0b9542 10%, #0a9542 0%, #10ac4e 30%, #1cba5b 80%)",
                opacity: 0.9,
            },
        },
        buttonLabel: {
            fontFamily: "Spartan, sans-serif",
            textTransform: "none",
        },
    })
)

export default Form
