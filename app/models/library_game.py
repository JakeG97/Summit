from .db import db, environment, SCHEMA, add_prefix_for_prod


class LibraryGame(db.Model):
    __tablename__ = 'library_games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    library_title = db.Column(db.String(255))
    library_banner_image = db.Column(db.String(255))

    # * Relationships
    user = db.relationship('User', back_populates=('library_games'))
    game = db.relationship('Game', back_populates=('library_games'))


    def to_dict(self):
        title = self.library_title or (self.game.title if self.game else "")
        banner_image = self.library_banner_image or (self.game.banner_image if self.game else "")
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'title': title,
            'banner_image': banner_image,
        }



    def to_dict_update(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'title': self.library_title,
            'banner_image': self.library_banner_image,
        }


    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'user_id': self.user_id,
    #         'game_id': self.game_id,
    #         'title': self.game.title if self.game else None,
    #         'banner_image': self.game.banner_image if self.game else None,
    #     }

    # def to_dict_update(self):
    #     return {
    #         'id': self.id,
    #         'user_id': self.user_id,
    #         'game_id': self.game_id,
    #         'title': self.title,
    #         'banner_image': self.banner_image
    #     }