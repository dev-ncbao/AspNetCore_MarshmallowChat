import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client';
//
import { ContactProvider } from './../stores/contact';
import { Chat, Contact, Home, Login, ResetPassword, Register } from './../pages';
import { FriendMenu } from './../features';
import './style.css';

//const socket = io('localhost:3443');

function Container() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='chat' element={<Chat />} />
					<Route path='contact' element={<ContactProvider><Contact /></ContactProvider>} >
						<Route path='friend' element={<FriendMenu />}/>
						<Route path='group' />
					</Route>
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='reset-password' element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default Container;
