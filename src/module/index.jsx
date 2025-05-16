import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { UserDetailScreen } from './UserDetailScreen.jsx';

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		app.Router.addRoute({
			path: "/user/:id",
			end: true,
			name: 'User',
			component: UserDetailScreen,
		});

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});
	}
}
