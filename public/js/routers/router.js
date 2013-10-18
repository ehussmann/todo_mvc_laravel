var Workspace = Backbone.Router.extend({

	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function( param ) {
		window.app.TodoFilter = param.trim() || '';

		// Trigger a collection filter event, causing hiding/unhiding
		// of Todo view items
		window.app.Todos.trigger('filter');
	}

});

app.TodoRouter = new Workspace();
Backbone.history.start();