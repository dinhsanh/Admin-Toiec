import React, { useEffect, useState, useCallback } from 'react'
import { getAllVocabularies } from '../../../../Api/Service/vocabulary.service'
import HeaderPage from '../HeaderPage/HeaderPage';
import ModalAllVocabularies from './ModalAllVocabularies';
import { toast } from "react-toastify";
import { Checkbox, Table, Space, Tag, Form, Modal } from 'antd';

function Vocabularies() {
  const [vocabularies, setVocabularies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [categoryIds, setCategoryIds] = useState([])
  const [form] = Form.useForm();
  useEffect(() => {
    setIsLoading(true)
    getAllVocabularies('vocabularies').then((res) => {
      const addSttToVocabularies = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setVocabularies(addSttToVocabularies)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])
  const reloadData = useCallback(() => {
    setIsLoading(true)
    getAllVocabularies('vocabularies').then((res) => {
      const addSttToCategories = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }))
      setVocabularies(addSttToCategories)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  const columns = [
    {
      title: "STT",
      dataIndex: "num",
      key: "num"
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Pronounce",
      dataIndex: "pronounce",
      key: "pronounce",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mean",
      dataIndex: "mean",
      key: "mean",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '14px' }} color="green"
            onClick={() => onClickUpdate(record)} >
            Edit
          </Tag>
          <Tag style={{ fontSize: '14px' }} color="red" >
            Delete
          </Tag>
        </Space>
      ),
    }
  ];
  const onClickOpenModal = useCallback((record) => {
    console.log(record)
    const requestBody = {
      id: record.id,
      word: record.word,
      pronounce: record.pronounce,
      mean: record.mean,
      vocabularyCategoryIds: record.categoryIds,
      isActive: record.isActive
    }
    form.setFieldsValue(requestBody)
    setIsOpenForm(true)
  }, [form]);

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    setCategoryIds(record.categoryIds);
    onClickOpenModal(record);
  }, [onClickOpenModal])

  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }

  return (
    <div>
      <HeaderPage
        title="All Vocabularies"
        setIsOpenForm={setIsOpenForm}
      />
      <div className="section-wrapper">
        <Table columns={columns}
          dataSource={vocabularies}
          loading={isLoading}
          size='Large'
          tableLayout='Fixed' />
      </div>

      <ModalAllVocabularies
        isOpenForm={isOpenForm}
        onClose={() => onClose()}
        title={id ? "Edit Vocabulary" : "Create new Vocabulary"}
        form={form}
        id={id}
        reloadData={reloadData}
      />
    </div>
  )
}

export default Vocabularies