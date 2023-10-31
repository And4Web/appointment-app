import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'

function Notifications() {
  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>
      {/* <hr/> */}
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end"><h6 className='anchor'>Mark all as read</h6></div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
        <div className="d-flex justify-content-end"><h6 className='anchor'>Delete all</h6></div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default Notifications

// from 8:30