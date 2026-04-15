'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImStatsDots } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { RiTimeLine } from "react-icons/ri";

const Navbar = ({ href }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const options =
        <div className="flex flex-col md:flex-row gap-2 md:z-100">
            <Link href="/" className={`${pathname === '/' ? 'bg-[#244D3F] text-white font-bold' : 'bg-gray-200'}  rounded-lg btn`}>
            <IoHomeOutline /> Home
            </Link>
            <Link href="/timeline" className={`${pathname === '/timeline' ? 'bg-[#244D3F] text-white font-bold' : 'bg-gray-200'} rounded-lg btn`}>
            <RiTimeLine />Timeline
            </Link>
            <Link href="/stats" className={`${pathname === '/stats' ? 'bg-[#244D3F] text-white font-bold' : 'bg-gray-200'} rounded-lg btn`}>
            <ImStatsDots />Stats
            </Link>
        </div>
    return (
        <div className="bg-white/50 backdrop-blur-md shadow-sm sticky top-0 right-0 z-20">
            <div className="navbar container mx-auto text-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {options}
                        </ul>
                    </div>
                    <div className="flex text-2xl"><p className="font-bold text-[#1F2937]">Keen</p>
                        <p className="text-[#244D3F]">Keeper</p></div>
                </div>
                <div className="navbar-end hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        {options}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;