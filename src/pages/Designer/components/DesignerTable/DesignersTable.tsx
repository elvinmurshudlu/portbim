import {useGetDesignersQuery} from "@/services/designer-service.ts";
import TableBuilder from "@/shared/TableBuilder/TableBuilder.tsx";
import type {IDesigner} from "@/api/schema.ts";

function DesignersTable() {
    const { data=[],isFetching} = useGetDesignersQuery()


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
            onDelete:()=> {},
            onEdit:()=> {},

        }}
        ></TableBuilder>
    );
}

export default DesignersTable;