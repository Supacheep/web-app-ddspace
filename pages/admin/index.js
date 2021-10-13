import {
  useContext,
  useState,
} from 'react'
import styled from 'styled-components'
import {
  Input,
  Button,
  Table,
  Upload,
  message,
} from 'antd'
import axios from 'axios'
import { ModalLogin, ModalLoading } from '../../src/components'
import { HeaderLogo, TitleH3 } from '../../src/components/common'
import userContext from '../../src/context/userContext'
import { colors } from '../../src/configs/color'
import ModalRegister from './components/modalRegister'
import { API } from '../../src/configs'

const { Search } = Input

const Container = styled.div`
  background-color: ${colors.themeColor};
  width: 100vw;
  height: 100vh;
`

const Header = styled.div`
  background-color: ${colors.themeColor};
  display: flex;
  align-items: center;
`

const Title = styled(TitleH3)`
  text-align: left;
  margin-left: 50px;
`

const Content = styled.div`
  margin: 10px;
  .upload-btn {
    display: flex;
    margin-left: 10px;
    align-items: center;
    min-width: 300px;
    .ant-upload-list-item {
      margin-top: 0;
      margin-left: 5px;
    }
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const DeleteButton = styled(Button)`
  background-color: ${colors.red};
  color: ${colors};
  border: 0;
  :hover,:active {
    background-color: ${colors.red} !important;
  }
`

const LogoContainer = styled.div`
  white-space: nowrap;
`

const Admin = () => {
  const user = useContext(userContext)
  const [fileList, setFile] = useState([])
  const [registerVisible, setRegisterVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <DeleteButton type="primary">Delete</DeleteButton>,
    },
  ]

  const dataList = [
    {
      key: 1,
      id: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      id: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      id: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      id: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ]

  const loginAdmin = async (data) => {
    setIsLoading(true)
    try {
      const loginUser = await axios.post(`${API}/adminsession/adminlogin`, data)
      const adminToken = loginUser?.data?.data?.token
      setIsLoading(false)
      if (adminToken) {
        user.setAdmin({ ...data, adminToken })
      } else {
        setErrorMsg(loginUser?.data?.data?.message || 'Login failed')
      }
    } catch (err) {
      setIsLoading(false)
      setErrorMsg(err?.response?.data?.error?.message || 'Login failed')
    }
  }

  if (!user.adminData) {
    return (
      <Container>
        <ModalLogin
          visible={!user.adminData}
          onFinish={loginAdmin}
          error={errorMsg}
        />
        {isLoading && <ModalLoading />}
      </Container>
    )
  }

  const onSearch = () => {

  }

  const handleChange = (info) => {
    let list = [...info.fileList]
    console.log('handleChange!!!', info?.file?.response)
    // fileList = fileList.slice(-2)

    if (info?.file?.response?.success) {
      message.success('Upload success')
      return setFile([])
    }

    list = list.map((file) => {
      const returnFile = file
      if (returnFile.response) {
        returnFile.url = returnFile.response.url
      }
      return returnFile
    })
    return setFile(list)
  }

  return (
    <div>
      <Header>
        <LogoContainer>
          <HeaderLogo
            src="/images/LogoThPRS-01.svg"
            alt="LogoThPRS"
          />
          <HeaderLogo
            src="/images/LogoThSAPS_whole.svg"
            alt="LogoThPRS"
          />
        </LogoContainer>
        <Title style={{ color: colors.white }}>
          {'The 31th Annual Meeting of The Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
        </Title>
      </Header>
      <Content>
        <Search
          placeholder="search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          style={{ width: 500 }}
        />
        <Section>
          <span>Member Profile</span>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => setRegisterVisible(true)}
          >
            Add Member
          </Button>
        </Section>
        <Section>
          <span>Select File (.csv)</span>
          <Upload
            accept=".csv"
            action={`${API}/userprofile/multipleregister`}
            headers={{
              AdminToken: user.adminData.adminToken,
            }}
            className="upload-btn"
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
          >
            <Button>Upload</Button>
          </Upload>
          {/* <Button
            type="primary"
            style={{ marginLeft: 10 }}
            disabled={!fileList.length}
          >
            Import
          </Button> */}
        </Section>
        <Table
          columns={columns}
          dataSource={dataList}
        />
      </Content>
      <ModalRegister visible={registerVisible} onClose={() => setRegisterVisible(false)} />
    </div>
  )
}

export default Admin
