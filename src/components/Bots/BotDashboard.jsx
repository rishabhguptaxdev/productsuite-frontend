import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCreateBot, showViewBots } from "../../redux/botSlice";
import CreateBot from "./CreateBot";
import BotList from "./BotList";

const BotDashboard = () => {
	const dispatch = useDispatch();

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
