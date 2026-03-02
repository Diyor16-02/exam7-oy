import { Button, Input } from "antd"
import { Caption, CustomTable, QueryPATH } from "../../../components"
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { GetAll } from "../../../services"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { debounce } from "../../../hooks"
import { useNavigate } from "react-router-dom"

const Rooms = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Room name",
      dataIndex: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ]

  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)

  const { data = [], isLoading } = GetAll([name],"/rooms", cookies.token, QueryPATH.rooms, { name })
  const rooms = (data ?? []).map((item: any, index: number) => ({
    ...item,
    key: index + 1,
    actions: (
      <Button onClick={() => navigate(`/rooms/${item.id}`)} type="primary" icon={<MoreOutlined />} />),
  }))

  return (
    <div className="p-5">
      <Caption icon={<PlusCircleOutlined />} count={rooms.length} title="Rooms" />
      <div className="flex gap-3 my-5">
        <Input onChange={(e) => setSearch(e.target.value)} className="w-70!" size="large" allowClear placeholder="Search room by name" />
      </div>
      <CustomTable loading={isLoading} columns={columns} data={rooms} />
    </div>
  )
}

export default Rooms