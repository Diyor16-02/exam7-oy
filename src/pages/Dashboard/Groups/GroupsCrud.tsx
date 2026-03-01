import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button, DatePicker, Input, Select } from "antd"
import { CustomSelect, QueryPATH } from "../../../components"
import { useEffect, useState, type SubmitEvent } from "react"
import type { Dayjs } from "dayjs"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"

const GroupsCrud = () => {
    const { stackId: stackPathId, groupId } = useParams()
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [name, setName] = useState<string>("")
    const [stackId, setStackId] = useState<number | null | string>(stackPathId ? Number(stackPathId) : null)
    const [teacherId, setTeacherId] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [status, setStatus] = useState<null | string>(null)

    const dateFormat = 'YYYY-MM-DD';

    // Create logikasi
    const { mutate:CreateGroup, isPending } = Create("/groups", cookies.token, navigate, queryClient, QueryPATH.groups)
    // Update logikasi
    const { mutate: UpdateGroup } = Update("/groups", cookies.token, groupId, navigate, queryClient, QueryPATH.groups, QueryPATH.groupMore)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { name, stackId, teacherId, startDate, endDate, status }
        groupId ? UpdateGroup(data) : CreateGroup(data)
    }

    // Single Group
    const { data: singleInfo = {} } = groupId ? GetById(QueryPATH.groupMore, groupId, cookies.token, "/groups") : {}

    useEffect(() => {
        if (singleInfo && groupId) {
            setName(singleInfo.name)
            setStackId(singleInfo?.stack?.id)
            setTeacherId(singleInfo?.teacher?.id)
            setStatus(singleInfo.status)
            setStartDate(singleInfo.startDate ? dayjs(singleInfo.startDate) : null)
            setEndDate(singleInfo.endDate ? dayjs(singleInfo.endDate) : null)
        }
    }, [singleInfo])

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /></button>
                    <h2 className="font-bold text-[25px]">Group {groupId ? "update" : "create"}</h2>
                </div>
                <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary">Save</Button>
            </div>
            <div className="flex justify-center gap-5 m-5">
                <div className="w-[45%] flex flex-col gap-5">
                    <Input value={name} onChange={(e) => setName(e.target.value)} size="large" allowClear placeholder="Enter group name" />
                    <CustomSelect disabled={stackPathId ? true : false} value={stackId} setValue={setStackId} extraClass="w-full!" queryKey={QueryPATH.stacks} requestTitle="/stacks" />
                    <CustomSelect stackId={stackId} value={teacherId} setValue={setTeacherId} extraClass="w-full!" queryKey={QueryPATH.teachers} requestTitle="/teachers" />
                </div>
                <div className="w-[45%] flex flex-col gap-5">
                    <DatePicker value={startDate} format={dateFormat} onChange={(date) => setStartDate(date)} placeholder="Start date" className="w-full!" size="large" />
                    <DatePicker value={endDate} format={dateFormat} onChange={(date) => setEndDate(date)} placeholder="End date" className="w-full!" size="large" />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e)}
                        className={`w-full`}
                        allowClear
                        size="large"
                        showSearch={{ optionFilterProp: 'label' }}
                        placeholder={`Choose status`}
                        options={[
                            { label: "planned", value: "planned" },
                            { label: "active", value: "active" },
                            { label: "archived", value: "archived" },
                            { label: "complated", value: "complated" },
                        ]}
                    />
                </div>
            </div>
        </form>
    )
}

export default GroupsCrud