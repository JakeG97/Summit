from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    recommended = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

     # * Relationship
    reviewer = db.relationship('User', back_populates='reviews')
    game = db.relationship('Game', back_populates='reviews')


    def to_dict(self):
        return {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'game_id': self.game_id,
            'recommended': self.recommended,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }