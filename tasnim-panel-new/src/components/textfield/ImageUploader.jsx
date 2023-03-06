import React, {useEffect, useRef, useState} from 'react'
import {Box, Button, LinearProgress, Stack} from '@mui/material'
import {DropzoneArea} from 'mui-file-dropzone'
import {DataProvider} from '../../core/DataProvider'
import PropTypes from 'prop-types'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { APP_URL } from '../../core/APP_URL'
export function ImageUploader(props) {
    const {resource, setData, field, defaultValue} = props
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(defaultValue ? APP_URL + defaultValue : null)

    async function dropAccepted(files) {
        if(!files[0]) {
            return
        }
        let form_data = new FormData()
        setImage(URL.createObjectURL(files[0]))
        form_data.append(resource, files[0])
        let data = await DataProvider.sendInformation(`parent/upload`, {
            data: form_data,
            onUploadProgress: (p) => {
                setProgress((p.loaded * 100) / p.total)
            },
        })
        setData((prev) => {
            return {...prev, [field]: data.data.link}
        })
    }

    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Box width="50%">
                    <DropzoneArea
                        Icon={CloudUploadOutlinedIcon}
                        acceptedFiles={['image/*']}
                        dropzoneText={'آپلود عکس'}
                        onChange={dropAccepted}
                        filesLimit={1}
                        showPreviewsInDropzone={false}
                        showAlerts={false}
                    />
                </Box>
                {image && (
                    <Stack spacing={2}>
                        <img src={image} width="250px" height="250px" />
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            style={{display: progress === 0 || progress === 100 ? 'none' : 'block'}}
                        />
                    </Stack>
                )}
            </Stack>
        </Box>
    )
}

ImageUploader.propTypes = {
    resource: PropTypes.string.isRequired,
    setData: PropTypes.func,
    field: PropTypes.string,
    defaultValue: PropTypes.string,
}
