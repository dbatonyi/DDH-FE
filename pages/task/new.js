import React, { useContext, useState, useEffect } from 'react';
import TagsInput from 'react-tagsinput';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../../config.json';
import { AuthContext } from '../../layouts/Layout';

const NewTask = (props) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const [tag, setTag] = useState([]);

    const userRole = authContext.userInfo.role;

    useEffect(() => {
        if (userRole.includes('User')) {
            router.push('/');
        }
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const short = formData.get('short');
        const body = formData.get('body');
        const category = formData.get('category');

        const response = await fetch(`${configData.serverUrl}/api/task/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                taskCategory: category,
                taskTags: tag.toString(),
                taskShort: short,
                taskDescription: body,
                userUuid: authContext.userInfo.uuid
            })
        });
        const data = await response.json();
        authContext.setStatusMessage(data.message);
        await router.push('/task/list');
    };

    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' }
    ];

    return (
        <div className='ddh-task'>
            <div className='ddh-task__container'>
                {!userRole.includes('User') ? (
                    <>
                        <h1>Create new task</h1>
                        <form onSubmit={submit}>
                            <label htmlFor='title'>Title</label>
                            <input className='text' name='title' type='text' required />

                            <label htmlFor='short'>Task Short</label>
                            <textarea className='text' name='short' type='textarea' required />

                            <label htmlFor='body'>Task Description</label>
                            <textarea className='text-desc' name='body' type='textarea' required />

                            <label htmlFor='category'>Task Category</label>
                            <Select name='category' options={categoryOptions} />

                            <label htmlFor='tag'>Task Tags</label>
                            <TagsInput
                                value={tag}
                                onChange={setTag}
                                name='tag'
                                placeHolder='enter tags'
                            />
                            <div className='submit-btn'>
                                <button className='btn' type='submit'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <h1>Permission denied!</h1>
                )}
            </div>
        </div>
    );
};

export default NewTask;
