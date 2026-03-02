import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useEffect, useState, type SubmitEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { QueryPATH } from "../../../components"

const RoomCrud = () => {
  const { id } = useParams()
  const [cookies] = useCookies(["token"])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [name, setName] = useState<string>("")
  const [capacity, setCapacity] = useState<number | null>(null)

  // Create
  const { mutate: CreateRoom, isPending } = Create( "/rooms", cookies.token, navigate, queryClient, QueryPATH.rooms)

  // Update
  const { mutate: UpdateRoom } = Update("/rooms", cookies.token, id, navigate, queryClient, QueryPATH.rooms, QueryPATH.roomMore)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      name,
      capacity: Number(capacity),
    }

    id ? UpdateRoom(data) : CreateRoom(data)
  }

  // Single Room
  const { data: singleInfo = {} } = id
    ? GetById(QueryPATH.roomMore, id, cookies.token, "/rooms") : {}

  useEffect(() => {
    if (singleInfo && id) {
      setName(singleInfo.name)
      setCapacity(singleInfo.capacity)
    }
  }, [singleInfo])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}> <ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /> </button>
          <h2 className="font-bold text-[25px]"> Room {id ? "update" : "create"} </h2>
        </div>
        <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary"> Save </Button>
      </div>
      <div className="flex justify-center gap-5 m-5">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={name} onChange={(e) => setName(e.target.value)} size="large" allowClear placeholder="Enter room name" />
          <Input type="number" value={capacity ?? ""} onChange={(e) => setCapacity(Number(e.target.value))} size="large" allowClear placeholder="Enter capacity" />
        </div>
      </div>
    </form>
  )
}

export default RoomCrud