import {Box, Button, Collapse, Divider, IconButton, InputBase, Stack} from '@mui/material'
import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {CustomFilter} from '../Filter/CustomFilter'
import PropTypes from 'prop-types'

export function Searchbar(props) {
    const {filtersData, setParams, searchField, placeholder, noFilters} = props
    const [filterIn, setFilterIn] = useState(false)
    const [textFieldData, setTextfieldData] = useState('')
    const handleFilterIn = () => {
        setFilterIn(!filterIn)
    }
    const handleChange = (event) => {
        setParams((filter) => {
            return {
                ...filter,
                regex: {
                    [searchField]: event.target.value,
                },
            }
        })
        setTextfieldData(event.target.value)
    }
    return (
        <Box width="100%" margin={'10px'}>
            <Stack
                direction="row"
                bgColor="white"
                width="100%"
                border="1px solid #c7c7c7"
                padding="10px"
                borderRadius="8px"
                marginBottom={'16px'}
            >
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    style={{flexGrow: 1}}
                    value={textFieldData}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                {!noFilters && (
                    <>
                        <Divider orientation="vertical" flexItem />
                        <Button
                            startIcon={
                                filterIn ? (
                                    <FilterAltIcon style={{marginLeft: '10px'}} />
                                ) : (
                                    <FilterAltOutlinedIcon style={{marginLeft: '10px'}} />
                                )
                            }
                            onClick={handleFilterIn}
                        >
                            فیلتر ها
                        </Button>
                    </>
                )}
            </Stack>
            {!noFilters && (
                <Collapse in={filterIn} style={{width: '100%'}}>
                    <CustomFilter filtersData={filtersData} setParams={setParams} />
                </Collapse>
            )}
        </Box>
    )
}

Searchbar.propTypes = {
    filtersData: PropTypes.array,
    searchField: PropTypes.string,
    placeholder: PropTypes.string,
    noFilters: PropTypes.bool,
}
