import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext.jsx';

import Anyroute from './routes/AnyRoute.jsx';
import Protectedroute from './routes/ProtectedRoute.jsx';
import Unprotectedroute from './routes/UnprotectedRoute.jsx';

import LoginPage from './pages/Login.jsx';
import HomePage from './pages/Home.jsx';
import ProfilePage from './pages/Profile.jsx';
import LogoutPage from './pages/Logout.jsx';
import AccountSettingsPage from './pages/AccountSettings.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import SignupPage from './pages/Signup.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ToastProvider>
			<ModalProvider>
				<AuthProvider>

					<Routes>

						<Route element={<Anyroute />}>
							<Route path="/" element={<Navigate to="/home" replace />} />
							<Route path="*" element={<Navigate to='/home' replace />} />
							<Route path="/home" element={<HomePage />} />
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