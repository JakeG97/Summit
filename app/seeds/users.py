from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        profile_picture='https://www.tampabay.com/resizer/U9y6xNaXD6F82OsZlcnbfqE7_6U=/arc-anglerfish-arc2-prod-tbt/public/22EPXFJIZZAGDLE3BISWEL5W5A.jpg'
        )
    user_2 = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        profile_picture='https://b2059463.smushcdn.com/2059463/wp-content/uploads/2019/09/crash-testing-dummies1.jpg'
        )
    user_3 = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        profile_picture='https://b2059463.smushcdn.com/2059463/wp-content/uploads/2019/09/crash-testing-dummies1.jpg'
        )

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()