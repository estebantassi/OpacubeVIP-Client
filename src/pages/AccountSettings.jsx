import { Button } from "../components/Button";
import { useModal } from "../contexts/ModalContext";

function AccountSettingsPage() {

    const { ShowModal } = useModal();

    const request = async() => {
        ShowModal("This will permanently delete ALL of your data from the server. Are you sure you want to keep going ?");
    };

    return (
        <>
        <h1>Settings</h1>

        <Button className="self-end" onClick={request} type="danger">Delete my account</Button>
        </>
    );
}

export default AccountSettingsPage;
