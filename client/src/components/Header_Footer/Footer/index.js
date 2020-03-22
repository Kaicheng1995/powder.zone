import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';



const Footer = () => {
	return (
		<footer className="bck_b_dark">
			<div className="container">
				<div className="logo">
					POWDER
				</div>
				<div className="wrapper">
					<div className="left">
						<h2>Contact information</h2>
						<div className="business_nfo">
							<div className="tag">
								<FontAwesomeIcon
									icon={faCompass}
									className="icon"
								/>
								<div className="nfo">
									<div>Address</div>
									<div>123</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon
									icon={faPhone}
									className="icon"
								/>
								<div className="nfo">
									<div>Phone</div>
									<div>456</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon
									icon={faClock}
									className="icon"
								/>
								<div className="nfo">
									<div>Working Hours</div>
									<div>Mon-Sun/ 9am-8pm</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="icon"
								/>
								<div className="nfo">
									<div>Email</div>
									<div>kaicheng_jia@126.com</div>
								</div>
							</div>
						</div>
					</div>
					<div className="left">
						<h2> No friends on powder day!</h2>
						<div>
							<div>
								Check out the lastest snowboards, get equiped and go snowboarding!
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;