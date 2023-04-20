from .db import db, environment, SCHEMA, add_prefix_for_prod


class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    price = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String(255), nullable=False)
    short_description = db.Column(db.Text, nullable=False)
    full_description = db.Column(db.Text, nullable=False)
    developer = db.Column(db.String(100), nullable=False)
    publisher = db.Column(db.String(100), nullable=False)
    banner_image = db.Column(db.String(255))
    other_images = db.Column(db.JSON)


    
    # * Relationship to reviews
    reviews = db.relationship('Review', back_populates='game')

    # * Relationship to library_games
    library_games = db.relationship('LibraryGame', back_populates='game')

    # * Relationship to cart_games
    cart_games = db.relationship('CartGame', back_populates='game')


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'price': self.price,
            'release_date': self.release_date,
            'short_description': self.short_description,
            'full_description': self.full_description,
            'developer': self.developer,
            'publisher': self.publisher,
            'banner_image': self.banner_image,
            'other_images': self.other_images,
        }

    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'price': self.price,
            'other_images': self.other_images
        }