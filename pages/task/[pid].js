import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../../layouts/Layout';
import configData from '../../config.json';

const Task = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const { setStatusMessage, userInfo } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const userRole = userInfo.role;

    useEffect(() => {
        if (!router.isReady) return;

        getTaskList();
    }, [router.isReady]);

    function getTaskList() {
        fetch(`${configData.serverUrl}/api/task/${pid}`, {
            headers:{ 
                'Content-Type': 'application/json',
                'authenticate': `Bearer ${configData.apiToken}`    
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((content) => {
                setData(content);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }

    function openPopup(id) {
        setSelectedId(id);
        setPopupOpen(true);
    }

    function closePopup() {
        setPopupOpen(false);
        setSelectedId(null);
    }

    async function deleteTask() {
        const response = await fetch(`${configData.serverUrl}/api/task/${selectedId}`, {
            method: 'DELETE',
            headers:{ 
                'Content-Type': 'application/json',
                'authenticate': `Bearer ${configData.apiToken}`    
            },
            credentials: 'include'
        });
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage(data.message);
            router.push('/task/list');
        } else {
            console.log('Error');
        }
        setPopupOpen(false);
        setSelectedId(null);
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
                            <h2>Tag:</h2>
                            <ul>
                                <li key={data.taskTags}>{data.taskTags}</li>
                            </ul>
                        </div>
                        {!userRole.includes('User') ? (
                            <div className='ddh-task-single__container--btn'>
                                <Link href={`/task/edit/${pid}`}>Edit</Link>
                                <button
                                    onClick={() => {
                                        openPopup(data.uuid);
                                    }}>
                                    Delete
                                </button>
                            </div>
                        ) : null}
                        {popupOpen && (
                            <div className='popup-container'>
                                <div className='popup-container-box'>
                                    <h2>Delete Task</h2>
                                    <p>Are you sure you want to delete this task?</p>
                                    <div className='popup-actions'>
                                        <button
                                            className='popup-container-box__delete'
                                            onClick={() => {
                                                deleteTask();
                                            }}>
                                            Yes
                                        </button>
                                        <button
                                            className='popup-container-box__close'
                                            onClick={() => {
                                                closePopup();
                                            }}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Task;
