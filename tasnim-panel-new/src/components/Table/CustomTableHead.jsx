import PropTypes from 'prop-types'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'

export function createTableHeadCells(label, name) {
    return {label, name, key: name}
}
export function CustomTableHead(props) {
    const {headCells, onSelectAllClick, sort, numSelected, rowCount, onRequestSort, noDelete} =
        props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {!noDelete && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="secondary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell key={headCell.name} color="secondary">
                        <TableSortLabel
                            active={sort.name === headCell.name}
                            direction={
                                sort.name === headCell.name
                                    ? sort.order === 1
                                        ? 'asc'
                                        : 'desc'
                                    : 'asc'
                            }
                            onClick={createSortHandler(headCell.name)}
                            color="#434B59"
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
CustomTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    sort: PropTypes.object.isRequired,
    rowCount: PropTypes.number.isRequired,
}
