import { Link } from "react-router";

function Footer() {
    return (
        <>
            <footer className="bg-content flex justify-center items-center h-25 gap-5">
                <Link to="/terms-of-services" className="hover:opacity-25 transition-opacity">Terms of Services</Link>
                <Link to="/privacy-policy" className="hover:opacity-25 transition-opacity">Privacy Policy</Link>
            </footer>
        </>
    );
}

export default Footer;