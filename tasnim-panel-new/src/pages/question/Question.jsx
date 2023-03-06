import { Stack } from '@mui/material'
import React from 'react'
import { GridProducer } from '../../components/Table/GridProducer'
import { CustomTextField } from '../../components/textfield/CustomTextField'
import PropTypes from 'prop-types'

export function Question(props) {
    const { question, setQuestion } = props
    return (
        <Stack>
            <GridProducer
                sx={{ mb: '16px' }}
                data={[
                    <CustomTextField
                        name="question"
                        setData={setQuestion}
                        label={'سوال'}
                        defaultValue={question.question}
                    />,
                    <CustomTextField
                        name="answer"
                        setData={setQuestion}
                        label={'جواب'}
                        defaultValue={question.answer}
                    />
                ]}
            />

        </Stack>
    )
}

Question.propTypes = {
    question: PropTypes.object,
    setQuestion: PropTypes.func,
}
