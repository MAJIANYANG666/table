import React from 'react';
import Table from './table.tsx';
import "./App.css";

const columns = [
  { key: 'name', title: 'Name', sortable: true, fixed: 'left' },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'address', title: 'Address' },
  { key: 'email', title: 'Email', fixed: 'right' },
];

const data = [
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  { name: 'John Doe', age: 28, address: '123 Street', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, address: '456 Avenue', email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 29, address: '789 Boulevard', email: 'alice@example.com' },
  { name: 'Bob Brown', age: 45, address: '101 Road', email: 'bob@example.com' },
  // 可以添加更多数据
];

const App = () => {
  return (
    <div className="App">
      <Table columns={columns} data={data} defaultPageSize={10} />
    </div>
  );
};

export default App;
