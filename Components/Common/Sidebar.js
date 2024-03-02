import React, { useState } from 'react';

import Image from "next/image";
import LogoIcon from '@/styles/logo65cc654bac92a.png';
import Logo from '@/styles/logo65cc655649912.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { AccountBalance, AccountBalanceOutlined, CampaignOutlined, Dashboard, DashboardOutlined, HelpOutline, LeaderboardOutlined, NoteAltOutlined, PaidOutlined, PersonOutline, PieChartOutline, PlaylistAddOutlined, SignalCellular0BarOutlined } from '@mui/icons-material';
import Link from 'next/link';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const SideBarOptions = [
        {
            title: 'Lead Manager',
            icon: PersonOutline,
            href: '/lead'
        },
        {
            title: 'Task Manager',
            icon: NoteAltOutlined,
            href: '/task'
        }
    ]


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
                            <li key={index}><Link href={`/task`}><i><obj.icon fontSize='small' /></i><span>{obj?.title}</span></Link></li>
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
