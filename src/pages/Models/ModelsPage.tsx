import {Canvas,} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Box, {sizeScale} from "@/pages/Models/components/Box.tsx";
import CreateBoxModal from "@/pages/Models/components/BoxForm/CreateBoxModal.tsx";
import {useState} from "react";
import {useGetModelsQuery, useUpdateModelPositions} from "@/services/model-service.ts";
import MeshMover, {useMeshContext} from "@/provider/MeshMover.tsx";
import {Button} from "antd";
import UpdateBox from "@/pages/Models/components/BoxForm/UpdateBox.tsx";

function ModelsPage() {
    // const models = useDb(p=>p.models)
    const [create, setCreate] = useState(false)

    const {data: models = []} = useGetModelsQuery()

    return (
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
                   <SaveChanges/>
               </div>
                <div>
                    <UpdateBox/>
                </div>
            </MeshMover>
        </div>
    );
}

export default ModelsPage;


function SaveChanges() {
    const {changeList,clearChangeList} = useMeshContext()

    const {mutate, isPending} = useUpdateModelPositions(clearChangeList)

    if (!changeList) return null

    return <Button loading={isPending} onClick={() => mutate(changeList)}>Save</Button>
}

