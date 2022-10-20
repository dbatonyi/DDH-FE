import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import { AuthContext } from '../../../layouts/Layout';
import configData from '../../../config.json';

const EditTask = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    const { setStatusMessage, userInfo } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState();
    const [short, setShort] = useState();
    const [body, setBody] = useState();
    const [tag, setTag] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const userRole = userInfo.role;

    useEffect(() => {
        if (userRole.includes('User')) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        let isFetched = false;

        const getTask = async () => {
            const fetchTask = await fetch(`${configData.serverUrl}/api/task/${pid}`, {
                headers:{ 
                    'Content-Type': 'application/json',
                    'authenticate': `Bearer ${configData.apiToken}`    
                },
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

        const response = await fetch(`${configData.serverUrl}/api/task/edit/${pid}`, {
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
        const data = await response.json();
        console.log(data);
        setStatusMessage(data.message);

        await router.push('/task/list');
    };

    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' }
    ];

    return (
        <>
            {isLoading ? (
                <div className='ddh-task'>
                    <div className='ddh-task__container'>
                        <h1>Still loading</h1>
                    </div>
                </div>
            ) : (
                <div className='ddh-task'>
                    <div className='ddh-task__container'>
                        {!userRole.includes('User') ? (
                            <>
                                <h1>Edit task</h1>
                                <form onSubmit={submit}>
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
                                        className='text-desc'
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
                                    <TagsInput
                                        value={tag}
                                        onChange={setTag}
                                        name='tag'
                                        placeHolder='enter tags'
                                    />
                                    <div className='form-actions'>
                                        <Link href='/task/list'>Cancel</Link>
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
            )}
        </>
    );
};

export default EditTask;
