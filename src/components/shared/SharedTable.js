import { useEffect, useState } from "react";
import { Card, Input, Select, Table } from "antd";
import PropTypes from "prop-types";
import handleRequest from "@/utilities/handleRequest";

const { Search } = Input;
const SharedTable = ({
  tableName,
  tableColumn,
  url,
  RightElement = <></>,
  rerender,
  scroll = {},
  expandable = {},
  rowKey = () => {},
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    onChange: (page, pageSize) => {
      fetchData(`?page=${page}&limit=${pageSize}`).catch();
    },
  });

  const fetchData = async (params) => {
    setLoading(true);
    const data = await handleRequest("get", params ? url + params : url);
    setLoading(false);
    setData(data?.data);
    setPagination({
      ...pagination,
      current: data?.meta?.page,
      pageSize: data?.meta?.limit,
      total: data.meta?.total,
    });
  };

  useEffect(() => {
    fetchData().catch();
  }, [rerender]);

  const handleChange = async (value) => {
    await fetchData(`?limit=${value}`);
  };
  const onSearch = async (value) => {
    if (value) {
      await fetchData(`?searchTerm=${value}`);
    } else {
      await fetchData();
    }
  };

  return (
    <>
      <Card title={tableName}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "25px 0",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Select
              size="large"
              defaultValue="10 Per Page"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 10,
                  label: "10 Per Page",
                  key: 10,
                },
                {
                  value: 20,
                  label: "20 Per Page",
                  key: 20,
                },
                {
                  value: 50,
                  label: "50 Per Page",
                  key: 50,
                },
                {
                  value: 100,
                  label: "100 Per Page",
                  key: 100,
                },
                {
                  value: 200,
                  label: "200 Per Page",
                  key: 200,
                },
              ]}
            />
            <Search
              size="large"
              style={{
                marginLeft: "15px",
              }}
              placeholder="search"
              onSearch={onSearch}
              enterButton
            />
          </div>
          {RightElement}
        </div>
        <Table
          dataSource={data}
          pagination={pagination}
          columns={tableColumn}
          loading={loading}
          key={data?.length}
          scroll={scroll}
          expandable={expandable}
          rowKey={rowKey}
        />
      </Card>
    </>
  );
};

SharedTable.propTypes = {
  tableName: PropTypes.string.isRequired, // Add this line
  tableColumn: PropTypes.array.isRequired, // Add this line
  url: PropTypes.string.isRequired,
  RightElement: PropTypes.element,
};

export default SharedTable;
