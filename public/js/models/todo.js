var app = app || {};

app.Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: 0
	},

	urlRoot: '/Backbone/todo_laravel/public/todos',

	toggle: function(){
		if(this.get('completed') == 1) {
			this.save({
				completed: 0
			});
		} else {
			this.save({
				completed: 1
			});
		}
	}
});