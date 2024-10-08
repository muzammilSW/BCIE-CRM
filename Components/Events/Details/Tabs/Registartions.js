import { EventRegistrationApi } from '@/data/Endpoints/EventRegistration';
import { ArrowOutward, Check, Link } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, MenuItem, Pagination, Select, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import EventRegistrationModal from '../../Modals/Registration';
import { ListingApi } from '@/data/Endpoints/Listing';
import { LeadApi } from '@/data/Endpoints/Lead';


function EventRegistrations({ details }) {

    

    const [copied, setcopied] = useState(false)
    const [leadCopied, setleadCopied] = useState(false)
    const [list, setList] = useState([])

    const [loading, setloading] = useState(false)

    const [editId, setEditId] = useState()


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [refresh, setRefresh] = useState(false)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value));
        setPage(1);
    };

    const currentURL = window?.location?.origin;

    const handleCopy = async () => {
        setcopied(true)
        toast.success('Event Registration Link Copied')
        await navigator.clipboard.writeText(`${currentURL}/forms/lead/${details?.referral_link?.token}`);
        setTimeout(() => {
            setcopied(false)
        }, 1000);
    }

    const handleEventRegisterOpen = () => {
        setEditId(0)
    }

    const handleLeadLinkCopy = async () => {
        setleadCopied(true)
        toast.success('Lead Registration Link Copied')
        await navigator.clipboard.writeText(`${currentURL}/forms/lead`);
        setTimeout(() => {
            setleadCopied(false)
        }, 1000);
    }

    const fetchRegistrations = () => {
        setloading(true)
        LeadApi.list({ event_id: details?.id, limit, page: page }).then((response) => {
            // console.log(response);
            setList(response?.data)
            setloading(false)
        })
    }

    const handleEdit = (id) => {
        setEditId(id)
    }


    const handleRefresh = () => {
        if (page != 1) {
            setPage(1)
        }
        setRefresh(!refresh)
    }

    useEffect(() => {
        fetchRegistrations()
    }, [page, limit, refresh])



    return (

        <>
            <EventRegistrationModal eventId={details?.id} editId={editId} setEditId={setEditId} handleRefresh={handleRefresh} />

            <Grid >

                <Grid p={2} container spacing={2} >
                    <Grid item xs={6} sm={6} md={6}>
                        <Tooltip title={`${currentURL}/forms/lead/${details?.referral_link?.token}`}>  <Button sx={{ mr: 1 }} onClick={handleCopy} size='small' variant='outlined'>Event Registration Link </Button></Tooltip>
                        <IconButton size='small' ><a target='_blank' href={`/forms/lead/${details?.referral_link?.token}`}><ArrowOutward /></a></IconButton>
                    </Grid>
                    {/* <Grid item container xs={6} sm={6} md={6}>
                        <Tooltip title={`${currentURL}/forms/lead`}>  <Button sx={{ mr: 1 }} onClick={handleLeadLinkCopy} size='small' variant='outlined'>Lead Registration Link </Button></Tooltip>
                        <IconButton size='small' ><a target='_blank' href={`${currentURL}/forms/lead`}><ArrowOutward /></a></IconButton>
                    </Grid> */}
                </Grid >

                {/* <Grid p={2} container spacing={2} display={'flex'} justifyContent={'end'} >
                    <Button sx={{ mr: 1 }} onClick={handleEventRegisterOpen} size='small' variant='outlined'>Register </Button>
                </Grid> */}

                {/* <Grid p={2} container spacing={2} >
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="" style={{ fontWeight: 'bold' }}>
                            Event Registration Link:
                        </Typography>
    
                    </Grid>
                    <Grid item container xs={8} sm={8} md={8}>
                        <Grid item width={50} xs={12} sm={12} md={12}>
                            <a href={`${currentURL}/forms/event/${details?.token}`} target='_blank' style={{ fontSize: '16px', color: 'blue' }}>
                                {`${currentURL}/forms/event/${details?.token}`}
                            </a>
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'} justifyContent={'end'} item xs={12} sm={12} md={12}>
                            {
                                copied ?
                                    <a style={{ fontSize: '13px', marginRight: 5, cursor: 'pointer' }} onClick={handleCopy}>
                                        copied <Check fontSize='small' />
                                    </a> :
                                    <a style={{ fontSize: '13px', marginRight: 5, cursor: 'pointer' }} onClick={handleCopy}>
                                        copy <Link fontSize='small' />
                                    </a>
                            }
                        </Grid>
                    </Grid>
                </Grid >
                <Divider sx={{ mb: 1 }} />
    
                <Grid p={2} container spacing={2} >
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="" style={{ fontWeight: 'bold' }}>
                            Lead Registration Link:
                        </Typography>
    
                    </Grid>
                    <Grid item container xs={8} sm={8} md={8}>
                        <Grid item width={50} xs={12} sm={12} md={12}>
                            <a href={`${currentURL}/forms/lead`} target='_blank' style={{ fontSize: '16px', color: 'blue' }}>
                                {`${currentURL}/forms/lead`}
                            </a>
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'} justifyContent={'end'} item xs={12} sm={12} md={12}>
                            {
                                leadCopied ?
                                    <a style={{ fontSize: '13px', marginRight: 5, cursor: 'pointer' }} onClick={handleLeadLinkCopy}>
                                        copied <Check fontSize='small' />
                                    </a> :
                                    <a style={{ fontSize: '13px', marginRight: 5, cursor: 'pointer' }} onClick={handleLeadLinkCopy}>
                                        copy <Link fontSize='small' />
                                    </a>
                            }
                        </Grid>
                    </Grid>
                </Grid >
                <Divider sx={{ mb: 1 }} /> */}

                {
                    loading ?
                        loadTable() :


                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#eeeef0' }}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1" sx={{ color: 'black' }} fontWeight="bold">
                                                Name
                                            </Typography>
                                        </TableCell>

                                        <TableCell>

                                            <Typography variant="subtitle1" sx={{ color: 'black' }} fontWeight="bold">
                                                Email
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" sx={{ color: 'black' }} fontWeight="bold">
                                                Phone
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list?.data?.length > 0 ?
                                            list?.data?.map((obj, index) => (
                                                <TableRow key={obj?.id}>
                                                    <TableCell><a href={'/lead/'+obj?.id} target='_blank'>{obj?.name}</a></TableCell>
                                                    <TableCell>{obj?.email}</TableCell>
                                                    <TableCell>{obj?.phone_number}</TableCell>

                                                    {/* <TableCell><Edit onClick={() => handleEdit(obj?.id)} sx={{ color: blue[400], cursor: 'pointer' }} fontSize='small' /></TableCell> */}
                                                </TableRow>

                                            ))
                                            :
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <Grid height={200} className='flex items-center justify-center'> No Registration Found</Grid>

                                                </TableCell>                                            </TableRow>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>

                }


                <div className='table-pagination d-flex justify-content-end align-items-center'>

                    {
                        list?.data?.length > 0 &&
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='select-row-box'>
                                <Select value={limit} onChange={handleChangeRowsPerPage} inputprops={{ 'aria-label': 'Rows per page' }}>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                </Select>
                                <label>Rows per page</label>
                            </div>
                            <div>
                                <Stack spacing={2}>
                                    <Pagination count={list?.meta?.last_page} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
                                </Stack>
                            </div>
                        </div>
                    }
                </div>
            </Grid >

        </>

    )
}

export default EventRegistrations

const loadTable = () => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {[...Array(3)].map((_, index) => (
                        <TableCell key={index} align="left">
                            <Skeleton variant='rounded' width={60} height={20} />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    [...Array(5)]?.map((_, index) => (
                        <TableRow key={index} className='table-custom-tr'>
                            {
                                [...Array(3)]?.map((_, colindex) => (
                                    <TableCell key={colindex} align="left"><Skeleton variant='rounded' width={120} height={20} /></TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

}

