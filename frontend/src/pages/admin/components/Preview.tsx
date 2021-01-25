import { Category, Dish, Menu } from "api-contract"
import MenuDetails from "pages/demo/components/MenuDetails"
import MenuDialog from "pages/demo/components/MenuDialog"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { MenuAction, setViewingMenuLoading, setMenuViewing } from "store/actions/Menu"
import { isEmpty } from "utils/FormUtils"

interface DispatchProps {
    setMenuViewing: (viewing: Menu | null) => MenuAction
    setViewingMenuLoading: (loading: boolean) => MenuAction
}

interface Props extends DispatchProps {
    name: string
    price: number
    description: string
    category: Category | ""
    dish: Dish | ""
    image: string
    other?: string
    newlyAdded: string
}

const Preview: React.FC<Props> = (props) => {
    const { name, price, description, category, dish, image, other } = props
    const input = { name, price, description, category, dish, image, other }
    const item = {
        ...input,
        image: image || "https://picsum.photos/500",
    } as Menu
    const [open, setOpen] = useState(false)

    const handleButtonClick = () => {
        setOpen(!open)
        props.setMenuViewing(item)
        props.setViewingMenuLoading(false)
    }

    const handleDialogClose = () => {
        setOpen(!open)
    }

    if (isEmpty(input) && !Boolean(props.newlyAdded)) return null

    return (
        <div>
            {!Boolean(props.newlyAdded) && (
                <div>
                    <h3>Preview</h3>
                    <MenuDetails
                        loading={false}
                        handleButtonClick={handleButtonClick}
                        item={item}
                    />
                    <MenuDialog
                        isOpen={open}
                        handleDialogClose={handleDialogClose}
                    />
                </div>
            )}
            <br />
            {Boolean(props.newlyAdded) && (
                <Link to={`/demo/${props.newlyAdded}`}>
                    Success! Click here to view.
                </Link>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    setMenuViewing,
    setViewingMenuLoading,
}

export default connect(null, mapDispatchToProps)(Preview)
