from app.models import db, User, Game, environment, SCHEMA, Review
from sqlalchemy.sql import text


def seed_reviews():
    user_1 = User.query.filter_by(username='Demo').first()
    user_2 = User.query.filter_by(username='marnie').first()
    user_3 = User.query.filter_by(username='StogieGeneral').first()
    game1 = Game.query.filter_by(title='Elden Ring').first()
    game2 = Game.query.filter_by(title='Red Dead Redemption 2').first()
    game3 = Game.query.filter_by(title='Counter-Strike: Global Offensive').first()
    game4 = Game.query.filter_by(title='Rainbow Six Seige').first()
    game5 = Game.query.filter_by(title='Furi').first()
    game6 = Game.query.filter_by(title='DiRT Rally 2.0').first()
    game7 = Game.query.filter_by(title='Devil May Cry 5').first()
    game8 = Game.query.filter_by(title='Portal 2').first()
    game9 = Game.query.filter_by(title='Hunt: Showdown').first()
    game10 = Game.query.filter_by(title='ARMORED CORE VI FIRES OF RUBICON').first()
    

    review_1 = Review(reviewer=user_1, game=game1, recommended=True, description="After I started playing this I lost my job, my wife left me, my kids don't speak to me anymore, and she took the dog... Best game I've ever played")
    review_2 = Review(reviewer=user_2, game=game1, recommended=True, description="I wanted to hate this game cause I'm a hipster that doesn't like things other people like but it's just too good.")
    review_3 = Review(reviewer=user_1, game=game2, recommended=True, description="I jumped off a mountain with my horse and sniped somebody at the bottom.. what more could you want?")
    review_4 = Review(reviewer=user_3, game=game2, recommended=False, description="Title makes no sense.. I thought there was gonna be a lot of red dead things and all I got was an amazing cowboy game. DON'T BUY IT!")
    review_5 = Review(reviewer=user_1, game=game3, recommended=True, description="I've been playing this game for so long and I think I hate myself for it but I for some reason keep playing. Would recommend.")
    review_6 = Review(reviewer=user_2, game=game3, recommended=False, description="If you want a game where you actually have to have any fraction of skill to do any good the this is the game for you. I suck at games.")
    review_7 = Review(reviewer=user_1, game=game4, recommended=True, description="You ever see John Wick and think that would be fun to have a game like that? Me too, this game gets pretty close though. I guess")
    review_8 = Review(reviewer=user_3, game=game4, recommended=True, description="I click heads and win, what more could you want?")
    review_9 = Review(reviewer=user_1, game=game5, recommended=True, description="Had no clue what this game was. Best soundtrack I've ever heard and it made me git gud. Get it!")
    review_10 = Review(reviewer=user_2, game=game5, recommended=True, description="If you like heavy bass music and feeling like an untouchable god then you found your game.")
    review_11 = Review(reviewer=user_1, game=game6, recommended=True, description="Best rally sim out there don't you even think about arguing with me.")
    review_12 = Review(reviewer=user_3, game=game6, recommended=False, description="Thought this game would teach me how to drive, instead at my driving exam I didn't pass and in the comments section of my results the instructore wrote, 'Student would not stop asking for how harsh the upcoming turns were and kept trying to shift when it's an automatic, asking where his push pull shifter was.'")
    review_13 = Review(reviewer=user_2, game=game6, recommended=True, description="Samir! You are breaking the car Samir!")
    review_14 = Review(reviewer=user_1, game=game7, recommended=True, description="I'm a weeb. This game is perfection.")
    review_15 = Review(reviewer=user_2, game=game7, recommended=True, description="I like playing as the big cool pizza man!")
    review_16 = Review(reviewer=user_2, game=game8, recommended=True, description="One of the most confusing yet fun games I've ever played!")
    review_17 = Review(reviewer=user_1, game=game8, recommended=False, description="Played coop with my best friend. We ended up getting into a huge fight and are now both hospitalized :(")
    review_18 = Review(reviewer=user_3, game=game9, recommended=True, description="This game is basically a menu music simulator with how bad I am at the game... the soundtrack is a banger!!")
    review_19 = Review(reviewer=user_2, game=game9, recommended=False, description="A fireguy blew up a barrel next to me on a really good run and I now have a monitor with a mouse stuck in it..")
    review_20 = Review(reviewer=user_2, game=game10, recommended=True, description="I haven't even played this game yet and I know it's amazing!")
    review_21 = Review(reviewer=user_3, game=game10, recommended=True, description="big Robot with big gun make big boom")

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)
    db.session.add(review_11)
    db.session.add(review_12)
    db.session.add(review_13)
    db.session.add(review_14)
    db.session.add(review_15)
    db.session.add(review_16)
    db.session.add(review_17)
    db.session.add(review_18)
    db.session.add(review_19)
    db.session.add(review_20)
    db.session.add(review_21)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
