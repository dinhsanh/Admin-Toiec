import { Button, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import ModalVocabulary from "./ModalVocabulary";
import { getAllVocabulariesbyCategoryPage } from '../../Api/Service/sidebar.service'
import './Vocabulary.css'
import { render } from "react-dom";
import { Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TopicVocabulary() {
    const [allVocabularyCategories, setAllVocabularyCategories] = useState([]);
    const [isLoadData, setIsLoadData] = useState(false)
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id,setid]=useState();
    useEffect(() => {
        getAllVocabulariesbyCategoryPage("vocabularyCategories").then((res) => {
            setAllVocabularyCategories(res.data.data)
            setIsLoadData(true)
        }).catch((err) => {
            console.log(err)
        })
    })

    for (let i = 1; i <= allVocabularyCategories.length; i++) {
        allVocabularyCategories[i - 1].STT = i;
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
        }, {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Space size="large" style={{ cursor: "pointer" }}>
                    <Tag color="green" >
                        Edit
                    </Tag>
                    <Tag color="red" 
                    onClick={()=>{
                        onDeleteVocavbulary(record)
                    }}>
                        Delete
                    </Tag>
                </Space>
            ),
        }

    ];
const onDeleteVocavbulary=(record)=>{

}
    return (
        <>
            <div>
                <div className="title-table">
                    <Typography.Text className="title-head">Topic Vocabulary</Typography.Text>
                    <Link to={"/create"}>
                    <Button className="btn_cre">Create</Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={allVocabularyCategories} />
            </div>
        </>
    );
}

export default TopicVocabulary;
