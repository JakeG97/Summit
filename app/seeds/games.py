from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text


def seed_games():
    game_1 = Game(
        title = "Elden Ring",
        image = "https://images4.alphacoders.com/115/thumb-1920-1151249.jpg",
        price = 59.99,
        release_date = "Feb 24, 2022",
        short_description = "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        full_description = "The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. In the Lands Between ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree, has been shattered.",
        developer = "FromSoftware Inc.",
        publisher = "FromSoftware Inc., Bandai Namco Entertainment",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        other_images=[
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQho0e5kgNvs/v0/-1x-1.jpg", 
            "https://npr.brightspotcdn.com/dims4/default/cb18431/2147483647/strip/true/crop/3813x2144+0+0/resize/1760x990!/format/webp/quality/90/?url=https%3A%2F%2Fmedia.npr.org%2Fassets%2Fimg%2F2022%2F02%2F23%2Feldenring_21_4k-25120461292d0c3a0414.08944875_wide-319af7cfd3c138293a179491fcfc58e15405f536.jpg",
            "https://media.wbur.org/wp/2022/12/ss_b70e156adf9e40aed24c10fb352b7813586e7290-1000x563.jpg",
            "https://i.pcmag.com/imagery/articles/02s4c2TYdlF5USyDFRjb85x-1.fit_lim.size_1600x900.v1634568542.jpg"]
    )

    db.session.add(game_1)
    db.session.commit()

def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()