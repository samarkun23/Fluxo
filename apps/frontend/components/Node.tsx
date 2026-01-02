import { applyNodeChanges, Background, ReactFlow } from "@xyflow/react"
import '@xyflow/react/dist/style.css'
import { useCallback } from "react"
import { useState } from "react"

export const Node = ({
    name,
    index,
    position
    // edgeId,
    // edgeSouce,
    // edgeTarget,
}: {
    name?: string,
    index: string,
    position: { x: number, y: number }
    // edgeId: string,
    // edgeSouce: string,
    // edgeTarget: string
}) => {
    const initialNodes = [
        {
            id: index, position: position, data: { label: name }, style: {
                background: '#0000',
                color: '#ffff',
                border: '1px solid #ffff',
                borderRadius: 5,
                padding: 10,
                fontSize: 13,
            }
        }
    ]
    const [nodes, setNodes] = useState(initialNodes)

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    return <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
    >
        <Background />
    </ReactFlow>
}