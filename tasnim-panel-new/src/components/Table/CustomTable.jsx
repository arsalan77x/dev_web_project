import React, {useState} from 'react'
import {Box} from '@mui/system'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import {CustomTableHead} from './CustomTableHead'
import EditIcon from '@mui/icons-material/Edit'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {CustomToolbar} from './CustomToolbar'
import {BlankList} from '../pictures/BlankList'
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress'

export function CustomTable(props) {
    const {
        rows,
        tableBodyCells,
        headCells,
        loading,
        setParams,
        params,
        count,
        resource,
        noEdit,
        noPagination,
        noDelete,
    } = props
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        setParams((filter) => {
            let isAsc = true
            if (filter.sort) {
                isAsc = filter.sort.name === property && filter.sort.order === 1
            }
            let newSort = {name: property, order: isAsc ? -1 : 1}
            return {
                ...filter,
                sort: newSort,
            }
        })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n._id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setParams((filter) => {
            return {
                ...filter,
                skip: newPage * rowsPerPage,
            }
        })
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        let newValue = parseInt(event.target.value, 10)
        setParams((filter) => {
            return {
                ...filter,
                limit: newValue,
                skip: newValue * 0,
            }
        })
        setRowsPerPage(newValue)
        setPage(0)
    }

    function handleEditClick(event, id, row) {
        navigate(id, {state: {row}})
    }

    const isSelected = (name) => selected.indexOf(name) !== -1
    return !loading && rows.length === 0 ? (
        <BlankList />
    ) : (
        <Box>
            <LinearProgress
                sx={{
                    [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: '#000',
                    },
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor: 'rgba(182, 191, 207, 0.4)',
                    },
                }}
                variant={loading ? 'indeterminate' : 'determinate'}
                value="0"
            />
            {!noDelete && (
                <CustomToolbar
                    setParams={setParams}
                    setSelected={setSelected}
                    resource={resource}
                    selected={selected}
                    numSelected={selected.length}
                />
            )}
            <TableContainer>
                <Table>
                    <CustomTableHead
                        headCells={headCells}
                        sort={params.sort}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows.length}
                        onRequestSort={handleRequestSort}
                        numSelected={selected.length}
                        noDelete
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row._id)
                            const labelId = `enhanced-table-checkbox-${index}`

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row._id}
                                    selected={isItemSelected}
                                >
                                    {!noDelete && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="secondary"
                                                checked={isItemSelected}
                                                onChange={(event) => handleClick(event, row._id)}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    {tableBodyCells[index]}
                                    {!noEdit && (
                                        <TableCell width="32px">
                                            <Button
                                                color="secondary"
                                                variant="outlined"
                                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                                onClick={(event) =>
                                                    handleEditClick(event, row._id, row)
                                                }
                                            >
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!noPagination && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    sx={{
                        '& .MuiTablePagination-displayedRows': {
                            direction: 'rtl',
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Box>
    )
}
