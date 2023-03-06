import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import {CustomAutocomplete} from '../../components/textfield/CustomAutoComplete'
import {GridProducer} from '../../components/Table/GridProducer'
import {DataProvider} from '../../core/DataProvider'
import {CustomSwitch} from '../../components/buttons/CustomSwitch'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {APP_URL} from '../../core/APP_URL'
import {ImageUploader} from '../../components/textfield/ImageUploader'
import PropTypes from 'prop-types'

export function Product(props) {
    const {product, setProduct} = props
    const [categories, setCategories] = useState([])
    async function getCategories() {
        let data = await DataProvider.getList('category/list')
        setCategories(data.data)
    }
    useEffect(() => {
        getCategories()
    }, [])

    async function changeField(event, field, value) {
        if (value !== undefined) {
            setProduct((prev) => {
                return {...prev, [field]: value}
            })
        }
    }

    function AddButton(props) {
        const {field} = props
        return (
            <Button
                variant="outlined"
                onClick={(e) =>
                    changeField(e, field, [
                        ...product[field],
                        {
                            id: new Date().getTime(),
                            size: '',
                            price: '0',
                            name: '',
                        },
                    ])
                }
            >
                <AddIcon fontSize="large" />
            </Button>
        )
    }
    function DeleteButton(props) {
        const {field, id} = props
        return (
            <Button
                color="secondary"
                variant="outlined"
                onClick={(e) => {
                    let list = []
                    for (let type of product[field]) {
                        if ((type._id ?? type.id) !== id) {
                            list.push(type)
                        }
                    }
                    changeField(e, field, list)
                }}
            >
                <DeleteIcon fontSize="large" />
            </Button>
        )
    }

    return (
        <Stack>
            <Stack direction="row" marginBottom="16px" spacing={4}>
                <Box
                    component={'img'}
                    src={APP_URL + product.pic_url}
                    width="250px"
                    height="250px"
                    borderRadius={'8px'}
                    border={'1px solid #c7c7c7'}
                />

                <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="12px"
                    justifyContent={'space-between'}
                >
                    {[
                        {field: 'ishidden', label: 'پنهان شده'},
                        {field: 'donthave', label: 'موجود نیست'},
                        {field: 'daily_offer', label: 'پیشنهاد روزانه'},
                        {field: 'daily_off', label: 'تخفیف روزانه'},
                    ].map((item) => (
                        <Stack key={item.field} direction="row" spacing={0.5} alignItems="center">
                            <CustomSwitch
                                checked={product[item.field]}
                                onChange={(e) => changeField(e, item.field, e.target.checked)}
                            />
                            <Typography color="primary.dark">{item.label}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
            <GridProducer
                data={[
                    <CustomTextField
                        name="name"
                        setData={setProduct}
                        label={'نام'}
                        defaultValue={product.name}
                    />,
                    <CustomTextField
                        name="packprice"
                        setData={setProduct}
                        label={'قیمت بسته بندی'}
                        defaultValue={product.packprice}
                    />,
                    <CustomTextField
                        name="off_percent"
                        setData={setProduct}
                        label={'تخفیف'}
                        defaultValue={product.off_percent}
                    />,
                    <CustomTextField
                        name="order"
                        setData={setProduct}
                        label={'ترتیب'}
                        defaultValue={product.order}
                    />,
                    <CustomTextField
                        name="star"
                        setData={setProduct}
                        label={'ستاره'}
                        defaultValue={product.star}
                    />,
                    <CustomTextField
                        name="code"
                        setData={setProduct}
                        label={'کد'}
                        defaultValue={product.code}
                    />,

                    <CustomAutocomplete
                        label={'دسته بندی'}
                        name="category"
                        setData={setProduct}
                        options={categories}
                        optionValue="_id"
                        defaultValue={categories[0]}
                    />,
                ]}
            />

            <Stack direction="row" margin={'16px 0px'}>
                <Stack spacing={1} width="100%">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6" fontWeight="700">
                            انواع
                        </Typography>
                        {product.types?.length === 0 && <AddButton field="types" />}
                    </Stack>
                    {product.types?.map((item, index) => (
                        <Stack key={item._id ?? item.id} direction={'row'} spacing={1}>
                            <CustomTextField
                                sx={{width: '200px'}}
                                change={(event) => {
                                    let types = product.types
                                    types[index].size = event.target.value
                                    changeField(event, 'types', types)
                                }}
                                label={'اندازه'}
                                defaultValue={item.size}
                            />
                            <CustomTextField
                                sx={{width: '200px'}}
                                change={(event) => {
                                    let types = product.types
                                    types[index].price = event.target.value
                                    changeField(event, 'types', types)
                                }}
                                label={'قیمت'}
                                defaultValue={item.price}
                            />
                            <DeleteButton id={item._id ?? item.id} field="types" />
                            {product.types.length - 1 === index && <AddButton field="types" />}
                        </Stack>
                    ))}
                </Stack>
                <Stack spacing={1} width="100%">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6" fontWeight="700">
                            طعم ها
                        </Typography>
                        {product.tastes?.length === 0 && <AddButton field="tastes" />}
                    </Stack>
                    {product.tastes?.map((item, index) => (
                        <Stack key={item._id ?? item.id} direction={'row'} spacing={1}>
                            <CustomTextField
                                sx={{width: '200px'}}
                                change={(event) => {
                                    let tastes = product.tastes
                                    tastes[index].name = event.target.value
                                    changeField(event, 'tastes', tastes)
                                }}
                                label={'نام'}
                                defaultValue={item.name}
                            />
                            <DeleteButton id={item._id ?? item.id} field="tastes" />
                            {product.tastes.length - 1 === index && <AddButton field="tastes" />}
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            <ImageUploader
                defaultValue={product.pic_url}
                field="pic_url"
                resource="product"
                setData={setProduct}
            />
        </Stack>
    )
}

Product.propTypes = {
    product: PropTypes.object,
    setProduct: PropTypes.func,
}
