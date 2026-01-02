"use client"
import { Appbar } from "@/components/Appbar";
import { fonts } from "@/lib/fonts";
import '@xyflow/react/dist/style.css'
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, ReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useState } from "react";

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } , style: {background: "#0000" ,color: "ffff" , border: '1px solid #ffff', borderRadius: 5}},
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } ,style: {background: "#0000" ,color: "ffff", border: '1px solid #ffff', borderRadius: 5} },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2', style: { stroke: '#ffff', strokeWidth: 1 } }];

export default function () {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return <div className={`${fonts.averia_libre.className} h-screen flex flex-col`}>
        <Appbar />
        <div className="flex-1 ">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    </div>
}