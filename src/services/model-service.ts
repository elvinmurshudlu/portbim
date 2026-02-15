import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ModelController} from "@/api/api.ts";
import type {BoxType} from "@/pages/Models/components/BoxForm/BoxForm.tsx";
import type {ChangeListType} from "@/provider/MeshMover.tsx";

const model_key = 'model_key'


export function useCreateModelMutation(onSuccess?:()=>void){
    const client = useQueryClient()

    return useMutation({
        mutationFn:(model:BoxType)=>ModelController.addModel(model),
        onSuccess:()=>{
            onSuccess?.()
            client.invalidateQueries({queryKey:[model_key]})
        }
    })
}

export function useGetModelsQuery(){
    return useQuery({
        queryFn:()=>ModelController.getModel(),
        queryKey:[model_key]
    })
}

export function useUpdateModelPositions(onSuccess?:()=>void){

    const client = useQueryClient()

    return useMutation({
        mutationFn:(position:ChangeListType)=>ModelController.saveModelPositions(position),
        onSuccess:()=>{
            onSuccess?.()
            client.invalidateQueries({queryKey:[model_key]})
        }
    })
}

export function useGetModelById(id:string | null){

    return useQuery({
        queryFn:()=>ModelController.getModelById(id ?? ''),
        queryKey:[model_key,id],
        enabled:!!id
    })
}

export function useUpdateModelById(id:string){
    const client = useQueryClient()

    return useMutation({
        mutationFn:(model:BoxType)=>ModelController.updateModel(id,model),
        onSuccess:()=>{
            client.invalidateQueries({queryKey:[model_key]})
        }
    })
}