import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { Table } from 'antd';

function UsersList() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/admin/get-all-users`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      if(response.data.success){
        
        setUsers(response.data.users)
      }
    } catch (error) {
      console.log("UsersList Error: ", error.message);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    // {
    //   title: "Is Doctor?",
    //   dataIndex: "isDoctor",
    //   key: "isDoctor"
    // },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className='d-flex flex-wrap'>
          <p className='anchor'>Block</p>
        </div>
      )
    },
  ]

  console.log("usersList: ", users);

  return (
    <Layout>
      <h1 className='page-title'>Users List</h1>
      <hr/>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default UsersList
