import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAllVocabularies } from '../../Api/Service/sidebar.service'
import './Vocabulary.css'


function AllVocabulary() {
    const [allVocabularies, setAllVocabularies] = useState([]);
    const [isLoadData, setIsLoadData] = useState(false)
    useEffect(() => {
        getAllVocabularies("vocabularies").then((res) => {
            console.log(res.data.data)
            setAllVocabularies(res.data.data)
            setIsLoadData(true)
        }).catch((err) => {
            console.log(err)
        })
    })

    for (let i = 1; i <= allVocabularies.length; i++) {
        allVocabularies[i - 1].STT = i;
    }
    const columns = [
        {
            title: "STT",
            dataIndex: "STT",
            key: "STT",
        },
        {
            title: "Word",
            dataIndex: "word",
            key: "word",
        }, {
            title: "Pronounce",
            id: "pronounce",
            dataIndex: 'pronounce'
        }, {
            title: "Mean",
            id: "mean",
            dataIndex: 'mean'
        },

    ];

    return (
        
            <div>
                {isLoadData && (
                    <div>
                        <Typography.Text>Vocabulary</Typography.Text>
                        <Table columns={columns} dataSource={allVocabularies} />
                    </div>
                )}
            </div>
        



    );
}

export default AllVocabulary;
