var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    var status = this.attributes.like;
    // if (status) {
    //   return !status;
    // } else {
    //   return !status;
    // }
    //console.log(this.attributes);
    // this.attributes.like = !status;
    // this.collection.sort();
    //console.log(this.get('like'));
    var opposite = !this.get('like');
    this.set('like', opposite); 
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
  },
  
  comparator: 'title',

  sortByField: function(field) {
    // console.log(this);
    this.comparator = field;
    this.sort();
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({
  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    this.render();
  
    //.on('click', this.handleClick) 
  },

  events: {
    'click button': 'handleClick',
    'click like': 'toggleLike'
  },

  handleClick: function() {
    // your code 
    console.log(this.model.attributes);
    this.model.attributes.like.toggleLike();
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
