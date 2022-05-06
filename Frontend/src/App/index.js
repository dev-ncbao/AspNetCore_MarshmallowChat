import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//
import { ContactProvider } from './../stores/contact';
import { IOProvider } from './../stores/io'
import { ChatProvider } from './../stores/chat';
import { Chat, Contact, Home, Login, ResetPassword, Register } from './../pages';
import {  ChatPanel } from './../features';
import './style.css';

function Container() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<IOProvider><Home /></IOProvider>}>
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
