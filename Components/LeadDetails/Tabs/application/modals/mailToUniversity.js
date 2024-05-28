import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Button, Grid, IconButton, Skeleton, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Close, Delete, Refresh } from '@mui/icons-material';
import { ListingApi } from '@/data/Endpoints/Listing';
import DateInput from '@/Form/DateInput';
import SelectX from '@/Form/SelectX';
import TextInput from '@/Form/TextInput';
import { useState } from 'react';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from '@mui/lab';
import LoadingEdit from '@/Components/Common/Loading/LoadingEdit';
import AsyncSelect from "react-select/async";
import moment from 'moment';
import { StudentApi } from '@/data/Endpoints/Student';
import toast from 'react-hot-toast';
import { TemplateApi } from '@/data/Endpoints/Template';
import dynamic from 'next/dynamic';
import { LeadApi } from '@/data/Endpoints/Lead';
import Editor from '@/Form/Editor';



// const MyEditor = dynamic(() => import("../../../Form/MyEditor"), {
//     ssr: false,
// });


const scheme = yup.object().shape({
    subject: yup.string().required("Subject is Required"),
    body: yup.string().required("Body is Required"),
    // default_cc: yup.array().required("Mail CC is Required"),
    // dob: yup.string().required("Date Of Birth is Required"),
    // zip: yup.string().required("Zip Code is Required"),
    // country: yup.object().required("Please Choose a Country").typeError("Please choose a Country"),
    // state: yup.string().required("State is Required"),
})

