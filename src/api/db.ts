import {create,} from "zustand";
import {v4} from "uuid";
import type {DbType} from "@/api/schema.ts";
import {persist} from "zustand/middleware";


export const useDb = create<DbType>()(persist((set) => ({
        designers: [],
        models: [],
        addDesigner: (designer) => set(prev => {
            return {...prev, designers: [...prev.designers, {...designer, id: v4()}]};
        }),
        addModel: (model) => set(prev => {
            return {...prev, models: [...prev.models, {...model, id: v4()}]};
        })
    }),
    {
        name: "useDb",
    }))