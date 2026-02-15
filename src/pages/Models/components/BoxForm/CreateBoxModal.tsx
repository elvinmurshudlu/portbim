import type {Dispatch, SetStateAction} from "react";
import {Modal} from "antd";
import BoxForm from "@/pages/Models/components/BoxForm/BoxForm.tsx";
import {useCreateModelMutation} from "@/services/model-service.ts";

function CreateBoxModal({open,setIsOpen}:{open:boolean,setIsOpen:Dispatch<SetStateAction<boolean>>}) {

    const {mutate,isPending} = useCreateModelMutation(()=>setIsOpen(false))

    return (
        <Modal footer={[]} destroyOnHidden={true} open={open} onCancel={()=>setIsOpen(false)}>
            <BoxForm onSubmit={mutate} isLoading={isPending} type={'create'}/>
        </Modal>
    );
}

export default CreateBoxModal;