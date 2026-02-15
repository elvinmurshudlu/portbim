type Size = 'small' | 'normal' | 'large';

export interface IDesigner {
    id: string;
    name: string;
    surname: string;
    workingHourStart:string;
    workingHourEnd:string;
}

export interface IModel {
    id: string;
    name: string,
    designerId: string,
    color: string,
    position: any,
    size: Size,
}

export interface DbType {
    designers: IDesigner[],
    models: IModel[],
    addDesigner: (designer: Omit<IDesigner, 'id'>) => void,
    addModel: (model: Omit<IModel, 'id'>) => void
}