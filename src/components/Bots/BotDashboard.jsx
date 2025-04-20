import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCreateBot, showViewBots } from "../../redux/botSlice";
import CreateBot from "./CreateBot";
import BotList from "./BotList";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

const BotDashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {});

	return (
		<>
			<div className="bot-dashboard">
				<div className="row">
					<div className="col-6">
						<button
							type="button"
							className="btn btn-outline-primary"
							onClick={() => {
								dispatch(showCreateBot());
							}}
						>
							create bot
						</button>
					</div>
					<div className="col-6">
						<button
							type="button"
							className="btn btn-outline-primary"
							onClick={() => {
								dispatch(showViewBots());
							}}
						>
							view bots
						</button>
					</div>
				</div>
			</div>

			<div>
				{useSelector((state) => state.bot.showCreateBot) && <CreateBot />}
				{useSelector((state) => state.bot.showViewBots) && <BotList />}
			</div>
		</>
	);
};

export default BotDashboard;
