import React, { useEffect, useState,useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, Tag, Space, Typography, Row, Col, Input, Form, Modal, Button } from "antd";
import { getpracticepartId, getpractice,deletepracticepart,createpracticepart,updatepracticepart } from "../../Api/Service/sidebar.service";

function PracticeParts() {
    const { choose } = useParams();
    const [loading, setLoading] = useState(true);
    const [allSkills, setAllSkills] = useState([]);
    const [practiceId, setPracticeId] = useState(""); // Use useState to manage state
    const [id, setId] = useState("");
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [form] = Form.useForm();
    console.log(choose);

    const fetchVocabularies = useCallback(() => { //reload
        setLoading(true);
        getpractice("practices").then((res) => {
          setAllSkills(res.data.data);
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
        setLoading(true);
        getpractice('practices').then((res) => {
            const index = res.data.data.findIndex((item) => item.name === choose);
            console.log(res.data.data[index].id);
            setPracticeId(res.data.data[index].id); // Update practiceId state
            a(res.data.data[index].id);
        });

    }, [choose]); // Add choose as a dependency

    const a = (value) => {
        getpracticepartId(`practiceParts?practiceId=${value}`).then((res) => {
            const fourskills = res.data.data.map((photo, index) => ({
                ...photo,
                STT: index + 1,
            }));
            setAllSkills(fourskills);
            setLoading(false);
        });
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
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} alt="" style={{ maxWidth: "200px" }} />,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space size="large" style={{ cursor: "pointer" }}>
                    <Tag style={{ fontSize: '14px' }} color="green"
                    onClick={() => onClickUpdate(record)}>
                        Edit
                    </Tag>
                    <Tag style={{ fontSize: '14px' }} color="red"
                    onClick={() => onClickDelete(record)}>
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
        deletepracticepart(`practiceParts?practiceId=${record}`)
            .then((res) => {
                toast.success(res.data.message, { autoClose: 1000 });
                fetchVocabularies();
            }).catch((err) => {
                toast.error(err.response.data.message, { autoClose: 1000 });
            });
    };
    const handleUpdateVocabulary = useCallback((values) => {
        updatepracticepart(`practiceParts?practiceId=${values}`).then((res) => {
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
            name: record.name,
            description:record.description

        };
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
        createpracticepart('practiceParts/create', values)
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
        <div>
      <header className="form-title">
        <Row align="middle" justify="space-between" >
          <Col className="title-allvocab">
            <Typography.Text className="title-head2">Listening</Typography.Text>
          </Col>
          <Col>
            <Button className="btn_cre" onClick={onCreateVocabulary}>Create</Button>
          </Col>
        </Row>
      </header>
            <Table columns={columns} dataSource={allSkills} loading={loading} />
            <Modal
                title={id ? "Edit Part Listening" : "Create new part Listening"}
                open={isOpenForm}
                onCancel={handleModalCancel}
                onOk={() => form.submit()}>
                <Form form={form} initialValues={{ id }} onFinish={onFinish}>
                    <Form.Item name="id" hidden >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input word!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input pronounce!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default PracticeParts;
