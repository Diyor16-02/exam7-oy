import {  MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button, Card, Input } from "antd"
import { debounce } from "../../../hooks"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAll } from "../../../services"
import { Caption, QueryPATH } from "../../../components"

const Stacks = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  // Search
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 500)
  // Get All Stacks
  const { data: stacks = [], isLoading } = GetAll([name], "/stacks", cookies.token, QueryPATH.stacks, {name})
  return (
    <div className="p-5">
      <Caption title="Stacks" count={stacks.length} icon={<PlusCircleOutlined />} />
      <Input onChange={e => setSearch(e.target.value)} className="w-75! mt-5" allowClear size="large" placeholder="Search by name" />
      <ul className="flex mt-5 flex-wrap gap-5">
        {isLoading ? "Loading..." : stacks.map(item => (
          <Card className="border! cursor-pointer border-black!" key={item.id} title={item.name} extra={<Button onClick={() =>  navigate(`${item.id}`)} className="bg-transparent! border! text-black! border-black!" type="primary" icon={<MoreOutlined />}></Button>} style={{ width: 300 }}>
            <p>{item.description}</p>
          </Card>
        ))}
      </ul>
    </div>
  )
}

export default Stacks