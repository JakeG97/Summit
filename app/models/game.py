from .db import db, environment, SCHEMA, add_prefix_for_prod


class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    release_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    short_description = db.Column(db.String(255), nullable=False)
    full_description = db.Column(db.String(255), nullable=False)
    developer = db.Column(db.String(100), nullable=False)
    publisher = db.Column(db.String(100), nullable=False)
    logo_image = db.Column(db.String(255), nullable=False)
    main_image = db.Column(db.String(255), nullable=False)
    other_images = db.Column(db.String(255))


    
    # * Relationship to reviews
    reviews = db.relationship('Review', back_populates='game')

    # * Relationship to library_games
    library_games = db.relationship('LibraryGame', back_populates='game')

    # * Relationship to cart_games
    cart_games = db.relationship('CartGame', back_populates='game')
