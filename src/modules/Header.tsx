import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useContext, useState } from "react"
import { Context } from "../context/Context"
import { useCookies } from "react-cookie"
import toast from "react-hot-toast"
import { PATH } from "../components"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const [,,removeCookies] = useCookies(['token'])
  const {setCollepsed, collepsed} = useContext(Context)
  const [logoutModal, setLogoutModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  function handleLogOut(){
    setLoading(true) 
    setTimeout(() => {
      setLoading(false)
      setLogoutModal(false)
      toast.success("Successfully logout!")
    },800)
    setTimeout(() => {
      removeCookies("token")
      navigate(PATH.home)
    },1500)
  }
  return (
    <div className="bg-[#031529] p-4 flex items-center justify-between">
      <Button onClick={() => setCollepsed(!collepsed)} className="bg-transparent! border! border-white!" type="primary">
        {collepsed ?  <MenuUnfoldOutlined /> :  <MenuFoldOutlined />}
      </Button>
      <Button onClick={() => setLogoutModal(true)} className="bg-red-800!" type="primary" icon={<LoginOutlined />} iconPlacement="start">Logout</Button>
      <Modal onOk={handleLogOut} confirmLoading={loading} title="Do you want to Logout!" open={logoutModal} onCancel={() => setLogoutModal(false)}></Modal>
    </div>
  )
}

export default Header