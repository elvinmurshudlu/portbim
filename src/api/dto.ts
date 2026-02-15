import type {IDesigner, IModel} from "@/api/schema.ts";

export type IDesignerDto = Omit<IDesigner, 'id'>
export type IModelDto = Omit<IModel, 'id' | 'position'>