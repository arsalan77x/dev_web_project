import React, { useState } from "react"
import "./ProductTastesModal.scss"
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { decreament, increamentTaste } from "./TasteApi";
import ModalHeader from "../../../../modal/modal_header";
import { useDispatch } from "react-redux";
import { increment } from "../../../../../redux/basket_slice";

function ProductTastesModal(props) {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(props.product)
    const [total, setTotal] = useState(0)
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <ModalHeader text="طعم دلخواه خود را انتخاب کنید" setOpen={props.setOpen} />
            <Typography gutterBottom>انتخاب {total} طعم از {product.taste_count} تا</Typography>
            {product.tastes.map(item =>
                <TasteItem key={item._id} product={product} setProduct={setProduct} item={item}
                    tasteCount={props.product.taste_count} setTotal={setTotal} />)}

            <Button className={classes.button} variant="contained" color="secondary" onClick={e => {
                if (total === product.taste_count) {
                    dispatch(increment({ product: product, item: product.types[0], tasteProduct: product }))
                    props.setOpen(false)
                }
            }}>تایید</Button>
        </Box>
    )
}

export default ProductTastesModal

function TasteItem(props) {
    const classes = useStyles()

    return (
        <div className="tasteItemContainer">
            <p>{props.item.name}</p>
            <div className="tasteItemDetailContainer">
                <p>{props.product.types[0].price} تومان</p>
                <IconButton
                    onClick={(e) => {
                        increamentTaste(props.product, props.setProduct, props.item, props.tasteCount, props.setTotal)
                    }}
                >
                    <AddIcon className={classes.icon} />
                </IconButton>
                <Typography color="secondary">{props.item.count}</Typography>
                <IconButton onClick={(e) => {
                    decreament(props.product, props.setProduct, props.item, props.setTotal)
                }}>
                    <RemoveIcon className={classes.icon} />
                </IconButton>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '760px',
        [theme.breakpoints.down("xs")]: {
            width: '95%'
        },
        background: '#f1f1f1',
        boxShadow: '0px 10px 20px -5px rgba(42, 48, 59, 0.2)',
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        boxSizing: 'border-box',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: "10px auto",
        width: '150px',
        color: 'white',
    },
    icon: {
        color: "#9c9c9c"
    }
}))

