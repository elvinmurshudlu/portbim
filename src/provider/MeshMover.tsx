import {createContext, type Dispatch, type PropsWithChildren, type SetStateAction, use, useState} from "react";

export type ChangeListType = Record<string, [number, number, number]>

type ContextChangeListType = null | ChangeListType

const MoverContext = createContext<null | {
    changeList: ContextChangeListType,
    clearChangeList: () => void,
    setPosition: (modelId: string, position: [number, number, number]) => void,
    current: string | null,
    setCurrent: Dispatch<SetStateAction<string | null>>
}>(null)


export function useMeshContext() {
    const context = use(MoverContext);
    if (!context) throw new Error("useMeshContext must be defined");
    return context;

}


function MeshMover({children}: PropsWithChildren) {
    const [changeList, setChangeList] = useState<ContextChangeListType>(null)
    const [current, setCurrent] = useState<string | null>(null);

    function setPosition(modelId: string, position: [number, number, number]) {
        if (!changeList) {
            setChangeList({[modelId]: position})
        } else {
            setChangeList(prev => ({...prev, [modelId]: position}))
        }

    }

    function clearChangeList() {
        setChangeList(null)
    }

    return (
        <MoverContext value={{changeList, setPosition, current, setCurrent,clearChangeList}}>

            {children}
        </MoverContext>
    );
}

export default MeshMover;