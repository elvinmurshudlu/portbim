import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {DesignerController} from "@/api/api.ts";
import type {IDesignerDto} from "@/api/dto.ts";

const designer_query_key = 'designer_query';

export function useGetDesignersQuery(){
    return useQuery({
        queryFn:()=>DesignerController.getDesigners(),
        queryKey:[designer_query_key]
    })
}

export function useAddDesignerMutation(onSuccess?:() => void){
    const client = useQueryClient()
    return useMutation({
        mutationFn:(designer:IDesignerDto)=>DesignerController.addDesigner(designer),
        onSuccess:()=> {
            onSuccess?.()
            return client.invalidateQueries({queryKey: [designer_query_key]})
        }

    })
}