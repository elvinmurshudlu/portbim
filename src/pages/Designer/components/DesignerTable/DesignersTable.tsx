import {useDeleteDesigner, useGetDesignersQuery} from "@/services/designer-service.ts";
import TableBuilder from "@/shared/TableBuilder/TableBuilder.tsx";
import type {IDesigner} from "@/api/schema.ts";
import {useSearchParams} from "react-router";

function DesignersTable() {
    const { data=[],isFetching} = useGetDesignersQuery()

    const [ sp,setSp] = useSearchParams()

    const {mutate:deleteDesigner} = useDeleteDesigner()

    return (
        <TableBuilder loading={isFetching} dataSource={data} columns={[
            {
                title:'Name',
                dataIndex:'name',
                width:200,
            },
            {
                title:'Surname',
                dataIndex:'surname',
                width: 200
            },
            {
                title:'Working hours',
                render:(val:IDesigner)=>{
                    return <div> {val.workingHourStart} --- {val.workingHourEnd}</div>
                }
            }
        ]}

        tableManagement={{
            onDelete:(id)=> deleteDesigner(id.toString()),
            onEdit:(id)=> {
                sp.set('update',id.toString())
                setSp(sp)
            },

        }}
        ></TableBuilder>
    );
}

export default DesignersTable;