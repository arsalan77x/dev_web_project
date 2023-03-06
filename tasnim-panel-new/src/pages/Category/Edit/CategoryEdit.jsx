import React, {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import { Category } from '../Category'

const RESOURCE = 'category'

export function CategoryEdit(props) {
    const params = useParams()
    const {state} = useLocation()
    const [category, setCategory] = useState(state.row)

    return (
        <EditPage resource={RESOURCE} title="دسته بندی" data={category}>
            <Category category={category} setCategory={setCategory}/>
        </EditPage>
    )
}
