import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client';
//
import { Chat, Contact, Home, Login, ResetPassword, Register } from './../pages';
import './style.css';

//const socket = io('localhost:3443');

function Container() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='chat' element={<Chat />} />
					<Route path='contact' element={<Contact />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='reset-password' element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default Container;
