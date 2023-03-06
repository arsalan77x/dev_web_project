import React, {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import { User } from '../User'

const RESOURCE = 'user'

export function UserEdit(props) {
    const {state} = useLocation()
    const [user, setUser] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="کارمندان" data={user}>
            <User user={user} setUser={setUser}/>
        </EditPage>
    )
}
