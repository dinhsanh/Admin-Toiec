import { useState,useEffect } from "react";
import { getAccount } from "../../Api/Service/sidebar.service";
import { toast } from "react-toastify";
import { Table,Checkbox } from "antd";
function Account() {
    const [loading,setLoading]=useState(false)
    const [allAccounts,setAllAccounts]=useState([])

    useEffect(() => {
        setLoading(true)
        getAccount("accounts")
          .then((res) => {
            setAllAccounts(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            toast.error(err.data.message, { autoClose: 1000 });
          });
      }, []);
      for (let i = 1; i <= allAccounts.length; i++) {
        allAccounts[i - 1].STT = i;
      }
      const columns = [
        {
          title: "STT",
          dataIndex: "STT",
          key: "STT",
          // render: (_, record, index) => index + 1,
        },
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        //   render: (text) => <a>{text}</a>,
        }, {
          title: "Password",
          dataIndex: "password",
          key: "password",
        //   render: (_, record) => (
        //     <Space size="large" style={{ cursor: "pointer" }}>
        //       <Tag color="green"
        //         onClick={() => { onUpdateVocabulary(record); }}>
        //         Edit
        //       </Tag>
        //       <Tag color="red"
        //         onClick={() => { onDeleteVocavbulary(record) }}>
        //         Delete
        //       </Tag>
        //     </Space>
        //   ),
        }, {
            title: "Role",
            dataIndex: "role",
            key: "role",
        }, {
            title: "IsActive",
            dataIndex: "isActive",
            key: "isActive",
            render: (text) => <Checkbox checked={text}></Checkbox>,
        }
      ];
      return(
        <Table columns={columns} dataSource={allAccounts} loading={loading} />
    )
}
export default Account;