import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useRouter } from 'next/router';
import { objectFromEntries } from '../helpers/object';
import Select from 'react-select';
import configData from '../config.json';
import { AuthContext } from '../layouts/Layout';

const TaskManagerForm = (props) => {
    const ReactSelectAdapter = ({ input, ...rest }) => <Select {...input} {...rest} />;
    const CheckboxAdapter = ({ input, ...rest }) => <input type='checkbox' {...input} {...rest} />;

    const router = useRouter();
    const authContext = useContext(AuthContext);

    const [formState, setFormState] = useState({});
    const formRef = new useRef(null);

    // Form useEffects

    // Select-list options

    const dUpdateOptions = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
    ];

    const ourServerOptions = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
    ];

    const dVersionOptions = [
        { value: 'd7-latest', label: 'Drupal 7 -> Drupal latest' },
        { value: 'd8-latest', label: 'Drupal 8 -> Drupal latest' }
    ];

    const packagesOptions = [
        { value: 'basic', label: 'Basic' },
        { value: 'flexi', label: 'Flexi' },
        { value: 'custom', label: 'Custom' }
    ];

    const paymentMethodOptions = [
        { value: 'paypal', label: 'PayPal' },
        { value: 'barion', label: 'Barion' },
        { value: 'other', label: 'Other' }
    ];

    const currencyOptions = [
        { value: 'huf', label: 'Forint' },
        { value: 'usd', label: 'Dollar' },
        { value: 'eur', label: 'Euro' },
        { value: 'other', label: 'Other' }
    ];

    // Form submit

    function updateFromState() {
        const formData = new FormData(formRef.current);
        setFormState(objectFromEntries([...formData.entries()]));
    }

    const newSubmit = async (values) => {
        console.log(values);

        const response = await fetch(`${configData.SERVER_URL}/api/tmf-form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ values })
        });
        const data = await response.json();
        authContext.setStatusMessage(data.message);

        await router.push('/dashboard');
    };
    return (
        <div className='ddh-tmf'>
            <div className='ddh-tmf__container'>
                <h1>Create Trello task</h1>
                <Form
                    onChange={updateFromState}
                    onSubmit={newSubmit}
                    render={({ handleSubmit, values }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={
                                (values.dUpdate && values.dUpdate.value === true) ||
                                values.packages?.value
                                    ? 'scrollable'
                                    : ''
                            }>
                            <pre>{JSON.stringify(values, {}, 4)}</pre>
                            <label htmlFor='title'>Task title</label>
                            <Field
                                component='input'
                                className='text'
                                name='title'
                                type='text'
                                required
                            />
                            <label htmlFor='devUrl'>Dev-site url</label>
                            <Field
                                component='input'
                                className='text'
                                name='devUrl'
                                type='text'
                                required
                            />
                            <label htmlFor='devSsh'>Dev-site SSH</label>
                            <Field
                                component='textarea'
                                className='text'
                                name='devSsh'
                                type='textarea'
                            />
                            <label htmlFor='dUpdate'>Drupal update</label>
                            <Field
                                name='dUpdate'
                                options={dUpdateOptions}
                                component={ReactSelectAdapter}
                            />
                            {values.dUpdate && values.dUpdate?.value && (
                                <>
                                    <label htmlFor='ourServer'>Is it on our server?</label>
                                    <Field
                                        name='ourServer'
                                        options={ourServerOptions}
                                        component={ReactSelectAdapter}
                                    />

                                    {values.ourServer && values.ourServer.value === false && (
                                        <>
                                            <label htmlFor='oldUrl'>Old-site url</label>
                                            <Field
                                                component='input'
                                                className='text'
                                                name='oldUrl'
                                                type='text'
                                            />
                                        </>
                                    )}

                                    <label htmlFor='dVersion'>From what version?</label>
                                    <Field
                                        name='dVersion'
                                        options={dVersionOptions}
                                        component={ReactSelectAdapter}
                                    />
                                    <label>
                                        <Field name={'migration'} component={CheckboxAdapter} />
                                        Content migration
                                    </label>
                                </>
                            )}
                            <label htmlFor='packages'>Packages *Company specific*</label>
                            <Field
                                name='packages'
                                options={packagesOptions}
                                component={ReactSelectAdapter}
                            />
                            {values.packages && (
                                <div className='form-packages-container'>
                                    <h2>Customize your package</h2>
                                    <label>
                                        <Field name={'moreLanguage'} component={CheckboxAdapter} />
                                        More Language
                                    </label>
                                    {values.moreLanguage && (
                                        <>
                                            <label htmlFor='otherLanguage'>Other Languages</label>
                                            <Field
                                                component='textarea'
                                                className='text'
                                                name='otherLanguage'
                                                type='textarea'
                                            />
                                        </>
                                    )}
                                    <label>
                                        <Field name={'blog'} component={CheckboxAdapter} />
                                        Blog
                                    </label>
                                    <label>
                                        <Field name={'webshop'} component={CheckboxAdapter} />
                                        Webshop
                                    </label>

                                    {values.webshop && (
                                        <>
                                            <label htmlFor='paymentMethod'>Payment method</label>
                                            <Field
                                                name='paymentMethod'
                                                options={paymentMethodOptions}
                                                component={ReactSelectAdapter}
                                            />

                                            {values.paymentMethod &&
                                                values.paymentMethod.value === 'other' && (
                                                    <>
                                                        <label htmlFor='paymentMethodOther'>
                                                            Other payment method
                                                        </label>
                                                        <Field
                                                            component='input'
                                                            className='text'
                                                            name='paymentMethodOther'
                                                            type='text'
                                                        />
                                                    </>
                                                )}

                                            <label htmlFor='currency'>Currency</label>
                                            <Field
                                                name='currency'
                                                options={currencyOptions}
                                                component={ReactSelectAdapter}
                                            />

                                            {values.currency && values.currency.value === 'other' && (
                                                <>
                                                    <label htmlFor='currencyOther'>
                                                        Other currency
                                                    </label>
                                                    <Field
                                                        component='input'
                                                        className='text'
                                                        name='currencyOther'
                                                        type='text'
                                                    />
                                                </>
                                            )}

                                            <label>
                                                <Field
                                                    name={'customWebshop'}
                                                    component={CheckboxAdapter}
                                                />
                                                Custom Webshop
                                            </label>

                                            {values.customWebshop && (
                                                <>
                                                    <label>
                                                        <Field
                                                            name={'customerRegistration'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Customer registration
                                                    </label>

                                                    <label>
                                                        <Field
                                                            name={'uniqueProductVariation'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Unique product variations
                                                    </label>

                                                    {values.uniqueProductVariation && (
                                                        <>
                                                            <label htmlFor='upvAdditional'>
                                                                Additional product variations
                                                            </label>
                                                            <Field
                                                                component='textarea'
                                                                className='text'
                                                                name='upvAdditional'
                                                                type='textarea'
                                                            />
                                                        </>
                                                    )}

                                                    <label>
                                                        <Field
                                                            name={'invoiceSystem'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Invoice system integration
                                                    </label>

                                                    <label>
                                                        <Field
                                                            name={'stockManagement'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Automatic stock management
                                                    </label>

                                                    <label>
                                                        <Field
                                                            name={'stockUpdate'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Stock updates via importing from
                                                        spreadsheets
                                                    </label>

                                                    <label>
                                                        <Field
                                                            name={'additionalCurrencies'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Additional currencies
                                                    </label>

                                                    {values.additionalCurrencies && (
                                                        <>
                                                            <label htmlFor='additionalCurrenciesOther'>
                                                                Currency list
                                                            </label>
                                                            <Field
                                                                component='textarea'
                                                                className='text'
                                                                name='additionalCurrenciesOther'
                                                                type='textarea'
                                                            />
                                                        </>
                                                    )}

                                                    <label>
                                                        <Field
                                                            name={'additionalVat'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Additional VAT rates
                                                    </label>

                                                    {values.additionalVat && (
                                                        <>
                                                            <label htmlFor='additionalVatOther'>
                                                                VAT rates list
                                                            </label>
                                                            <Field
                                                                component='textarea'
                                                                className='text'
                                                                name='additionalVatOther'
                                                                type='textarea'
                                                            />
                                                        </>
                                                    )}

                                                    <label>
                                                        <Field
                                                            name={'couponSystem'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Coupon system implementation
                                                    </label>

                                                    <label>
                                                        <Field
                                                            name={'productFilters'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Additional product filters
                                                    </label>

                                                    {values.productFilters && (
                                                        <>
                                                            <label htmlFor='additionalFilters'>
                                                                Additional filters list
                                                            </label>
                                                            <Field
                                                                component='textarea'
                                                                className='text'
                                                                name='additionalFilters'
                                                                type='textarea'
                                                            />
                                                        </>
                                                    )}

                                                    <label>
                                                        <Field
                                                            name={'productPages'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Unique product pages
                                                    </label>

                                                    <label htmlFor='webshopFeatures'>
                                                        Unique Webshop Features
                                                    </label>
                                                    <Field
                                                        component='textarea'
                                                        className='text'
                                                        name='webshopFeatures'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}

                                    {values.packages.value === 'flexi' ||
                                    values.packages.value === 'custom' ? (
                                        <>
                                            <label>
                                                <Field
                                                    name={'extraElements'}
                                                    component={CheckboxAdapter}
                                                />
                                                Extra layout elements
                                            </label>

                                            {values.extraElements && (
                                                <>
                                                    <label htmlFor='extraElementsOther'>
                                                        New elements
                                                    </label>
                                                    <Field
                                                        component='textarea'
                                                        className='text'
                                                        name='extraElementsOther'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}
                                        </>
                                    ) : null}

                                    {values.packages.value === 'custom' ? (
                                        <>
                                            <label>
                                                <Field
                                                    name={'flexibleLayout'}
                                                    component={CheckboxAdapter}
                                                />
                                                Flexible layout
                                            </label>

                                            <label>
                                                <Field
                                                    name={'uniqueDesign'}
                                                    component={CheckboxAdapter}
                                                />
                                                Unique design
                                            </label>

                                            {values.uniqueDesign && (
                                                <>
                                                    <label htmlFor='designUrl'>Design url</label>
                                                    <Field
                                                        component='input'
                                                        className='text'
                                                        name='designUrl'
                                                        type='text'
                                                    />

                                                    <label>
                                                        <Field
                                                            name={'uniqueEmail'}
                                                            component={CheckboxAdapter}
                                                        />
                                                        Unique email templates
                                                    </label>
                                                </>
                                            )}

                                            <label htmlFor='extraFeatures'>Extra features</label>
                                            <Field
                                                component='textarea'
                                                className='text'
                                                name='extraFeatures'
                                                type='textarea'
                                            />
                                        </>
                                    ) : null}
                                </div>
                            )}
                            <div className='submit-btn'>
                                <button type='submit'>Send</button>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    );
};

export default TaskManagerForm;
