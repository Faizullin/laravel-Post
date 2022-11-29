import DashboardLayout from "@/Layouts/DashboardLayout";
import EditPasswordForm from "./EditPasswordForm";
import EditProfileForm from "./EditProfileForm";

export default function Profile({auth}){
    return (
        <DashboardLayout>
            <EditProfileForm />
            <EditPasswordForm />
        </DashboardLayout>
    );
}
