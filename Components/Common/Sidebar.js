import React, { useEffect, useState } from 'react';

import Image from "next/image";
import LogoIcon from '@/styles/logo65cc654bac92a.png';
import Logo from '@/styles/logo65cc655649912.png';

import { ArchiveOutlined, CrisisAlertOutlined, DescriptionOutlined, Email, EmailOutlined, EventOutlined, GroupOutlined, Groups2, Groups2Outlined, LinkOutlined, MenuOpen, NoteAltOutlined, Person2Outlined, PersonOutline, SettingsApplications, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Menu } from '@mui/material';

const Sidebar = () => {

    const session = useSession()

    const { data } = session

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
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.00151 0C7.60592 8.44486e-05 7.21923 0.117428 6.89033 0.337197C6.56143 0.556965 6.30509 0.869291 6.15371 1.23469C6.00233 1.60009 5.96272 2.00216 6.03987 2.39006C6.11703 2.77797 6.30748 3.1343 6.58717 3.414L11.1649 7.99067L8.20023 11.018L9.36384 12.242C9.54328 12.3819 9.70064 12.548 9.83062 12.7347L9.83863 12.742L9.83796 12.7433C10.1026 13.1259 10.2443 13.5801 10.2441 14.0453C10.2442 14.2204 10.2241 14.3949 10.184 14.5653L15.352 9.46733C15.3726 9.448 15.3966 9.434 15.4173 9.414C15.4327 9.39867 15.4427 9.37933 15.4573 9.36333C15.8127 8.98584 16.0073 8.48492 15.9998 7.96657C15.9923 7.44822 15.7834 6.9531 15.4173 6.586L9.41586 0.586C9.04078 0.210901 8.53203 0.000113275 8.00151 0ZM5.7523 1.422L0.584383 6.53933C0.210165 6.91428 0 7.42233 0 7.952C0 8.48168 0.210165 8.98972 0.584383 9.36467L5.71896 14.5313C5.68438 14.3717 5.66716 14.2087 5.66762 14.0453C5.66753 13.7449 5.72665 13.4475 5.84159 13.1699C5.95654 12.8924 6.12506 12.6402 6.33753 12.4277C6.54999 12.2153 6.80224 12.0469 7.07986 11.9319C7.35748 11.817 7.65503 11.7579 7.9555 11.758C8.14117 11.7578 8.32615 11.7804 8.5063 11.8253L4.82341 7.952L7.73812 5.03667L6.35111 3.65C5.74897 3.04733 5.55559 2.19467 5.7523 1.422ZM7.9555 12.0913C7.69881 12.0912 7.44462 12.1417 7.20746 12.2399C6.97029 12.3381 6.75479 12.482 6.57329 12.6635C6.39178 12.8449 6.24782 13.0604 6.14963 13.2975C6.05144 13.5346 6.00094 13.7887 6.00103 14.0453C6.00085 14.302 6.05128 14.5562 6.14944 14.7934C6.24759 15.0306 6.39153 15.2461 6.57305 15.4276C6.75457 15.6092 6.97009 15.7532 7.2073 15.8514C7.44451 15.9496 7.69876 16.0001 7.9555 16C8.21231 16.0002 8.46662 15.9497 8.70391 15.8516C8.9412 15.7534 9.1568 15.6094 9.33839 15.4279C9.51997 15.2463 9.66398 15.0308 9.76217 14.7936C9.86037 14.5563 9.91082 14.3021 9.91064 14.0453C9.91073 13.7887 9.86022 13.5345 9.76198 13.2973C9.66375 13.0602 9.51973 12.8447 9.33815 12.6632C9.15657 12.4817 8.941 12.3378 8.70376 12.2397C8.46651 12.1416 8.21225 12.0912 7.9555 12.0913Z" fill="url(#paint0_linear_1041_304)" />
                <defs>
                    <linearGradient id="paint0_linear_1041_304" x1="8" y1="-3.12924e-07" x2="18.5" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#122AFF" />
                        <stop offset="0.495" stop-color="#EA68FF" />
                        <stop offset="1" stop-color="#BE2FB8" />
                    </linearGradient>
                </defs>
            </svg>,
            href: '/lead'
        },
        // {
        //     title: 'Applicants',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
        // <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 0.000376504C3.70435 0.000376504 2.94129 0.316437 2.37868 0.879028C1.81607 1.44162 1.5 2.20466 1.5 3.00028C1.5 3.79591 1.81607 4.55895 2.37868 5.12154C2.94129 5.68413 3.70435 6.00019 4.5 6.00019C5.29565 6.00019 6.05871 5.68413 6.62132 5.12154C7.18393 4.55895 7.5 3.79591 7.5 3.00028C7.5 2.20466 7.18393 1.44162 6.62132 0.879028C6.05871 0.316437 5.29565 0.000376504 4.5 0.000376504ZM3 6.75016C2.20435 6.75016 1.44129 7.06623 0.87868 7.62882C0.316071 8.19141 0 8.95445 0 9.75007V10.5C0 10.8979 0.158035 11.2794 0.43934 11.5607C0.720644 11.842 1.10218 12 1.5 12H7.5C7.89782 12 8.27936 11.842 8.56066 11.5607C8.84196 11.2794 9 10.8979 9 10.5V9.75007C9 8.95445 8.68393 8.19141 8.12132 7.62882C7.55871 7.06623 6.79565 6.75016 6 6.75016H3ZM8.4375 5.17896C8.796 4.53398 9 3.79151 9 3.00028C9.00016 2.23789 8.80661 1.48795 8.4375 0.820851C8.86336 0.41791 9.39796 0.148581 9.97523 0.0461468C10.5525 -0.056287 11.1471 0.0126655 11.6856 0.244482C12.2241 0.476299 12.6829 0.86082 13.0053 1.35052C13.3276 1.84022 13.4994 2.41364 13.4994 2.99991C13.4994 3.58617 13.3276 4.15959 13.0053 4.64929C12.6829 5.139 12.2241 5.52352 11.6856 5.75533C11.1471 5.98715 10.5525 6.0561 9.97523 5.95367C9.39796 5.85123 8.86336 5.5819 8.4375 5.17896ZM10.0995 12C10.3545 11.559 10.5007 11.0468 10.5007 10.5V9.75007C10.5021 8.64293 10.0939 7.57441 9.35475 6.75016H12C12.7956 6.75016 13.5587 7.06623 14.1213 7.62882C14.6839 8.19141 15 8.95445 15 9.75007V10.5C15 10.8979 14.842 11.2794 14.5607 11.5607C14.2794 11.842 13.8978 12 13.5 12H10.0995Z" fill="white" />
        // </svg>,
        //     href: '/applicants'
        // },
        {
            title: 'Archives',
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.6654 5.10415C14.6656 5.09788 14.6673 5.09228 14.6673 5.086C14.6669 4.92053 14.6053 4.76102 14.4943 4.63788L14.4978 4.63601L13.1579 2.32466C13.1344 2.2315 13.0803 2.14889 13.0041 2.09003C12.9279 2.03117 12.8341 1.99947 12.7377 2.00001C12.7236 2.00001 12.7103 2.00272 12.6965 2.00408V2.00001H3.2709V2.00069C3.26869 2.00069 3.26648 2.00001 3.26426 2.00001C3.188 1.99948 3.11308 2.02005 3.04785 2.05943C2.98262 2.09881 2.92965 2.15545 2.89482 2.22306L2.89346 2.22221L1.49538 4.63601L1.49794 4.63737C1.39156 4.76258 1.33343 4.92145 1.33399 5.08549C1.33399 5.09347 1.33603 5.10093 1.33637 5.1089V13.2863C1.33603 13.2944 1.33399 13.302 1.33399 13.3103C1.33399 13.6977 1.64333 14.0005 2.03115 14C2.03848 14 2.04529 13.9981 2.05244 13.998H13.9477C13.955 13.9981 13.9618 14 13.9691 14C14.3578 14 14.6671 13.6977 14.6671 13.311C14.6671 13.3049 14.6654 13.2995 14.6653 13.2934L14.6654 5.10415ZM10.2841 9.27077L8.17456 12.2272C8.13609 12.2811 8.07412 12.3128 8.00772 12.3132H8.00704C7.94132 12.3132 7.87918 12.2815 7.84071 12.2279L5.71754 9.27111C5.69558 9.24059 5.68252 9.20463 5.67978 9.16719C5.67705 9.12974 5.68475 9.09227 5.70205 9.05892C5.73746 8.9909 5.8076 8.94799 5.88438 8.94799H6.87744L6.87761 6.29282C6.87761 6.17969 6.9692 6.08843 7.08242 6.08843H8.91923C9.03244 6.08843 9.12421 6.17986 9.12421 6.29265V8.94799H10.1168C10.1544 8.94803 10.1913 8.95837 10.2234 8.97789C10.2556 8.99741 10.2817 9.02535 10.299 9.05867C10.3162 9.09198 10.324 9.12939 10.3214 9.16679C10.3188 9.2042 10.3059 9.24017 10.2841 9.27077ZM2.61664 4.39278L3.51265 2.84605H12.4796L13.3762 4.39278H2.61664Z" fill="white" />
                </svg>,
            href: '/archive'
        },
        {
            title: 'Alumni',
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <g clip-path="url(#clip0_1041_314)">
                        <path d="M2.4 6.125C3.2825 6.125 4 5.34023 4 4.375C4 3.40977 3.2825 2.625 2.4 2.625C1.5175 2.625 0.8 3.40977 0.8 4.375C0.8 5.34023 1.5175 6.125 2.4 6.125ZM13.6 6.125C14.4825 6.125 15.2 5.34023 15.2 4.375C15.2 3.40977 14.4825 2.625 13.6 2.625C12.7175 2.625 12 3.40977 12 4.375C12 5.34023 12.7175 6.125 13.6 6.125ZM14.4 7H12.8C12.36 7 11.9625 7.19414 11.6725 7.50859C12.68 8.11289 13.395 9.20391 13.55 10.5H15.2C15.6425 10.5 16 10.109 16 9.625V8.75C16 7.78477 15.2825 7 14.4 7ZM8 7C9.5475 7 10.8 5.63008 10.8 3.9375C10.8 2.24492 9.5475 0.875 8 0.875C6.4525 0.875 5.2 2.24492 5.2 3.9375C5.2 5.63008 6.4525 7 8 7ZM9.92 7.875H9.7125C9.1925 8.14844 8.615 8.3125 8 8.3125C7.385 8.3125 6.81 8.14844 6.2875 7.875H6.08C4.49 7.875 3.2 9.28594 3.2 11.025V11.8125C3.2 12.5371 3.7375 13.125 4.4 13.125H11.6C12.2625 13.125 12.8 12.5371 12.8 11.8125V11.025C12.8 9.28594 11.51 7.875 9.92 7.875ZM4.3275 7.50859C4.0375 7.19414 3.64 7 3.2 7H1.6C0.7175 7 0 7.78477 0 8.75V9.625C0 10.109 0.3575 10.5 0.8 10.5H2.4475C2.605 9.20391 3.32 8.11289 4.3275 7.50859Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1041_314">
                            <rect width="16" height="14" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ,
            href: '/alumni'
        },
        {
            title: 'Applications',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
                    <mask id="mask0_1041_318" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="18">
                        <path d="M13.2692 5.4075L7.13461 1.81494L1 5.4075V12.5926L7.13461 16.1852L13.2692 12.5926V5.4075Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M4.24805 7.20312L7.1324 9.00012L10.02 7.20312M7.13492 9.00012V12.2334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </mask>
                    <g mask="url(#mask0_1041_318)">
                        <path d="M-1.52539 0.37793H15.7959V17.6222H-1.52539V0.37793Z" fill="white" />
                    </g>
                </svg>
            ),
            href: '/applications'
        },

        {
            title: 'Task Manager',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0 2.8125C0 2.06658 0.296316 1.35121 0.823762 0.823762C1.35121 0.296316 2.06658 0 2.8125 0H10.3125C11.0584 0 11.7738 0.296316 12.3012 0.823762C12.8287 1.35121 13.125 2.06658 13.125 2.8125V6.00094C12.6974 5.75405 12.2123 5.6241 11.7185 5.62413C11.2248 5.62417 10.7397 5.7542 10.3121 6.00115C9.88455 6.24811 9.52952 6.60327 9.28273 7.03095C9.03594 7.45862 8.9061 7.94373 8.90625 8.4375H7.5C7.37568 8.4375 7.25645 8.48689 7.16854 8.57479C7.08064 8.6627 7.03125 8.78193 7.03125 8.90625C7.03125 9.03057 7.08064 9.1498 7.16854 9.23771C7.25645 9.32561 7.37568 9.375 7.5 9.375H9.06563C9.18973 9.72484 9.38186 10.0466 9.63094 10.3219C9.04854 10.375 8.50704 10.6439 8.11276 11.0758C7.71848 11.5077 7.49992 12.0714 7.5 12.6562C7.5 12.8125 7.51188 12.9688 7.53562 13.125H2.8125C2.06658 13.125 1.35121 12.8287 0.823762 12.3012C0.296316 11.7738 0 11.0584 0 10.3125V2.8125ZM5.95687 3.8475C6.04489 3.75948 6.09434 3.6401 6.09434 3.51562C6.09434 3.39115 6.04489 3.27177 5.95687 3.18375C5.86886 3.09573 5.74948 3.04628 5.625 3.04628C5.50052 3.04628 5.38114 3.09573 5.29313 3.18375L3.96938 4.5075L3.59719 4.16813C3.50471 4.08908 3.38513 4.04909 3.26371 4.05659C3.14229 4.0641 3.02854 4.11851 2.9465 4.20834C2.86446 4.29817 2.82056 4.41637 2.82407 4.53798C2.82758 4.65958 2.87823 4.77505 2.96531 4.86L3.66844 5.50219C3.75753 5.5833 3.87443 5.62699 3.99488 5.6242C4.11533 5.62141 4.23008 5.57234 4.31531 5.48719L5.95687 3.8475ZM5.95687 7.87125C5.91333 7.8276 5.8616 7.79296 5.80466 7.76933C5.74771 7.7457 5.68666 7.73354 5.625 7.73354C5.56334 7.73354 5.50229 7.7457 5.44534 7.76933C5.3884 7.79296 5.33667 7.8276 5.29313 7.87125L3.96938 9.195L3.59719 8.85563C3.50471 8.77658 3.38513 8.73659 3.26371 8.74409C3.14229 8.7516 3.02854 8.80602 2.9465 8.89584C2.86446 8.98567 2.82056 9.10388 2.82407 9.22548C2.82758 9.34708 2.87823 9.46255 2.96531 9.5475L3.66844 10.1897C3.75741 10.2709 3.87424 10.3148 3.99469 10.3122C4.11514 10.3095 4.22996 10.2606 4.31531 10.1756L5.95594 8.535C6.04381 8.4471 6.09318 8.32789 6.09318 8.20359C6.09318 8.0793 6.04381 7.96009 5.95594 7.87219M7.03125 4.21875C7.03125 4.34307 7.08064 4.4623 7.16854 4.55021C7.25645 4.63811 7.37568 4.6875 7.5 4.6875H9.84375C9.96807 4.6875 10.0873 4.63811 10.1752 4.55021C10.2631 4.4623 10.3125 4.34307 10.3125 4.21875C10.3125 4.09443 10.2631 3.9752 10.1752 3.88729C10.0873 3.79939 9.96807 3.75 9.84375 3.75H7.5C7.37568 3.75 7.25645 3.79939 7.16854 3.88729C7.08064 3.9752 7.03125 4.09443 7.03125 4.21875ZM13.5938 8.4375C13.5938 8.93478 13.3962 9.41169 13.0446 9.76332C12.6929 10.115 12.216 10.3125 11.7188 10.3125C11.2215 10.3125 10.7446 10.115 10.3929 9.76332C10.0413 9.41169 9.84375 8.93478 9.84375 8.4375C9.84375 7.94022 10.0413 7.46331 10.3929 7.11168C10.7446 6.76004 11.2215 6.5625 11.7188 6.5625C12.216 6.5625 12.6929 6.76004 13.0446 7.11168C13.3962 7.46331 13.5938 7.94022 13.5938 8.4375ZM15 12.6562C15 13.8234 14.0625 15 11.7188 15C9.375 15 8.4375 13.8281 8.4375 12.6562C8.4375 12.2833 8.58566 11.9256 8.84938 11.6619C9.1131 11.3982 9.47079 11.25 9.84375 11.25H13.5938C13.9667 11.25 14.3244 11.3982 14.5881 11.6619C14.8518 11.9256 15 12.2833 15 12.6562Z" fill="white" />
            </svg>
            ,
            href: '/task'
        },
        {
            title: 'Email Templates',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M14.166 5.66659L8.49935 9.20825L2.83268 5.66659V4.24992L8.49935 7.79158L14.166 4.24992M14.166 2.83325H2.83268C2.04643 2.83325 1.41602 3.46367 1.41602 4.24992V12.7499C1.41602 13.1256 1.56527 13.486 1.83095 13.7517C2.09662 14.0173 2.45696 14.1666 2.83268 14.1666H14.166C14.5417 14.1666 14.9021 14.0173 15.1678 13.7517C15.4334 13.486 15.5827 13.1256 15.5827 12.7499V4.24992C15.5827 3.8742 15.4334 3.51386 15.1678 3.24818C14.9021 2.98251 14.5417 2.83325 14.166 2.83325Z" fill="white" />
            </svg>,
            href: '/email-template'
        },
        {
            title: 'WhatsApp Templates',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <g clip-path="url(#clip0_1041_334)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.15817 0.730712C4.04399 0.743118 0.719041 4.08818 0.731446 8.20236C0.735692 9.61026 1.13075 10.9276 1.81425 12.0489L1.15659 14.3095C1.11883 14.4393 1.11674 14.5768 1.15052 14.7077C1.18431 14.8386 1.25274 14.958 1.34861 15.0533C1.44448 15.1485 1.56425 15.2162 1.69534 15.2492C1.82642 15.2822 1.96397 15.2793 2.09354 15.2408L4.35013 14.5695C5.51333 15.2685 6.84602 15.635 8.2031 15.6291C12.3173 15.6167 15.6422 12.2716 15.6298 8.15744C15.6174 4.04325 12.2724 0.718306 8.15817 0.730712ZM6.50071 9.87073C8.01222 11.3724 9.45126 11.567 9.95935 11.5841C10.7319 11.61 11.4825 11.0178 11.7732 10.3323C11.8099 10.2471 11.823 10.1535 11.8112 10.0614C11.7994 9.96933 11.7631 9.8821 11.7061 9.80885C11.2963 9.28864 10.7432 8.91561 10.2027 8.54478C10.0899 8.46726 9.95141 8.43644 9.81634 8.45879C9.68128 8.48114 9.56012 8.55492 9.47827 8.66466L9.03337 9.34761C9.00998 9.38432 8.97345 9.41071 8.93124 9.42136C8.88903 9.43201 8.84435 9.42612 8.80634 9.40491C8.50264 9.23225 8.06001 8.9386 7.74172 8.62222C7.42342 8.30584 7.14504 7.88505 6.9885 7.60171C6.96909 7.56571 6.96338 7.52389 6.97244 7.48401C6.98149 7.44412 7.0047 7.40887 7.03776 7.38479L7.72452 6.8717C7.82249 6.78599 7.88552 6.66725 7.90162 6.53808C7.91771 6.40891 7.88574 6.27833 7.8118 6.1712C7.4766 5.68354 7.08588 5.06345 6.52073 4.65321C6.4478 4.60069 6.36245 4.56807 6.27308 4.55854C6.18372 4.54902 6.09341 4.56292 6.01104 4.59888C5.3266 4.89444 4.73591 5.6486 4.76656 6.42249C4.78671 6.93046 4.98994 8.3683 6.50071 9.87073Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_1041_334">
                        <rect width="17" height="17" fill="white" />
                    </clipPath>
                </defs>
            </svg>,
            href: '/whatsapp-template'
        },
        {
            title: 'Events',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.66732 1.74992C4.66732 1.63941 4.62342 1.53343 4.54528 1.45529C4.46714 1.37715 4.36116 1.33325 4.25065 1.33325C4.14014 1.33325 4.03416 1.37715 3.95602 1.45529C3.87788 1.53343 3.83398 1.63941 3.83398 1.74992V2.16659H3.00065C2.55862 2.16659 2.1347 2.34218 1.82214 2.65474C1.50958 2.9673 1.33398 3.39122 1.33398 3.83325L1.33398 4.66659H14.6673V3.83325C14.6673 3.39122 14.4917 2.9673 14.1792 2.65474C13.8666 2.34218 13.4427 2.16659 13.0007 2.16659H12.1673V1.74992C12.1673 1.63941 12.1234 1.53343 12.0453 1.45529C11.9671 1.37715 11.8612 1.33325 11.7507 1.33325C11.6401 1.33325 11.5342 1.37715 11.456 1.45529C11.3779 1.53343 11.334 1.63941 11.334 1.74992V2.16659H4.66732V1.74992ZM14.6673 12.9999V5.49992H1.33398V12.9999C1.33398 13.4419 1.50958 13.8659 1.82214 14.1784C2.1347 14.491 2.55862 14.6666 3.00065 14.6666H13.0007C13.4427 14.6666 13.8666 14.491 14.1792 14.1784C14.4917 13.8659 14.6673 13.4419 14.6673 12.9999ZM11.7507 7.16659H12.584C12.6945 7.16659 12.8005 7.21048 12.8786 7.28862C12.9568 7.36676 13.0007 7.47275 13.0007 7.58325V8.41659C13.0007 8.52709 12.9568 8.63307 12.8786 8.71121C12.8005 8.78935 12.6945 8.83325 12.584 8.83325H11.7507C11.6401 8.83325 11.5342 8.78935 11.456 8.71121C11.3779 8.63307 11.334 8.52709 11.334 8.41659V7.58325C11.334 7.47275 11.3779 7.36676 11.456 7.28862C11.5342 7.21048 11.6401 7.16659 11.7507 7.16659Z" fill="white" />
            </svg>
            ,
            href: '/events'
        },
        // {
        //     title: 'Goals & Targets',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        //         <path d="M7.49984 15.5C11.5957 15.5 15 12.0957 15 8C15 3.89706 11.5881 0.5 7.49231 0.5C3.3896 0.5 0 3.89706 0 8C0 12.0957 3.39681 15.5 7.49984 15.5ZM10.7649 4.58098C11.6766 5.48515 11.596 6.60297 10.5443 7.64706L9.27966 8.91923C9.38257 8.56628 9.37535 8.15436 9.2577 7.87514L10.0003 7.13223C10.721 6.42634 10.8016 5.68374 10.2281 5.11746C9.66211 4.55902 8.91918 4.64687 8.21328 5.35276L7.16195 6.38963C6.43408 7.12501 6.3384 7.87514 6.9119 8.43389C7.08101 8.6102 7.33105 8.72064 7.65451 8.7793C7.54408 9.0146 7.31631 9.28692 7.10297 9.43374C6.88241 9.39703 6.60287 9.22041 6.36757 8.97789C5.45586 8.07341 5.55155 6.94117 6.61762 5.86759L7.69122 4.80154C8.74286 3.74992 9.86039 3.6765 10.7649 4.58098ZM3.97032 11.3751C3.05861 10.4706 3.13924 9.3528 4.19841 8.30871L5.46276 7.03685C5.35295 7.3898 5.36017 7.80141 5.47782 8.08094L4.73489 8.82354C4.01424 9.52221 3.93361 10.272 4.50712 10.8383C5.07341 11.3971 5.82324 11.3089 6.52193 10.603L7.57326 9.56614C8.30112 8.83075 8.39681 8.08094 7.82331 7.52219C7.6542 7.34556 7.40415 7.23513 7.08069 7.17646C7.19081 6.94117 7.4189 6.66916 7.63224 6.52202C7.8528 6.55873 8.13202 6.73536 8.37485 6.97787C9.27935 7.88235 9.18366 9.00738 8.11759 10.0806L7.04399 11.1545C5.99235 12.2058 4.87482 12.2796 3.97032 11.3751Z" fill="white" />
        //     </svg>,
        //     href: '/goals-and-targets'
        // },
        {
            title: 'Referral Links',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                <path d="M7.49984 15.5C11.5957 15.5 15 12.0957 15 8C15 3.89706 11.5881 0.5 7.49231 0.5C3.3896 0.5 0 3.89706 0 8C0 12.0957 3.39681 15.5 7.49984 15.5ZM10.7649 4.58098C11.6766 5.48515 11.596 6.60297 10.5443 7.64706L9.27966 8.91923C9.38257 8.56628 9.37535 8.15436 9.2577 7.87514L10.0003 7.13223C10.721 6.42634 10.8016 5.68374 10.2281 5.11746C9.66211 4.55902 8.91918 4.64687 8.21328 5.35276L7.16195 6.38963C6.43408 7.12501 6.3384 7.87514 6.9119 8.43389C7.08101 8.6102 7.33105 8.72064 7.65451 8.7793C7.54408 9.0146 7.31631 9.28692 7.10297 9.43374C6.88241 9.39703 6.60287 9.22041 6.36757 8.97789C5.45586 8.07341 5.55155 6.94117 6.61762 5.86759L7.69122 4.80154C8.74286 3.74992 9.86039 3.6765 10.7649 4.58098ZM3.97032 11.3751C3.05861 10.4706 3.13924 9.3528 4.19841 8.30871L5.46276 7.03685C5.35295 7.3898 5.36017 7.80141 5.47782 8.08094L4.73489 8.82354C4.01424 9.52221 3.93361 10.272 4.50712 10.8383C5.07341 11.3971 5.82324 11.3089 6.52193 10.603L7.57326 9.56614C8.30112 8.83075 8.39681 8.08094 7.82331 7.52219C7.6542 7.34556 7.40415 7.23513 7.08069 7.17646C7.19081 6.94117 7.4189 6.66916 7.63224 6.52202C7.8528 6.55873 8.13202 6.73536 8.37485 6.97787C9.27935 7.88235 9.18366 9.00738 8.11759 10.0806L7.04399 11.1545C5.99235 12.2058 4.87482 12.2796 3.97032 11.3751Z" fill="white" />
            </svg>,
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

    const [isBodyClassAdded, setIsBodyClassAdded] = useState(false);

    const [sideBarActive, setSideBarActive] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedSettings = localStorage.getItem('settings');
            return storedSettings ? JSON.parse(storedSettings).sidebar : false;
        }
        return false;
    });

    const handleButtonClick = () => {
        // Toggle the state to add or remove the class
        setSideBarActive(!sideBarActive)
        localStorage.setItem('settings', JSON.stringify({ sidebar: !sideBarActive }));
        setIsBodyClassAdded((prev) => !prev);
    };

    useEffect(() => {
        if (sideBarActive) {
            document.body.classList.add('body-active');
        } else {
            document.body.classList.remove('body-active');
        }

        // Cleanup: remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('body-active');
        };
    }, [sideBarActive]);

    return (




        <nav id="sidebar" className={`sidebar sidebar-mask active ${isExpanded ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="sidebar__inner scrollCustom">
                <div className="site-logo onlyDesktop">

                    {/* <a href="#" className="inbl valigntop logo">
                        <Image src={LogoIcon} alt='LogoIcon' width={30} className='tiny-sidebar' />
                        <Image src={Logo} alt='LogoIcon' width={145} className='max-sidebar' />
                    </a>*/}

                    <div className='logo-text-wrap'>

                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="15" viewBox="0 0 49 15" fill="none">
                            <path d="M37.125 14.6921V0.30835H49.0018V2.95906H40.0017V6.16458H48.6731V8.81529H40.0017V12.0208H49.0018V14.6921H37.125Z" fill="white" />
                            <path d="M34.5232 0.30835V14.6921H31.6465V0.30835H34.5232Z" fill="white" />
                            <path d="M17.0701 7.52063C17.0701 10.2946 19.166 12.2467 22.0839 12.2467C24.1592 12.2467 25.7825 11.2809 26.5839 9.71929H29.625C28.7415 12.9453 25.7825 15.0002 22.0839 15.0002C17.5838 15.0002 14.1934 11.7947 14.1934 7.52063C14.1934 3.18497 17.5633 0 22.0839 0C25.7825 0 28.7209 2.05482 29.625 5.28088H26.5839C25.8031 3.69867 24.1798 2.75345 22.0839 2.75345C19.1455 2.75345 17.0701 4.68498 17.0701 7.52063Z" fill="white" />
                            <path d="M0 14.6921V0.30835H7.27405C10.2535 0.30835 12.2673 1.78782 12.2673 4.06866C12.2673 5.48649 11.3837 6.65773 10.0275 7.31528C11.8152 7.91117 12.9248 9.10297 12.9248 10.6852C12.9248 13.0893 10.5207 14.6921 7.27405 14.6921H0ZM9.5138 4.52072C9.5138 3.47277 8.56859 2.77413 7.27405 2.77413H2.87674V6.22622H7.27405C8.48639 6.22622 9.5138 5.50704 9.5138 4.52072ZM10.0275 10.418C10.0275 9.2468 9.0001 8.60981 7.27405 8.60981H2.87674V12.2057H7.27405C8.93845 12.2057 10.0275 11.5276 10.0275 10.418Z" fill="white" />
                        </svg>

                        <div className='logo_sub'>Students Management Portal</div>

                    </div>

                    {
                        sideBarActive &&
                        <button onClick={handleButtonClick} type="button" className="inbl bgnone bdrnone pdnone valigntop sbarCollapsebtn sidebarCollapse">
                            <MenuOpen />
                        </button>
                    } 
                    <div className='logo-text-small'>
                        BCIE
                        <button onClick={handleButtonClick} type="button" className="inbl bgnone bdrnone pdnone valigntop sbarCollapsebtn sidebarCollapse">
                            <MenuOpen />
                        </button>
                    </div>
                    {
                        !sideBarActive &&
                        <button onClick={handleButtonClick} type="button" className="inbl bgnone bdrnone pdnone valigntop sbarCollapsebtn sidebarCollapse">
                            <Menu />
                        </button>
                    }



                </div>

                <ul className="list-unstyled components mainList" id="menuList">

                    {
                        SideBarOptions?.map((obj, index) => (

                            <li className={router?.route == obj?.href ? 'sidebar-selected' : ''} key={index}><Link href={obj?.href}>{obj?.icon}<span>{obj?.title}</span></Link></li>
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
