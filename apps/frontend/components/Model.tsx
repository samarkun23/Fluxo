import { useState } from "react";
import { Button } from "./Button";

export function Model({ index, onClose, onSelect, availableItems }: { index: number, onClose: any, availableItems: { id: string, name: string, image: string }[], onSelect: (props: null | { name: string; id: string; metadata: any; }) => void }) {

    const isTrigger = index === 0;
    const [selectedAction, setSelectedAction] = useState<{
        id: string,
        name: string
    }>()
    const [step, setStep] = useState(0);



    return (
        <div>
            <div id="hs-scroll-inside-body-modal" className="hs-overlay bg-white/20 backdrop-blur-sm fixed inset-0 z-80 flex items-center justify-center overflow-y-auto" role="dialog" aria-labelledby="hs-scroll-inside-body-modal-label">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 h-[calc(100%-56px)] sm:mx-auto">
                    <div className="max-h-full bg-red-900 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                            <h3 id="hs-scroll-inside-body-modal-label" className="font-bold text-gray-800 dark:text-white">
                                Select {index === 0 ? "Trigger" : "Action"}
                            </h3>
                            <button onClick={onClose} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-scroll-inside-body-modal">
                                <span className="sr-only" >Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="space-y-4">

                                {step === 1 && selectedAction?.id === 'email' && <EmailSelector setMetadata={(metadata) => {
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    })
                                }} />}

                                {step === 1 && selectedAction?.id === 'sol' && <SolanaSelector setMetadata={(metadata) => {
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    })
                                }} />}

                                {step === 0 &&
                                    <div>
                                        {availableItems.map(({ id, name, image }) => {
                                            return <div onClick={() => {
                                                if (isTrigger) {
                                                    onSelect({ id, name , metadata:{}})
                                                } else {
                                                    setStep(s => s + 1)
                                                    setSelectedAction({
                                                        id,
                                                        name
                                                    })
                                                }
                                            }} className="flex border items-center gap-x-2 px-2 border-white/40 mt-5 min-h-10 rounded-md hover:bg-gray-700 cursor-pointer" key={id}>
                                                <img src={image} width={30} />
                                                <div>
                                                    {name}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
                            <button onClick={onClose} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-scroll-inside-body-modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

function EmailSelector({ setMetadata }: {
    setMetadata: (params: any) => void;
}) {
    const [email, setEmail] = useState("")
    const [body, setBody] = useState("")

    return <div>
        <input type={"text"} placeholder="To"  onChange={(e) => setEmail(e.target.value)} className="flex border items-center gap-x-2 px-2 border-white/40 mt-5 min-h-10 w-full rounded-md hover:bg-gray-700 cursor-pointer"></input>
        <input type={"text"} placeholder="body" onChange={(e) => setBody(e.target.value)} className="flex border w-full items-center gap-x-2 px-2 border-white/40 mt-5 min-h-10 rounded-md hover:bg-gray-700 cursor-pointer"></input>
        <Button variant="secondaryBlack" className="mt-3 w-full" style={{backgroundColor: 'white', color: 'black' }} children="Submit" onClick={() => {
            setMetadata({
                email,
                body
            })
        }} />
    </div>
}

function SolanaSelector({ setMetadata }: {
    setMetadata: (params: any) => void;
}) {
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("")

    return <div>
        <input type={"text"} placeholder="To" onChange={(e) => setAddress(e.target.value)} className="flex border items-center gap-x-2 px-2 border-white/40 mt-5 min-h-10 rounded-md w-full hover:bg-gray-700 cursor-pointer"></input>
        <input type={"text"} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} className="flex border w-full items-center gap-x-2 px-2 border-white/40 mt-5 min-h-10 rounded-md hover:bg-gray-700 cursor-pointer"></input>

        <Button variant="secondaryBlack" className="mt-3 w-full" style={{backgroundColor: 'white', color: 'black' }} children="Submit" onClick={() => {
            setMetadata({
                amount,
                address
            })
        }} />
    </div>
}