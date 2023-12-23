import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Space, Table, Typography, Tag, Form, Modal, Input, Row, Col, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllVocabulariesbyCategoryPage } from "../../Api/Service/sidebar.service";
import { deleteCategory, putCategory, createCategory } from "../../Api/Service/Admin.service";
import "./Vocabulary.css";

function TopicVocabulary() {
  const [vocabularies, setVocabularies] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [status,setStatus]=useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setStatus(form.getFieldValue("isActive"))
  }, [form])
  const handleChange=(e)=>{
    setStatus(e.target.checked);
  };
  useEffect(() => {
    setLoading(true);
    getAllVocabulariesbyCategoryPage("vocabularyCategories").then((res) => {
        setVocabularies(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [])
  const fetchVocabularies = useCallback(() => {
    setLoading(true);
    getAllVocabulariesbyCategoryPage("vocabularyCategories")
      .then((res) => {
        setVocabularies(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          width: 300,
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            // display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  for (let i = 1; i <= vocabularies.length; i++) {
    vocabularies[i - 1].stt = i;
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      // render: (_, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('name'),
    }, {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: '15%',
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '14px' }} color="green"
            onClick={() => onClickUpdate(record)} >
            Edit
          </Tag>
          <Tag style={{ fontSize: '14px' }} color="red"
            onClick={() => onClickDelete(record)} >
            Delete
          </Tag>
        </Space>
      ),
    }
  ];
  const onClickDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this?",
      onOk: () => handleDeleteVocabulary(record),
      okText: 'Delete',
      okType: 'danger'
    });
  };
  const handleDeleteVocabulary = (record) => {
    deleteCategory(`vocabularyCategories?id=${record.id}`)
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });

        fetchVocabularies();
      }).catch((err) => {
        toast.error(err.response.data.message, { autoClose: 1000 });
      });
  };
  const handleUpdateVocabulary = useCallback((values) => {
    console.log(values)
    putCategory(`vocabularyCategories?id=${values.id}`, values).then((res) => {
      setIsOpenForm(false);
      fetchVocabularies();
      toast.success(res.data.message, { autoClose: 1000 });
    }).catch((err) => {
      console.log(err.response.data.message)
      toast.error(err.response.data.message, { autoClose: 1000 });
    });
  }, [form]);
  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      name: record.name,
      isActive: record.isActive,
    };
    form.setFieldsValue(requestBody);
    setStatus(record.isActive)
    setIsOpenForm(true);
  }, [form]);

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  },
    [onClickOpenModal]
  );

  const handleModalCancel = () => {
    setIsOpenForm(false);
    form.resetFields();
  };

  const onCreateVocabulary = () => {
    form.resetFields();
    setId('');
    setIsOpenForm(true);
  };

  const handleCreateVocabulary = (values) => {
    createCategory('vocabularyCategories/create', values).then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        setIsOpenForm(false);

        fetchVocabularies();
      }).catch((err) => {
        toast.error(err.response.data.message, { autoClose: 1000 });
      });
  };

  const onFinish = (values) => {
    if (values.id) {
      handleUpdateVocabulary(values);
    } else {
      console.log(values)
      handleCreateVocabulary(values);
    }};
    return (
      <div className="Topic-Vocabulary">
        <header className="form-title">
          <Row align="middle" justify="space-between" >
            <Col className="title-allvocab">
              <Typography.Text className="title-head2">VocabularyCategories</Typography.Text>
            </Col>
            <Col>
              <Button className="btn_cre" onClick={onCreateVocabulary}>Create</Button>
            </Col>
          </Row>
        </header>
        <Table columns={columns} dataSource={vocabularies} loading={loading} />
        <Modal
          title={id ? "Edit Vocabulary" : "Create new Vocabulary"}
          open={isOpenForm}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
        >
          <Form form={form} initialValues={{ id }} onFinish={onFinish}>
            <Form.Item name="id" hidden >
              <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input word!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="isActive" valuePropName='checked'>
            <Checkbox checked={status} onChange={handleChange}></Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
export default TopicVocabulary;
