import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button, Input } from "antd"
import { CustomSelect, QueryPATH } from "../../../components"
import { useEffect, useState, type SubmitEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

const TeacherCrud = () => {
  const { id } = useParams()
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [stackId, setStackId] = useState<number | null>(null)

  // Create logikasi
  const { mutate: CreateTeacher, isPending } = Create("/teachers", cookies.token, navigate, queryClient, QueryPATH.teachers)
  // Update logikasi
  const { mutate: UpdateTeacher } = Update("/teachers", cookies.token, id, navigate, queryClient, QueryPATH.teachers, QueryPATH.teacherMore)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data: any = { firstName, lastName, email, phone, stackId }
    if (!id || password) {
      data.password = password
    }

    id ? UpdateTeacher(data) : CreateTeacher(data)
  }

  // Single Teacher
  const { data: singleInfo = {} } = id ? GetById(QueryPATH.teacherMore, id, cookies.token, "/teachers") : {}

  useEffect(() => {
    if (singleInfo && id) {
      setFirstName(singleInfo.firstName)
      setLastName(singleInfo.lastName)
      setEmail(singleInfo.email)
      setPhone(singleInfo.phone)
      setStackId(singleInfo.stackId)
    }
  }, [singleInfo])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}> <ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /> </button>
          <h2 className="font-bold text-[25px]"> Teacher {id ? "update" : "create"} </h2>
        </div>
        <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary"> Save </Button>
      </div>
      <div className="flex justify-center gap-5 m-5">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} size="large" placeholder="First name" />
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} size="large" placeholder="Last name" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" placeholder="Email" />
        </div>

        <div className="w-[45%] flex flex-col gap-5">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} size="large" placeholder="Phone" />
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="Password" />
          <CustomSelect value={stackId} setValue={setStackId} extraClass="w-full!" queryKey={QueryPATH.stacks} requestTitle="/stacks" />
        </div>
      </div>
    </form>
  )
}

export default TeacherCrud