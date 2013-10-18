var app = app || {};

var TodoList = Backbone.Collection.extend({

	model: app.Todo,

	//localStorage: new Backbone.LocalStorage('todos-backbone'),

	//optional -- connect to PHP-driven API
	url: '/Backbone/todo_laravel/public/todos',

	//filter list of finished todo items
	completed: function() {
		return this.filter(function( todo ){
			if(todo.get('completed') == 1 ) {
				return true;
			} else {
				return false;
			}
		});
	},

	//filter list of un-finished items
	remaining: function() {
		return this.without.apply( this, this.completed() );
	},

	// We keep the Todos in sequential order, despite being saved by unordered
    	// GUID in the database. This generates the next order number for new items.
    	nextOrder: function() {
    		if( !this.length) {
    			return 1;
    		}
    		return this.last().get('order') + 1;
    	},

    	//Sort todos by original insertion order
    	comparator: function (todo) {
    		return todo.get('order');
    	}
});

//Create the global collection of todos
app.Todos = new TodoList();