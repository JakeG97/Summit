from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text


def seed_games():
    game_1 = Game(
        title = "Elden Ring",
        image = "https://images4.alphacoders.com/115/thumb-1920-1151249.jpg",
        price = "$59.99",
        release_date = "Feb 24, 2022",
        short_description = "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        full_description = "THE NEW FANTASY ACTION RPG.\nRise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.\n\nA Vast World Full of Excitement\nA vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.\n\nCreate your Own Character\nIn addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.\n\nAn Epic Drama Born from a Myth\nA multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.\n\nUnique Online Play that Loosely Connects You to Other\nIn addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.",
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
        full_description = "America, 1899.\n\nArthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.\n\nNow featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.\n\nNow featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.\n\nRed Dead Redemption 2 for PC also offers HDR support, the ability to run high-end display setups with 4K resolution and beyond, multi-monitor configurations, widescreen configurations, faster frame rates and more.",
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
        price = "Free To Play",
        release_date = "Aug 21, 2012",
        short_description = "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        full_description = "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.\n\nCS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).\n\n'Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC action game in the world almost immediately after its release in August 1999,' said Doug Lombardi at Valve. 'For the past 12 years, it has continued to be one of the most-played games in the world, headline competitive gaming tournaments and selling over 25 million units worldwide across the franchise. CS: GO promises to expand on CS' award-winning gameplay and deliver it to gamers on the PC as well as the next gen consoles and the Mac.'",
        developer = "Valve, Hidden Path Entertainment",
        publisher = "Valve",
        banner_image = "https://www.gamopo.com/wp-content/uploads/2018/11/image3-4.png",
        other_images=[
            "https://www.nme.com/wp-content/uploads/2021/04/Counter-strike-esports-cheating-FBI-1392x884.jpg", 
            "https://www.club386.com/wp-content/uploads/2023/03/CS-GO-Screen.jpg",
            "https://www.nme.com/wp-content/uploads/2021/06/CS-GO-jumping-screenshot-1392x884.jpg",
            "https://cdn.mos.cms.futurecdn.net/sw32BTYCJpX5JYZpVK6baj-1920-80.jpg.webp"]
    )
    game_4 = Game(
        title = "Rainbow Six Seige",
        image = "https://images7.alphacoders.com/521/521305.png",
        price = "$9.99",
        release_date = "Dec 1, 2015",
        short_description = "Tom Clancy's Rainbow Six® Siege is an elite, tactical team-based shooter where superior planning and execution triumph.",
        full_description = "“One of the best first-person shooters ever made. 10/10” - GameSpot.\n\nTom Clancy's Rainbow Six® Siege is an elite, realistic, tactical team-based shooter where superior planning and execution triumph. It features 5v5 attack vs. defense gameplay and intense close-quarters combat in destructible environments.\n\nEngage in a brand-new style of assault using an unrivaled level of destruction and gadgetry. On defense, coordinate with your team to transform your environments into strongholds. Trap, fortify and create defensive systems to prevent being breached by the enemy. On attack, lead your team through narrow corridors, barricaded doorways and reinforced walls. Combine tactical maps, observation drones, rappelling and more to plan, attack and defuse every situation.\n\nChoose from dozens of highly trained, Special Forces operators from around the world. Deploy the latest technology to track enemy movement. Shatter walls to open new lines of fire. Breach ceilings and floors to create new access points. Employ every weapon and gadget from your deadly arsenal to locate, manipulate and destroy your enemies and the environment around them.",
        developer = "Ubisoft Montreal",
        publisher = "Ubisoft",
        banner_image = "https://duet-cdn.vox-cdn.com/thumbor/0x0:1920x1080/1440x960/filters:focal(960x540:961x541):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24446370/rainbow_six_siege_logo_header._1.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/ss_7086825658bb256d2b8394f849ebf2abbee27f27.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/ss_cf69958ed0aa46ae6c9a15979c8d4f62f7fb694a.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/ss_e3611e379f1b6778330c26fe98bc18e119ff2af9.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/ss_acb266bd8b4deedbc72bf8fa506138700e408155.600x338.jpg"]
    )
    game_5 = Game(
        title = "Furi",
        image = "https://cdn.wallpapersafari.com/80/62/5ApLZ0.jpg",
        price = "$19.99",
        release_date = "Jul 5, 2016",
        short_description = "The jailer is the key, kill him and you'll be free.",
        full_description = "You were captured. Look what they've done to you… The jailer is the key, kill him and you'll be free.\n\nFight your way free in this ultra-responsive, fast-paced sword fighting and dual-stick shooting game.\n\nBoss design by Takashi Okazaki. Original soundtrack by Carpenter Brut, Danger, The Toxic Avenger, Lorn, Scattle, Waveshaper and Kn1ght!",
        developer = "The Game Bakers",
        publisher = "The Game Bakers",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/423230/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/423230/ss_c8e726dc261e4180224d5f0d459e609390594c8e.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/423230/ss_99a46681e5cbf7078be1e8cb22c7b885b6dcbc54.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/423230/ss_6a3030e27c35fead4be7ed87e22d9c78e577bf4b.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/423230/ss_8eb0947db73b59a2fb20e6a961362bc6eb909759.600x338.jpg"]
    )
    game_6 = Game(
        title = "DiRT Rally 2.0",
        image = "https://gamingbolt.com/wp-content/uploads/2018/12/dirt-rally-2.0-1280x720.jpg",
        price = "$19.99",
        release_date = "Feb 25, 2019",
        short_description = "DiRT Rally 2.0 dares you to carve your way through a selection of iconic rally locations from across the globe, in the most powerful off-road vehicles ever made, knowing that the smallest mistake could end your stage.",
        full_description = "DiRT Rally 2.0 dares you to carve your way through a selection of iconic rally locations from across the globe, in the most powerful off-road vehicles ever made, knowing that the smallest mistake could end your stage.\n\nYou will need to rely on your instincts with the most immersive and truly focused off-road experience yet, including a new authentic handling model, tyre choice and surface degradation. Power your rally car through real-life off-road environments in New Zealand, Argentina, Spain, Poland, Australia and the USA, with only your co-driver and instincts to guide you.\n\nRace on eight official circuits from the FIA World Rallycross championship, complete with licensed Supercars and support series.\nDevelop your team and cars around race strategies, and progress through a varied selection of Events and Championships in both a single player Career Campaign and a competitive online environment.",
        developer = "Codemasters",
        publisher = "Codemasters, Electronic Arts",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/ss_d665b13a0e96e1dd39037a1c2983c250a694a2a6.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/ss_02582d5f9a1fa7e8e06f4808b2e96ae1afa8450c.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/ss_ac43282741554b3e5f93e99c6637f66d45e864fc.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/ss_d33aab79aaa9d1e60f4783db9567313c571aa7fe.600x338.jpg"]
    )
    game_7 = Game(
        title = "Devil May Cry 5",
        image = "https://www.devilmaycry.com/5/assets/img/common/share.png",
        price = "$29.99",
        release_date = "Mar 7, 2019",
        short_description = "The ultimate Devil Hunter is back in style, in the game action fans have been waiting for.",
        full_description = "The Devil you know returns in this brand new entry in the over-the-top action series available on the PC. Prepare to get downright demonic with this signature blend of high-octane stylized action and otherworldly & original characters the series is known for. Director Hideaki Itsuno and the core team have returned to create the most insane, technically advanced and utterly unmissable action experience of this generation!\n\nThe threat of demonic power has returned to menace the world once again in Devil May Cry 5. The invasion begins when the seeds of a “demon tree” take root in Red Grave City. As this hellish incursion starts to take over the city, a young demon hunter Nero, arrives with his partner Nico in their “Devil May Cry” motorhome. Finding himself without the use of his right arm, Nero enlists Nico, a self-professed weapons artist, to design a variety of unique mechanical Devil Breaker arms to give him extra powers to take on evil demons such as the blood sucking flying Empusa and giant colossus enemy Goliath.\n\nFEATURES\nHigh octane stylized action – Featuring three playable characters each with a radically different stylish combat play style as they take on the city overrun with demons\n\nGroundbreaking graphics – Developed with Capcom’s in-house proprietary RE engine, the series continues to achieve new heights in fidelity with graphics that utilize photorealistic character designs and stunning lighting and environmental effects.\n\nTake down the demonic invasion – Battle against epic bosses in adrenaline fueled fights across the over-run Red Grave City all to the beat of a truly killer soundtrack.\n\nDemon hunter – Nero, one of the series main protagonists and a young demon hunter who has the blood of Sparda, heads to Red Grave City to face the hellish onslaught of demons, with weapons craftswoman and new partner-in-crime, Nico. Nero is also joined by stylish, legendary demon hunter, Dante and the mysterious new character, V.",
        developer = "CAPCOM Co., Ltd.",
        publisher = "CAPCOM Co., Ltd.",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/ss_4410bada2565843dae693b03ac3a50256ff5dd66.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/ss_4ce180ed8979a51c72de51f985e9e9ba13500508.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/ss_e2be70565f94a7f6c392cccddce08c67f2f87612.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/ss_d1e0b403f593f17ad195c5382a7788d71c6f406a.600x338.jpg"]
    )
    game_8 = Game(
        title = "Portal 2",
        image = "https://www.wallpaperflare.com/static/20/532/26/video-games-portal-2-chell-p-body-wallpaper.jpg",
        price = "$9.99",
        release_date = "Apr 18, 2011",
        short_description = "The 'Perpetual Testing Initiative' has been expanded to allow you to design co-op puzzles for you and your friends!",
        full_description = "Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following.\n\nThe single-player portion of Portal 2 introduces a cast of dynamic new characters, a host of fresh puzzle elements, and a much larger set of devious test chambers. Players will explore never-before-seen areas of the Aperture Science Labs and be reunited with GLaDOS, the occasionally murderous computer companion who guided them through the original game.\n\nThe game's two-player cooperative mode features its own entirely separate campaign with a unique story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew about portals. Success will require them to not just act cooperatively, but to think cooperatively.",
        developer = "Valve",
        publisher = "Valve",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/620/ss_f3f6787d74739d3b2ec8a484b5c994b3d31ef325.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/620/ss_6a4f5afdaa98402de9cf0b59fed27bab3256a6f4.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/620/ss_0cdd90fafc160b52d08b303d205f9fd4e83cf164.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/620/ss_3d13161104a04603a0524536770c5f74626db4c0.600x338.jpg"]
    )
    game_9 = Game(
        title = "Hunt: Showdown",
        image = "https://wallpapercave.com/wp/wp4770708.jpg",
        price = "$39.99",
        release_date = "Aug 27, 2019",
        short_description = "Hunt: Showdown is a high-stakes, tactical PvPvE first-person shooter. Hunt for bounties in the infested Bayou, kill nightmarish monsters and outwit competing hunters - alone or in a group - with your glory, gear, and gold on the line.",
        full_description = "HUNT TOGETHER. DIE ALONE.\n\nThe year is 1895, and you are a Hunter tasked with eliminating the savage, nightmarish monsters that have infested the Louisiana Bayou. Play alone or in teams of two or three, as you search for clues to help you track your target and compete against other Hunters who are after the same reward. Kill and banish your target, collect the bounty, and then get ready for the showdown; once the bounty is in your hands every other Hunter on the map will be after your prize. Show no mercy as you fight through a dark, ruthless world with brutal, period-inspired weapons, as you level up, unlock gear, and collect experience and gold for your Bloodline.\n\nHIGH-RISK, HIGH-REWARD, HIGH-TENSION GAMEPLAY\n\nCompetitive, match-based gameplay combines PvP and PvE elements to create a uniquely tense PvEvP experience where your character and your gear are always on the line. Succeed, and you will be rewarded handsomely but remember - a single mistake could cost you your Hunter - and any gear they were carrying.",
        developer = "Crytek",
        publisher = "Crytek",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/594650/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/594650/ss_ecccaab1143081ca96d8bf00d8b1c4d3d3291e64.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/594650/ss_36f6d959f75d1cca48c2a98d892d2697f6d4bde6.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/594650/ss_f2a2d3445a568c0748aca08a44f45ceac4810cb4.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/594650/ss_4697d48347130eaf48e03e92556252f6b8744428.600x338.jpg"]
    )
    game_10 = Game(
        title = "ARMORED CORE VI FIRES OF RUBICON",
        image = "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/capsule_616x353.jpg",
        price = "$59.99",
        release_date = "Aug 25, 2023",
        short_description = "A new action game based on the concept of the ARMORED CORE series that uses the knowledge gained from FromSoftware's recent action game development.",
        full_description = "Combining FromSoftware’s longstanding expertise in mech games with their signature action gameplay, ARMORED CORE VI FIRES OF RUBICON brings a brand-new action experience to the series.\n\nDynamic, Omni-directional Battles\nPlayers will pilot their mech in fast-paced, omni-directional battles, taking advantage of massive stages and their mech's mobility on land and in the air to ensure victory.\n\nCustomized Parts for Individual Battle Styles\nCustomize Armored Core parts to suit a large variety of playstyles. Selecting different parts not only changes the mech’s attacks, but also directly affects its movement and battle style, so each mission can be approached with a unique mech strategy.\n\nThrilling Boss Battles\nDeploy a wide variety of offensive and defensive tactics at close and long range to take down powerful enemy bosses.",
        developer = "FromSoftware Inc.",
        publisher = "FromSoftware Inc, Bandai Namco Entertainment",
        banner_image = "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/header.jpg",
        other_images=[
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/ss_f79bb13f5d9cee64c4aafc4f0c01af7f6f6816d5.600x338.jpg", 
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/ss_430ab6ad267888137775aa68eb5baffce165dbce.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/ss_293bb8d15306d36527d9ecee75bff94280e390bf.600x338.jpg",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1888160/ss_8368f9fbb0f17b92e98bcb65464d088daca2e7aa.600x338.jpg"]
    )
    

    db.session.add(game_1)
    db.session.add(game_2)
    db.session.add(game_3)
    db.session.add(game_4)
    db.session.add(game_5)
    db.session.add(game_6)
    db.session.add(game_7)
    db.session.add(game_8)
    db.session.add(game_9)
    db.session.add(game_10)

    db.session.commit()

def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()