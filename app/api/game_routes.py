from flask import Blueprint, redirect, request
from app.models import User, Game, Review, db
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
from ..forms.game_form import GameForm


game_routes = Blueprint('games', __name__)


# * -----------  GET  --------------
# Returns all games that are listed on the landing page(store) for purchase

@game_routes.route('')
def get_all_games():
    games = Game.query.all()
    return ([game.to_dict_simple() for game in games])



# * -----------  GET  --------------
# Returns all details of a single game

@game_routes.route('/<int:game_id>')
def get_single_game(game_id):
    game = Game.query.get(game_id)
    return game.to_dict()



# * -----------  GET  --------------
# Returns all games that the user created/owns

@game_routes.route('/users/<int:user_id>/games')
def get_user_games(user_id):
    user = User.query.get(user_id)

    if user:
        games = Game.query.filter_by(owner_id=user.id).all()
        return [game.to_dict() for game in games]
    else:
        return {'error': 'User not found'}, 404



#TODO -----------  POST  --------------

@game_routes.route('/create_game', methods=['POST'])
@login_required
def create_game():
    form = GameForm()
    form.csrf_token.data = request.cookies['csrf_token']

    if form.validate_on_submit():
        other_images = request.json.get('other_images', [])
        if not isinstance(other_images, list):
            other_images = [other_images]

        new_game = Game(
            title=form.title.data,
            image=form.image.data,
            price=form.price.data,
            release_date=form.release_date.data,
            short_description=form.short_description.data,
            full_description=form.full_description.data,
            developer=form.developer.data,
            publisher=form.publisher.data,
            banner_image=form.banner_image.data,
            other_images=other_images,
            owner_id=current_user.id
        )

        db.session.add(new_game)
        db.session.commit()

        return new_game.to_dict()
    else:
        return {"errors": form.errors}, 400


#? -----------  PUT  --------------
@game_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_game(game_id):
    game = Game.query.get(game_id)

    if game:
        game.title = request.json.get('title', game.title)
        game.image = request.json.get('image', game.image)
        game.price = request.json.get('price', game.price)
        game.release_date = request.json.get('release_date', game.release_date)
        game.short_description = request.json.get('short_description', game.short_description)
        game.full_description = request.json.get('full_description', game.full_description)
        game.developer = request.json.get('developer', game.developer)
        game.publisher = request.json.get('publisher', game.publisher)
        game.banner_image = request.json.get('banner_image', game.banner_image)
        game.other_images = request.json.get('other_images', game.other_images)

        db.session.commit()

        return game.to_dict(), 200
    else:
        return {'error': 'Game not found'}, 404


#! -----------  DELETE  --------------
@game_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_game(game_id):
    game = Game.query.get(game_id)
    if game:
        db.session.delete(game)
        db.session.commit()
        return {"message": "Game deleted"}
    else:
        return {"errors": "Game not found"}, 404