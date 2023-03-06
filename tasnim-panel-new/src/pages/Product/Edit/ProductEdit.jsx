import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import {Product} from '../Product'

const RESOURCE = 'product'

export function ProductEdit(props) {
    const {state} = useLocation()
    const [product, setProduct] = useState(state.row)

    return (
        <EditPage resource={RESOURCE} title="محصول" data={product}>
            <Product product={product} setProduct={setProduct} />
        </EditPage>
    )
}
