import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
	return (
		<div className="page_wrapper">
			<div className="container">
				<div className="register_login_container">
					<div className="left">
						<h1>New Customers</h1>
						<p> No friends on power days!</p>
						<p> If you haven't had an account yet,
						just click the button below and create one! </p>
						<MyButton
							type="default"
							title="Create an account"
							linkTo="/register"
							addStyle={{
								margin:'10px 0 0 0'
							}}/>
					</div>
					<div className="right">
						<h2> Registered Customers</h2>
						<p> If you have an account, please log in. </p>
						<Login/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterLogin;