import {create,} from "zustand";
import {v4} from "uuid";
import type {DbType, IModel} from "@/api/schema.ts";
import {persist} from "zustand/middleware";


export const useDb = create<DbType>()(persist((set, get) => ({
        designers: [],
        models: [],
        addDesigner: (designer) => set(prev => {
            return {...prev, designers: [...prev.designers, {...designer, id: v4()}]};
        }),
        addModel: (model) => set(prev => {
            return {...prev, models: [...prev.models, {...model, id: v4()}]};
        }),
        setModels: (models:IModel[]) => set(prev => ({...prev, models: models})),
        setPositions: (positions) => set(prev => {
            return {
                ...prev, models: get().models.map((model) => {
                    if (positions[model.id]) {
                        return {...model, position: positions[model.id]}
                    } else return model
                })
            };
        })
    }),
    {
        name: "useDb",
    }))