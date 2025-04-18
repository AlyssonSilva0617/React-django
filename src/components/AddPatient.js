import React, { useState } from "react";
import { Collapse, Dropdown, Table, Menu } from "antd";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
];

const data = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
  { key: "4", name: "Jim Red", age: 32, address: "London No. 2 Lake Park" },
];

const App = () => {
  const [iiimenu, setMenu] = useState([]); // Initial empty menu

  // Function to generate dynamic menu based on row data
  const optionsItem = (rowData) => {
    if (!rowData) return;

    const menu = [
      {
        key: "group_name",
        label: `Group: ${rowData.name}`,
      },
      { type: "divider" },
      { key: "add_group", label: "Add group" },
    ];

    // Custom condition to check rowData.age
    if (rowData.age === 42) {
      if (!rowData.approved) {
        menu.push(
          {
            key: "delete_group",
            label: "Delete group",
          },
          {
            key: "edit_name",
            label: "Edit group name",
          }
        );
      }
    }

    // Update the menu state dynamically
    setMenu(menu);
  };

  // Table rendering
  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={data}
        components={{
          body: {
            row: (props) => {
              return (
                <Dropdown
                  trigger={["contextMenu"]}
                  menu={{
                    items: iiimenu, // Dynamically updated menu
                    onClick: (info) => {
                      console.log(info.key, props["data-row-key"]);
                    },
                  }}
                >
                  <tr
                    {...props}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      // Get the row data on right-click
                      const rowData = props.children[0].props.record;
                      optionsItem(rowData); // Update the menu based on the row data
                    }}
                  />
                </Dropdown>
              );
            },
          },
        }}
      />
    );
  };

  // Collapse items containing the table
  const collapseSiteItems = [
    {
      key: "1",
      label: "Site Tag",
      children: <div>{renderTable()}</div>,
    },
  ];

  return <Collapse bordered={false} items={collapseSiteItems}></Collapse>;
};

export default App;
