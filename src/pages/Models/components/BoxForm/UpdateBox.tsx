import {useMeshContext} from "@/provider/MeshMover.tsx";
import {useGetModelById, useUpdateModelById} from "@/services/model-service.ts";
import QueryRender from "@/shared/QueryRender/QueryRender.tsx";
import type {IModel} from "@/api/schema.ts";
import BoxForm from "@/pages/Models/components/BoxForm/BoxForm.tsx";

function UpdateBox() {
    const {current} = useMeshContext()

    const query = useGetModelById(current)

    if (!current) return <div>No object selected</div>

    return <QueryRender query={query} render={(data) => {
        return <UpdateForm data={data}/>
    }}/>
}

export default UpdateBox;


function UpdateForm({data}: { data: IModel }) {

    const {mutate:updateModel,isPending} = useUpdateModelById(data.id)

    return <BoxForm type={'update'} isLoading={isPending} onSubmit={updateModel} initialValue={{
        color: data.color,
        designerId: data.designerId,
        name: data.name,
        size: data.size,
    }}></BoxForm>


}