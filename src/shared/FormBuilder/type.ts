interface BaseFormComponentProps {
    label: string
    className?: string
    dependOn?: string[]
    showOn?: (val: unknown[]) => boolean
}

export interface IFormComponent extends BaseFormComponentProps {
    fieldName: string
}

export interface IFormRangeComponent extends BaseFormComponentProps {
    fieldName: [string, string],
    returnFormat?:string
}


export interface IFormProps<T> {
    onSubmit:(val:T)=>void,
    initialValue?:T,
    isLoading:boolean,
    type:'create' | 'update'
}