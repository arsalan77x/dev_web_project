import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddButton from '../../../components/buttons/add'
import { Searchbar } from '../../../components/textfield/Searchbar'
import { createTableHeadCells } from '../../../components/Table/CustomTableHead'
import { DataProvider } from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import { CustomTable } from '../../../components/Table/CustomTable'
import { SmallImage } from '../../../components/pictures/SmallImage'
import { ListPage } from '../../../components/Table/ListPage'
import { QuestionCreate, SliderCreate } from '../Create/QuestionCreate'

export function QuestionList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: { name: 'createdAt', order: -1 },
    })
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState({ data: [], count: 0 })

    const getQuestion = async () => {
        setLoading(true)
        let data = await DataProvider.getList('question/list', params)
        if (data && data.status === 200) {
            setQuestions({ data: data.data, count: data.count })
        }
        setLoading(false)
    }
    useEffect(() => {
        getQuestion()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('سوال', 'question'),
        createTableHeadCells('جواب', 'answer'),
    ]

    return (
        <ListPage
            header="سوالات متداول"
            searchText="سوال"
            searchField="question"
            setParams={setParams}
            createModal={QuestionCreate}
            resource="question"
            defaultState={{
                question: 'سوال',
                answer: 'جواب',
            }}
            getList={getQuestion}
        >
            <CustomTable
                resource="question"
                headCells={tableHeadCells}
                rows={questions.data}
                count={questions.count}
                params={params}
                setParams={setParams}
                handleSort={getQuestion}
                loading={loading}
                tableBodyCells={questions.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.question}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.answer}</Typography>

                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
