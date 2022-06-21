import React, { useState, useEffect } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../../../config.json';

const EditTask = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const [title, setTitle] = useState();
    const [short, setShort] = useState();
    const [body, setBody] = useState();
    const [category, setCategory] = useState();
    const [tag, setTag] = useState([]);

    useEffect(getTask, []);

    useEffect(() => {
        setTitle(data.title);
        setShort(data.taskShort);
        setBody(data.taskDescription);
        setCategory(data.taskCategory);
        setTag(data.taskTags);
    }, [data]);

    function getTask() {
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

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/task/edit/${pid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                taskCategory: category,
                taskTags: tag.toString(),
                taskShort: short,
                taskDescription: body,
                updateAt: new Date()
            })
        });

        await router.push('/task/list');
    };

    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'test', label: 'Test' }
    ];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <form onSubmit={submit}>
            <h1>Edit task</h1>

            <label htmlFor='title'>Title</label>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='text'
                name='title'
                type='text'
                required
            />

            <label htmlFor='short'>Task Short</label>
            <textarea
                value={short}
                onChange={(e) => setShort(e.target.value)}
                className='text'
                name='short'
                type='textarea'
                required
            />

            <label htmlFor='body'>Task Description</label>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className='text'
                name='body'
                type='textarea'
                required
            />

            <label htmlFor='category'>Task Category</label>
            <Select
                defaultValue={{
                    label: category ? capitalizeFirstLetter(category) : '',
                    value: category
                }}
                name='category'
                options={categoryOptions}
            />

            <label htmlFor='tag'>Task Tags</label>
            <TagsInput value={tag} onChange={setTag} name='tag' placeHolder='enter tags' />

            <button type='submit'>Save</button>
        </form>
    );
};

export default EditTask;
