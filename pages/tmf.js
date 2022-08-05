import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import configData from '../config.json';
import { AuthContext } from '../layouts/Layout';

const TaskManagerForm = (props) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    // Form states
    const [dUpdate, setDUpdate] = useState(null);
    const [ourServer, setOurServer] = useState(null);
    const [dVersion, setDVersion] = useState(null);
    const [packages, setPackages] = useState(null);
    const [blogChecked, setBlogChecked] = useState(false);
    const [webshopChecked, setWebshopChecked] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [customWebshopChecked, setCustomWebshopChecked] = useState(false);
    const [customerRegistrationChecked, setCustomerRegistrationChecked] = useState(false);
    const [uniqueProductVariationChecked, setUniqueProductVariationChecked] = useState(false);
    const [invoiceSystemChecked, setInvoiceSystemChecked] = useState(false);
    const [stockManagementChecked, setStockManagementChecked] = useState(false);
    const [stockUpdateChecked, setStockUpdateChecked] = useState(false);
    const [additionalCurrenciesChecked, setAdditionalCurrenciesChecked] = useState(false);
    const [additionalVatChecked, setAdditionalVatChecked] = useState(false);
    const [couponSystemChecked, setCouponSystemChecked] = useState(false);
    const [productFiltersChecked, setProductFiltersChecked] = useState(false);
    const [productPagesChecked, setProductPagesChecked] = useState(false);
    const [extraElementsChecked, setExtraElementsChecked] = useState(false);
    const [flexibleLayoutChecked, setFlexibleLayoutChecked] = useState(false);
    const [uniqueDesignChecked, setUniqueDesignChecked] = useState(false);
    const [uniqueEmailChecked, setUniqueEmailChecked] = useState(false);

    // Form useEffects

    // Reset form elements
    useEffect(() => {
        setBlogChecked(false);
        setWebshopChecked(false);
        setPaymentMethod(null);
        setCurrency(null);
        setCustomWebshopChecked(false);
        setCustomerRegistrationChecked(false);
        setUniqueProductVariationChecked(false);
        setInvoiceSystemChecked(false);
        setStockManagementChecked(false);
        setStockUpdateChecked(false);
        setAdditionalCurrenciesChecked(false);
        setAdditionalVatChecked(false);
        setCouponSystemChecked(false);
        setProductFiltersChecked(false);
        setProductPagesChecked(false);
        setExtraElementsChecked(false);
        setFlexibleLayoutChecked(false);
        setUniqueDesignChecked(false);
        setUniqueEmailChecked(false);

        const getPackagesContainer = document.querySelector('.form-packages-container');

        if (getPackagesContainer) {
            const getAllInputs = getPackagesContainer.querySelectorAll('input');
            const getAllTextareas = getPackagesContainer.querySelectorAll('textarea');

            getAllInputs.forEach((input) => {
                input.value = '';
            });

            getAllTextareas.forEach((textarea) => {
                textarea.value = '';
            });
        }
    }, [packages]);

    // Select-list options

    const dUpdateOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ];

    const ourServerOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
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

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const devUrl = formData.get('dev-url');
        const devSsh = formData.get('dev-ssh');
        const dUpdate = formData.get('d-update');
        const ourServer = formData.get('our-server');
        const oldUrl = formData.get('old-url');
        const oldSsh = formData.get('old-ssh');
        const dVersion = formData.get('d-version');
        const packages = formData.get('packages');
        const blog = blogChecked ? 'yes' : 'no';
        const webshop = webshopChecked ? 'yes' : 'no';
        const paymentMethod = formData.get('payment-method');
        const paymentMethodOther = formData.get('payment-method-other');
        const currency = formData.get('currency');
        const currencyOther = formData.get('currency-other');
        const customWebshop = customWebshopChecked ? 'yes' : 'no';
        const customerRegistration = customerRegistrationChecked ? 'yes' : 'no';
        const uniqueProductVariation = uniqueProductVariationChecked ? 'yes' : 'no';
        const upvAdditional = formData.get('upv-additional');
        const invoiceSystem = invoiceSystemChecked ? 'yes' : 'no';
        const stockManagement = stockManagementChecked ? 'yes' : 'no';
        const stockUpdate = stockUpdateChecked ? 'yes' : 'no';
        const additionalCurrencies = additionalCurrenciesChecked ? 'yes' : 'no';
        const additionalCurrenciesOther = formData.get('additional-currencies');
        const additionalVat = additionalVatChecked ? 'yes' : 'no';
        const additionalVatOther = formData.get('additional-vat');
        const couponSystem = couponSystemChecked ? 'yes' : 'no';
        const productFilters = productFiltersChecked ? 'yes' : 'no';
        const additonalFilters = formData.get('additional-filters');
        const productPages = productPagesChecked ? 'yes' : 'no';
        const additionalPages = formData.get('additional-pages');
        const webshopFeatures = formData.get('webshop-features');
        const extraElements = extraElementsChecked ? 'yes' : 'no';
        const extraElementsOther = formData.get('extra-elements');
        const flexibleLayout = flexibleLayoutChecked ? 'yes' : 'no';
        const uniqueDesign = uniqueDesignChecked ? 'yes' : 'no';
        const uniqueDesignUrl = formData.get('unique-design-url');
        const uniqueEmail = uniqueEmailChecked ? 'yes' : 'no';
        const extraFeatures = formData.get('extra-features');

        const response = await fetch(`${configData.SERVER_URL}/api/tmf-form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title,
                devUrl,
                devSsh,
                dUpdate,
                ourServer,
                oldUrl,
                oldSsh,
                dVersion,
                packages,
                blog,
                webshop,
                paymentMethod,
                paymentMethodOther,
                currency,
                currencyOther,
                customWebshop,
                customerRegistration,
                uniqueProductVariation,
                upvAdditional,
                invoiceSystem,
                stockManagement,
                stockUpdate,
                additionalCurrencies,
                additionalCurrenciesOther,
                additionalVat,
                additionalVatOther,
                couponSystem,
                productFilters,
                additonalFilters,
                productPages,
                additionalPages,
                webshopFeatures,
                extraElements,
                extraElementsOther,
                flexibleLayout,
                uniqueDesign,
                uniqueDesignUrl,
                uniqueEmail,
                extraFeatures
            })
        });
        const data = await response.json();
        authContext.setStatusMessage(data.message);

        await router.push('/dashboard');
    };

    return (
        <div className='ddh-tmf'>
            <div className='ddh-tmf__container'>
                <h1>Create Meistertask task</h1>
                <form
                    onSubmit={submit}
                    className={
                        (dUpdate && dUpdate.value === 'yes') || packages ? 'scrollable' : ''
                    }>
                    <label htmlFor='title'>Task title</label>
                    <input className='text' name='title' type='text' required />

                    <label htmlFor='dev-url'>Dev-site url</label>
                    <input className='text' name='dev-url' type='text' required />

                    <label htmlFor='dev-ssh'>Dev-site SSH</label>
                    <textarea className='text' name='dev-ssh' type='textarea' />

                    <label htmlFor='d-update'>Drupal update</label>
                    <Select name='d-update' options={dUpdateOptions} onChange={setDUpdate} />

                    {dUpdate && dUpdate.value === 'yes' && (
                        <>
                            <label htmlFor='our-server'>Is it on our server?</label>
                            <Select
                                name='our-server'
                                options={ourServerOptions}
                                onChange={setOurServer}
                            />

                            {ourServer && ourServer.value === 'no' && (
                                <>
                                    <label htmlFor='old-url'>Old-site url</label>
                                    <input className='text' name='old-url' type='text' />

                                    <label htmlFor='old-ssh'>Old-site SSH</label>
                                    <textarea className='text' name='old-ssh' type='textarea' />
                                </>
                            )}

                            <label htmlFor='d-version'>From what version?</label>
                            <Select
                                name='d-version'
                                options={dVersionOptions}
                                onChange={setDVersion}
                            />
                        </>
                    )}

                    <label htmlFor='packages'>Packages *Company specific*</label>
                    <Select name='packages' options={packagesOptions} onChange={setPackages} />

                    {packages && (
                        <div className='form-packages-container'>
                            <h2>Customize your package</h2>
                            <label>
                                <input
                                    type='checkbox'
                                    checked={blogChecked}
                                    onChange={() => setBlogChecked(!blogChecked)}
                                />
                                Blog
                            </label>
                            <label>
                                <input
                                    type='checkbox'
                                    checked={webshopChecked}
                                    onChange={() => setWebshopChecked(!webshopChecked)}
                                />
                                Webshop
                            </label>

                            {webshopChecked && (
                                <>
                                    <label htmlFor='payment-method'>Payment method</label>
                                    <Select
                                        name='payment-method'
                                        options={paymentMethodOptions}
                                        onChange={setPaymentMethod}
                                    />

                                    {paymentMethod && paymentMethod.value === 'other' && (
                                        <>
                                            <label htmlFor='payment-method-other'>
                                                Other payment method
                                            </label>
                                            <input
                                                className='text'
                                                name='payment-method-other'
                                                type='text'
                                            />
                                        </>
                                    )}

                                    <label htmlFor='currency'>Currency</label>
                                    <Select
                                        name='currency'
                                        options={currencyOptions}
                                        onChange={setCurrency}
                                    />

                                    {currency && currency.value === 'other' && (
                                        <>
                                            <label htmlFor='currency-other'>Other currency</label>
                                            <input
                                                className='text'
                                                name='currency-other'
                                                type='text'
                                            />
                                        </>
                                    )}

                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={customWebshopChecked}
                                            onChange={() =>
                                                setCustomWebshopChecked(!customWebshopChecked)
                                            }
                                        />
                                        Custom Webshop
                                    </label>

                                    {customWebshopChecked && (
                                        <>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={customerRegistrationChecked}
                                                    onChange={() =>
                                                        setCustomerRegistrationChecked(
                                                            !customerRegistrationChecked
                                                        )
                                                    }
                                                />
                                                Customer registration
                                            </label>

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={uniqueProductVariationChecked}
                                                    onChange={() =>
                                                        setUniqueProductVariationChecked(
                                                            !uniqueProductVariationChecked
                                                        )
                                                    }
                                                />
                                                Unique product variations
                                            </label>

                                            {uniqueProductVariationChecked && (
                                                <>
                                                    <label htmlFor='upv-additional'>
                                                        Additional product variations
                                                    </label>
                                                    <textarea
                                                        className='text'
                                                        name='upv-additional'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={invoiceSystemChecked}
                                                    onChange={() =>
                                                        setInvoiceSystemChecked(
                                                            !invoiceSystemChecked
                                                        )
                                                    }
                                                />
                                                Invoice system integration
                                            </label>

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={stockManagementChecked}
                                                    onChange={() =>
                                                        setStockManagementChecked(
                                                            !stockManagementChecked
                                                        )
                                                    }
                                                />
                                                Automatic stock management
                                            </label>

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={stockUpdateChecked}
                                                    onChange={() =>
                                                        setStockUpdateChecked(!stockUpdateChecked)
                                                    }
                                                />
                                                Stock updates via importing from spreadsheets
                                            </label>

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={additionalCurrenciesChecked}
                                                    onChange={() =>
                                                        setAdditionalCurrenciesChecked(
                                                            !additionalCurrenciesChecked
                                                        )
                                                    }
                                                />
                                                Additional currencies
                                            </label>

                                            {additionalCurrenciesChecked && (
                                                <>
                                                    <label htmlFor='additional-currencies'>
                                                        Currency list
                                                    </label>
                                                    <textarea
                                                        className='text'
                                                        name='additional-currencies'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={additionalVatChecked}
                                                    onChange={() =>
                                                        setAdditionalVatChecked(
                                                            !additionalVatChecked
                                                        )
                                                    }
                                                />
                                                Additional VAT rates
                                            </label>

                                            {additionalVatChecked && (
                                                <>
                                                    <label htmlFor='additional-vat'>
                                                        VAT rates list
                                                    </label>
                                                    <textarea
                                                        className='text'
                                                        name='additional-vat'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={couponSystemChecked}
                                                    onChange={() =>
                                                        setCouponSystemChecked(!couponSystemChecked)
                                                    }
                                                />
                                                Coupon system implementation
                                            </label>

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={productFiltersChecked}
                                                    onChange={() =>
                                                        setProductFiltersChecked(
                                                            !productFiltersChecked
                                                        )
                                                    }
                                                />
                                                Additional product filters
                                            </label>

                                            {productFiltersChecked && (
                                                <>
                                                    <label htmlFor='additional-filters'>
                                                        Additional filters list
                                                    </label>
                                                    <textarea
                                                        className='text'
                                                        name='additional-filters'
                                                        type='textarea'
                                                    />
                                                </>
                                            )}

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={productPagesChecked}
                                                    onChange={() =>
                                                        setProductPagesChecked(!productPagesChecked)
                                                    }
                                                />
                                                Unique product pages
                                            </label>

                                            <label htmlFor='webshop-features'>
                                                Unique Webshop Features
                                            </label>
                                            <textarea
                                                className='text'
                                                name='webshop-features'
                                                type='textarea'
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            {packages.value === 'flexi' || packages.value === 'custom' ? (
                                <>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={extraElementsChecked}
                                            onChange={() =>
                                                setExtraElementsChecked(!extraElementsChecked)
                                            }
                                        />
                                        Extra layout elements
                                    </label>

                                    {extraElementsChecked && (
                                        <>
                                            <label htmlFor='extra-elements'>New elements</label>
                                            <textarea
                                                className='text'
                                                name='extra-elements'
                                                type='textarea'
                                            />
                                        </>
                                    )}
                                </>
                            ) : null}

                            {packages.value === 'custom' ? (
                                <>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={flexibleLayoutChecked}
                                            onChange={() =>
                                                setFlexibleLayoutChecked(!flexibleLayoutChecked)
                                            }
                                        />
                                        Flexible layout
                                    </label>

                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={uniqueDesignChecked}
                                            onChange={() =>
                                                setUniqueDesignChecked(!uniqueDesignChecked)
                                            }
                                        />
                                        Unique design
                                    </label>

                                    {uniqueDesignChecked && (
                                        <>
                                            <label htmlFor='design-url'>Design url</label>
                                            <input className='text' name='design-url' type='text' />

                                            <label>
                                                <input
                                                    type='checkbox'
                                                    checked={uniqueEmailChecked}
                                                    onChange={() =>
                                                        setUniqueEmailChecked(!uniqueEmailChecked)
                                                    }
                                                />
                                                Unique email templates
                                            </label>
                                        </>
                                    )}

                                    <label htmlFor='extra-features'>Extra features</label>
                                    <textarea
                                        className='text'
                                        name='extra-features'
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
            </div>
        </div>
    );
};

export default TaskManagerForm;
