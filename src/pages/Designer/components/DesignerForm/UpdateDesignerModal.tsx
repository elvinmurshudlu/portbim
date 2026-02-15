import {useSearchParams} from "react-router";
import {Modal} from "antd";
import {useGetDesignerById, useUpdateDesignerMutation} from "@/services/designer-service.ts";
import QueryRender from "@/shared/QueryRender/QueryRender.tsx";
import DesignerForm from "@/pages/Designer/components/DesignerForm/DesignerForm.tsx";

function UpdateDesignerModal() {
    const [sp, setSp] = useSearchParams()
    const designerId = sp.get('update');

    return (
        <Modal footer={[]} open={!!designerId} onCancel={() => {
            sp.delete('update');
            setSp(sp)
        }}>
            <UpdateForm designerId={designerId!}/>

        </Modal>
    );
}

export default UpdateDesignerModal;

function UpdateForm({designerId}: { designerId: string }) {
    const query = useGetDesignerById(designerId)
    const [sp, setSp] = useSearchParams()

    const {mutate, isPending} = useUpdateDesignerMutation(designerId, () => {
        sp.delete('update');
        setSp(sp)
    })

    return <QueryRender query={query} render={(data) => {
        return <DesignerForm initialValue={{
            name: data.name,
            surname: data.surname,
            workingHourEnd: data.workingHourEnd,
            workingHourStart: data.workingHourStart
        }} onSubmit={mutate} isLoading={isPending} type={'update'}/>
    }}/>
}