import React, { useState } from 'react';

import Image from "next/image";
import LogoIcon from '@/styles/logo65cc654bac92a.png';
import Logo from '@/styles/logo65cc655649912.png';

import { ArchiveOutlined, CrisisAlertOutlined, DescriptionOutlined, Email, EmailOutlined, EventOutlined, GroupOutlined, Groups2, Groups2Outlined, LinkOutlined, NoteAltOutlined, Person2Outlined, PersonOutline, SettingsApplications, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Sidebar = () => {

    const session =useSession()

    const {data}=session

    const [isExpanded, setIsExpanded] = useState(false);

    const router = useRouter()

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    let SideBarOptions = [
        {
            title: 'Lead Manager',
            icon: PersonOutline,
            href: '/lead'
        },
        {
            title: 'Applicants',
            icon: Groups2Outlined,
            href: '/applicants'
        },
        {
            title: 'Archives',
            icon: ArchiveOutlined,
            href: '/archive'
        },
        {
            title: 'Alumni',
            icon: GroupOutlined,
            href: '/alumni'
        },
        {
            title: 'Application Manager',
            icon: DescriptionOutlined,
            href: '/applications'
        },
        {
            title: 'Task Manager',
            icon: NoteAltOutlined,
            href: '/task'
        },
        {
            title: 'Email Templates',
            icon: EmailOutlined,
            href: '/email-template'
        },
        {
            title: 'WhatsApp Templates',
            icon: WhatsApp,
            href: '/whatsapp-template'
        },
        {
            title: 'Events',
            icon: EventOutlined,
            href: '/events'
        },
        {
            title: 'Goals & Targets',
            icon: CrisisAlertOutlined,
            href: '/goals-and-targets'
        },
        {
            title: 'Referral Links',
            icon: LinkOutlined,  
            href: '/referral-links'
        },  
    ]

    // if (data?.user?.role?.id === 3) {
    //     SideBarOptions = SideBarOptions.filter(option => option.title !== 'WhatsApp Templates' && option.title !== 'Email Templates');
    // }
    

    // const filterUrl = (url) => {
    //     const urls = url.split("/").filter(Boolean); // Split the string by "/", then remove empty strings from the resulting array
    //     const firstUrl = '/' + urls[0];

    //     return firstUrl;
    // }

    return (




        <nav id="sidebar" className={`sidebar sidebar-mask active ${isExpanded ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="sidebar__inner scrollCustom">
                <div className="site-logo onlyDesktop">
                    <a href="#" className="inbl valigntop logo">
                        <Image src={LogoIcon} alt='LogoIcon' width={30} className='tiny-sidebar' />
                        <Image src={Logo} alt='LogoIcon' width={145} className='max-sidebar' />
                    </a>
                </div>

                <ul className="list-unstyled components mainList" id="menuList">

                    {
                        SideBarOptions?.map((obj, index) => (

                            <li className={router?.route == obj?.href ? 'sidebar-selected' : ''} key={index}><Link href={obj?.href}><i><obj.icon fontSize='small' /></i><span>{obj?.title}</span></Link></li>
                        ))
                    }
                    {/* <li><a href='#'><i><DashboardOutlined fontSize='small' /></i><span>Dashboard</span></a></li>
                    <li><a href='#'><i><AccountBalanceOutlined fontSize='small' /></i><span>FormDesk</span></a></li>
                    <li><a href='#'><i><PersonOutline fontSize='small' /></i><span>Leads Manager</span></a></li>
                    <li><a href='#'><i><NoteAltOutlined fontSize='small' /></i><span>Application Manager</span></a></li>
                    <li><a href='#'><i><CampaignOutlined fontSize='small' /></i><span>Marketing</span></a></li>
                    <li><a href='#'><i><LeaderboardOutlined fontSize='small' /></i><span>Campaign Manager</span></a></li>
                    <li><a href='#'><i><HelpOutline fontSize='small' /></i><span>Query Manager</span></a></li>
                    <li><a href='#'><i><PaidOutlined fontSize='small' /></i><span>Payment Manager</span></a></li>
                    <li><a href='#'><i><PieChartOutline fontSize='small' /></i><span>Settings</span></a></li> */}
                    {/* <li><a href='#'><i><FontAwesomeIcon icon={faHouseChimney} /></i><span>Settings</span></a></li> */}
                </ul>
            </div>
        </nav>


    )
}

export default Sidebar;
