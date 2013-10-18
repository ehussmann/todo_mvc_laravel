var app = app || {};

// The Application
// ---------------


//AppView is the top level UI
app.AppView = Backbone.View.extend({

	//bind to existing HTML DOM
	el : '#todoapp',

	statsTemplate: _.template( $('#stats-template').html() ),

	//delegated events for creating and clearing items
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed. Kick things off by
	// loading any preexisting todos that might be saved in *localStorage*.
	initialize: function() {
		this.input = this.$('#new-todo');
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		window.app.Todos.on('add', this.addOne, this);
		window.app.Todos.on('reset', this.addAll, this);
		window.app.Todos.on('change:completed', this.filterOne, this);
		window.app.Todos.on('filter', this.filterAll, this);
		window.app.Todos.on('all', this.render, this);

		app.Todos.fetch();
	},

	// Re-rendering the App just means refreshing the statistics -- the rest
	// of the app doesn't change.
	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		//console.log(completed);

		if (app.Todos.length) {
			this.$main.fadeIn();
			this.$footer.fadeIn();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/'+ (app.TodoFilter || '')+ '"]')
				.addClass('selected');
		} else {
			this.$main.fadeOut();
			this.$footer.fadeOut();
		}

		this.allCheckbox.checked = !remaining;
	},

	addOne: function(todo){
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},

	//reset: clear the current list then add everything from localStorage
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},

	filterOne: function(todo){
		todo.trigger('visible');
	},

	filterAll: function(){
		app.Todos.each(this.filterOne, this);
	},


	//Generate the attributes for a new Todo item
	newAttributes: function() {
		return {
			title: this.input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	//hitting RETURN in input field creats a new Todo Model and stores it in localStorage
	createOnEnter: function(e) {
		if(e.which !== ENTER_KEY || !this.input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes() );
		this.input.val('');
	},

	//clear call completed todo items, destroying their models
	clearCompleted: function() {
		_.each( window.app.Todos.completed(), function(todo){
			todo.destroy();
		});

		return false;
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function( todo ) {
			todo.save({
				'completed': completed
			});
		});
	}

});