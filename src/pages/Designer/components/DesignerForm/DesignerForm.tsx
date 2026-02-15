import {useForm} from "react-hook-form";
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {FormBuilder} from "@/shared/FormBuilder/FormBuilder.tsx";
import FormInput from "@/shared/FormBuilder/components/FormInput/FormInput.tsx";
import type {IFormProps} from "@/shared/FormBuilder/type.ts";
import FormController from "@/shared/FormBuilder/components/FormController/FormController.tsx";
import FormRangePicker from "@/shared/FormBuilder/components/Date/FormRangePicker/FormRangePicker.tsx";

const designer_validation = zod.object({
    name:zod.string().min(1),
    surname:zod.string().min(1),
    workingHourStart:zod.string().min(1),
    workingHourEnd:zod.string().min(1),
})

type DesignerType = zod.infer<typeof designer_validation>



function DesignerForm({onSubmit,type,isLoading,initialValue}:IFormProps<DesignerType>) {

    const form = useForm({
        resolver:zodResolver(designer_validation),
        values:initialValue
    })

    return (
        <FormBuilder form={form} onSubmitAction={onSubmit}>
            <FormInput fieldName={'name'} label={'Designer name'}/>
            <FormInput fieldName={'surname'} label={'Designer surname'}/>
            {/*<FormInput fieldName={'workingHours'} label={'Designer workingHours'}/>*/}
            <FormRangePicker returnFormat={'HH:mm'} format={'HH:mm'} picker={'time'} fieldName={['workingHourStart','workingHourEnd']} label={'Designer workingHours'}/>
            <FormController type={type} isLoading={isLoading}/>
        </FormBuilder>
    );
}

export default DesignerForm;