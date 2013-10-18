var app = app || {};

//Individual Todo Item View
//=========================


//create the DOM element for the todo item
app.TodoView = Backbone.View.extend({

	tagName: 'li',
	template: _.template( $('#item-template').html() ),

	//bind events to the specific item
	events: {
		'click .toggle': 'togglecompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	completed: false,

	// The TodoView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correspondence between a **Todo** and a **TodoView** in this
	// app, we set a direct reference on the model for convenience.
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.model.on('visible', this.toggleVisible, this);
	},

	// Re-renders the todo item to the current state of the model and
	// updates the reference to the todo's edit input within the view.
	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );

		if(this.model.get('completed') == 1) {
			this.$el.addClass( 'completed');
		} else {
			this.$el.removeClass('completed');
		}

		this.toggleVisible();
		this.input = this.$('.edit');
		return this; 
	},


	toggleVisible: function() {
		this.$el.toggleClass( 'hidden', this.isHidden());
	},

	isHidden: function(){
		var isCompleted = this.model.get('completed') == 1 ? true : false;
		return (
			(!isCompleted && app.TodoFilter === 'completed') 
			|| (isCompleted && app.TodoFilter === 'active')
		);
	},

	togglecompleted: function(){
		this.model.toggle();
	},

	//switch this view in to editing mode and display input
	edit: function(){
		this.$el.addClass('editing');
		this.input.focus();
	},

	close: function(){
		var value= this.input.val().trim();

		if( value ) {
			this.model.save({ title: value });
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
		if(e.which === ENTER_KEY) {
			this.close();
		}
	}, 

	// Remove the item, destroy the model from *localStorage* and delete its view.
	clear: function() {
		this.model.destroy();
	}

});