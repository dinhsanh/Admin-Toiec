import React, { useState, useEffect } from "react";
import { getpractice } from "../../Api/Service/sidebar.service";
import { toast } from "react-toastify";
import { Space, Table, Tag, Typography,Col,Row,Button} from "antd";
import { Link } from "react-router-dom"
import PracticeParts from "./PracticeParts";
function Practice() {
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getpractice(`practices`)
      .then((res) => {
        const arr = res.data.data.map((item, index) => item.id)
        localStorage.setItem('myArray', JSON.stringify(arr));
        const fourskills = res.data.data.map((photo, index) => ({
          ...photo,
          STT: index + 1,
        }));
        setAllSkills(fourskills);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.data.message, { autoClose: 1000 });
        setLoading(false);
      });
  }, []);
  const handlePassId = () => {
    <PracticeParts />
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => //<div onclick={() => handlePassId()} >
        <Link to={`/practice_Part/${text}`} >{text}</Link>
      //</div >
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Practice" style={{ maxWidth: "100px" }} />,
    },
  ];

  return(
    <div>
    <header className="form-title">
    <Row align="middle">
      <Col className="title-allvocab">
        <Typography.Text className="title-head2">Practice</Typography.Text>
      </Col>
      {/* <Col>
        <Button className="btn_cre" onClick={onCreateVocabulary}>Create</Button>
      </Col> */}
    </Row>
  </header>
  <Table columns={columns} dataSource={allSkills} loading={loading} />;
    </div>
  )
}

export default Practice;
