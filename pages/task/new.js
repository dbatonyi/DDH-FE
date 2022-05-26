import React, { useContext, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../../config.json';
import { AuthContext } from '../../layouts/Layout';

const NewTask = (props) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const [tag, setTag] = useState([]);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const short = formData.get('short');
        const body = formData.get('body');
        const category = formData.get('category');

        await fetch(`${configData.SERVER_URL}/api/task/new`, {
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

        await router.push('/');
    };

    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'test', label: 'Test' }
    ];

    return (
        <form onSubmit={submit}>
            <h1>Create new task</h1>

            <label htmlFor='title'>Title</label>
            <input className='text' name='title' type='text' required />

            <label htmlFor='short'>Task Short</label>
            <textarea className='text' name='short' type='textarea' required />

            <label htmlFor='body'>Task Description</label>
            <textarea className='text' name='body' type='textarea' required />

            <label htmlFor='category'>Task Category</label>
            <Select name='category' options={categoryOptions} />

            <label htmlFor='tag'>Task Tags</label>
            <TagsInput value={tag} onChange={setTag} name='tag' placeHolder='enter tags' />

            <button type='submit'>Save</button>
        </form>
    );
};

export default NewTask;
