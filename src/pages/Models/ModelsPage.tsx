import {Canvas,} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Box, {sizeScale} from "@/pages/Models/components/Box.tsx";
import CreateBoxModal from "@/pages/Models/components/BoxForm/CreateBoxModal.tsx";
import {useState} from "react";
import {useDeleteModel, useGetModelsQuery, useUpdateModelPositions} from "@/services/model-service.ts";
import MeshMover, {useMeshContext} from "@/provider/MeshMover.tsx";
import {Button} from "antd";
import UpdateBox from "@/pages/Models/components/BoxForm/UpdateBox.tsx";
import {Instructions} from "@/pages/Models/components/İnstructions.tsx";

function ModelsPage() {
    // const models = useDb(p=>p.models)
    const [create, setCreate] = useState(false)

    const {data: models = []} = useGetModelsQuery()

    return (
        <>

            <Instructions/>
            <div className={'h-[60dvh] grid grid-cols-3 gap-4 px-4'}>
                <CreateBoxModal open={create} setIsOpen={setCreate}/>
                <MeshMover>
                    <div className={'col-span-2 h-[60dvh]'}>
                        <Canvas onDoubleClick={() => setCreate(true)}
                                className={'  border border-black h-[60dvh] w-full max-w-300 mx-auto'}>
                            <ambientLight intensity={Math.PI / 2}/>
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                            {
                                models.map(m => {
                                    return <Box key={m.id} scale={sizeScale[m.size]} meshId={m.id} color={m.color} position={m.position}/>
                                })
                            }
                            <OrbitControls/>
                        </Canvas>
                        <SaveChanges/><DeleteBox/>
                    </div>
                    <div>
                        <UpdateBox/>

                    </div>
                </MeshMover>
            </div>
        </>
    );
}

export default ModelsPage;


function SaveChanges() {
    const { changeList, clearChangeList } = useMeshContext()
    const { mutate, isPending } = useUpdateModelPositions(clearChangeList)

    if (!changeList     ) return null

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className="rounded-lg border border-gray-700/50 bg-gray-900/95 p-4 shadow-xl backdrop-blur-sm">
                <p className="mb-3 text-xs text-gray-400">
                    Unsaved changes ({Object.keys(changeList).length})
                </p>

                <Button
                    loading={isPending}
                    onClick={() => mutate(changeList)}
                    className="w-full bg-white text-gray-900 hover:bg-gray-100"
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    )
}
function DeleteBox(){
    const {current,setCurrent } = useMeshContext()

    const {mutate,isPending} = useDeleteModel(()=>setCurrent(null))

    if(!current) return null
    return  <Button danger={true} loading={isPending} onClick={()=> {
        mutate(current)

    }}>Delete selected item</Button>
}
