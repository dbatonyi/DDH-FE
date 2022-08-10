import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../../layouts/Layout';
import configData from '../../config.json';

const Task = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const { setStatusMessage } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        getTaskList();
    }, [router.isReady]);

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

    function openPopup(id) {
        setSelectedId(id);
        setPopupOpen(true);
    }

    function closePopup() {
        setPopupOpen(false);
        setSelectedId(null);
    }

    async function deleteTask() {
        const response = await fetch(`${configData.SERVER_URL}/api/task/${selectedId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);

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
                            <h2>Tags:</h2>
                            <ul>
                                {tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='ddh-task-single__container--btn'>
                            <Link href={`/task/edit/${pid}`}>Edit</Link>
                            <button
                                onClick={() => {
                                    openPopup(pid);
                                }}>
                                Delete
                            </button>
                        </div>
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
