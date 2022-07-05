import React, { useState, useEffect } from 'react';
import TagsInput from 'react-tagsinput';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../../../config.json';

const EditTask = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState();
    const [short, setShort] = useState();
    const [body, setBody] = useState();
    const [tag, setTag] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        let isFetched = false;

        const getTask = async () => {
            const fetchTask = await fetch(`${configData.SERVER_URL}/api/task/${pid}`, {
                credentials: 'include'
            });
            const getData = await fetchTask.json();

            if (!isFetched) {
                setTitle(getData.title);
                setShort(getData.taskShort);
                setBody(getData.taskDescription);

                switch (getData.taskCategory) {
                    case 'backend':
                        setSelectedOption({ value: 'backend', label: 'Backend' });
                        break;
                    case 'frontend':
                        setSelectedOption({ value: 'frontend', label: 'Frontend' });
                        break;
                    default:
                        console.log('taskCategory error');
                }

                if (getData.taskTags) {
                    switch (getData.taskTags.includes(',')) {
                        case true:
                            setTag(getData.taskTags.split(','));
                            break;
                        case false:
                            setTag([getData.taskTags]);
                            break;
                        default:
                            console.log('taskTags error');
                    }
                }

                setIsLoading(false);
            }
        };

        getTask().catch((err) => console.log(err));

        return () => (isFetched = true);
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/task/edit/${pid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                taskCategory: selectedOption.value,
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
        { value: 'backend', label: 'Backend' }
    ];

    return (
        <>
            {isLoading ? (
                <>Still loading</>
            ) : (
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
                        onChange={setSelectedOption}
                        value={selectedOption}
                        name='category'
                        options={categoryOptions}
                    />

                    <label htmlFor='tag'>Task Tags</label>
                    <TagsInput value={tag} onChange={setTag} name='tag' placeHolder='enter tags' />

                    <button type='submit'>Save</button>
                </form>
            )}
        </>
    );
};

export default EditTask;
