from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text


def seed_games():
    game_1 = Game(
        title = "Elden Ring",
        image = "https://images4.alphacoders.com/115/thumb-1920-1151249.jpg",
        price = "$59.99",
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
    game_2 = Game(
        title = "Red Dead Redemption 2",
        image = "https://images5.alphacoders.com/917/917971.jpg",
        price = "$39.99",
        release_date = "Dec 5, 2019",
        short_description = "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.",
        full_description = "After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.",
        developer = "Rockstar Games",
        publisher = "Rockstar Games",
        banner_image = "https://www.amd.com/system/files/2019-10/348038-red-dead-redemption-banner-1920x600.jpg",
        other_images=[
            "https://assets.rockpapershotgun.com/images/2019/10/Red-Dead-Redemption-2-4K-screen2-690x388.jpg", 
            "https://i.pcmag.com/imagery/articles/057aIMAOvxvccho9Qhc2ve3-1.fit_lim.size_1600x900.v1626288959.png",
            "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2020/02/red-dead-redemption-2-red-dead-online-hackers-gta-online-snowing-mountains-580x334.jpg",
            "https://s26162.pcdn.co/wp-content/uploads/2020/05/red-dead-redemption-2-xbox-game-pass.jpg"]
    )
    game_3 = Game(
        title = "Counter-Strike: Global Offensive",
        image = "https://www.cynopsis.com/wp-content/uploads/2023/03/csgo-0309.jpeg",
        price = "Free",
        release_date = "Aug 21, 2012",
        short_description = "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        full_description = "'Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC action game in the world almost immediately after its release in August 1999,' said Doug Lombardi at Valve. 'For the past 12 years, it has continued to be one of the most-played games in the world, headline competitive gaming tournaments and selling over 25 million units worldwide across the franchise. CS: GO promises to expand on CS' award-winning gameplay and deliver it to gamers on the PC as well as the next gen consoles and the Mac.'",
        developer = "Valve, Hidden Path Entertainment",
        publisher = "Valve",
        banner_image = "https://www.gamopo.com/wp-content/uploads/2018/11/image3-4.png",
        other_images=[
            "https://www.nme.com/wp-content/uploads/2021/04/Counter-strike-esports-cheating-FBI-1392x884.jpg", 
            "https://www.club386.com/wp-content/uploads/2023/03/CS-GO-Screen.jpg",
            "https://www.nme.com/wp-content/uploads/2021/06/CS-GO-jumping-screenshot-1392x884.jpg",
            "https://cdn.mos.cms.futurecdn.net/sw32BTYCJpX5JYZpVK6baj-1920-80.jpg.webp"]
    )

    db.session.add(game_1)
    db.session.add(game_2)
    db.session.add(game_3)
    db.session.commit()

def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()