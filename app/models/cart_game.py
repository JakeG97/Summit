from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartGame(db.Model):
    __tablename__ = 'cart_games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    # * Relationships
    user = db.relationship('User', backref=db.backref('cart_items'))
    game = db.relationship('Game', backref=db.backref('cart_items'))