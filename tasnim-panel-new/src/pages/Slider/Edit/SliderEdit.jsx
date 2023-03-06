import React, {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../components/Table/EditPage'
import { Slider } from '../Slider'

const RESOURCE = 'slider'

export function SliderEdit(props) {
    const {state} = useLocation()
    const [slider, setSlider] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="اسلاید" data={slider}>
            <Slider slider={slider} setSlider={setSlider}/>
        </EditPage>
    )
}
