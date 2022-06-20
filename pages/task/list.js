import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import configData from '../../config.json';

const TaskList = (props) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(getTaskList, []);

    function getTaskList() {
        fetch(`${configData.SERVER_URL}/api/task/list`, {
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
            <h1>Task list:</h1>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    {data.length > 0 ? (
                        data.map((task, i) => {
                            return (
                                <div key={i}>
                                    <Link href={`/task/${task.id}`}>{task.title}</Link>
                                    <p>{task.taskCategory}</p>
                                    <p>{task.createdAt}</p>
                                    <p>{task.updatedAt}</p>
                                    <p>{task.user.username}</p>
                                </div>
                            );
                        })
                    ) : (
                        <>No available data!</>
                    )}
                </>
            )}
        </>
    );
};

export default TaskList;
