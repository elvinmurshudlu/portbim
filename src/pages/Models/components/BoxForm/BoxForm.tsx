import * as zod from 'zod'
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {IFormProps} from "@/shared/FormBuilder/type.ts";
import {FormBuilder} from "@/shared/FormBuilder/FormBuilder.tsx";
import FormController from "@/shared/FormBuilder/components/FormController/FormController.tsx";
import FormInput from "@/shared/FormBuilder/components/FormInput/FormInput.tsx";
import FormSelect from "@/shared/FormBuilder/components/FormSelect/FormSelect.tsx";
import {useGetDesignersQuery} from "@/services/designer-service.ts";
import {ColorPicker} from "antd";


const box_vaidator = zod.object({
    name: zod.string(),
    designerId: zod.string(),
    size: zod.literal(['small', 'normal', 'large']),
    color: zod.string(),
    // position: zod.array(zod.number()).length(3),
})

export type BoxType = zod.infer<typeof box_vaidator>

function BoxForm({initialValue, type, onSubmit, isLoading}: IFormProps<BoxType>) {

    const form = useForm({
        resolver: zodResolver(box_vaidator),
        values: initialValue
    })


    return (
        <FormBuilder form={form} onSubmitAction={onSubmit}>
            <FormInput fieldName={'name'} label={'Name'}/>
            <DesignerSelect/>
            <Controller render={({field}) => {
                return <ColorPicker  value={field.value} onChange={(e)=>field.onChange(e.toRgbString())} />
            }} name={'color'} control={form.control}/>
            <SizeSelect/>

            <FormController type={type} isLoading={isLoading}></FormController>
        </FormBuilder>
    );
}

export default BoxForm;


function DesignerSelect() {

    const {data = [], isLoading} = useGetDesignersQuery()

    return <FormSelect fieldNames={{
        value: 'id',
        label: 'name'
    }} loading={isLoading} options={data} fieldName={'designerId'} label={'Designer'}/>;

}

function SizeSelect() {
    return <FormSelect   options={[{
        label: "Small",
        value: 'small'
    },
        {
            label: "Normal",
            value: 'normal'

        },
        {
            label: "Large",
            value: 'large'
        }]} fieldName={'size'} label={'Size'}/>;
}