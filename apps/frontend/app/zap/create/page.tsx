"use client"
import { Appbar } from "@/components/Appbar";
import { fonts } from "@/lib/fonts";
import '@xyflow/react/dist/style.css'
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, ReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useState } from "react";

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Trigger' }, style: { background: "#0000", color: "ffff", border: '1px solid #ffff', borderRadius: 5 } },
];



export default function () {
    const [nodes, setNodes] = useState(initialNodes);
    // const [edges, setEdges] = useState(initialEdges);
    const [selectTrigger, setSelectedTrigger] = useState('');
    const [selectActions, setSelectedActions] = useState([]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    // const onEdgesChange = useCallback(
    //     (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    //     [],
    // );
    // const onConnect = useCallback(
    //     (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    //     [],
    // );

    const addNode = () => {
        const lastNode = nodes[nodes.length - 1].position.y;
        const position = lastNode ? {x: 0, y: lastNode + 100} : {x: 0, y: 100}
        const id = crypto.randomUUID();

        setNodes((nds) => [
            ...nds,
            {
                id,
                position: position,
                data: { label: `${nds.length}. Action` },
                style: { background: "#0000", color: "ffff", border: '1px solid #ffff', borderRadius: 5 },
            },
        ]);
    };

    return <div className={`${fonts.averia_libre.className} h-screen flex flex-col`}>
        <Appbar />
        <div className="flex-1">
            <ReactFlow
                nodes={nodes}
                // edges={edges}
                onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                fitView
            >
                <Background />
                <div
                    onClick={addNode}
                    className="absolute z-10 m-4 bg-white text-black px-3 py-1 rounded cursor-pointer"
                >+ Node</div>

            </ReactFlow>
        </div>
    </div>
}