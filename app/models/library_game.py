from .db import db, environment, SCHEMA, add_prefix_for_prod


class LibraryGame(db.Model):
    __tablename__ = 'library_games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # * Relationships 💚

