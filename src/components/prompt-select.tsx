import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {api} from "@/lib/axios.ts";

interface Prompt {
    id: string,
    title: string,
    template: string
}

interface PromptSelectProps {
    onPromptSelected: (template:string)=>void
}

export function PromptSelect(props: PromptSelectProps){
    const [prompts, setPrompts] = useState<Prompt[]|null>(null)
    useEffect(()=>{
        api.get('/prompts').then(res=>{
            setPrompts(res.data)
        })
    },[])

    function handlePromptSelected(promtpId: string){
        const selectedPrompt = prompts?.find(prompt => prompt.id===promtpId)
        if(!selectedPrompt){
            return
        }
        props.onPromptSelected(selectedPrompt.template)
    }

    return(
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt..."/>
            </SelectTrigger>
            <SelectContent>
                {prompts?.map(each=><SelectItem key={each.id} value={each.id}>{each.title}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}