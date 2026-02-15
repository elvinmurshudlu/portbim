import {useCallback, useEffect, useRef, useState} from "react";
import type {Mesh} from "three";
import {type ThreeElements,} from "@react-three/fiber";
import {useMeshContext} from "@/provider/MeshMover.tsx";
import type {Size} from "@/api/schema.ts";

type MeshProps = ThreeElements['mesh']

export const  sizeScale :Record<Size,number> = {
    large:2,
    normal:1.5,
    small:1
}

function Box(props: MeshProps & { color: string, meshId: string }) {

    const {setPosition, current,setCurrent} = useMeshContext()

    const ref = useRef<Mesh>(null)

    const [hovered, hover] = useState(false)

    const clicked = current === props.meshId

    const move = useCallback((posVel: [number, number, number])=>{
        if (!ref.current) return
        ref.current.position.x += posVel[0]
        ref.current.position.y += posVel[1]
        ref.current.position.z += posVel[2]
        setPosition(props.meshId, [ref.current.position.x, ref.current.position.y, ref.current.position.z])
    },[props.meshId, setPosition])
    

    useEffect(() => {
        const controller = new AbortController()

        window.addEventListener('keydown', (e) => {
            if (!clicked) return;
            switch (e.key) {
                case 'ArrowLeft':
                    move([-1, 0, 0])
                    console.log('ArrowLeft')
                    break;
                case 'ArrowRight':
                    move([1, 0, 0])
                    console.log('ArrowRight')
                    break;
                case 'ArrowUp':
                    move([0, 0, -1])
                    console.log('ArrowUp')
                    break;
                case 'ArrowDown':
                    move([0, 0, 1])
                    console.log('ArrowDown')
                    break;
                case ' ':
                    move([0, 1, 0])
                    break
                case 'Shift':
                    move([0, -1, 0])
                    break
            }
        }, {
            signal: controller.signal
        })

        return () => {
            controller.abort()
        }


    }, [clicked, move])


    return (
        <mesh
            {...props}
            ref={ref}
            onClick={() => setCurrent(props.meshId)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={( ) => hover(false)}>
            <boxGeometry args={[1, 1, 1]}/>
            {/*<axesHelper onClick={(e) => console.log(e)} args={[2]} position={[-0.5, -0.5, -0.5]}/>*/}
            <meshStandardMaterial color={clicked ? "#3cc9ee" : hovered ? 'hotpink' : props.color}/>
        </mesh>
    )
}

export default Box;

