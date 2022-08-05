import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../layouts/Layout';
import configData from '../../config.json';
import { DataGrid } from '@mui/x-data-grid';
var moment = require('moment');

const TaskList = (props) => {
    const router = useRouter();
    const { setStatusMessage } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [refreshed, setRefreshed] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

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
            setRefreshed(true);
        } else {
            console.log('Error');
        }
        setPopupOpen(false);
        setSelectedId(null);
    }

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 240,
            renderCell: (params) => (
                <div className='table-title'>
                    <Link href={`/task/${params.id}`}>{params.value}</Link>
                </div>
            )
        },
        { field: 'taskCategory', headerName: 'Category', width: 160 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 160,
            valueFormatter: (params) => moment(params?.value).format('YYYY/MM/DD - hh:mm')
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 160,
            valueFormatter: (params) => moment(params?.value).format('YYYY/MM/DD - hh:mm')
        },
        {
            field: 'user',
            headerName: 'Author',
            width: 150,
            valueFormatter: (params) => `${params?.value?.firstname}, ${params?.value?.lastname}`
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <div className='table-actions'>
                    <Link href={`/task/edit/${params.id}`}>Edit</Link>
                    <button
                        onClick={() => {
                            openPopup(params.id);
                        }}>
                        Delete
                    </button>
                </div>
            )
        }
    ];

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
                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    disableSelectionOnClick
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
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