export default function SendUniversityMail({ details, editId, setEditId, lead_id, refresh, setRefresh, from, app_id }) {
    const [state, setState] = React.useState({
        right: false,
    });
    const [selectedPriority, setSelectedPriority] = useState('Medium');
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [dataLoading, setDataLoading] = useState(false)


    const [attachment, setAttachment] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [attachmentFiles, setattachmentFiles] = useState([])

    const [textBoxLoading, setTextBoxLoading] = useState(false)

    const [editorKey, seteditorKey] = useState(1)


    const [file, setFile] = useState([])


    const handleFileUpload = (event) => {
        setFileInputKey(prevKey => prevKey + 1);
        const file = event.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    function trimUrlAndNumbers(url) {
        const lastSlashIndex = url?.lastIndexOf('/');
        let trimmedString = url?.substring(lastSlashIndex + 1);
        trimmedString = trimmedString?.replace(/[0-9]/g, ''); // Replace all numeric characters with an empty string
        return trimmedString?.replace(/_/g, ''); // Replace all underscores with an empty string
    }

    const handleDeleteAttachment = (index) => {
        const updatedAttachments = [...file];
        updatedAttachments.splice(index, 1);
        setFile(updatedAttachments);
    };

    const items = [
        { label: 'Title' },
        { label: 'Due Date' },
        { label: 'Assigned To' },
        { label: 'Reviewer' },
        { label: 'Priority' },
        { label: 'Description', multi: true },

    ]

    const anchor = 'right'; // Set anchor to 'right'

    const { register, handleSubmit, watch, formState: { errors }, control, Controller, setValue, getValues, reset, trigger } = useForm({ resolver: yupResolver(scheme) })

    const handleFileChange = (e) => {
        const newFile = e?.target?.files[0];
        setFile([...file, newFile]); // Add the new file to the state
    };



    const fetchTemplates = (e) => {
        return TemplateApi.list({ keyword: e }).then(response => {
            if (typeof response.data.data !== "undefined") {
                return response.data.data;
            } else {
                return [];
            }
        })
    }




    const onSubmit = async (data) => {

        setLoading(true)
        const formData = new FormData()

        formData.append('to', data?.to)
        formData.append('cc', data?.default_cc)
        formData.append('subject', data?.subject || '')
        formData.append('message', data?.body || '')
        formData.append('lead_id', lead_id || '')

        if (from == 'app') {
            formData.append('application_id', app_id || '')
        }


        if (attachmentFiles?.length > 0) {
            attachmentFiles?.map(obj => {
                // console.log(obj?.file_path);
                formData.append('attachment_files[]', obj?.file_path)
            })
        }

        if (file?.length > 0) {
            file?.map(obj => {
                formData.append('attachments[]', obj)
            })
        }

        // console.log(dataToSubmit);

        let action;

        if (editId > 0) {
            // dataToSubmit['id'] = editId
            // action = TaskApi.update(dataToSubmit)
        } else {
            action = LeadApi.sendMail(formData)
        }

        action.then((response) => {
            console.log(response);
            if (response?.status == 200 || response?.status == 201) {
                toast.success('Email Sent Successfully');
                reset()
                handleClose()
                if(setRefresh){
                    setRefresh()
                }
                // setRefresh()
                // setRefresh(!refresh)
                setLoading(false)
            } else {
                toast.error(response?.response?.data?.message)
                setLoading(false)
            }

            setLoading(false)
        }).catch((error) => {
            console.log(error);
            toast.error(error?.message)
            setLoading(false)
        })
    }


    const handleClose = () => {
        setEditId()
        // reset()
        setValue('template', '')
        setValue('default_cc', '')
        setValue('subject', '')
        setValue('to', '')
        setValue('body', '')
        setOpen(false)
        setFile()
        setattachmentFiles([])

    }

    const handleDrawerClose = (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        // Check if the close icon was clicked
        if (event.target.tagName === 'svg') {
            setOpen(false);
        }
    };


    const handleTemplateChange = (data) => {
        // console.log(data);.
        setTextBoxLoading(true)
        setValue('template', data || '')

        TemplateApi.mailTemplate({ template_id: data?.id, lead_id: lead_id }).then((response) => {

            console.log(response);

            if (response?.status == 200 || response?.status == 201) {
                // let cc = 
                // cc = response?.data?.data?.template?.default_cc?.map((obj) => {
                //     cc.
                // })
                let cc = response?.data?.data?.template?.default_cc?.join(',');


                // setValue('default_cc', cc)

                setValue('default_cc', response?.data?.data?.template?.default_cc || '')
                // setValue('to', details?.email || '')
                setValue('subject', response?.data?.data?.template?.subject || '')
                setValue('body', response?.data?.data?.template?.body || '')
                setattachmentFiles(response?.data?.data?.attchments)

                seteditorKey(Math.random() * 0.23)
                setTextBoxLoading(false)
            } else {
                toast.error(response?.response?.data?.message)
                setTextBoxLoading(false)
            }

        })


    }


    const getInitialValue = () => {
        if (from == 'app') {
            setValue('to', details?.student?.email)
        } else if (from == 'lead') {
            setValue('to', details?.email)
        }

    }

    const handleClick = () => {
        // This will trigger a click event on the input element, opening the file dialog
        document.getElementById('upload-button').click();
    };

    useEffect(() => {
        if (editId > 0) {
            setOpen(true)
        } else if (editId == 0) {
            setOpen(true)
        }
        // getInitialValue()
    }, [editId])


    return (
        <div>
            <Drawer
                anchor={anchor}
                open={open}
                onClose={handleClose}
            >
                <Grid width={750}>
                    <Grid p={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <a style={{ fontWeight: 500, fontSize: '19px' }}>Send Mail</a>
                        <IconButton
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                    </Grid>
                    <hr />
                    <div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {
                                dataLoading ?
                                    <LoadingEdit item={items} />
                                    :
                                    <>

                                        <Grid p={1} container >
                                            <Grid item pr={1} xs={3} md={3}>
                                                <a className='form-text'>Select Template</a>
                                            </Grid>
                                            <Grid item pr={1} xs={9} md={9}>
                                                <AsyncSelect
                                                    styles={{
                                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                                    }}
                                                    // isDisabled={!selectedUniversityId}
                                                    // key={selectedUniversityId}
                                                    name={'template'}
                                                    defaultValue={watch('template')}
                                                    // isClearable
                                                    defaultOptions
                                                    loadOptions={fetchTemplates}
                                                    getOptionLabel={(e) => e.name}
                                                    getOptionValue={(e) => e.id}
                                                    onChange={handleTemplateChange}
                                                />
                                                {/* <SelectX
                                                    // menuPlacement='top'
                                                    loadOptions={fetchTemplates}
                                                    control={control}
                                                    name={'template'}
                                                    defaultValue={watch('template')}
                                                /> */}
                                                {errors.template && <span className='form-validation'>{errors.template.message}</span>}
                                            </Grid>
                                        </Grid>

                                        <Grid p={1} container >
                                            <Grid item pr={1} xs={3} md={3}>
                                                <a className='form-text'>Mail To </a>
                                            </Grid>
                                            <Grid item pr={1} xs={9} md={9}>
                                                <TextInput control={control} name="to"
                                                    value={watch('to')} />
                                                {errors.to && <span className='form-validation'>{errors.to.message}</span>}
                                            </Grid>
                                        </Grid>

                                        <Grid p={1} container >
                                            <Grid item pr={1} xs={3} md={3}>
                                                <a className='form-text'>Mail CC </a>
                                            </Grid>
                                            <Grid item pr={1} xs={9} md={9}>
                                                {
                                                    textBoxLoading ?
                                                        <Skeleton variant='rounded' width={'100%'} height={40} />
                                                        :
                                                        <TextInput control={control} name="default_cc"
                                                            value={watch('default_cc')} />
                                                }
                                                {errors.default_cc && <span className='form-validation'>{errors.default_cc.message}</span>}
                                            </Grid>
                                        </Grid>

                                        <Grid p={1} container >
                                            <Grid item pr={1} xs={3} md={3}>
                                                <a className='form-text'>Subject </a>
                                            </Grid>
                                            <Grid item pr={1} xs={9} md={9}>
                                                {
                                                    textBoxLoading ?
                                                        <Skeleton variant='rounded' width={'100%'} height={40} />
                                                        :
                                                        <TextInput control={control} name="subject"
                                                            value={watch('subject')} />
                                                }
                                                {errors.subject && <span className='form-validation'>{errors.subject.message}</span>}
                                            </Grid>
                                        </Grid>

                                        <Grid display={'flex'} container p={1.5} item xs={12}>
                                            <Grid item display={'flex'} xs={3} md={3}>
                                                <Typography sx={{ fontWeight: '500' }}>Body</Typography>
                                            </Grid>
                                            <Grid item xs={9} md={9}>
                                                {
                                                    textBoxLoading ?
                                                        <Skeleton variant='rounded' width={'100%'} height={400} />
                                                        :
                                                        <Editor key={editorKey} emoji={false} val={watch('body')}
                                                            onValueChange={e => setValue('body', e)} />
                                                }
                                                {/* <MyEditor name={'body'} onValueChange={e => setValue('body', e)} value={watch('body')} /> */}
                                            </Grid>
                                        </Grid>

                                        {
                                            attachmentFiles?.length > 0 &&
                                            <Grid display={'flex'} container p={1.5} item xs={12}>
                                                <Grid item display={'flex'} xs={3} md={3}>
                                                    <Typography sx={{ fontWeight: '500' }}>Attachments</Typography>
                                                </Grid>
                                                <Grid item xs={9} md={9}>
                                                    {
                                                        attachmentFiles?.map((obj, index) => (
                                                            <p style={{ textDecoration: 'underLine', color: 'blue', cursor: 'pointer' }} key={index} className="text-gray-700">
                                                                <a target='_blank' href={obj?.attachment}>{trimUrlAndNumbers(obj?.attachment)}</a>
                                                            </p>
                                                        ))
                                                    }
                                                </Grid>
                                            </Grid>
                                        }

                                        <Grid p={1} mt={1} mb={1} display={'flex'} alignItems={'center'} container className='bg-sky-100'  >
                                            <Grid item pr={1} alignItems={'center'} xs={4} md={4}>
                                                <label htmlFor="file-input">
                                                    <input
                                                        type="file"
                                                        id="file-input"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button sx={{ textTransform: 'none', height: 30 }}
                                                        variant='contained'
                                                        className='bg-sky-800' size='small' component="span">
                                                        Add Attachments
                                                    </Button>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="upload-button"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileUpload}
                                                    key={fileInputKey}
                                                />
                                            </Grid>

                                            {
                                                file &&
                                                <Grid display={'flex'} flexDirection={'column'} justifyContent={'space-between'} item pr={1} xs={8} md={8}>

                                                    {file?.map((obj, index) => (
                                                        <Grid display={'flex'} xs={12} md={12} justifyContent={'space-between'} key={index} sx={{ pl: 1, mt: 0.5 }} item >
                                                            <a style={{ color: 'grey', fontSize: '14px' }}>{obj?.name}</a>
                                                            <a style={{ cursor: 'pointer' }} onClick={() => handleDeleteAttachment(index)}>
                                                                {/* You can use any icon for delete, for example, a delete icon */}
                                                                <Delete fontSize='small' style={{ color: 'red' }} />
                                                            </a>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            }
                                        </Grid>



                                    </>
                            }

                            <Grid p={1} pb={3} display={'flex'} justifyContent={'end'}>
                                <Button onClick={handleClose} size='small' sx={{ textTransform: 'none', mr: 2 }} variant='outlined'>Cancel</Button>
                                <LoadingButton loading={loading} disabled={loading || dataLoading} size='small' type='submit' sx={{ textTransform: 'none', height: 30 }} variant='contained'>Send</LoadingButton>
                            </Grid>

                        </form>
                    </div>
                </Grid>
            </Drawer>
        </div >
    );
}
