import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Create, GetById, Update } from "../../../services"
import { QueryPATH } from "../../../components"

const StackCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['token'])
  const { stackId } = useParams()

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  // Create logikasi
  const { mutate: stackCreate, isPending } = Create("/stacks", cookies.token, navigate, queryClient, QueryPATH.stacks)
  // Update logikasi
  const { mutate: stackUpdate } = Update("/stacks", cookies.token, stackId, navigate, queryClient, QueryPATH.stacks, QueryPATH.stacksMore)

  // Create and Update logika
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { name, description }
    stackId ? stackUpdate(data) : stackCreate(data)
  }

  // Get For Update Single info
  const { data: singleInfo = {} } = stackId ? GetById(QueryPATH.stacksMore, stackId, cookies.token, "/stacks") : {}
  useEffect(() => {
    if (singleInfo && stackId) {
      setName(singleInfo.name)
      setDescription(singleInfo.description)
    }
  }, [singleInfo])
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /></button>
          <h2 className="font-bold text-[25px]">Stacks {stackId ? "update" : "create"}</h2>
        </div>
        <Button loading={isPending} type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">Save</Button>
      </div>
      <div className="flex items-center justify-center flex-col gap-5 mt-10">
        <Input onChange={(e) => setName(e.target.value)} value={name} className="w-[60%]!" size="large" allowClear name="name" placeholder="Enter stack name" />
        <TextArea onChange={(e) => setDescription(e.target.value)} value={description} rows={8} className="w-[60%]!" allowClear name="name" placeholder="Enter stack name" />
      </div>
    </form>
  )
}

export default StackCrud