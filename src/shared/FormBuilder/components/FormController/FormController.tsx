import type {IFormProps} from "@/shared/FormBuilder/type.ts";
import {Button} from "antd";

function FormController<T>({type , isLoading} :Pick<IFormProps<T>, 'type' | 'isLoading'>) {
    return (
        <Button loading={isLoading} htmlType={'submit'}>
            {
                type ==='update' ? 'Update' :'Create'
            }
        </Button>
    );
}

export default FormController;