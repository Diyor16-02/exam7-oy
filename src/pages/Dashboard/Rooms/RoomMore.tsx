import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../services"
import { QueryPATH } from "../../../components"

const RoomMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  // Get Single Data
  const { data = {}, isLoading } = GetById( QueryPATH.roomMore, id, cookies.token,"/rooms")
  // Delete part
  const { mutate: RoomDelete, isPending } = Delete( "/rooms", cookies.token, id, navigate, QueryPATH.rooms, queryClient)

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer"><ArrowLeftOutlined /></button>
          <h1 className="font-bold text-[25px]">  {isLoading ? "loading..." : data.name} </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />} />
          <Button onClick={() => navigate("update")} icon={<EditFilled />} size="large" type="primary" > Update </Button>
        </div>
      </div>
      <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[50%]">
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">#ID</span>
            <strong>{data.id}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Room name</span>
            <strong>{data.name}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Capacity</span>
            <strong>{data.capacity}</strong>
          </li>
        </ul>
      </div>

      <Modal confirmLoading={isPending} onOk={() => RoomDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete!" />
    </div>
  )
}

export default RoomMore