import {useState} from "react";
import {Button, Modal} from "antd";
import DesignerForm from "@/pages/Designer/components/DesignerForm/DesignerForm.tsx";
import {useAddDesignerMutation} from "@/services/designer-service.ts";

function CreateDesignerSection() {
    const [isOpen, setIsOpen] = useState(false)

    const {mutate: createDesigner, isPending} = useAddDesignerMutation(() => {
        setIsOpen(false)
    })


    return (
        < >
            <Button onClick={() => {setIsOpen(true)}}>Add designer</Button>
            <Modal destroyOnHidden={true} footer={[]} open={isOpen} onCancel={() => setIsOpen(false)}>
                <DesignerForm type={'create'} isLoading={isPending} onSubmit={createDesigner}></DesignerForm>
            </Modal>

        </ >
    );
}

export default CreateDesignerSection;