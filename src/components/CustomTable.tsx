import React from 'react';
import { Table } from 'antd';

const CustomTable:React.FC<{columns:any[], data:any[], loading:boolean}> = ({columns, data, loading}) => (
  <Table
    loading={loading}
    columns={columns}
    dataSource={data}
  />
);

export default CustomTable;