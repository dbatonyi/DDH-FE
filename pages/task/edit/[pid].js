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
    const [selectedTagOption, setSelectedTagOption] = useState([]);
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

                if (getData.taskCategory) {
                    setSelectedOption({ value: getData.taskCategory, label: getData.taskCategory });
                }

                if (getData.taskTags) {
                    setSelectedTagOption({ value: getData.taskTags, label: getData.taskTags});
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
            headers:{ 
                'Content-Type': 'application/json',
                'authenticate': `Bearer ${configData.apiToken}`    
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                taskCategory: selectedOption.value,
                taskTags: selectedTagOption.value,
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
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Backend', label: 'Backend' }
    ];

    const tagOptions = [
        { value: 'Install Drupal', label: 'Install Drupal'},
        { value: 'Drupal update', label: 'Drupal update'},
        { value: 'External server', label: 'External server'},
        { value: 'Drupal 7', label: 'Drupal 7'},
        { value: 'Drupal 8', label: 'Drupal 8'},
        { value: 'Migration', label: 'Migration'},
        { value: 'Blog', label: 'Blog'},
        { value: 'Webshop', label: 'Webshop'},
        { value: 'Payment method', label: 'Payment method'},
        { value: 'Currency', label: 'Currency'},
        { value: 'Custom webhop', label: 'Custom webhop'},
        { value: 'Custumer registration', label: 'Custumer registration'},
        { value: 'Product variation', label: 'Product variation'},
        { value: 'Invoice system', label: 'Invoice system'},
        { value: 'Stock management', label: 'Stock management'},
        { value: 'Stock update', label: 'Stock update'},
        { value: 'Additional currencies', label: 'Additional currencies'},
        { value: 'Additional VAT', label: 'Additional VAT'},
        { value: 'Coupon system', label: 'Coupon system'},
        { value: 'Product filters', label: 'Product filters'},
        { value: 'Product pages', label: 'Product pages'},
        { value: 'Layout elements', label: 'Layout elements'},
        { value: 'Flexible layout', label: 'Flexible layout'},
        { value: 'Unique design', label: 'Unique design'},
        { value: 'Email template', label: 'Email template'},
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
                                    <Select
                                        onChange={setSelectedTagOption}
                                        value={selectedTagOption}
                                        name='category'
                                        options={tagOptions}
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
