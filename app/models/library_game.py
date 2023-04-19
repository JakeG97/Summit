from .db import db, environment, SCHEMA, add_prefix_for_prod


class LibraryGame(db.Model):
    __tablename__ = 'library_games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))

    # * Relationships
    user = db.relationship('User', back_populates=('library_games'))
    game = db.relationship('Game', back_populates=('library_games'))



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'title': self.game.title,
            'banner_image': self.game.banner_image,
            'price': self.game.price
        }