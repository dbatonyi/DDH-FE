import React, { useContext, useState, useEffect } from 'react';
import TagsInput from 'react-tagsinput';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../../config.json';
import { AuthContext } from '../../layouts/Layout';

const NewTask = (props) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

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
        const tag = formData.get('tag');

        const response = await fetch(`${configData.serverUrl}/api/task/new`, {
            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json',
                'authenticate': `Bearer ${configData.apiToken}`    
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                taskCategory: category,
                taskTags: tag,
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
                            <Select name='tag' options={tagOptions} />
                            
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
