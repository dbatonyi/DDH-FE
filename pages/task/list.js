import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import configData from '../../config.json';

const TaskList = (props) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [refreshed, setRefreshed] = useState(false);
    const [sortTitle, setSortTitle] = useState(false);
    const [sortCreatedDate, setSortCreatedDate] = useState(null);
    const [sortUpdatedDate, setSortUpdatedDate] = useState(null);

    useEffect(getTaskList, [refreshed]);

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

    async function deleteTask(pid) {
        const response = await fetch(`${configData.SERVER_URL}/api/task/${pid}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            setRefreshed(true);
        } else {
            console.log('Error');
        }
    }

    function sortTitleByAbc() {
        const sortedData = data
            .sort((a, b) => {
                if (a.taskTitle < b.taskTitle) {
                    return -1;
                }
                if (a.taskTitle > b.taskTitle) {
                    return 1;
                }
                return 0;
            })
            .reverse();
        setSortTitle(!sortTitle);

        setData(sortedData);
    }

    function sortByCreatedDate() {
        if (sortCreatedDate === false) {
            const sortedData = data.slice().sort((a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt)
                    ? 1
                    : new Date(a.createdAt) < new Date(b.createdAt)
                    ? -1
                    : 0;
            });
            setData(sortedData);
        } else {
            const sortedData = data.slice().sort((a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt)
                    ? -1
                    : new Date(a.createdAt) < new Date(b.createdAt)
                    ? 1
                    : 0;
            });
            setData(sortedData);
        }

        setSortCreatedDate(!sortCreatedDate);
    }

    function sortByUpdatedDate() {
        if (sortUpdatedDate === false) {
            const sortedData = data.slice().sort((a, b) => {
                return new Date(a.updatedAt) > new Date(b.updatedAt)
                    ? 1
                    : new Date(a.updatedAt) < new Date(b.updatedAt)
                    ? -1
                    : 0;
            });
            setData(sortedData);
        } else {
            const sortedData = data.slice().sort((a, b) => {
                return new Date(a.updatedAt) > new Date(b.updatedAt)
                    ? -1
                    : new Date(a.updatedAt) < new Date(b.updatedAt)
                    ? 1
                    : 0;
            });
            setData(sortedData);
        }

        setSortUpdatedDate(!sortUpdatedDate);
    }

    return (
        <>
            {isLoading ? (
                <div className='ddh-task-list'>
                    <div className='ddh-task-list__container'>
                        <h1>Loading ...</h1>
                    </div>
                </div>
            ) : (
                <>
                    {data.length > 0 ? (
                        <div className='ddh-task-list'>
                            <div className='ddh-task-list__container'>
                                <h1>Task list:</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className='table-title'>
                                                    Title{' '}
                                                    <div
                                                        className='table-title__sort'
                                                        onClick={() => {
                                                            sortTitleByAbc();
                                                        }}>
                                                        Sort
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Category</th>
                                            <th>
                                                <div className='table-cdate'>
                                                    Created At{' '}
                                                    <div
                                                        className='table-cdate__sort'
                                                        onClick={() => {
                                                            sortByCreatedDate();
                                                        }}>
                                                        Sort
                                                    </div>
                                                </div>
                                            </th>
                                            <th>
                                                <div className='table-udate'>
                                                    Updated At{' '}
                                                    <div
                                                        className='table-udate__sort'
                                                        onClick={() => {
                                                            sortByUpdatedDate();
                                                        }}>
                                                        Sort
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Author</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((task, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <Link href={`/task/${task.id}`}>
                                                            {task.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <p>{task.taskCategory}</p>
                                                    </td>
                                                    <td>
                                                        <div className='table-date'>
                                                            <p>
                                                                {new Date(task.createdAt)
                                                                    .toISOString()
                                                                    .slice(0, 10)}
                                                            </p>
                                                            <span> - </span>
                                                            <p>
                                                                {new Date(task.createdAt)
                                                                    .toISOString()
                                                                    .slice(-13, -8)}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='table-date'>
                                                            <p>
                                                                {new Date(task.updatedAt)
                                                                    .toISOString()
                                                                    .slice(0, 10)}
                                                            </p>
                                                            <span> - </span>
                                                            <p>
                                                                {new Date(task.updatedAt)
                                                                    .toISOString()
                                                                    .slice(-13, -8)}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            {task.user.firstname},{' '}
                                                            {task.user.lastname}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <div className='table-actions'>
                                                            <Link href={`/task/edit/${task.id}`}>
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    deleteTask(task.id);
                                                                }}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className='ddh-task-list'>
                            <div className='ddh-task-list__container'>
                                <h1>Task list:</h1>
                                <p>No available data!</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default TaskList;
