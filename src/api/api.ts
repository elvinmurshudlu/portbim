import {useDb} from "@/api/db.ts";
import type {IDesignerDto, IModelDto} from "@/api/dto.ts";




function slower<T>(callBack:()=>T){
    return new Promise<T>((res)=>{
        setTimeout(()=>{
            res(callBack())
        },1000)
    })
}


export class DesignerController{
    static addDesigner(designer: IDesignerDto){
        return  slower(()=>useDb.getState().addDesigner(designer))
    }

    static  getDesigners(){
        return slower(()=>{
            return useDb.getState().designers.map(designer=>{
                return {...designer,modelCount:useDb.getState().models.filter(m=>m.designerId===designer.id).length}
            })
        })
    }

    static getById(id:string){
        return slower(()=>{
            const model = useDb.getState().designers.find(v=>v.id === id)
            if(!model)throw new Error(`${id} not found`)
            return model
        })
    }

    static updateDesigner(id:string,designer: IDesignerDto){
        return  slower(()=>{
            const designers = useDb.getState().designers.map(m=>{
                if (m.id==id)return {...m,...designer}
                return m
            })

            return useDb.getState().setDesigners(designers)
        })
    }

    static deleteDesigner(id:string){
        return  slower(()=>{
            const designers = useDb.getState().designers.filter(v=>v.id !== id)
            return useDb.getState().setDesigners(designers)
        })
    }
}



export class ModelController{
    static addModel(model: IModelDto){
        return  slower(()=>useDb.getState().addModel({...model,position:[0,0,0]}))
    }

    static getModel(){
        return slower(()=>useDb.getState().models)
    }

    static saveModelPositions(positions:Record<string, [number,number,number]>){
        return slower(()=>useDb.getState().setPositions(positions))

    }

    static getModelById(id:string){
        return slower(()=>{
            const model = useDb.getState().models.find(v=>v.id === id)
            if(!model)throw new Error(`${id} not found`)
            return model
        })
    }

    static updateModel(id:string,model: IModelDto){
        return  slower(()=>{
            const models = useDb.getState().models.map(m=>{
                if (m.id==id)return {...m,...model}
                return m
            })

            return useDb.getState().setModels(models)
        })
    }

    static deleteModel(id:string){
        return  slower(()=>{
            const models = useDb.getState().models.filter(v=>v.id !== id)
            return useDb.getState().setModels(models)
        })
    }
}