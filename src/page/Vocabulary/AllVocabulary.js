import { Button, Space, Table, Typography, Tag, Form, Modal, Input, Row, Col, Select, Checkbox } from "antd";
import { useEffect, useState, useCallback, useRef } from "react";
import { getAllVocabularies, getAllVocabulariesbyCategoryPage } from '../../Api/Service/sidebar.service';
import { updateVocabulary, createVocabulary, deleteCategory } from '../../Api/Service/Admin.service';
import { toast } from "react-toastify";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import "./Vocabulary.css";
const { option } = Select;

function AllVocabulary() {
  const [allVocabularies, setAllVocabularies] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([])
  const fetchVocabularies = useCallback(() => { //reload
    setLoading(true);
    getAllVocabularies("vocabularies").then((res) => {
      setAllVocabularies(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    fetchVocabularies();
  }, [fetchVocabularies,]);

  useEffect(() => {
    getAllVocabulariesbyCategoryPage("vocabularyCategories")
      .then((res) => {
        const _option = []
        res.data.data.map((item, index) => (
          _option[index] = { value: item.id, label: item.name }

        ))
        console.log(_option)
        setOptions(_option)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    getAllVocabularies("vocabularies").then((res) => {
      setAllVocabularies(res.data.data);
      setLoading(false)
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  const handleChange = (e) => {
    setStatus(e.target);
  };
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

  for (let i = 1; i <= allVocabularies.length; i++) {
    allVocabularies[i - 1].stt = i;
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      // render: (_, record, index) => index + 1,
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('word'),
    },
    {
      title: "Pronounce",
      dataIndex: "pronounce",
      key: "pronounce",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('pronounce'),
    },
    {
      title: "Mean",
      dataIndex: "mean",
      key: "mean",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('mean'),
    },
    {
      title: "Category",
      dataIndex: "categoryIds",
      key: "categoryIds",
      render: (categoryIds) => {
        const categoryNames = categoryIds.map(id => {
          const selectedOption = options.find(option => option.value === id);
          return selectedOption.label;
        });
        return <div>{categoryNames.join(", ")}</div>;
      }
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
    deleteCategory(`vocabularies?id=${record.id}`)
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });

        fetchVocabularies();
      }).catch((err) => {
        toast.error(err.response.data.message, { autoClose: 1000 });
      });
  };
  const handleUpdateVocabulary = useCallback((values) => {
    updateVocabulary(`vocabularies?id=${id}`, values).then((res) => {
      toast.success(res.data.message, { autoClose: 1000 });
      setIsOpenForm(false);

      fetchVocabularies();
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 1000 });
    });
  }, [form, id]);
  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      word: record.word,
      pronounce: record.pronounce,
      mean: record.mean,
      categoryIds: record.categoryIds,
      isActive: record.isActive,
    };
    setStatus(record.isActive)
    form.setFieldsValue(requestBody);
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
    createVocabulary('vocabularies/create', values)
      .then((res) => {
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
    }
  };
  return (
    <div className="Topic-Vocabulary">
      <header className="form-title">
        <Row align="middle" justify="space-between" >
          <Col className="title-allvocab">
            <Typography.Text className="title-head2">Vocabularies</Typography.Text>
          </Col>
          <Col>
            <Button className="btn_cre" onClick={onCreateVocabulary}>Create</Button>
          </Col>
        </Row>
      </header>
      <Table columns={columns} dataSource={allVocabularies} loading={loading} />
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
          <Form.Item label="Word" name="word" rules={[{ required: true, message: 'Please input word!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Pronounce" name="pronounce" rules={[{ required: true, message: 'Please input pronounce!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mean" name="mean" rules={[{ required: true, message: 'Please input mean!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="CategoryName" name="categoryIds" rules={[{ required: true, message: 'Please choice Topic Category!' }]}>
            <Select mode="multiple" options={options} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Status" name="isActive" valuePropName='checked'>
            <Checkbox></Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default AllVocabulary;
