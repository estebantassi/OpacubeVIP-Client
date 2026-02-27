import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext.js';

import Anyroute from './routes/AnyRoute.js';
import Protectedroute from './routes/ProtectedRoute.js';
import Unprotectedroute from './routes/UnprotectedRoute.js';

import LoginPage from './pages/Login.js';
import HomePage from './pages/Home.js';
import ProfilePage from './pages/Profile.js';
import LogoutPage from './pages/Logout.js';
import AccountSettingsPage from './pages/AccountSettings.js';
import { ModalProvider } from './contexts/ModalContext.js';
import { ToastProvider } from './contexts/ToastContext.js';
import SignupPage from './pages/Signup.js';
import TermsOfServicesPage from './pages/TermsOfServices.js';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.js'; // Brave blocks the filename "privacypolicy"

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ToastProvider>
			<ModalProvider>
				<AuthProvider>

					<Routes>

						<Route element={<Anyroute />}>
							<Route path="/" element={<Navigate to="/home" replace />} />
							<Route path="*" element={<Navigate to='/home' replace />} />
							<Route path="/home" element={<HomePage />} />

							<Route path="/tos" element={<Navigate to="/terms-of-services" replace />} />
							<Route path="/terms-of-services" element={<TermsOfServicesPage />} />

							<Route path="/pp" element={<Navigate to="/privacy-policy" replace />} />
							<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
						</Route>

						<Route element={<Unprotectedroute />}>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
						</Route>

						<Route element={<Protectedroute />}>
							<Route path="/logout" element={<LogoutPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/accountsettings" element={<AccountSettingsPage />} />
						</Route>

					</Routes>

				</AuthProvider>
			</ModalProvider>
		</ToastProvider>
	</BrowserRouter>
);