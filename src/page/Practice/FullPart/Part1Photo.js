import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getpracticepartId, getpractice } from "../../../Api/Service/sidebar.service";

function Part1Photo() {
    const [allPhoto, setAllPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    let arrayPractices = []
    useEffect(() => {
        // setLoading(true);
        getpractice(`practices`)
            .then((res) => {
                const practiceIds = res.data.data.map((item) => item.id);
                return Promise.all(
                    practiceIds.slice(0, 4).map((practiceId) =>
                        getpracticepartId(`practiceParts?practiceId=${practiceId}`)
                            .then((res2) => res2.data.data)
                            .catch((err) => {
                                console.error("Error fetching data:", err);
                                return [];
                            })
                    )
                );
            })
            .then((subPracticesData) => {
                const newSubPractices = subPracticesData.flat().map((item, index) => ({
                    ...item,
                    STT: index + 1
                }));
                setAllPhoto(newSubPractices);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
    }, [arrayPractices]);
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
    ];

    return <Table columns={columns} dataSource={allPhoto} loading={loading} />;
}

export default Part1Photo;
