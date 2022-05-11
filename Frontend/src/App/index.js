import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//
import { Provider as ContactProvider } from './../stores/contact';
import {  Provider as ChatProvider } from './../stores/chat';
import { Chat, Contact, Home, Login, ResetPassword, Register } from './../pages';
import {  ChatPanel } from './../features';
import './style.css';

function Container() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='chat' element={<ChatProvider><Chat /></ChatProvider>} >
						<Route path=':id' element={<ChatPanel />} />
					</Route>
					<Route path='contact' element={<ContactProvider><Contact /></ContactProvider>} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='reset-password' element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default Container;
