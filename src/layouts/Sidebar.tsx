import {
    LogoutOutlined,
    DashboardOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { authActions, authState } from "@/valtio/auth";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    onClick?: () => void;
}

const SidebarItem = ({ icon, href, label, onClick }: SidebarItemProps) => {
    const pathname = window.location.pathname;

    const activeStyle =
        !onClick && href === pathname && "bg-primary text-white";

    return (
        <Link
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition ${activeStyle}`}
            to={onClick ? "#" : href}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};

const Sidebar = () => {
    const authSnap = useSnapshot(authState);

    return (
        <nav className="bg-secondary min-w-[250px]">
            {authSnap.profile && (
                <div className="flex flex-col items-center gap-2 py-4">
                    <img
                        className="w-20 h-20 rounded-full border-2 border-tertiary"
                        src={authSnap.profile.photoURL}
                        alt="avatar"
                    />
                    <p className="text-lg">{authSnap.profile.displayName}</p>
                </div>
            )}

            <SidebarItem
                icon={<DashboardOutlined />}
                label="Bảng điều khiển"
                href="/"
            />

            <SidebarItem
                icon={<ProfileOutlined />}
                label="Hồ sơ"
                href="/profile"
            />

            <SidebarItem
                icon={<SettingOutlined />}
                label="Quản lý thiết bị"
                href="manage"
            />

            <SidebarItem
                icon={<LogoutOutlined />}
                label="Đăng xuất"
                href="/"
                onClick={async () => {
                    await authActions.logout();
                }}
            />
        </nav>
    );
};

export default Sidebar;