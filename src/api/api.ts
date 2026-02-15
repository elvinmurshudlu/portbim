import {useDb} from "@/api/db.ts";
import type {IDesignerDto} from "@/api/dto.ts";




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
        return slower(()=>useDb.getState().designers)
    }
}