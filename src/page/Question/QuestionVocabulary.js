import React, { useEffect, useState, useCallback, useRef } from 'react'
import { getQuestionType } from '../../Api/Service/sidebar.service'
import { deleteQuestion } from '../../../../Api/Service/vocabulary.service';
import { Table, Space, Tag, Form, Modal, Input, Button } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import {   Row, Col, Radio, Select } from 'antd';
import { toast } from "react-toastify";
import Highlighter from 'react-highlight-words'

function QuestionVocabulary(props) {
  const { title} = props;
  const [allQuestions, setAllQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getAllVocabularies('vocabularies').then((res) => {
      const _options = res.data.data.map((item) => ({
        value: item.id,
        label: item.word,
      }));
      setOptions(_options)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getQuestionType('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.reverse().map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setAllQuestions(addSttToQuestions)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
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
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="middle"
            style={{
              margin: '5px',
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            danger
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="middle"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="middle"
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
          <Button
            type="link"
            size="middle"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
          fontSize: '18px'
        }}
      />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'optionAnswers') {
        return record[dataIndex]?.correctAnswer?.toString().toLowerCase().includes(value.toLowerCase());
      } else {
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      }
    },
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
  const columns = [
    {
      title: "STT",
      dataIndex: "num",
      key: "num",
      width: '10%'
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      ...getColumnSearchProps('level'),
    },
    {
      title: "Text Question",
      dataIndex: "textQuestion",
      key: "textQuestion",
      width: '30%',
      ...getColumnSearchProps('textQuestion'),
    },
    {
      title: "Answers",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      render: (text) => (
        <>
          <div>A. {text.answerA}</div>
          <div>B. {text.answerB}</div>
          <div>C. {text.answerC}</div>
          <div>D. {text.answerD}</div>
        </>),
    },
    {
      title: "Correct Answer",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      ...getColumnSearchProps('optionAnswers'),
      render: (text) => <div>{text.correctAnswer}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: '10%',
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '16px' }} color="green"
            onClick={() => onClickUpdate(record)}
          >
            <EditTwoTone />
          </Tag>
          <Tag style={{ fontSize: '16px' }} color="red"
            onClick={() => onClickDelete(record)}>
            <DeleteTwoTone />
          </Tag>
        </Space>
      ),
    }
  ];

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete Question Vocabulary?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (values) => {
    deleteQuestion(`questions?id=${values.id}`).then((res) => {
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      type: record.type,
      objectTypeId: record.objectTypeId,
      level: record.level,
      textQuestion: record.textQuestion,
      audioQuestion: record.audioQuestion,
      images: record.images,
      optionAnswers: record.optionAnswers,
      answerA: record.optionAnswers.answerA,
      answerB: record.optionAnswers.answerB,
      answerC: record.optionAnswers.answerC,
      answerD: record.optionAnswers.answerD,
      correctAnswer: record.optionAnswers.correctAnswer,
    }
    form.setFieldsValue(requestBody)
    setIsOpenForm(true)
  }, [form]);

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  }, [onClickOpenModal]);

  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }
  const reloadData = useCallback(() => {
    setIsLoading(true)
    getAllQuestionVocabulary('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.reverse().map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setAllQuestions(addSttToQuestions)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])
  const onFinish = (values) => {
    values.id ? handleUpdateVocabulary(values) : handlequestionCreateVocabulary(values)
  };

  const onFinishFailed = () => {
    toast.error("Create Question for Vocabulary Failed", { autoClose: 1000 })
  };

  return (
    <Modal
      className='custom__modal'
      title={title}
      open={isOpenForm}
      form={form}
      width={700}
      footer={[
        <Button form="formQuestion"
          key="back">
          Cancel
        </Button>,
        <Button
          form="formQuestion"
          key="submit"
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
    >
      <Form id='formQuestion' form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="id" hidden="true">
          <Input />
        </Form.Item>
        <Form.Item label="Question of Vocabulary" name="objectTypeId"
          rules={[{ required: true, message: 'Please input Vocabulary' },]}>
          <Select className='custom__input_modal'
            showSearch
            placeholder="Please Select Vocabulary"
            optionFilterProp="children"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            defaultValue={form.getFieldValue('objectTypeId') ? form.getFieldValue('objectTypeId') : []}
            options={options}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          ></Select>
        </Form.Item>
        <Form.Item name="level" label="Level"
          rules={[{ required: true, message: 'Please choose Level' },]}>
          <Radio.Group>
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Text Question" name="textQuestion"
          rules={[{ required: true, message: 'Please input Text Question' },]}>
          <Input className='custom__input_modal' />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Answer A" name="answerA"
              rules={[{ required: true, message: 'Please input answer A' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer B" name="answerB"
              rules={[{ required: true, message: 'Please input answer B' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer C" name="answerC"
              rules={[{ required: true, message: 'Please input answer C' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer D" name="answerD"
              rules={[{ required: true, message: 'Please input answer D' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Correct Answer" name="correctAnswer"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input Correct Answer!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || [getFieldValue('answerA'), getFieldValue('answerB'), getFieldValue('answerC'), getFieldValue('answerD')].includes(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Correct Answer must be one of four answer!'));
              },
            }),
          ]}>
          <Input className='custom__input_modal' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default QuestionVocabulary