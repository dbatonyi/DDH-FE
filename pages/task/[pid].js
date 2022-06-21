import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import configData from '../../config.json';

const Task = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(getTaskList, []);

    function getTaskList() {
        fetch(`${configData.SERVER_URL}/api/task/${pid}`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((content) => {
                setData(content);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <h1>This is a task:</h1>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    <Link href={`/task/edit/${pid}`}>Edit</Link>
                    <h1>{data.title}</h1>
                    <p>{data.taskShort}</p>
                    <p>{data.taskDescription}</p>
                </>
            )}
        </>
    );
};

export default Task;
