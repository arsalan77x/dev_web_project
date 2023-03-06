import React, {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import { Question } from '../Question'

const RESOURCE = 'question'

export function QuestionEdit(props) {
    const {state} = useLocation()
    const [question, setQuestion] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="سوالات" data={question}>
            <Question question={question} setQuestion={setQuestion}/>
        </EditPage>
    )
}
