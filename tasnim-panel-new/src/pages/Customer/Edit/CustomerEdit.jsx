import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import {Customer} from '../Customer'

const RESOURCE = 'customer'

export function CustomerEdit(props) {
    const {state} = useLocation()
    const [customer, setCustomer] = useState(state.row)

    return (
        <EditPage resource={RESOURCE} title="مشتری" data={customer}>
            <Customer customer={customer} setCustomer={setCustomer} />
        </EditPage>
    )
}
