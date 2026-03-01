import { Button } from "antd"
import type { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface CaptionType {
    title:string,
    count:number,
    icon:ReactNode
}

const Caption:FC<CaptionType> = ({title, count, icon}) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold text-[22px]">{title}</h1>
                <p className="text-[16px] text-slate-400">{title.toLowerCase()} ({count})</p>
            </div>
            <Button onClick={() => navigate("create")} size="large" icon={icon} iconPlacement="start" type="primary">Create</Button>
        </div>
    )
}

export default Caption