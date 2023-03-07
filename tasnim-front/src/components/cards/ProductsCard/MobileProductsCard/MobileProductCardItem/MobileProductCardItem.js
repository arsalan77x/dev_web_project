import React, { useState } from "react"
import { calculateDiscount } from "../../../../../Data/Utils"
import "./MobileProductCardItem.scss"
import ProductCounter from "../../../../ProductCounter/ProductCounter";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import BaseModal from "../../../../modal/base_modal";


const MobileProductCardItem = props => {
    const [tasteModal, setTasteModal] = useState(false)
    const listItems = props.product.types.map(item =>

        <div className="mobileProductCardItemContainer" key={item._id}>
            {item.size && <p className="mobileProductSize">{item.size}</p>}

            <div className="mobileProductPriceContainer">
                {(props.product.off_percent ?
                    <del className="mobileDeletedPrice"> {item.price.toLocaleString()}</del>
                    : null)}
                <p className="mobilePrice"> {calculateDiscount(item.price, props.product.off_percent).toLocaleString()}</p>
            </div>

            {props.product.tastes && props.product.tastes.length !== 0 ?
                <>
                    {/* <BaseModal open={tasteModal} setOpen={setTasteModal}>
                        <ProductTastesModal open={tasteModal} setOpen={setTasteModal} product={props.product} />
                    </BaseModal>
                    <IconButton
                        onClick={(e) => {
                            setTasteModal(true)
                        }}
                    >
                        <AddIcon color="secondary" />
                    </IconButton> */}
                </>
                :
                <ProductCounter
                    product={props.product}
                    item={item}
                />
            }
        </div>
    )
    return (
        <div>
            {listItems}
        </div>
    )
}

export default MobileProductCardItem
