from app.models import db, User, Game, environment, SCHEMA, Review
from sqlalchemy.sql import text


def seed_reviews():
    user_1 = User.query.filter_by(username='Demo').first()
    user_2 = User.query.filter_by(username='marnie').first()
    user_3 = User.query.filter_by(username='bobbie').first()
    game1 = Game.query.filter_by(title='Elden Ring').first()
    game2 = Game.query.filter_by(title='Red Dead Redemption 2').first()

    review_1 = Review(reviewer=user_1, game=game1, recommended=True, description='This game is awesome')
    review_2 = Review(reviewer=user_2, game=game1, recommended=False, description='This game is not very good')
    review_3 = Review(reviewer=user_1, game=game2, recommended=True, description='I really enjoyed playing this game')
    review_4 = Review(reviewer=user_3, game=game2, recommended=True, description='Great game, highly recommended')

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
