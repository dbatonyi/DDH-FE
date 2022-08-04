import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import configData from '../../config.json';

const Task = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(getTaskList, []);

    function getTaskList() {
        fetch(`${configData.SERVER_URL}/api/task/${pid}`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((content) => {
                setData(content);

                if (content.taskTags.includes(',')) {
                    const getAllTags = content.taskTags.split(',');
                    setTags(getAllTags);
                } else {
                    setTags([content.taskTags]);
                }

                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }

    async function deleteTask() {
        const response = await fetch(`${configData.SERVER_URL}/api/task/${pid}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            router.push('/task/list');
        } else {
            console.log('Error');
        }
    }

    return (
        <>
            {isLoading ? (
                <div className='ddh-task-single'>
                    <div className='ddh-task-single__container'>
                        <h1>Loading...</h1>
                    </div>
                </div>
            ) : (
                <div className='ddh-task-single'>
                    <div className='ddh-task-single__container'>
                        <div className='ddh-task-single__container--text'>
                            <h1>{data.title}</h1>
                            <p>{data.taskShort}</p>
                            <p>{data.taskDescription}</p>
                        </div>
                        <div className='ddh-task-single__container--tags'>
                            <h2>Tags:</h2>
                            <ul>
                                {tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='ddh-task-single__container--btn'>
                            <Link href={`/task/edit/${pid}`}>Edit</Link>
                            <button onClick={deleteTask}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Task;
