import {Box} from '@mui/material'
import React from 'react'
import { Question } from '../Question'

export function QuestionCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <Question question={data} setQuestion={setData} />
        </Box>
    )
}
