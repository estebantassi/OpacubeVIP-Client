export default function PrivacyPolicyPage() {

    return (
        <>
            <div className="flex justify-center">
                <div className="text-sm lg:text-base sm:rounded-xl p-10 bg-content flex flex-col gap-5 sm:m-4 lg:w-[50vw] sm:w-[75vw] w-full items-center [&>*]:w-full [&>h2]:text-lg [&>h2:lg]:text-2xl [&>h2]:font-bold">

                    <h1 className="text-3xl lg:text-5xl font-bold">Privacy Policy</h1>

                    <h2>1. Data Controller</h2>

                    <p>
                        This website is operated by Tassi Esteban, based in France.
                        For the purposes of applicable data protection laws, including the General Data Protection Regulation (GDPR),
                        we act as the data controller of your personal data.
                    </p>

                    <p>
                        If you have any questions regarding this Privacy Policy or the handling of your personal data,
                        you may contact us at: <a className="text-blue-500 hover:opacity-75 transition-opacity" href="mailto:esteban.tassi.pro@gmail.com">esteban.tassi.pro@gmail.com</a>.
                    </p>

                    <h2>2. Data We Collect</h2>

                    <p>We collect and process the following personal data when you create and use an account:</p>

                    <div>
                        <p><strong>-Email Address:</strong> Stored in encrypted form and used for authentication and account-related communications.</p>
                        <p><strong>-Username:</strong> Either chosen by you or provided by your OAuth provider.</p>
                        <p><strong>-Profile Picture:</strong> Either uploaded by you or provided by your OAuth provider.</p>
                        <p><strong>-Authentication Data:</strong> Secure authentication-related data necessary to verify your identity. We do not store passwords, view <a target="_blank" className="text-blue-500 hover:opacity-75 transition-opacity" href="https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol">SRP</a>.</p>
                        <p><strong>-Technical Data:</strong> Basic technical information such as IP address, device, browser and login timestamps, collected for security purposes.</p>
                        <p><strong>-Cookies and Session Data:</strong> Session tokens or similar technologies required for authentication and maintaining secure sessions.</p>
                    </div>

                    <p>
                        We do not sell/share personal data and do not use personal data for advertising purposes.
                    </p>

                    <h2>3. How We Use Your Data</h2>

                    <p>We use your personal data only to:</p>

                    <div>
                        <p>-Create and manage your account</p>
                        <p>-Authenticate you securely</p>
                        <p>-Maintain platform security and prevent abuse</p>
                        <p>-Comply with applicable legal obligations</p>
                    </div>

                    <p>
                        We do not use personal data for advertising, profiling, or automated decision-making.
                    </p>


                    <p>WORK IN PROGRESS</p>

                </div>
            </div>

        </>
    );
}